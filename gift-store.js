/* =====================================================================
   GIFT STORE — one small API used by gift-create.html, gift-upload.html
   and script.js. It has two backends:

   • DEMO MODE (default): everything lives in THIS browser (localStorage +
     IndexedDB for the actual files). Perfect for trying the whole flow
     today with zero setup. A gift made here only shows up on this device.

   • CLOUD MODE (once cloud-config.js has a WORKER_URL): gifts and uploaded
     files live in your Cloudflare account (R2 storage + D1 database, via
     the small Worker in worker/), so anyone with the link — on any phone,
     anywhere — can add photos/videos and everyone sees the same result.
     The Worker's scheduled job deletes anything older than
     CLOUD.TRIAL_DAYS automatically.

   Both backends implement the exact same functions, so nothing else in
   the site needs to know or care which one is active.
   ===================================================================== */
(function (global) {
  const CFG = global.CLOUD || {};
  const TRIAL_DAYS = Number(CFG.TRIAL_DAYS) > 0 ? Number(CFG.TRIAL_DAYS) : 7;
  const CLOUD_ON = !!CFG.WORKER_URL;

  const slugify = () => Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 6);
  const daysLeft = (createdAt) => {
    const ms = new Date(createdAt).getTime() + TRIAL_DAYS * 86400000 - Date.now();
    return ms / 86400000;
  };
  const isExpired = (createdAt) => daysLeft(createdAt) <= 0;
  const fmtLeft = (createdAt) => {
    const d = daysLeft(createdAt);
    if (d <= 0) return 'Expired';
    const days = Math.floor(d), hours = Math.floor((d - days) * 24);
    if (days >= 1) return `${days}d ${hours}h left`;
    const mins = Math.floor(((d - days) * 24 - hours) * 60);
    return `${hours}h ${mins}m left`;
  };

  /* ---------------------------- DEMO backend ---------------------------- */
  const demo = {
    label: 'demo (this browser only)',
    db: null,
    async open() {
      if (this.db) return this.db;
      return new Promise((resolve, reject) => {
        const req = indexedDB.open('gift-demo-store', 1);
        req.onupgradeneeded = () => {
          const d = req.result;
          if (!d.objectStoreNames.contains('gifts')) d.createObjectStore('gifts', { keyPath: 'slug' });
          if (!d.objectStoreNames.contains('media')) d.createObjectStore('media', { keyPath: 'id' }).createIndex('slug', 'slug');
        };
        req.onsuccess = () => { this.db = req.result; resolve(this.db); };
        req.onerror = () => reject(req.error);
      });
    },
    async tx(store, mode, fn) {
      const d = await this.open();
      return new Promise((resolve, reject) => {
        const t = d.transaction(store, mode);
        const r = fn(t.objectStore(store));
        t.oncomplete = () => resolve(r && r.result);
        t.onerror = () => reject(t.error);
      });
    },
    async createGift({ name, message }) {
      const slug = slugify();
      const gift = { slug, name: name || '', message: message || '', createdAt: new Date().toISOString() };
      await this.tx('gifts', 'readwrite', (s) => s.put(gift));
      return gift;
    },
    async getGift(slug) {
      return (await this.tx('gifts', 'readonly', (s) => s.get(slug))) || null;
    },
    async addMedia(slug, file) {
      const id = slugify() + Date.now();
      const rec = { id, slug, blob: file, type: file.type, name: file.name, createdAt: new Date().toISOString() };
      await this.tx('media', 'readwrite', (s) => s.put(rec));
      return { id, url: URL.createObjectURL(file), type: file.type };
    },
    async listMedia(slug) {
      const d = await this.open();
      return new Promise((resolve, reject) => {
        const out = [];
        const req = d.transaction('media', 'readonly').objectStore('media').index('slug').openCursor(IDBKeyRange.only(slug));
        req.onsuccess = () => {
          const c = req.result;
          if (!c) return resolve(out.sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
          out.push({ id: c.value.id, url: URL.createObjectURL(c.value.blob), type: c.value.type, createdAt: c.value.createdAt });
          c.continue();
        };
        req.onerror = () => reject(req.error);
      });
    },
    async removeMedia(slug, id) { await this.tx('media', 'readwrite', (s) => s.delete(id)); },
  };

  /* --------------------------- CLOUD backend ---------------------------- */
  // Talks to the small Cloudflare Worker in worker/ over plain HTTPS — that
  // Worker is the only thing holding real R2/D1 credentials (those are true
  // secrets, unlike a Supabase-style public anon key, so they can never sit
  // in this browser-side file). See worker/README.md to deploy it.
  //
  // Privacy by construction: every endpoint the Worker exposes either creates
  // one gift, or reads/writes ONE gift by its exact code (or one upload by
  // its exact id) — there is no endpoint that lists gifts. Nobody, including
  // someone reading this source file, can make the Worker return more than
  // one gift's data. That's what makes "only people with the link" true.
  async function workerFetch(path, options = {}) {
    let res;
    try {
      res = await fetch(`${CFG.WORKER_URL}${path}`, options);
    } catch (e) {
      throw new Error('Could not reach the cloud (check your internet connection).');
    }
    if (res.status === 404) return { notFound: true };
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error((body && body.error) || `The cloud said no (${res.status}).`);
    }
    return { data: await res.json().catch(() => null) };
  }
  // General-purpose upload, usable outside the gift flow too — this is what lets the
  // main site's own ✎ Customize panel and click-to-edit mode save photos/videos to the
  // same Cloudflare project instead of just this one browser. Returns null when no
  // cloud project is configured, so callers can fall back to local storage.
  async function cloudUploadMedia(file, folder = 'site') {
    if (!CLOUD_ON) return null;
    const q = `folder=${encodeURIComponent(folder)}&filename=${encodeURIComponent(file.name)}`;
    const { data } = await workerFetch(`/uploads?${q}`, { method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file });
    return data; // { url, path, type }
  }

  const cloud = {
    label: 'cloud (Cloudflare — shared across every device, private to each link)',
    async createGift({ name, message }) {
      const { data } = await workerFetch('/gifts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slugify(), name: name || '', message: message || '' }),
      });
      if (!data) throw new Error('Could not create the gift: no data came back.');
      return { slug: data.slug, name: data.name, message: data.message, createdAt: data.created_at };
    },
    async getGift(slug) {
      const { notFound, data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}`);
      if (notFound || !data) return null;
      return { slug: data.slug, name: data.name, message: data.message, createdAt: data.created_at };
    },
    async addMedia(slug, file) {
      const q = `filename=${encodeURIComponent(file.name)}`;
      const { notFound, data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/media?${q}`, {
        method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file,
      });
      if (notFound) throw new Error('This gift link was not found — it may have expired.');
      if (!data) throw new Error('Could not save the upload: no data came back.');
      return { id: data.id, url: data.url, type: data.type };
    },
    async listMedia(slug) {
      const { notFound, data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/media`);
      if (notFound || !data) return [];
      return data.map((r) => ({ id: r.id, url: r.url, type: r.type, createdAt: r.created_at }));
    },
    async removeMedia(slug, id) {
      await workerFetch(`/media/${encodeURIComponent(id)}`, { method: 'DELETE' });
    },
  };

  const backend = CLOUD_ON ? cloud : demo;

  global.GiftStore = {
    mode: CLOUD_ON ? 'cloud' : 'demo',
    label: backend.label,
    trialDays: TRIAL_DAYS,
    slugify,
    isExpired,
    daysLeft,
    fmtLeft,
    linkFor(slug) {
      const u = new URL(location.href);
      u.pathname = u.pathname.replace(/[^/]*$/, 'gift-upload.html');
      u.search = `?gift=${encodeURIComponent(slug)}`;
      return u.toString();
    },
    viewLinkFor(slug) {
      const u = new URL(location.href);
      u.pathname = u.pathname.replace(/[^/]*$/, 'index.html');
      u.search = `?gift=${encodeURIComponent(slug)}`;
      return u.toString();
    },
    createGift: (...a) => backend.createGift(...a),
    getGift: (...a) => backend.getGift(...a),
    addMedia: (...a) => backend.addMedia(...a),
    listMedia: (...a) => backend.listMedia(...a),
    removeMedia: (...a) => backend.removeMedia(...a),
    // Usable even when CLOUD_ON is false — it just resolves to null so the caller
    // (the main site's own uploads) knows to fall back to local browser storage.
    cloudUploadMedia,
  };
})(window);
