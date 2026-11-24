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

  // Demo-mode password hash (PBKDF2 in the browser) — so the demo never stores the password itself.
  async function demoHash(password, saltB64) {
    const salt = saltB64 ? Uint8Array.from(atob(saltB64), (c) => c.charCodeAt(0)) : crypto.getRandomValues(new Uint8Array(16));
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(password)), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 60000, hash: 'SHA-256' }, key, 256);
    const b64 = (u8) => btoa(String.fromCharCode(...new Uint8Array(u8)));
    return { passHash: b64(bits), passSalt: b64(salt) };
  }

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
    async createGift({ name, message, password }) {
      const slug = slugify();
      const gift = { slug, name: name || '', message: message || '', createdAt: new Date().toISOString(), paid: false, config: null };
      if (password) Object.assign(gift, await demoHash(password));
      await this.tx('gifts', 'readwrite', (s) => s.put(gift));
      return this.view(gift);
    },
    // Demo mode = one browser, so whoever is here made the gift (the page itself can
    // still show the password screen with ?preview=1 to try it out "as her").
    view(g) { return g && { ...g, locked: !!g.passHash, owner: true, hasPassword: !!g.passHash, passHash: undefined, passSalt: undefined }; },
    async raw(slug) { return (await this.tx('gifts', 'readonly', (s) => s.get(slug))) || null; },
    async getGift(slug) { return this.view(await this.raw(slug)); },
    async loadGift(slug) {
      const g = await this.raw(slug);
      if (!g) return null;
      return { gift: this.view(g), media: await this.listMedia(slug) };
    },
    async unlockGift(slug, password, remember) {
      const g = await this.raw(slug);
      if (!g) return { error: 'This gift link was not found.', status: 404 };
      if (g.passHash && (await demoHash(password, g.passSalt)).passHash !== g.passHash) return { error: 'wrong password', status: 401 };
      Keys.set(slug, 'demo', remember);
      return { gift: this.view(g), media: await this.listMedia(slug) };
    },
    async saveGiftConfig(slug, config) {
      const g = await this.raw(slug);
      if (!g) throw new Error('This gift link was not found.');
      g.config = config;
      await this.tx('gifts', 'readwrite', (s) => s.put(g));
      return true;
    },
    async setGiftPassword(slug, password) {
      const g = await this.raw(slug);
      if (!g) throw new Error('This gift link was not found.');
      if (password) Object.assign(g, await demoHash(password));
      else { delete g.passHash; delete g.passSalt; } // empty = remove the password
      await this.tx('gifts', 'readwrite', (s) => s.put(g));
      return this.view(g);
    },
    async uploadGiftAsset() { return null; }, // demo: the page keeps files in this browser itself
    async createOrder() { throw new Error('Payments need cloud mode (the Worker) — see RAZORPAY.md.'); },
    async verifyPayment() { throw new Error('Payments need cloud mode (the Worker) — see RAZORPAY.md.'); },
    // Demo mode has no server to receive a Stripe webhook, so paying just
    // flips this flag locally (honor system) — real cloud mode only ever
    // sets `paid` from a verified webhook, never from the browser.
    async markPaid(slug) {
      const gift = await this.getGift(slug);
      if (!gift) return null;
      gift.paid = true;
      await this.tx('gifts', 'readwrite', (s) => s.put(gift));
      return gift;
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
    // Demo mode has only one "user" (this browser), so this is just every
    // gift ever created here — good enough for trying the dashboard out.
    async listMyGifts() {
      const d = await this.open();
      return new Promise((resolve, reject) => {
        const out = [];
        const req = d.transaction('gifts', 'readonly').objectStore('gifts').openCursor();
        req.onsuccess = () => {
          const c = req.result;
          if (!c) return resolve(out.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
          out.push(this.view(c.value));
          c.continue();
        };
        req.onerror = () => reject(req.error);
      });
    },
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
  /* ----------------------------- Auth (Google) ---------------------------- */
  // The session token is opaque to the browser — it's issued by the Worker
  // after it verifies a real Google Sign-In ID token, and just gets sent
  // back as "Authorization: Bearer <token>" on requests that need to know
  // who's signed in (creating a gift, listing "my gifts").
  const SESSION_KEY = 'gift-session';
  const Auth = {
    getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } },
    isSignedIn() { return !!this.getSession(); },
    signOut() { localStorage.removeItem(SESSION_KEY); },
    // Called with the Google Identity Services `credential` (an ID token JWT)
    // from the Sign in with Google button's callback.
    async signInWithGoogle(credential) {
      if (!CLOUD_ON) throw new Error('Sign-in needs cloud mode (the Worker) to be set up first.');
      const res = await fetch(`${CFG.WORKER_URL}/auth/google`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ credential }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error((body && body.error) || 'Could not sign in with Google.');
      localStorage.setItem(SESSION_KEY, JSON.stringify(body));
      return body; // { session, email, name }
    },
    // Email + password (for people without Gmail). mode: 'signup' | 'login'.
    // Resolves { session, email, name } or throws a friendly message.
    async withEmail(mode, email, password, name) {
      if (!CLOUD_ON) throw new Error('Sign-in needs cloud mode (the Worker) to be set up first.');
      let res;
      try {
        res = await fetch(`${CFG.WORKER_URL}/auth/${mode === 'signup' ? 'signup' : 'login'}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, name: name || '' }),
        });
      } catch (e) { throw new Error('Could not reach the server — check your internet connection.'); }
      const body = await res.json().catch(() => null);
      if (res.status === 404) throw new Error('Email sign-in is not switched on yet — the server needs its update. Use Google for now.');
      if (!res.ok || !body || body.error || !body.session) {
        const msg = (body && body.error) || 'Could not sign in — please try again.';
        throw new Error(msg.charAt(0).toUpperCase() + msg.slice(1) + '.');
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify({ session: body.session, email: body.email, name: body.name || '', kind: 'password' }));
      return body;
    },
  };

  // options.giftKey → sent as X-Gift-Key (a gift's "unlocked with the password" key).
  // options.soft    → 401/403/429 come back as { status, error } instead of throwing.
  async function workerFetch(path, options = {}) {
    const session = Auth.getSession();
    const { giftKey, soft, ...init } = options;
    const headers = { ...(init.headers || {}) };
    if (session && session.session) headers.Authorization = `Bearer ${session.session}`;
    if (giftKey) headers['X-Gift-Key'] = giftKey;
    let res;
    try {
      res = await fetch(`${CFG.WORKER_URL}${path}`, { ...init, headers });
    } catch (e) {
      throw new Error('Could not reach the cloud (check your internet connection).');
    }
    if (res.status === 404) return { notFound: true, status: 404 };
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const error = (body && body.error) || `The cloud said no (${res.status}).`;
      if (soft && [401, 403, 429].includes(res.status)) return { status: res.status, error };
      throw new Error(error);
    }
    return { data: await res.json().catch(() => null), status: res.status };
  }
  // What the Worker can do. An older (v1) Worker has no /version → { v: 1 }, and the site
  // simply skips passwords/payments until the new Worker is deployed — no errors.
  let infoPromise = null;
  function workerInfo() {
    if (!CLOUD_ON) return Promise.resolve({ v: 0, payments: null });
    if (!infoPromise) {
      infoPromise = fetch(`${CFG.WORKER_URL}/version`)
        .then((r) => (r.ok ? r.json() : { v: 1 }))
        .then((d) => ({ v: Number(d && d.v) || 1, accounts: !!(d && d.accounts), payments: (d && d.payments) || null }))
        .catch(() => ({ v: 1, accounts: false, payments: null }));
    }
    return infoPromise;
  }
  // The key that "remembers" a gift was unlocked: this tab only, or this device ("Remember me").
  const KEY_PREFIX = 'gift-key:';
  const Keys = {
    get(slug) { try { return sessionStorage.getItem(KEY_PREFIX + slug) || localStorage.getItem(KEY_PREFIX + slug) || ''; } catch { return ''; } },
    set(slug, key, remember) {
      try { (remember ? localStorage : sessionStorage).setItem(KEY_PREFIX + slug, key); (remember ? sessionStorage : localStorage).removeItem(KEY_PREFIX + slug); } catch { /* private mode */ }
    },
    forget(slug) { try { sessionStorage.removeItem(KEY_PREFIX + slug); localStorage.removeItem(KEY_PREFIX + slug); } catch { /* ignore */ } },
  };
  // The database stores UTC times as 'YYYY-MM-DD HH:MM:SS' — Safari can't read that and Chrome reads it
  // as local time, so turn it into a proper UTC ISO time once, here.
  const isoTime = (s) => (typeof s === 'string' && /^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/.test(s) ? `${s.replace(' ', 'T')}Z` : s);
  const mapGift = (d) => d && ({
    slug: d.slug, name: d.name || '', message: d.message || '', createdAt: isoTime(d.created_at || d.createdAt), paid: !!d.paid,
    locked: !!d.locked, owner: !!d.owner, hasPassword: !!(d.has_password || d.hasPassword), config: d.config || null, paidAt: isoTime(d.paid_at || ''),
  });
  const mapMedia = (list) => (list || []).map((r) => ({ id: r.id, url: r.url, type: r.type, createdAt: r.created_at || r.createdAt }));
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
    async createGift({ name, message, password }) {
      const { data } = await workerFetch('/gifts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slugify(), name: name || '', message: message || '', password: password || '' }),
      });
      if (!data) throw new Error('Could not create the gift: no data came back.');
      return mapGift(data);
    },
    async getGift(slug) {
      const { notFound, data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}`);
      if (notFound || !data) return null;
      return mapGift(data);
    },
    // The whole page (gift + photos) — for the creator, or with a saved key.
    // → { gift, media } | { locked: true } | null (not found)
    async loadGift(slug) {
      const info = await workerInfo();
      if (info.v < 2) { // older Worker: no passwords yet
        const gift = await this.getGift(slug);
        return gift ? { gift, media: await this.listMedia(slug) } : null;
      }
      const r = await workerFetch(`/gifts/${encodeURIComponent(slug)}/full`, { giftKey: Keys.get(slug), soft: true });
      if (r.notFound) return null;
      if (r.error) throw new Error(r.error);
      if (r.data && r.data.locked) { Keys.forget(slug); return { locked: true }; }
      return { gift: mapGift(r.data.gift), media: mapMedia(r.data.media) };
    },
    // → { gift, media } on the right password; { error, status } otherwise (401 wrong, 429 too many tries).
    async unlockGift(slug, password, remember) {
      const r = await workerFetch(`/gifts/${encodeURIComponent(slug)}/unlock`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }), soft: true,
      });
      if (r.notFound) return { error: 'This gift link was not found.', status: 404 };
      if (r.error) return { error: r.error, status: r.status };
      if (r.data && r.data.code) return { error: r.data.error, status: r.data.code === 'wrong' ? 401 : 429 };
      Keys.set(slug, r.data.key, remember);
      return { gift: mapGift(r.data.gift), media: mapMedia(r.data.media) };
    },
    async saveGiftConfig(slug, config) {
      await workerFetch(`/gifts/${encodeURIComponent(slug)}/config`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ config }),
      });
      return true;
    },
    async setGiftPassword(slug, password) {
      const { data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/password`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
      });
      return mapGift(data);
    },
    // The creator's own photo / video / song for the page → { url }
    async uploadGiftAsset(slug, file) {
      const q = `filename=${encodeURIComponent(file.name || 'file')}`;
      const { data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/assets?${q}`, {
        method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file,
      });
      if (!data || !data.url) throw new Error('The upload did not finish — please try again.');
      return data;
    },
    async createOrder(slug) {
      const { data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/pay/order`, { method: 'POST' });
      return data;
    },
    async verifyPayment(slug, resp) {
      const { data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/pay/verify`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(resp),
      });
      return mapGift(data);
    },
    // Cloud mode never sets `paid` from the browser — only the Worker's
    // Stripe webhook does that. This just re-fetches so the UI can pick up
    // the webhook's result after the user comes back from checkout.
    async markPaid(slug) { return this.getGift(slug); },
    async addMedia(slug, file) {
      const q = `filename=${encodeURIComponent(file.name)}`;
      const { notFound, data } = await workerFetch(`/gifts/${encodeURIComponent(slug)}/media?${q}`, {
        method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file,
      });
      if (notFound) throw new Error('This gift link was not found — it may have expired.');
      if (!data) throw new Error('Could not save the upload: no data came back.');
      return { id: data.id, url: data.url, type: data.type };
    },
    // Locked gifts only list their photos for the creator or with the password's key —
    // friends on the upload page just see what they added themselves.
    async listMedia(slug) {
      const r = await workerFetch(`/gifts/${encodeURIComponent(slug)}/media`, { giftKey: Keys.get(slug), soft: true });
      if (r.notFound || r.error || !Array.isArray(r.data)) return []; // locked → friends see only their own uploads
      return mapMedia(r.data);
    },
    async removeMedia(slug, id) {
      await workerFetch(`/media/${encodeURIComponent(id)}`, { method: 'DELETE' });
    },
    // Every gift owned by the signed-in user — powers the "my gifts" dashboard.
    async listMyGifts() {
      const { data } = await workerFetch('/me/gifts');
      return (data || []).map(mapGift);
    },
  };

  const backend = CLOUD_ON ? cloud : demo;

  /* ------------------------- Razorpay checkout ------------------------- */
  function loadScript(src) {
    return new Promise((ok, no) => {
      if (global.Razorpay) return ok();
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => ok();
      s.onerror = () => { s.remove(); no(new Error('Could not load Razorpay — check your internet connection.')); };
      document.head.appendChild(s);
    });
  }
  // The order is made by the Worker (so the price can't be changed in the browser), then
  // Razorpay's own checkout window opens, then the Worker checks Razorpay's signature and
  // marks the gift paid.
  async function payWithRazorpay(gift, { onPaid, onError, onClose } = {}) {
    const fail = (e) => { if (onError) onError(e instanceof Error ? e : new Error(String(e))); };
    try {
      const info = await workerInfo();
      if (!info.payments || !info.payments.razorpay) throw new Error('Payments are not switched on yet — the site owner still needs to add the Razorpay keys (see RAZORPAY.md).');
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (typeof global.Razorpay !== 'function') throw new Error('Could not load Razorpay — check your internet connection.');
      const order = await backend.createOrder(gift.slug);
      const rzp = new global.Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, order_id: order.orderId,
        name: 'Premiere', description: `Birthday page${order.name ? ' for ' + order.name : ''} — keep it forever`,
        prefill: { email: order.email || '' }, notes: { slug: gift.slug }, theme: { color: '#e50914' },
        handler: async (resp) => { try { const g = await backend.verifyPayment(gift.slug, resp); if (onPaid) onPaid(g); } catch (e) { fail(e); } },
        modal: { ondismiss: () => { if (onClose) onClose(); } },
      });
      if (rzp.on) rzp.on('payment.failed', (r) => fail(new Error((r && r.error && r.error.description) || 'The payment did not go through — no money was taken.')));
      rzp.open();
    } catch (e) { fail(e); }
  }

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
      u.pathname = u.pathname.replace(/[^/]*$/, 'netflix.html');
      u.search = `?gift=${encodeURIComponent(slug)}`;
      return u.toString();
    },
    createGift: (...a) => backend.createGift(...a),
    getGift: (...a) => backend.getGift(...a),
    addMedia: (...a) => backend.addMedia(...a),
    listMedia: (...a) => backend.listMedia(...a),
    removeMedia: (...a) => backend.removeMedia(...a),
    markPaid: (...a) => backend.markPaid(...a),
    listMyGifts: (...a) => backend.listMyGifts(...a),
    loadGift: (...a) => backend.loadGift(...a),
    unlockGift: (...a) => backend.unlockGift(...a),
    saveGiftConfig: (...a) => backend.saveGiftConfig(...a),
    setGiftPassword: (...a) => backend.setGiftPassword(...a),
    uploadGiftAsset: (...a) => backend.uploadGiftAsset(...a),
    info: workerInfo,
    Keys,
    payWithRazorpay,
    // The message the creator sends (WhatsApp / copy). Links open without a password;
    // a password line is only added for an older gift that still has one.
    shareMessage(gift, password) {
      return `🎁 I made something special for you${gift.name ? ', ' + gift.name : ''} ❤️\n\nOpen it here: ${this.viewLinkFor(gift.slug)}${password ? `\nPassword: ${password}` : ''}\n\nTurn your sound on 🔊`;
    },
    // Draws a QR code for `text` into `box` (vendor/qrcode.min.js). Returns false if it couldn't.
    drawQR(box, text, size = 200) {
      box.innerHTML = '';
      try {
        if (typeof global.QRCode === 'undefined') throw new Error('no QR library');
        new global.QRCode(box, { text, width: size, height: size, colorDark: '#000000', colorLight: '#ffffff', correctLevel: global.QRCode.CorrectLevel.M });
        return true;
      } catch (e) {
        box.innerHTML = '<p style="color:#c00;font-size:12px;max-width:200px;margin:0 auto">Could not draw the QR code — the link still works, share that instead.</p>';
        return false;
      }
    },
    // The QR code as a PNG data URL (for "Download QR"), or '' if there isn't one.
    qrImage(box) {
      const c = box.querySelector('canvas'), img = box.querySelector('img');
      try { if (c) return c.toDataURL('image/png'); } catch (e) { /* ignore */ }
      return img && img.src && img.src.startsWith('data:') ? img.src : '';
    },
    Auth,
    // Usable even when CLOUD_ON is false — it just resolves to null so the caller
    // (the main site's own uploads) knows to fall back to local browser storage.
    cloudUploadMedia,
  };
})(window);
