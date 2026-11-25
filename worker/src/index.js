/* =====================================================================
   Birthday Gift API — a tiny Cloudflare Worker (v2).

   Why this exists: R2 (Cloudflare's object storage) doesn't have a "public
   anon key" model like some other storage services — its real API keys are
   true secrets and must never reach a browser. This Worker is the one safe
   place those secrets live; the site only ever talks to THIS Worker over
   plain HTTPS, and the Worker is the only thing that touches R2 and the
   database directly.

   v2 adds, per gift:
     • a password (stored only as a salted PBKDF2 hash) — the birthday person
       types it on the Netflix-style sign-in screen; wrong guesses are rate-limited
     • the creator's own customised page (`config`), editable only by the creator
   and closes v1's gaps: the creator's email is never sent to visitors, the
   photo list needs the password, deleting needs the creator, and the general
   /uploads route needs a signed-in user.

   Privacy by construction: every route either creates one thing, or reads/writes
   ONE gift by its exact slug (or one upload by its exact id). The only list is
   /me/gifts, scoped to the caller's own verified email.
   ===================================================================== */

const API_VERSION = 3; // 3 = email + password accounts, password-free gift links
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Gift-Key',
  'Access-Control-Max-Age': '86400',
};
const JSON_HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
const bad = (message, status = 400) => json({ error: message }, status);
const uid = () => crypto.randomUUID();
const cleanSegment = (s, fallback) => String(s || fallback).replace(/[^\w.\-]+/g, '_').slice(0, 120);
// A stored file keeps its ending (".mov", ".mp4"…) however long its name is: the site tells videos
// from photos by it. No ending → one that fits its type.
const TYPE_EXT = { 'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm', 'video/3gpp': '3gp', 'video/x-matroska': 'mkv', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'audio/mpeg': 'mp3', 'audio/mp4': 'm4a' };
function fileSegment(name, contentType) {
  const clean = String(name || 'file').replace(/[^\w.\-]+/g, '_');
  const m = /^(.*)\.([A-Za-z0-9]{2,5})$/.exec(clean);
  const type = String(contentType || '').split(';')[0].trim().toLowerCase();
  const ext = m ? m[2] : TYPE_EXT[type] || (type.startsWith('video/') ? 'mp4' : '');
  return `${(m ? m[1] : clean).slice(0, 80) || 'file'}${ext ? `.${ext}` : ''}`;
}
const MEDIA_PIECE = 2 * 1024 * 1024; // videos go out in pieces: a paused one never keeps a connection open
// GET /m/<key>  -> a stored photo / video / song, in pieces when asked (phones and seeking need that).
// iPhone .mov files are sent as MP4 (same thing inside), which every browser accepts.
async function serveMedia(request, env, key) {
  const head = request.method === 'HEAD';
  const m = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('Range') || '');
  const wanted = !head && m && (m[1] || m[2]) ? m : null;
  let range;
  if (wanted) {
    const n = wanted[2] ? Number(wanted[2]) : Infinity;
    range = wanted[1]
      ? { offset: Number(wanted[1]), length: Math.min(MEDIA_PIECE, Math.max(1, n - Number(wanted[1]) + 1)) }
      : { suffix: n };
  }
  let obj;
  try { obj = head ? await env.GIFT_MEDIA.head(key) : await env.GIFT_MEDIA.get(key, range ? { range } : undefined); }
  catch { return new Response(null, { status: 416, headers: { 'Access-Control-Allow-Origin': '*' } }); }
  if (!obj) return bad('not found', 404);
  let type = String((obj.httpMetadata && obj.httpMetadata.contentType) || '').toLowerCase();
  if (!/^(image|video|audio)\//.test(type)) return bad('not found', 404);
  if (type.startsWith('video/quicktime') || type.startsWith('video/x-m4v')) type = 'video/mp4';
  const headers = {
    'Content-Type': type, 'Accept-Ranges': 'bytes', ETag: obj.httpEtag,
    // Videos stay out of the browser's disk cache: two players of one video would wait for each other there.
    'Cache-Control': type.startsWith('image/') ? 'public, max-age=31536000, immutable' : 'no-store',
    'Access-Control-Allow-Origin': '*', 'Cross-Origin-Resource-Policy': 'cross-origin',
    'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'none'; sandbox",
  };
  if (!wanted) return new Response(head ? null : obj.body, { status: 200, headers: { ...headers, 'Content-Length': String(obj.size) } });
  const from = wanted[1] ? Number(wanted[1]) : Math.max(0, obj.size - Number(wanted[2]));
  const to = wanted[1] ? Math.min(obj.size - 1, from + range.length - 1) : obj.size - 1;
  if (from > to) return new Response(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${obj.size}` } });
  return new Response(obj.body, { status: 206, headers: { ...headers, 'Content-Length': String(to - from + 1), 'Content-Range': `bytes ${from}-${to}/${obj.size}` } });
}
const isMedia = (contentType, allowAudio = false) => (allowAudio ? /^(image|video|audio)\// : /^(image|video)\//).test(contentType || '');
const MAX_CONFIG_BYTES = 256 * 1024;
const MAX_FAILED_TRIES = 8;          // wrong passwords allowed per gift…
const TRY_WINDOW_MS = 15 * 60000;    // …per 15 minutes
const MAX_LOGIN_TRIES = 10;          // wrong account passwords allowed per email per 15 minutes
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
// Email + password accounts live in their own namespace ("pw:you@mail.com"), so nobody can
// create a password account with someone else's Gmail address and see their Google gifts.
const PW_PREFIX = 'pw:';
const accountPasswordProblem = (pw) => {
  pw = String(pw || '');
  if (pw.length < 6) return 'your password needs at least 6 characters';
  if (pw.length > 128) return 'your password can be at most 128 characters';
  return '';
};

async function readJsonBody(request) {
  try { return await request.json(); } catch { return {}; }
}
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
// Length-checked constant-time compare for signatures and hashes.
function safeEqual(a, b) {
  a = String(a || ''); b = String(b || '');
  if (!a || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message)));
}

// Verifies a Stripe webhook signature ourselves (no Stripe SDK — Workers
// don't need one for this). See: https://docs.stripe.com/webhooks#verify-manually
async function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!sigHeader || !secret) return false;
  const parts = Object.fromEntries(sigHeader.split(',').map((kv) => kv.split('=')));
  if (!parts.t || !parts.v1) return false;
  return safeEqual(await hmacHex(secret, `${parts.t}.${rawBody}`), parts.v1);
}

const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlToBytes = (s) => {
  const pad = s.length % 4 ? '='.repeat(4 - (s.length % 4)) : '';
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const b64urlJson = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));

/* ---------- passwords: salted PBKDF2-SHA256 (100k rounds — the Workers maximum) ---------- */
async function hashPassword(password, saltB64) {
  const salt = saltB64 ? b64urlToBytes(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(password)), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256);
  return { hash: b64url(bits), salt: b64url(salt) };
}
const passwordProblem = (pw) => {
  pw = String(pw || '');
  if (pw.length < 4) return 'the password needs at least 4 characters';
  if (pw.length > 64) return 'the password can be at most 64 characters';
  return '';
};

let googleCertsCache = null; // { keys, fetchedAt }
async function getGoogleCerts() {
  if (googleCertsCache && Date.now() - googleCertsCache.fetchedAt < 3600000) return googleCertsCache.keys;
  const res = await fetch('https://www.googleapis.com/oauth2/v3/certs');
  const { keys } = await res.json();
  googleCertsCache = { keys, fetchedAt: Date.now() };
  return keys;
}

// Verifies a Google Sign-In ID token (a JWT) ourselves — no client library
// needed. Checks: RS256 signature against Google's published public keys,
// audience matches our own OAuth client id, issuer, and expiry.
async function verifyGoogleIdToken(idToken, clientId) {
  const [headerB64, payloadB64, sigB64] = idToken.split('.');
  if (!headerB64 || !payloadB64 || !sigB64) throw new Error('malformed token');
  const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(headerB64)));
  const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(payloadB64)));

  const keys = await getGoogleCerts();
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) throw new Error('unknown signing key');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5', key, b64urlToBytes(sigB64), new TextEncoder().encode(`${headerB64}.${payloadB64}`)
  );
  if (!ok) throw new Error('bad signature');

  if (payload.aud !== clientId) throw new Error('wrong audience');
  if (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com') throw new Error('wrong issuer');
  if (!payload.email_verified) throw new Error('email not verified');
  if (payload.exp * 1000 < Date.now()) throw new Error('token expired');

  return { email: String(payload.email).toLowerCase(), name: payload.name || '' };
}

// Small HMAC-signed tokens (JWT-like). Two kinds, never interchangeable:
//   session — { email, exp }                  the signed-in creator
//   view    — { kind: 'view', slug, pv, exp }  someone who typed a gift's password
async function signToken(payload, secret) {
  const signingInput = `${b64urlJson({ alg: 'HS256' })}.${b64urlJson(payload)}`;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${b64url(sig)}`;
}
async function verifyToken(token, secret) {
  if (!token || !secret) return null;
  const [h, p, s] = String(token).split('.');
  if (!h || !p || !s) return null;
  try {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const ok = await crypto.subtle.verify('HMAC', key, b64urlToBytes(s), new TextEncoder().encode(`${h}.${p}`));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch { return null; }
}
const issueSession = (email, secret) => signToken({ email, exp: Math.floor(Date.now() / 1000) + 30 * 86400 }, secret);
async function verifySession(token, secret) {
  const p = await verifyToken(token, secret);
  return p && p.email && !p.kind ? p : null; // a gift "view" token is never a sign-in
}
function bearerToken(request) {
  const auth = request.headers.get('Authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : '';
}

/* ---------- database: v2 columns are added automatically on first use ---------- */
let schemaReady = false;
async function ensureSchema(env) {
  if (schemaReady) return;
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS gifts (slug TEXT PRIMARY KEY, name TEXT NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')), paid INTEGER NOT NULL DEFAULT 0, buyer_email TEXT NOT NULL DEFAULT '')`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS gift_media (id TEXT PRIMARY KEY, slug TEXT NOT NULL, path TEXT NOT NULL, url TEXT NOT NULL,
    type TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`).run();
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS gift_attempts (slug TEXT NOT NULL, at INTEGER NOT NULL)').run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS accounts (email TEXT PRIMARY KEY, name TEXT NOT NULL DEFAULT '', pass_hash TEXT NOT NULL,
    pass_salt TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))`).run();
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS login_attempts (email TEXT NOT NULL, at INTEGER NOT NULL)').run();
  const { results } = await env.DB.prepare('PRAGMA table_info(gifts)').all();
  const have = new Set((results || []).map((c) => c.name));
  const add = [
    ['pass_hash', "TEXT NOT NULL DEFAULT ''"], ['pass_salt', "TEXT NOT NULL DEFAULT ''"], ['pass_v', 'INTEGER NOT NULL DEFAULT 0'],
    ['config', "TEXT NOT NULL DEFAULT ''"], ['updated_at', "TEXT NOT NULL DEFAULT ''"],
    ['pay_order_id', "TEXT NOT NULL DEFAULT ''"], ['pay_id', "TEXT NOT NULL DEFAULT ''"], ['paid_at', "TEXT NOT NULL DEFAULT ''"],
  ];
  for (const [col, def] of add) if (!have.has(col)) await env.DB.prepare(`ALTER TABLE gifts ADD COLUMN ${col} ${def}`).run();
  schemaReady = true;
}
const getGiftRow = (env, slug) => env.DB.prepare('SELECT * FROM gifts WHERE slug = ?').bind(String(slug || '')).first();
const parseConfig = (s) => { try { return s ? JSON.parse(s) : null; } catch { return null; } };
// What anyone with the link may see (enough for the sign-in screen) — never the creator's email.
const publicView = (r) => ({
  slug: r.slug, name: r.name, created_at: r.created_at, paid: !!r.paid, locked: !!r.pass_hash,
  ...(r.pass_hash ? {} : { message: r.message }),
});
// After the right password (or for the creator): the whole page.
const fullView = (r) => ({ ...publicView(r), message: r.message, config: parseConfig(r.config) });
const ownerView = (r) => ({ ...fullView(r), owner: true, has_password: !!r.pass_hash, paid_at: r.paid_at || '' });

async function whoIs(request, env) { return verifySession(bearerToken(request), env.SESSION_SECRET); }
// Creator of this gift? → { row } ; otherwise a ready-made error response.
async function requireOwner(request, env, slug) {
  const auth = await whoIs(request, env);
  if (!auth) return { error: bad('please sign in first', 401) };
  const row = await getGiftRow(env, slug);
  if (!row) return { error: bad('not found', 404) };
  if (row.buyer_email !== auth.email) return { error: bad('only the person who made this gift can change it', 403) };
  return { row, auth };
}
// May this request see the gift's photos and page? (creator, right password, or no password set)
async function canView(request, env, row) {
  if (!row.pass_hash) return true;
  const auth = await whoIs(request, env);
  if (auth && auth.email === row.buyer_email) return true;
  const key = await verifyToken(request.headers.get('X-Gift-Key'), env.SESSION_SECRET);
  return !!(key && key.kind === 'view' && key.slug === row.slug && key.pv === row.pass_v);
}
const listMedia = async (env, slug) => (await env.DB
  .prepare('SELECT id, url, type, created_at FROM gift_media WHERE slug = ? ORDER BY created_at ASC').bind(slug).all()).results || [];

/* ---------- paid gifts are never auto-deleted ---------- */
async function markPaid(env, slug, payId) {
  await env.DB.prepare("UPDATE gifts SET paid = 1, pay_id = ?, paid_at = datetime('now') WHERE slug = ? AND paid = 0").bind(payId || '', slug).run();
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });

    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const M = request.method;
    const route = (method, ...segs) => M === method && parts.length === segs.length && segs.every((s, i) => s === '*' || s === parts[i]);

    try {
      if ((M === 'GET' || M === 'HEAD') && parts[0] === 'm' && parts.length > 2) return await serveMedia(request, env, parts.slice(1).map(decodeURIComponent).join('/'));

      await ensureSchema(env);

      // GET /version  -> what this Worker can do (the site adapts to an older Worker).
      if (route('GET', 'version')) {
        return json({ v: API_VERSION, passwords: true, accounts: true });
      }

      // POST /auth/google  { credential }  -> verify a Google Sign-In ID token and
      // issue our own session token ("Authorization: Bearer <token>" afterwards).
      if (route('POST', 'auth', 'google')) {
        const body = await readJsonBody(request);
        if (!env.GOOGLE_CLIENT_ID) return bad('Google sign-in is not configured on this server yet', 500);
        let identity;
        try { identity = await verifyGoogleIdToken(String(body.credential || ''), env.GOOGLE_CLIENT_ID); }
        catch (e) { return bad(`could not verify Google sign-in (${e.message})`, 401); }
        const session = await issueSession(identity.email, env.SESSION_SECRET);
        return json({ session, email: identity.email, name: identity.name });
      }

      // POST /auth/signup  { email, password, name }  -> a new email + password account (no Gmail needed).
      // POST /auth/login   { email, password }        -> sign in to it.
      // Expected outcomes (email taken, wrong password, too many tries) are 200 answers with a
      // `code`, so the browser console stays clean; the site shows the message.
      if (route('POST', 'auth', 'signup') || route('POST', 'auth', 'login')) {
        const signup = parts[1] === 'signup';
        const body = await readJsonBody(request);
        const email = String(body.email || '').trim().toLowerCase();
        const password = String(body.password || '');
        if (!EMAIL_RE.test(email) || email.length > 254) return json({ error: 'please enter a valid email address', code: 'email' });
        const now = Date.now();
        const { n } = await env.DB.prepare('SELECT COUNT(*) AS n FROM login_attempts WHERE email = ? AND at > ?').bind(email, now - TRY_WINDOW_MS).first();
        if (n >= MAX_LOGIN_TRIES) return json({ error: 'too many tries — please wait 15 minutes and try again', code: 'slow' });
        const row = await env.DB.prepare('SELECT * FROM accounts WHERE email = ?').bind(email).first();
        if (signup) {
          const problem = accountPasswordProblem(password);
          if (problem) return json({ error: problem, code: 'password' });
          if (row) return json({ error: 'an account with this email already exists — sign in instead', code: 'exists' });
          const name = String(body.name || '').trim().slice(0, 80);
          const { hash, salt } = await hashPassword(password);
          await env.DB.prepare('INSERT INTO accounts (email, name, pass_hash, pass_salt) VALUES (?, ?, ?, ?)').bind(email, name, hash, salt).run();
          return json({ session: await issueSession(PW_PREFIX + email, env.SESSION_SECRET), email, name, kind: 'password' });
        }
        const { hash } = row ? await hashPassword(password, row.pass_salt) : { hash: '' };
        if (!row || !safeEqual(hash, row.pass_hash)) {
          await env.DB.prepare('INSERT INTO login_attempts (email, at) VALUES (?, ?)').bind(email, now).run();
          return json({ error: 'wrong email or password', code: 'wrong' });
        }
        await env.DB.prepare('DELETE FROM login_attempts WHERE email = ?').bind(email).run();
        return json({ session: await issueSession(PW_PREFIX + email, env.SESSION_SECRET), email, name: row.name || '', kind: 'password' });
      }

      // POST /gifts  { slug, name, message, password? }  -> create one gift owned by the signed-in user.
      // No password (the normal case) = anyone with the link or QR code opens the page straight away.
      if (route('POST', 'gifts')) {
        const auth = await whoIs(request, env);
        if (!auth) return bad('please sign in first', 401);
        const body = await readJsonBody(request);
        const slug = String(body.slug || '').trim();
        if (!slug || !/^[a-z0-9]{6,40}$/i.test(slug)) return bad('a valid slug is required');
        const wantsPassword = String(body.password || '') !== '';
        const problem = wantsPassword ? passwordProblem(body.password) : '';
        if (problem) return bad(problem);
        const name = String(body.name || '').slice(0, 200);
        const message = String(body.message || '').slice(0, 1000);
        if (await getGiftRow(env, slug)) return bad('that link is already taken — try again', 409);
        const { hash, salt } = wantsPassword ? await hashPassword(body.password) : { hash: '', salt: '' };
        await env.DB.prepare("INSERT INTO gifts (slug, name, message, buyer_email, pass_hash, pass_salt, pass_v, updated_at) VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'))")
          .bind(slug, name, message, auth.email, hash, salt).run();
        return json(ownerView(await getGiftRow(env, slug)), 201);
      }

      // GET /me/gifts  -> every gift the signed-in user created (only their own).
      if (route('GET', 'me', 'gifts')) {
        const auth = await whoIs(request, env);
        if (!auth) return bad('please sign in first', 401);
        const { results } = await env.DB.prepare('SELECT * FROM gifts WHERE buyer_email = ? ORDER BY created_at DESC').bind(auth.email).all();
        return json((results || []).map(ownerView));
      }

      // GET /gifts/:slug  -> the creator gets everything; anyone else just enough for the sign-in screen.
      if (route('GET', 'gifts', '*')) {
        const row = await getGiftRow(env, parts[1]);
        if (!row) return bad('not found', 404);
        const auth = await whoIs(request, env);
        return json(auth && auth.email === row.buyer_email ? ownerView(row) : publicView(row));
      }

      // POST /gifts/:slug/unlock  { password }  -> a viewing key + the whole page (rate-limited).
      // Expected outcomes (wrong password, too many tries, still locked) are normal 200 answers
      // with a `code` / `locked` flag, so a visitor's browser console stays free of red errors.
      if (route('POST', 'gifts', '*', 'unlock')) {
        const row = await getGiftRow(env, parts[1]);
        if (!row) return bad('not found', 404);
        const now = Date.now();
        if (row.pass_hash) {
          const { n } = await env.DB.prepare('SELECT COUNT(*) AS n FROM gift_attempts WHERE slug = ? AND at > ?').bind(row.slug, now - TRY_WINDOW_MS).first();
          if (n >= MAX_FAILED_TRIES) return json({ error: 'too many wrong tries — please wait 15 minutes and try again', code: 'slow' });
          const body = await readJsonBody(request);
          const { hash } = await hashPassword(String(body.password || ''), row.pass_salt);
          if (!safeEqual(hash, row.pass_hash)) {
            await env.DB.prepare('INSERT INTO gift_attempts (slug, at) VALUES (?, ?)').bind(row.slug, now).run();
            return json({ error: 'wrong password', code: 'wrong' });
          }
        }
        const key = await signToken({ kind: 'view', slug: row.slug, pv: row.pass_v, exp: Math.floor(now / 1000) + 60 * 86400 }, env.SESSION_SECRET);
        return json({ key, gift: fullView(row), media: await listMedia(env, row.slug) });
      }

      // GET /gifts/:slug/full  -> the whole page (creator, or a valid viewing key in X-Gift-Key).
      if (route('GET', 'gifts', '*', 'full')) {
        const row = await getGiftRow(env, parts[1]);
        if (!row) return bad('not found', 404);
        if (!(await canView(request, env, row))) return json({ locked: true });
        const auth = await whoIs(request, env);
        const owner = !!auth && auth.email === row.buyer_email;
        return json({ gift: owner ? ownerView(row) : fullView(row), media: await listMedia(env, row.slug) });
      }

      // GET /gifts/:slug/media  -> its uploads (same rule as /full).
      if (route('GET', 'gifts', '*', 'media')) {
        const row = await getGiftRow(env, parts[1]);
        if (!row) return bad('not found', 404);
        if (!(await canView(request, env, row))) return json({ locked: true });
        return json(await listMedia(env, row.slug));
      }

      // POST /gifts/:slug/media?filename=...  (body = the raw file) -> friends & family add a photo/video.
      if (route('POST', 'gifts', '*', 'media')) {
        const slug = parts[1];
        if (!(await getGiftRow(env, slug))) return bad('this gift link was not found — it may have expired', 404);
        const contentType = request.headers.get('Content-Type') || '';
        if (!isMedia(contentType)) return bad('only photos and videos are accepted');
        const filename = fileSegment(url.searchParams.get('filename') || 'upload', contentType);
        const key = `${slug}/${Date.now()}-${uid().slice(0, 8)}-${filename}`;
        await env.GIFT_MEDIA.put(key, request.body, { httpMetadata: { contentType } });
        const id = uid();
        const publicUrl = `${env.R2_PUBLIC_URL}/${key}`;
        await env.DB.prepare('INSERT INTO gift_media (id, slug, path, url, type) VALUES (?, ?, ?, ?, ?)').bind(id, slug, key, publicUrl, contentType).run();
        return json({ id, url: publicUrl, type: contentType }, 201);
      }

      // PUT /gifts/:slug/config  { config }  -> the creator saves their customised page.
      if (route('PUT', 'gifts', '*', 'config')) {
        const o = await requireOwner(request, env, parts[1]);
        if (o.error) return o.error;
        const raw = await request.text();
        if (raw.length > MAX_CONFIG_BYTES) return bad('that page is too big to save (over 256 KB of text)', 413);
        let body;
        try { body = JSON.parse(raw); } catch { return bad('could not read the page data'); }
        if (!body || typeof body.config !== 'object' || Array.isArray(body.config)) return bad('could not read the page data');
        await env.DB.prepare("UPDATE gifts SET config = ?, updated_at = datetime('now') WHERE slug = ?").bind(JSON.stringify(body.config), o.row.slug).run();
        return json({ ok: true });
      }

      // PUT /gifts/:slug/password  { password }  -> the creator changes it (old viewing keys stop working).
      // An empty password removes it: the link then opens without one.
      if (route('PUT', 'gifts', '*', 'password')) {
        const o = await requireOwner(request, env, parts[1]);
        if (o.error) return o.error;
        const body = await readJsonBody(request);
        const remove = String(body.password || '') === '';
        const problem = remove ? '' : passwordProblem(body.password);
        if (problem) return bad(problem);
        const { hash, salt } = remove ? { hash: '', salt: '' } : await hashPassword(body.password);
        await env.DB.prepare('UPDATE gifts SET pass_hash = ?, pass_salt = ?, pass_v = pass_v + 1 WHERE slug = ?').bind(hash, salt, o.row.slug).run();
        await env.DB.prepare('DELETE FROM gift_attempts WHERE slug = ?').bind(o.row.slug).run();
        return json(ownerView(await getGiftRow(env, o.row.slug)));
      }

      // POST /gifts/:slug/assets?filename=...  -> the creator's own photos/videos/songs for the page.
      if (route('POST', 'gifts', '*', 'assets')) {
        const o = await requireOwner(request, env, parts[1]);
        if (o.error) return o.error;
        const contentType = request.headers.get('Content-Type') || '';
        if (!isMedia(contentType, true)) return bad('only photos, videos and songs are accepted');
        const key = `${o.row.slug}/site/${Date.now()}-${uid().slice(0, 8)}-${fileSegment(url.searchParams.get('filename'), contentType)}`;
        await env.GIFT_MEDIA.put(key, request.body, { httpMetadata: { contentType } });
        return json({ url: `${env.R2_PUBLIC_URL}/${key}`, path: key, type: contentType }, 201);
      }

      // DELETE /media/:id  -> the gift's creator removes one upload.
      if (route('DELETE', 'media', '*')) {
        const media = await env.DB.prepare('SELECT path, slug FROM gift_media WHERE id = ?').bind(parts[1]).first();
        if (!media) return json({ ok: true });
        const o = await requireOwner(request, env, media.slug);
        if (o.error) return o.error;
        await env.GIFT_MEDIA.delete(media.path).catch(() => {});
        await env.DB.prepare('DELETE FROM gift_media WHERE id = ?').bind(parts[1]).run();
        return json({ ok: true });
      }

      // POST /uploads?folder=site&filename=...  -> the main site's own photos/videos (signed-in users only).
      if (route('POST', 'uploads')) {
        if (!(await whoIs(request, env))) return bad('please sign in first', 401);
        const contentType = request.headers.get('Content-Type') || '';
        if (!isMedia(contentType)) return bad('only photos and videos are accepted');
        const folder = cleanSegment(url.searchParams.get('folder'), 'site');
        const key = `${folder}/${Date.now()}-${uid().slice(0, 8)}-${fileSegment(url.searchParams.get('filename') || 'upload', contentType)}`;
        await env.GIFT_MEDIA.put(key, request.body, { httpMetadata: { contentType } });
        return json({ url: `${env.R2_PUBLIC_URL}/${key}`, path: key, type: contentType }, 201);
      }

      // POST /stripe/webhook  -> kept for sites still using a Stripe Payment Link.
      if (route('POST', 'stripe', 'webhook')) {
        const rawBody = await request.text();
        const ok = await verifyStripeSignature(rawBody, request.headers.get('Stripe-Signature'), env.STRIPE_WEBHOOK_SECRET);
        if (!ok) return bad('invalid signature', 400);
        const event = JSON.parse(rawBody);
        if (event.type === 'checkout.session.completed') {
          const slug = String(event.data?.object?.client_reference_id || '').trim();
          if (slug) await markPaid(env, slug, String(event.data?.object?.payment_intent || ''));
        }
        return json({ received: true });
      }

      return bad('not found', 404);
    } catch (err) {
      return bad(err && err.message ? err.message : 'server error', 500);
    }
  },

  // Daily (cron in wrangler.toml): deletes UNPAID gifts older than TRIAL_DAYS, plus old
  // wrong-password records. Paid gifts are kept forever. Explicit step-by-step deletes
  // rather than relying on a foreign-key cascade.
  async scheduled(event, env) {
    await ensureSchema(env);
    const days = Number(env.TRIAL_DAYS || '7');
    // created_at is stored as 'YYYY-MM-DD HH:MM:SS' (UTC) — compare in that same format.
    const cutoff = new Date(Date.now() - days * 86400000).toISOString().slice(0, 19).replace('T', ' ');
    const { results: expired } = await env.DB.prepare('SELECT slug FROM gifts WHERE paid = 0 AND created_at < ?').bind(cutoff).all();
    for (const gift of expired || []) {
      const { results: media } = await env.DB.prepare('SELECT path FROM gift_media WHERE slug = ?').bind(gift.slug).all();
      for (const m of media || []) await env.GIFT_MEDIA.delete(m.path).catch(() => {});
      const listed = await env.GIFT_MEDIA.list({ prefix: `${gift.slug}/site/` }).catch(() => null);
      for (const obj of (listed && listed.objects) || []) await env.GIFT_MEDIA.delete(obj.key).catch(() => {});
      await env.DB.prepare('DELETE FROM gift_media WHERE slug = ?').bind(gift.slug).run();
      await env.DB.prepare('DELETE FROM gifts WHERE slug = ?').bind(gift.slug).run();
    }
    await env.DB.prepare('DELETE FROM gift_attempts WHERE at < ?').bind(Date.now() - 86400000).run();
    await env.DB.prepare('DELETE FROM login_attempts WHERE at < ?').bind(Date.now() - 86400000).run();
  },
};
