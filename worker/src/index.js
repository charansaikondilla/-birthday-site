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

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS_HEADERS });

    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);

    try {
      // POST /gifts  { slug, name, message }  -> create one gift
      if (request.method === 'POST' && parts.length === 1 && parts[0] === 'gifts') {
        const body = await readJsonBody(request);
        const slug = String(body.slug || '').trim();
        if (!slug || !/^[a-z0-9]{6,40}$/i.test(slug)) return bad('a valid slug is required');
        const name = String(body.name || '').slice(0, 200);
        const message = String(body.message || '').slice(0, 1000);
        const existing = await env.DB.prepare('SELECT slug FROM gifts WHERE slug = ?').bind(slug).first();
        if (existing) return bad('that link is already taken — try again', 409);
        await env.DB.prepare('INSERT INTO gifts (slug, name, message) VALUES (?, ?, ?)').bind(slug, name, message).run();
        const row = await env.DB.prepare('SELECT * FROM gifts WHERE slug = ?').bind(slug).first();
        return json(row, 201);
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
