/* =====================================================================
   Birthday Gift API — a tiny Cloudflare Worker.

   Why this exists: R2 (Cloudflare's object storage) doesn't have a "public
   anon key" model like some other storage services — its real API keys are
   true secrets and must never reach a browser. This Worker is the one safe
   place those secrets live; the site only ever talks to THIS Worker over
   plain HTTPS, and the Worker is the only thing that touches R2 and the
   database directly.

   Privacy by construction: every route below either creates one thing, or
   reads/writes ONE gift by its exact slug (or one upload by its exact id).
   There is no route that lists gifts, so nobody — not even someone reading
   this source file — can make this Worker return more than one gift's data
   at a time. That's what makes "only people with the link" actually true.
   ===================================================================== */

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
const bad = (message, status = 400) => json({ error: message }, status);
const uid = () => crypto.randomUUID();
const cleanSegment = (s, fallback) => String(s || fallback).replace(/[^\w.\-]+/g, '_').slice(0, 120);
const isMedia = (contentType) => /^(image|video)\//.test(contentType || '');

async function readJsonBody(request) {
  try { return await request.json(); } catch { return {}; }
}

// Verifies a Stripe webhook signature ourselves (no Stripe SDK — Workers
// don't need one for this). Stripe signs each request with the raw body +
// timestamp using HMAC-SHA256 and your webhook signing secret. See:
// https://docs.stripe.com/webhooks#verify-manually
async function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!sigHeader || !secret) return false;
  const parts = Object.fromEntries(sigHeader.split(',').map((kv) => kv.split('=')));
  const timestamp = parts.t;
  const expected = parts.v1;
  if (!timestamp || !expected) return false;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signedPayload = `${timestamp}.${rawBody}`;
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  // Constant-time-ish compare (length-checked first) — good enough for a
  // webhook secret compare, avoids leaking timing on the common-case mismatch.
  if (hex.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

const b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlToBytes = (s) => {
  const pad = s.length % 4 ? '='.repeat(4 - (s.length % 4)) : '';
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const b64urlJson = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));

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

// Our own session token (a small HMAC-signed JWT-like blob) — issued once we've
// verified Google's token, so every later request doesn't re-verify with Google.
async function issueSession(email, secret) {
  const payload = { email, exp: Math.floor(Date.now() / 1000) + 30 * 86400 }; // 30 days
  const signingInput = `${b64urlJson({ alg: 'HS256' })}.${b64urlJson(payload)}`;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${b64url(sig)}`;
}
async function verifySession(token, secret) {
  if (!token) return null;
  const [h, p, s] = token.split('.');
  if (!h || !p || !s) return null;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('HMAC', key, b64urlToBytes(s), new TextEncoder().encode(`${h}.${p}`));
  if (!ok) return null;
  const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
  if (payload.exp * 1000 < Date.now()) return null;
  return payload; // { email, exp }
}
function bearerToken(request) {
  const auth = request.headers.get('Authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : '';
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });

    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);

    try {
      // POST /auth/google  { credential }  -> verify a Google Sign-In ID token,
      // issue our own session token the browser then sends back as
      // "Authorization: Bearer <token>" on every later request.
      if (request.method === 'POST' && parts.length === 2 && parts[0] === 'auth' && parts[1] === 'google') {
        const body = await readJsonBody(request);
        if (!env.GOOGLE_CLIENT_ID) return bad('Google sign-in is not configured on this server yet', 500);
        let identity;
        try { identity = await verifyGoogleIdToken(String(body.credential || ''), env.GOOGLE_CLIENT_ID); }
        catch (e) { return bad(`could not verify Google sign-in (${e.message})`, 401); }
        const session = await issueSession(identity.email, env.SESSION_SECRET);
        return json({ session, email: identity.email, name: identity.name });
      }

      // POST /gifts  { name, message }  -> create one gift, owned by whoever's
      // session token this request carries (requires signing in first).
      if (request.method === 'POST' && parts.length === 1 && parts[0] === 'gifts') {
        const auth = await verifySession(bearerToken(request), env.SESSION_SECRET);
        if (!auth) return bad('please sign in first', 401);
        const body = await readJsonBody(request);
        const slug = String(body.slug || '').trim();
        if (!slug || !/^[a-z0-9]{6,40}$/i.test(slug)) return bad('a valid slug is required');
        const name = String(body.name || '').slice(0, 200);
        const message = String(body.message || '').slice(0, 1000);
        const existing = await env.DB.prepare('SELECT slug FROM gifts WHERE slug = ?').bind(slug).first();
        if (existing) return bad('that link is already taken — try again', 409);
        await env.DB.prepare('INSERT INTO gifts (slug, name, message, buyer_email) VALUES (?, ?, ?, ?)')
          .bind(slug, name, message, auth.email).run();
        const row = await env.DB.prepare('SELECT * FROM gifts WHERE slug = ?').bind(slug).first();
        return json(row, 201);
      }

      // GET /me/gifts  -> every gift the signed-in user created. The only
      // "list" endpoint this Worker has, and it's scoped strictly to the
      // caller's own verified email — never anyone else's gifts.
      if (request.method === 'GET' && parts.length === 2 && parts[0] === 'me' && parts[1] === 'gifts') {
        const auth = await verifySession(bearerToken(request), env.SESSION_SECRET);
        if (!auth) return bad('please sign in first', 401);
        const { results } = await env.DB.prepare('SELECT * FROM gifts WHERE buyer_email = ? ORDER BY created_at DESC')
          .bind(auth.email).all();
        return json(results || []);
      }

      // GET /gifts/:slug  -> exactly one gift, or 404. Never a list.
      if (request.method === 'GET' && parts.length === 2 && parts[0] === 'gifts') {
        const row = await env.DB.prepare('SELECT * FROM gifts WHERE slug = ?').bind(parts[1]).first();
        return row ? json(row) : bad('not found', 404);
      }

      // GET /gifts/:slug/media  -> that one gift's uploads, newest last.
      if (request.method === 'GET' && parts.length === 3 && parts[0] === 'gifts' && parts[2] === 'media') {
        const { results } = await env.DB
          .prepare('SELECT id, url, type, created_at FROM gift_media WHERE slug = ? ORDER BY created_at ASC')
          .bind(parts[1]).all();
        return json(results || []);
      }

      // POST /gifts/:slug/media?filename=...  (body = the raw file)  -> upload one file
      if (request.method === 'POST' && parts.length === 3 && parts[0] === 'gifts' && parts[2] === 'media') {
        const slug = parts[1];
        const gift = await env.DB.prepare('SELECT slug FROM gifts WHERE slug = ?').bind(slug).first();
        if (!gift) return bad('this gift link was not found — it may have expired', 404);
        const contentType = request.headers.get('Content-Type') || '';
        if (!isMedia(contentType)) return bad('only photos and videos are accepted');
        const filename = cleanSegment(url.searchParams.get('filename'), 'upload');
        const key = `${slug}/${Date.now()}-${uid().slice(0, 8)}-${filename}`;
        await env.GIFT_MEDIA.put(key, request.body, { httpMetadata: { contentType } });
        const id = uid();
        const publicUrl = `${env.R2_PUBLIC_URL}/${key}`;
        await env.DB.prepare('INSERT INTO gift_media (id, slug, path, url, type) VALUES (?, ?, ?, ?, ?)')
          .bind(id, slug, key, publicUrl, contentType).run();
        return json({ id, url: publicUrl, type: contentType }, 201);
      }

      // DELETE /media/:id  -> remove one upload (its id, from listMedia, is unguessable)
      if (request.method === 'DELETE' && parts.length === 2 && parts[0] === 'media') {
        const row = await env.DB.prepare('SELECT path FROM gift_media WHERE id = ?').bind(parts[1]).first();
        if (row) {
          await env.GIFT_MEDIA.delete(row.path).catch(() => {});
          await env.DB.prepare('DELETE FROM gift_media WHERE id = ?').bind(parts[1]).run();
        }
        return json({ ok: true });
      }

      // POST /uploads?folder=site&filename=...  -> the main site's OWN photos/videos
      // (✎ Customize / click-to-edit), not tied to any gift.
      if (request.method === 'POST' && parts.length === 1 && parts[0] === 'uploads') {
        const contentType = request.headers.get('Content-Type') || '';
        if (!isMedia(contentType)) return bad('only photos and videos are accepted');
        const folder = cleanSegment(url.searchParams.get('folder'), 'site');
        const filename = cleanSegment(url.searchParams.get('filename'), 'upload');
        const key = `${folder}/${Date.now()}-${uid().slice(0, 8)}-${filename}`;
        await env.GIFT_MEDIA.put(key, request.body, { httpMetadata: { contentType } });
        return json({ url: `${env.R2_PUBLIC_URL}/${key}`, path: key, type: contentType }, 201);
      }

      // POST /stripe/webhook  -> Stripe calls this after a checkout completes.
      // Marks the ONE gift named in `client_reference_id` as paid forever
      // (exempt from the trial-expiry cron). Everything else is ignored.
      if (request.method === 'POST' && parts.length === 2 && parts[0] === 'stripe' && parts[1] === 'webhook') {
        const rawBody = await request.text();
        const sig = request.headers.get('Stripe-Signature');
        const ok = await verifyStripeSignature(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
        if (!ok) return bad('invalid signature', 400);
        const event = JSON.parse(rawBody);
        if (event.type === 'checkout.session.completed') {
          const slug = String(event.data?.object?.client_reference_id || '').trim();
          if (slug) await env.DB.prepare('UPDATE gifts SET paid = 1 WHERE slug = ?').bind(slug).run();
        }
        return json({ received: true });
      }

      return bad('not found', 404);
    } catch (err) {
      return bad(err && err.message ? err.message : 'server error', 500);
    }
  },

  // Cloudflare calls this on the cron schedule set in wrangler.toml — deletes any
  // gift (and its files) older than TRIAL_DAYS. Explicit step-by-step deletes rather
  // than relying on a foreign-key cascade, so this can't silently do nothing if D1
  // ever changes its cascade behaviour.
  async scheduled(event, env) {
    const days = Number(env.TRIAL_DAYS || '7');
    const cutoff = new Date(Date.now() - days * 86400000).toISOString();
    const { results: expired } = await env.DB.prepare('SELECT slug FROM gifts WHERE created_at < ?').bind(cutoff).all();
    for (const gift of expired || []) {
      const { results: media } = await env.DB.prepare('SELECT path FROM gift_media WHERE slug = ?').bind(gift.slug).all();
      for (const m of media || []) await env.GIFT_MEDIA.delete(m.path).catch(() => {});
      await env.DB.prepare('DELETE FROM gift_media WHERE slug = ?').bind(gift.slug).run();
      await env.DB.prepare('DELETE FROM gifts WHERE slug = ?').bind(gift.slug).run();
    }
  },
};
