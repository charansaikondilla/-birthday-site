/* =====================================================================
   EDIT EVERYTHING PERSONAL HERE  ⟵ this is the only part you need to touch
   ===================================================================== */
const config = {
  name: 'Nuel',                       // typed after the title, used in the finale too
  title: 'Happy Birthday',            // typed letter by letter on the home screen
  playerTitle: 'Happy Birthday Nuel', // shown at the top of the player

  facts: { match: '99% Match', year: '2007', age: '18+', seasons: '18 Season', quality: 'HD+' },

  description:
    'Wishing you a day filled with happiness, love, and unforgettable moments. You deserve all ' +
    'the good things in life! May this year bring you new opportunities, success, and endless joy. ' +
    'Thank you for being such a fun and amazing person — our days wouldn\'t be the same without you. ' +
    'Enjoy your special day and don\'t forget to smile, celebrate, and eat lots of cake!',

  // "Who's watching?" — the first one is what the auto-play cursor picks
  profiles: [
    { label: '1', image: 'assets/netflix/profile-1.jpg' },
    { label: '2', image: 'assets/netflix/profile-2.jpg' },
    { label: '3', image: 'assets/netflix/profile-3.jpg' },
    { label: '4', image: 'assets/netflix/profile-4.jpg' },
  ],

  // Big background pictures behind the title (they cross-fade)
  hero: {
    // Each one can be a plain path (no name shown) or { image, title } — the title
    // fades in with it, like Netflix naming whatever it's currently featuring.
    images: [
      { image: 'assets/netflix/hero-1.jpg', title: 'Golden Hour' },
      { image: 'assets/netflix/hero-2.jpg', title: 'Girls Night Out' },
      { image: 'assets/netflix/hero-3.jpg', title: 'Dance Floor' },
    ],
    interval: 4500,
  },

  // The rows under the title. Scroll down to see them all.
  //   type: 'portrait' (tall posters) | 'landscape' (wide tiles) | 'top10' (big numbers)
  //   each item: image (the tile), title, text (shown in More Info), optional:
  //   preview (wide picture for the hover preview), tags [..], match, progress (0-100, landscape only)
  rows: [
    {
      title: 'Special Moments', type: 'portrait',
      items: [
        { image: 'assets/netflix/moment-1.jpg', preview: 'assets/netflix/slide-1.jpg', title: 'Girls Night Out',  text: 'The nights we never wanted to end.',        tags: ['Friends', 'Party', 'Feel-good'] },
        { image: 'assets/netflix/moment-2.jpg', preview: 'assets/netflix/slide-2.jpg', title: 'Ice Cream Days',   text: 'Sweet moments, sweeter company.',           tags: ['Summer', 'Sweet', 'City'] },
        { image: 'assets/netflix/moment-3.jpg', preview: 'assets/netflix/slide-3.jpg', title: 'Face Mask Friday', text: 'Glow-up season with the best crew.',        tags: ['Cosy', 'Girls', 'Laughs'] },
        { image: 'assets/netflix/moment-4.jpg', preview: 'assets/netflix/slide-4.jpg', title: 'Sleepover Squad',  text: 'Pyjamas, pillows and zero sleep.',          tags: ['Night', 'Chaos', 'Love'] },
        { image: 'assets/netflix/moment-5.jpg', preview: 'assets/netflix/slide-5.jpg', title: 'Dance Floor',      text: 'Where every song was our song.',            tags: ['Music', 'Dance', 'Wild'] },
        { image: 'assets/netflix/moment-6.jpg', preview: 'assets/netflix/slide-6.jpg', title: 'Golden Hour',      text: 'Sunset, smiles and forever friends.',       tags: ['Warm', 'Glow', 'Forever'] },
      ],
    },
    {
      title: 'Continue Watching', type: 'landscape',
      items: [
        { image: 'assets/netflix/slide-1.jpg', title: 'The Birthday Party',  text: 'The main event. Confetti, cake and all of us.',     tags: ['Party', 'Pink', 'Joy'],      progress: 72 },
        { image: 'assets/netflix/slide-2.jpg', title: 'Roses for You',       text: 'Because you deserve the whole garden.',            tags: ['Romantic', 'Soft', 'Bloom'],  progress: 40 },
        { image: 'assets/netflix/slide-7.jpg', title: 'Balloons & Wishes',   text: 'Make a wish. We already know it will come true.',  tags: ['Wishes', 'Silver', 'Shine'],  progress: 55 },
        { image: 'assets/netflix/slide-9.jpg', title: 'Cheers to You',       text: 'Raise a glass to the best person we know.',        tags: ['Toast', 'Bubbles', 'Cheers'], progress: 20 },
        { image: 'assets/netflix/slide-5.jpg', title: 'Dressed to Sparkle',  text: 'Every detail, perfectly you.',                     tags: ['Style', 'Glam', 'Sparkle'],   progress: 88 },
      ],
    },
    {
      title: 'Top 10 Memories', type: 'top10',
      items: [
        { image: 'assets/netflix/moment-6.jpg', preview: 'assets/netflix/slide-6.jpg', title: 'Golden Hour',      text: 'Number one. Always.',                          tags: ['Iconic', 'Warm'] },
        { image: 'assets/netflix/moment-1.jpg', preview: 'assets/netflix/slide-1.jpg', title: 'Girls Night Out',  text: 'The night that had everything.',               tags: ['Party', 'Laughs'] },
        { image: 'assets/netflix/moment-2.jpg', preview: 'assets/netflix/slide-2.jpg', title: 'Ice Cream Days',   text: 'Two scoops of happiness.',                     tags: ['Summer', 'Sweet'] },
        { image: 'assets/netflix/moment-3.jpg', preview: 'assets/netflix/slide-3.jpg', title: 'Face Mask Friday', text: 'Self-care with the best company.',             tags: ['Cosy', 'Girls'] },
        { image: 'assets/netflix/moment-4.jpg', preview: 'assets/netflix/slide-4.jpg', title: 'Sleepover Squad',  text: 'Nobody slept. No regrets.',                    tags: ['Night', 'Chaos'] },
        { image: 'assets/netflix/moment-5.jpg', preview: 'assets/netflix/slide-5.jpg', title: 'Dance Floor',      text: 'The playlist is still on repeat.',             tags: ['Music', 'Dance'] },
      ],
    },
    {
      title: 'Trending Now', type: 'landscape',
      items: [
        { image: 'assets/netflix/slide-3.jpg', title: 'Cake O\'Clock',       text: 'The sweetest part of the day.',                    tags: ['Cake', 'Sweet', 'Candles'] },
        { image: 'assets/netflix/slide-4.jpg', title: 'Petals & Plates',     text: 'A table set with love.',                           tags: ['Dinner', 'Flowers', 'Warm'] },
        { image: 'assets/netflix/slide-6.jpg', title: 'Glass Half Full',     text: 'Here\'s to the year ahead.',                       tags: ['Toast', 'Night', 'Sparkle'] },
        { image: 'assets/netflix/hero-2.jpg',  title: 'Frozen Blooms',       text: 'Pretty things for a pretty person.',               tags: ['Ice', 'Flowers', 'Detail'] },
        { image: 'assets/netflix/slide-8.jpg', title: 'Behind the Scenes',   text: 'The little moments in between.',                   tags: ['Candid', 'Real', 'Us'] },
        { image: 'assets/netflix/hero-3.jpg',  title: 'Rose Season',         text: 'Blooming, just like you.',                         tags: ['Roses', 'Pink', 'Soft'] },
      ],
    },
    {
      title: 'My List', type: 'landscape',
      items: [
        { image: 'assets/netflix/slide-7.jpg', title: 'Balloons & Wishes',   text: 'Saved forever.',                                   tags: ['Wishes', 'Silver'] },
        { image: 'assets/netflix/slide-1.jpg', title: 'The Birthday Party',  text: 'Saved forever.',                                   tags: ['Party', 'Pink'] },
        { image: 'assets/netflix/slide-2.jpg', title: 'Roses for You',       text: 'Saved forever.',                                   tags: ['Romantic', 'Bloom'] },
        { image: 'assets/netflix/slide-9.jpg', title: 'Cheers to You',       text: 'Saved forever.',                                   tags: ['Toast', 'Cheers'] },
      ],
    },
  ],

  footer: {
    links: ['Audio Description', 'Help Centre', 'Gift Cards', 'Media Centre', 'Terms of Love', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us', 'Speed Test', 'Legal Notices', 'Only on Birthdays'],
    note: 'Made with all my love • A Birthday Original • 2026',
  },

  // What plays after "Play" — pictures instead of video clips
  slides: {
    images: [
      'assets/netflix/slide-1.jpg', 'assets/netflix/slide-2.jpg', 'assets/netflix/slide-3.jpg',
      'assets/netflix/slide-4.jpg', 'assets/netflix/slide-5.jpg', 'assets/netflix/slide-6.jpg',
      'assets/netflix/slide-7.jpg', 'assets/netflix/slide-8.jpg', 'assets/netflix/slide-9.jpg',
    ],
    duration: 3800,          // ms each picture stays on screen
    time: '50:50',           // the time label in the player
    hideControlsAfter: 3200, // ms before the player controls fade away
  },

  finale: {
    title: 'Happy Birthday, {name}',
    lines: ['Thank you for every single moment.', 'Here\'s to another year of memories together.'],
  },

  previewInterval: 1800, // ms between picture changes inside a hover preview
  autoplay: false,  // off = fully manual, every step (profile, Play…) needs a real tap/click.
                     // true = a demo cursor walks through the site by itself, like the reference video.
  introSound: '',   // optional, e.g. 'assets/audio/tudum.mp3' (browsers may block sound before a tap)
};
/* ===================================================================== */
/* Everything below is the logic. `config` above is the default; `cfg` is
   what the site actually shows (the default + whatever was customised
   with the ✎ Customize button, kept in this browser's IndexedDB).        */

const $ = (s) => document.querySelector(s);
const intro = $('#intro'), profiles = $('#profiles'), home = $('#home'), player = $('#player');
const modal = $('#modal'), cursor = $('#cursor'), playerUI = $('#player-ui'), finale = $('#finale');
const clone = (o) => JSON.parse(JSON.stringify(o));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let cfg = clone(config);
const fullTitle = () => `${cfg.title} ${cfg.name}`.trim();

/* ---------- Media (pictures OR videos, from assets/ or uploaded) ---------- */
// Uploaded files are referenced as "idb:<id>" and live in IndexedDB; `media` maps them to object URLs.
const media = new Map();
const VIDEO_EXT = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?|#|$)/i;
const isUpload = (ref) => typeof ref === 'string' && ref.startsWith('idb:');
function isVideo(ref) {
  if (!ref) return false;
  if (isUpload(ref)) return (media.get(ref)?.type || '').startsWith('video/');
  return VIDEO_EXT.test(ref);
}
function srcOf(ref) {
  if (!ref) return '';
  if (isUpload(ref)) return media.get(ref)?.url || '';
  return ref;
}
// Returns <img>, <video> or a placeholder <div> for an empty slot.
// opts.player = a video that plays once with sound (the slideshow); otherwise it is a silent looping tile.
function mediaEl(ref, opts = {}) {
  const src = srcOf(ref);
  if (!src) { const d = document.createElement('div'); d.className = 'ph'; return d; }
  if (isVideo(ref)) {
    const v = document.createElement('video');
    v.src = src;
    v.playsInline = true; v.setAttribute('playsinline', '');
    v.preload = opts.player ? 'auto' : 'metadata';
    v.disablePictureInPicture = true;
    if (!opts.player) { v.muted = true; v.loop = true; v.autoplay = true; v.play().catch(() => {}); }
    return v;
  }
  const img = document.createElement('img');
  img.src = src; img.alt = '';
  if (opts.lazy) img.loading = 'lazy';
  return img;
}
// Plays a video with sound; falls back to muted if the browser blocks sound before a tap.
function playVideo(v) {
  v.muted = false;
  const p = v.play();
  if (p && p.catch) p.catch(() => { v.muted = true; v.play().catch(() => {}); });
}

/* ---------- Storage (IndexedDB: uploaded files + the customised config) ---------- */
const store = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('no IndexedDB'));
      const req = indexedDB.open('birthday-customize', 1);
      req.onupgradeneeded = () => { const d = req.result; d.createObjectStore('media'); d.createObjectStore('config'); };
      req.onsuccess = () => { this.db = req.result; resolve(this.db); };
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('blocked'));
    });
  },
  async tx(name, mode, fn) {
    const d = await this.open();
    return new Promise((resolve, reject) => {
      const t = d.transaction(name, mode);
      const req = fn(t.objectStore(name));
      t.oncomplete = () => resolve(req && req.result);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  },
  getConfig() { return this.tx('config', 'readonly', (s) => s.get('current')); },
  putConfig(c) { return this.tx('config', 'readwrite', (s) => s.put(c, 'current')); },
  clearConfig() { return this.tx('config', 'readwrite', (s) => s.delete('current')); },
  putMedia(id, blob) { return this.tx('media', 'readwrite', (s) => s.put(blob, id)); },
  delMedia(id) { return this.tx('media', 'readwrite', (s) => s.delete(id)); },
  clearMedia() { return this.tx('media', 'readwrite', (s) => s.clear()); },
  async allMedia() {
    const d = await this.open();
    return new Promise((resolve, reject) => {
      const out = [];
      const req = d.transaction('media', 'readonly').objectStore('media').openCursor();
      req.onsuccess = () => { const c = req.result; if (!c) return resolve(out); out.push({ id: c.key, blob: c.value }); c.continue(); };
      req.onerror = () => reject(req.error);
    });
  },
};
let storageOK = true;
function registerBlob(id, blob) {
  const old = media.get(id);
  if (old) URL.revokeObjectURL(old.url);
  media.set(id, { url: URL.createObjectURL(blob), type: blob.type || '' });
}
async function loadSaved() {
  try {
    const [saved, files] = await Promise.all([store.getConfig(), store.allMedia()]);
    files.forEach((f) => registerBlob(f.id, f.blob));
    if (saved && typeof saved === 'object') cfg = normalise(saved);
  } catch (e) {
    storageOK = false;
    console.warn('Customisation storage unavailable — changes will only last for this visit.', e);
  }
}
// Makes sure a saved / imported config has every field the site needs.
function normalise(c) {
  const base = clone(config);
  const out = { ...base, ...c };
  out.facts = { ...base.facts, ...(c.facts || {}) };
  out.hero = { ...base.hero, ...(c.hero || {}) };
  out.hero.images = (Array.isArray(out.hero.images) ? out.hero.images : [])
    .map((it) => (typeof it === 'string' ? { image: it, title: '' } : { image: it?.image || '', title: it?.title || '' }))
    .filter((it) => it.image);
  out.slides = { ...base.slides, ...(c.slides || {}) };
  out.slides.images = Array.isArray(out.slides.images) ? out.slides.images.filter(Boolean) : [];
  out.slides.duration = Math.max(800, Number(out.slides.duration) || base.slides.duration);
  out.hero.interval = Math.max(1000, Number(out.hero.interval) || base.hero.interval);
  out.finale = { ...base.finale, ...(c.finale || {}) };
  out.finale.lines = Array.isArray(out.finale.lines) ? out.finale.lines : [];
  out.footer = { ...base.footer, ...(c.footer || {}) };
  out.footer.links = Array.isArray(out.footer.links) ? out.footer.links : [];
  out.profiles = (Array.isArray(c.profiles) ? c.profiles : base.profiles).map((p) => ({ label: p?.label ?? '', image: p?.image || '' }));
  out.rows = (Array.isArray(c.rows) ? c.rows : base.rows).map((r) => ({
    title: r?.title ?? '',
    type: ['portrait', 'landscape', 'top10'].includes(r?.type) ? r.type : 'portrait',
    items: (Array.isArray(r?.items) ? r.items : []).map((it) => ({
      ...it, image: it?.image || '', title: it?.title ?? '', text: it?.text ?? '', tags: Array.isArray(it?.tags) ? it.tags : [],
    })),
  }));
  out.previewInterval = Math.max(300, Number(out.previewInterval) || base.previewInterval);
  out.autoplay = !!out.autoplay;
  return out;
}

/* ---------- Auto-play (the fake cursor) ---------- */
let autoOn = true;
const autoTimers = [];
const auto = (ms, fn) => { if (autoOn) autoTimers.push(setTimeout(() => autoOn && fn(), ms)); };
function cursorHide() {
  cursor.classList.remove('is-on');
  setTimeout(() => { if (!cursor.classList.contains('is-on')) cursor.hidden = true; }, 400);
}
function stopAuto() {
  if (!autoOn) return;
  autoOn = false;
  autoTimers.forEach(clearTimeout);
  cursorHide();
}
document.addEventListener('pointerdown', stopAuto, true);
document.addEventListener('keydown', stopAuto, true);

function cursorAt(x, y) { cursor.style.transform = `translate(${x}px, ${y}px)`; }
function cursorShow(x, y) {
  cursor.hidden = false;
  cursor.style.transition = 'none';
  cursorAt(x, y);
  requestAnimationFrame(() => { cursor.style.transition = ''; cursor.classList.add('is-on'); });
}
function cursorTo(el) {
  const r = el.getBoundingClientRect();
  cursorAt(r.left + r.width * 0.5, r.top + r.height * 0.55);
}
function cursorClick(el) {
  cursor.classList.remove('is-click'); void cursor.offsetWidth; cursor.classList.add('is-click');
  el.classList.add('is-pressed');
  setTimeout(() => el.classList.remove('is-pressed'), 300);
}

/* ---------- 1. Intro ---------- */
function buildRibbons() {
  const colors = ['#ff2a2a', '#e50914', '#ff7a1a', '#ffd23f', '#fff1c2', '#ff4fa3', '#c81cff', '#2f6bff', '#00c2ff', '#7fffd4', '#ffffff', '#ff0055'];
  const box = $('.ribbons');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 190; i++) {
    const bar = document.createElement('i');
    bar.style.setProperty('--c', colors[Math.floor(Math.random() * colors.length)]);
    bar.style.width = `${0.08 + Math.random() * 0.7}vw`;
    bar.style.opacity = (0.55 + Math.random() * 0.45).toFixed(2);
    frag.appendChild(bar);
  }
  box.appendChild(frag);
}
function startIntro() {
  buildRibbons();
  if (cfg.introSound) new Audio(cfg.introSound).play().catch(() => {});
  requestAnimationFrame(() => intro.classList.add('build'));
  setTimeout(() => intro.classList.add('burst'), 2100);
  setTimeout(showProfiles, 3950);
}

/* ---------- 2. Profiles ---------- */
function renderProfiles() {
  const grid = $('#profiles-grid');
  grid.innerHTML = '';
  cfg.profiles.forEach((p) => {
    const b = document.createElement('button');
    b.className = 'profile';
    b.appendChild(mediaEl(p.image));
    const s = document.createElement('span'); s.textContent = p.label;
    s.addEventListener('click', (e) => {
      if (!isEditing()) return;
      e.stopPropagation(); e.preventDefault();
      startTextEdit(s, (text) => { p.label = text; });
    });
    b.appendChild(s);
    b.addEventListener('click', (e) => {
      if (isEditing()) { e.preventDefault(); openInlineFilePicker(p, 'image'); return; }
      openHome(true);
    });
    grid.appendChild(b);
  });
}
function showProfiles() {
  intro.hidden = true;
  profiles.hidden = false;
  document.body.classList.add('is-ready');
  const first = $('.profile');
  if (!first) return;
  auto(400, () => cursorShow(innerWidth * 0.78, innerHeight * 0.86));
  auto(1000, () => cursorTo(first));
  auto(2150, () => cursorClick(first));
  auto(2500, () => { cursorHide(); openHome(true); });
}

/* ---------- 3. Home ---------- */
let heroTimer = null, titleTyped = false, typeGen = 0;
const sliderPainters = new Set();
function bindHome() {
  const hero = $('#hero');
  home.addEventListener('scroll', () => {
    const y = home.scrollTop;
    hero.style.transform = `translateY(${y * 0.35}px)`;
    hero.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.9));
  }, { passive: true });
  addEventListener('resize', () => sliderPainters.forEach((p) => p()));
  // Editing text/media doesn't block normal navigation — Play and More Info still work
  // while ✎ editing is on (editing the player's own slides needs to reach it, after all).
  $('#play').addEventListener('click', () => openPlayer(0));
  $('#more').addEventListener('click', () => openModal(fullTitle(), cfg.description, cfg.hero.images[0]?.image || cfg.slides.images[0], 0));

  // ---- Click-to-edit: title, description, footer note, hero (bound once — these
  // elements persist across re-renders, only their text/children change) ----
  $('#title-text').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    typeGen++; // stop the typewriter animation if it's still mid-type, so it can't fight the edit
    $('#title').classList.add('done'); // hide the blinking caret while editing
    startTextEdit($('#title-text'), (text) => { cfg.title = ''; cfg.name = text; });
  });
  $('#description').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    startTextEdit($('#description'), (text) => { cfg.description = text; }, { multiline: true });
  });
  $('#footer-note').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    startTextEdit($('#footer-note'), (text) => { cfg.footer.note = text; });
  });
  $('#hero-feature-name').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.stopPropagation(); e.preventDefault();
    startTextEdit($('#hero-feature-name'), (text) => {
      const item = cfg.hero.images[currentHeroIndex()];
      if (item) item.title = text;
    });
  });
  $('#hero-feature').addEventListener('click', (e) => {
    if (!isEditing() || e.target.id === 'hero-feature-name') return;
    const item = cfg.hero.images[currentHeroIndex()];
    if (item) openInlineFilePicker(item, 'image');
  });
}
function renderHome() {
  const hero = $('#hero');
  hero.innerHTML = '';
  cfg.hero.images.forEach((item, i) => {
    const el = mediaEl(item.image);
    el.style.setProperty('--dur', `${cfg.hero.interval + 900}ms`);
    if (i === 0) el.classList.add('is-on');
    hero.appendChild(el);
  });
  const f = cfg.facts;
  $('#facts').innerHTML =
    `<span class="match">${esc(f.match)}</span><span>${esc(f.year)}</span><span class="badge">${esc(f.age)}</span><span>${esc(f.seasons)}</span><span>${esc(f.quality)}</span>`;
  $('#description').textContent = cfg.description;
  $('#rows').innerHTML = '';
  sliderPainters.clear();
  cfg.rows.forEach(buildRow);
  $('#footer-links').innerHTML = cfg.footer.links.map((l) => `<span>${esc(l)}</span>`).join('');
  $('#footer-note').textContent = cfg.footer.note;
  observeRows();
}

const isTouch = matchMedia('(hover: none)').matches;
if (isTouch) document.body.classList.add('is-touch');
const slideIndexOf = (src) => Math.max(0, cfg.slides.images.indexOf(src));

const ICON = {
  play: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',
  plus: '<svg class="ic-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><svg class="ic-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg>',
  like: '<svg viewBox="0 0 24 24"><path d="M7 11v9H4v-9zM7 11l4-7c1.5 0 2.5 1 2.5 2.5V10H19a2 2 0 0 1 2 2.3l-1 6.4A2 2 0 0 1 18 20H7"/></svg>',
  more: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  chevL: '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
  chevR: '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
};

function buildRow(row) {
  if (!row.items.length) return;
  const block = document.createElement('section');
  block.className = 'row-block';
  block.innerHTML =
    `<div class="row-head"><h2>${esc(row.title)}</h2><span class="explore">Explore all ›</span></div>
     <div class="slider"><button class="arrow left" aria-label="Scroll left">${ICON.chevL}</button>
     <div class="track"></div><button class="arrow right" aria-label="Scroll right">${ICON.chevR}</button></div>`;
  const track = block.querySelector('.track');
  row.items.forEach((item, i) => track.appendChild(buildCard(item, row.type, i)));
  $('#rows').appendChild(block);
  setupSlider(block);
  const h2 = block.querySelector('.row-head h2');
  h2.addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    startTextEdit(h2, (text) => { row.title = text; });
  });
}

function buildCard(item, type, i) {
  const card = document.createElement('div');
  card.className = `card ${type === 'top10' ? 'top10' : type}`;
  const f = cfg.facts;
  const num = type === 'top10'
    ? `<div class="num" aria-hidden="true"><svg viewBox="0 0 100 150"><text x="${i + 1 >= 10 ? 50 : 56}" y="146" text-anchor="middle" font-size="${i + 1 >= 10 ? 150 : 200}">${i + 1}</text></svg></div>`
    : '';
  const progress = item.progress != null && item.progress !== '' ? `<span class="mini-progress"><i style="width:${Math.max(0, Math.min(100, Number(item.progress) || 0))}%"></i></span>` : '';
  card.innerHTML = `${num}
    <button class="poster" aria-label="${esc(item.title)}">
      <span class="n-mini"><i></i><i></i><i></i></span>${progress}
      <span class="poster-title">${esc(item.title)}</span>
    </button>
    <div class="preview">
      <div class="pv-img"><span class="pv-layer is-on"></span><span class="pv-layer"></span><span class="pv-title">${esc(item.title)}</span></div>
      <div class="pv-body">
        <div class="pv-actions">
          <button class="pv-play" aria-label="Play">${ICON.play}</button>
          <button class="pv-add" aria-label="Add to My List">${ICON.plus}</button>
          <button class="pv-like" aria-label="I like this">${ICON.like}</button>
          <button class="pv-more" aria-label="More info">${ICON.more}</button>
        </div>
        <div class="pv-meta"><span class="match">${esc(item.match || f.match)}</span><span class="badge">${esc(f.age)}</span><span>${esc(f.seasons)}</span><span class="hd">HD</span></div>
        <div class="pv-tags">${(item.tags || []).map(esc).join('<i>•</i>')}</div>
      </div>
    </div>`;
  const poster = card.querySelector('.poster');
  poster.insertBefore(mediaEl(item.image, { lazy: true }), poster.firstChild);
  const first = item.preview || item.image;
  const layers = card.querySelectorAll('.pv-layer');
  const setLayer = (n, ref) => { layers[n].innerHTML = ''; layers[n].appendChild(mediaEl(ref)); };
  setLayer(0, first);
  const start = slideIndexOf(item.preview && cfg.slides.images.includes(item.preview) ? item.preview : item.image);
  const details = () => openModal(item.title, item.text, first, start);
  poster.addEventListener('click', (e) => {
    if (isEditing()) { e.preventDefault(); openInlineFilePicker(item, 'image'); return; }
    details();
  });
  const titleSpan = card.querySelector('.poster-title');
  titleSpan.addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.stopPropagation(); e.preventDefault();
    startTextEdit(titleSpan, (text) => { item.title = text; });
  });
  card.querySelector('.pv-more').addEventListener('click', details);
  card.querySelector('.pv-play').addEventListener('click', () => openPlayer(start));
  card.querySelector('.pv-add').addEventListener('click', (e) => e.currentTarget.classList.toggle('is-added'));
  card.querySelector('.pv-like').addEventListener('click', (e) => e.currentTarget.classList.toggle('is-liked'));
  // Hover: place the preview so it never grows off-screen, and cycle through changing pictures
  const pics = (item.previews && item.previews.length ? item.previews : [first, ...cfg.slides.images.filter((s) => s !== first).slice(start, start + 3)]).filter(Boolean);
  let cycle = 0, pic = 0, layer = 0;
  card.addEventListener('mouseenter', () => {
    const r = card.getBoundingClientRect(), pv = card.querySelector('.preview');
    pv.style.transformOrigin = r.left < 120 ? 'left center' : r.right > innerWidth - 120 ? 'right center' : 'center center';
    clearInterval(cycle);
    if (pics.length < 2) return;
    cycle = setInterval(() => {
      pic = (pic + 1) % pics.length;
      layer = 1 - layer;
      setLayer(layer, pics[pic]);
      layers[layer].classList.add('is-on');
      layers[1 - layer].classList.remove('is-on');
    }, cfg.previewInterval);
  });
  card.addEventListener('mouseleave', () => {
    clearInterval(cycle);
    pic = 0; layer = 0;
    setLayer(0, first); layers[0].classList.add('is-on'); layers[1].classList.remove('is-on'); layers[1].innerHTML = '';
  });
  return card;
}

function setupSlider(block) {
  const slider = block.querySelector('.slider'), track = block.querySelector('.track');
  const left = block.querySelector('.arrow.left'), right = block.querySelector('.arrow.right');
  let offset = 0;
  const maxOffset = () => Math.max(0, track.scrollWidth - slider.clientWidth);
  const paint = () => {
    offset = Math.min(offset, maxOffset());
    track.style.transform = `translateX(${-offset}px)`;
    left.disabled = offset <= 0;
    right.disabled = offset >= maxOffset() - 1;
  };
  left.addEventListener('click', () => { offset = Math.max(0, offset - slider.clientWidth * 0.9); paint(); });
  right.addEventListener('click', () => { offset = Math.min(maxOffset(), offset + slider.clientWidth * 0.9); paint(); });
  sliderPainters.add(paint);
  requestAnimationFrame(paint);
  track.querySelectorAll('img').forEach((img) => img.addEventListener('load', paint, { once: true }));
  track.querySelectorAll('video').forEach((v) => v.addEventListener('loadedmetadata', paint, { once: true }));
}

function observeRows() {
  const blocks = document.querySelectorAll('.row-block');
  if (!('IntersectionObserver' in window)) return blocks.forEach((b) => b.classList.add('is-visible'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { root: home, rootMargin: '0px 0px -8% 0px' });
  blocks.forEach((b) => io.observe(b));
}
function currentHeroIndex() {
  return [...$('#hero').children].findIndex((el) => el.classList.contains('is-on'));
}
function paintHeroFeature(i) {
  const tag = $('#hero-feature'), nameEl = $('#hero-feature-name');
  if (!tag || !nameEl) return;
  const title = cfg.hero.images[i]?.title;
  if (!title) {
    if (isEditing() && cfg.hero.images[i]) {
      nameEl.textContent = '+ Add a name'; nameEl.classList.add('is-placeholder'); tag.classList.add('is-on');
    } else { tag.classList.remove('is-on'); nameEl.classList.remove('is-placeholder'); }
    return;
  }
  nameEl.textContent = title;
  nameEl.classList.remove('is-placeholder');
  tag.classList.add('is-on');
}
function cycleHero() {
  clearInterval(heroTimer);
  const imgs = [...$('#hero').children];
  paintHeroFeature(0);
  if (imgs.length < 2) return;
  let i = 0;
  heroTimer = setInterval(() => {
    imgs[i].classList.remove('is-on');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('is-on');
    paintHeroFeature(i);
  }, cfg.hero.interval);
}
function typeTitle(done) {
  const title = $('#title'), out = $('#title-text'), text = fullTitle();
  const gen = ++typeGen; // lets an inline edit (or anything else) cancel this run mid-type
  title.classList.remove('done');
  out.textContent = '';
  let i = 0;
  (function tick() {
    if (gen !== typeGen) return; // superseded — stop appending to whatever's there now
    if (i < text.length) {
      out.textContent += text[i++];
      setTimeout(tick, text[i - 1] === ' ' ? 160 : 85);
    } else {
      title.classList.add('done');
      done && done();
    }
  })();
}
function openHome(fromProfiles) {
  profiles.hidden = true;
  stopSlides();
  player.hidden = true;
  document.body.classList.remove('in-player');
  home.hidden = false;
  home.scrollTop = 0;
  cycleHero();
  if (titleTyped || !fromProfiles) {
    $('#title-text').textContent = fullTitle();
    $('#title').classList.add('done');
    return;
  }
  titleTyped = true;
  setTimeout(() => typeTitle(() => {
    const play = $('#play');
    auto(1300, () => cursorShow(innerWidth * 0.62, innerHeight * 0.9));
    auto(1900, () => cursorTo(play));
    auto(3000, () => cursorClick(play));
    auto(3350, () => { cursorHide(); openPlayer(0); });
  }), 500);
}

/* ---------- 4. Player (pictures and videos, one after the other) ---------- */
const slides = { imgs: [], index: 0, elapsed: 0, start: 0, raf: 0, running: false, hideTimer: 0 };
function bindPlayer() {
  $('#back').addEventListener('click', () => openHome(false));
  $('#pause').addEventListener('click', togglePause);
  $('#prev').addEventListener('click', () => goTo(slides.index - 1));
  $('#next').addEventListener('click', () => goTo(slides.index + 1));
  $('#slides').addEventListener('click', () => {
    // In edit mode a tap on the picture/video swaps it out; otherwise it toggles the controls.
    if (isEditing()) { openPlayerFilePicker(slides.index); return; }
    playerUI.classList.contains('is-hidden') ? showUI() : hideUI();
  });
  playerUI.addEventListener('pointermove', showUI);
  $('#replay').addEventListener('click', () => location.reload());
  $('#finale-home').addEventListener('click', () => openHome(false));
  $('#player-edit-chip').addEventListener('click', () => setEditMode(false));
}
function renderPlayer() {
  const box = $('#slides');
  box.innerHTML = '';
  slides.imgs = [];
  cfg.slides.images.forEach((src) => {
    const el = mediaEl(src, { player: true });
    el.style.setProperty('--dur', `${cfg.slides.duration + 900}ms`);
    if (el.tagName === 'VIDEO') el.addEventListener('ended', () => { if (slides.running && slides.imgs[slides.index] === el) advance(); });
    box.appendChild(el);
    slides.imgs.push(el);
  });
  renderPlayerText();
}
function slideDur(i) {
  const el = slides.imgs[i];
  if (el && el.tagName === 'VIDEO' && isFinite(el.duration) && el.duration > 0) return el.duration * 1000;
  return cfg.slides.duration;
}
function showUI() {
  playerUI.classList.remove('is-hidden');
  clearTimeout(slides.hideTimer);
  // While editing the controls stay put — you need ‹ › to move between slides.
  if (slides.running && !isEditing()) slides.hideTimer = setTimeout(hideUI, cfg.slides.hideControlsAfter);
}
function hideUI() { playerUI.classList.add('is-hidden'); }
function openPlayer(start = 0) {
  closeModal();
  if (!slides.imgs.length) return;
  home.hidden = true;
  clearInterval(heroTimer);
  finale.hidden = true;
  player.hidden = false;
  document.body.classList.add('in-player');
  player.classList.remove('is-paused');
  slides.imgs.forEach((el) => { el.classList.remove('is-on', 'is-paused'); if (el.tagName === 'VIDEO') el.pause(); });
  slides.index = -1;
  goTo(start);
  showUI();
  if (isEditing()) showEditHint('Tap the photo or video to change it. Use ‹ › to move between them.');
}
function goTo(i) {
  const n = slides.imgs.length;
  if (!n) return;
  if (slides.index >= 0) {
    const prev = slides.imgs[slides.index];
    prev.classList.remove('is-on', 'is-paused');
    if (prev.tagName === 'VIDEO') prev.pause();
  }
  slides.index = (i + n) % n;
  const el = slides.imgs[slides.index];
  el.classList.add('is-on');
  slides.elapsed = 0;
  slides.start = performance.now();
  if (!slides.running) { slides.running = true; slides.raf = requestAnimationFrame(frame); }
  const paused = player.classList.contains('is-paused');
  if (paused) el.classList.add('is-paused');
  if (el.tagName === 'VIDEO') { try { el.currentTime = 0; } catch (e) { /* not loaded yet */ } if (!paused) playVideo(el); }
  paintProgress();
}
function advance() {
  if (slides.index >= slides.imgs.length - 1) return showFinale();
  goTo(slides.index + 1);
}
function frame(now) {
  if (!slides.running) return;
  slides.elapsed = now - slides.start;
  paintProgress();
  // Videos advance when they end (see renderPlayer); the clock is only a safety net if one cannot play.
  if (slides.elapsed >= slideDur(slides.index) + (slides.imgs[slides.index].tagName === 'VIDEO' ? 1500 : 0)) return advance();
  slides.raf = requestAnimationFrame(frame);
}
function paintProgress() {
  const n = slides.imgs.length || 1;
  const pct = Math.min(100, ((slides.index + Math.min(1, slides.elapsed / slideDur(slides.index))) / n) * 100);
  $('#bar').style.width = `${pct}%`;
  $('#dot').style.left = `${pct}%`;
}
function togglePause() {
  const paused = player.classList.toggle('is-paused');
  const el = slides.imgs[slides.index];
  if (paused) {
    slides.running = false;
    cancelAnimationFrame(slides.raf);
    if (el) { el.classList.add('is-paused'); if (el.tagName === 'VIDEO') el.pause(); }
    clearTimeout(slides.hideTimer);
    playerUI.classList.remove('is-hidden');
  } else {
    slides.start = performance.now() - slides.elapsed;
    slides.running = true;
    if (el) { el.classList.remove('is-paused'); if (el.tagName === 'VIDEO') playVideo(el); }
    slides.raf = requestAnimationFrame(frame);
    showUI();
  }
}
function stopSlides() {
  slides.running = false;
  cancelAnimationFrame(slides.raf);
  clearTimeout(slides.hideTimer);
  slides.imgs.forEach((el) => { if (el.tagName === 'VIDEO') el.pause(); });
}
function showFinale() {
  stopSlides();
  hideUI();
  finale.hidden = false;
}

/* ---------- More Info modal ---------- */
let modalStart = 0;
function openModal(title, text, image, start = 0) {
  modalStart = start;
  $('#modal-title').textContent = title;
  $('#modal-text').textContent = text;
  const art = $('#modal-art');
  art.innerHTML = '';
  art.appendChild(mediaEl(image));
  modal.hidden = false;
}
function closeModal() { modal.hidden = true; }
$('#modal-close').addEventListener('click', closeModal);
$('#modal-play').addEventListener('click', () => openPlayer(modalStart));
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (!$('#cz').hidden) return closePanel();
  if (!modal.hidden) return closeModal();
  if (!player.hidden) openHome(false);
});

// Re-draws every screen from `cfg` (after Save & apply, Import or Reset)
function rerender() {
  renderProfiles();
  renderHome();
  renderPlayer();
  if (!player.hidden) openHome(false);
  if (!home.hidden) cycleHero();
  if (titleTyped) $('#title-text').textContent = fullTitle();
  closeModal();
}

/* =====================================================================
   ✎ CUSTOMIZE — the panel that edits `cfg` (text + pictures/videos)
   ===================================================================== */
const cz = $('#cz'), czBody = $('#cz-body'), czTabs = $('#cz-tabs'), czStatus = $('#cz-status');
let draft = null, czTab = 'text';
const pending = new Map(); // uploads chosen but not saved yet: id -> Blob
const uid = () => 'idb:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  for (let i = 0; i < keys.length - 1; i++) { if (o[keys[i]] == null) o[keys[i]] = /^\d+$/.test(keys[i + 1]) ? [] : {}; o = o[keys[i]]; }
  o[keys[keys.length - 1]] = value;
}
function collectRefs(obj, out = new Set()) {
  if (typeof obj === 'string') { if (isUpload(obj)) out.add(obj); }
  else if (obj && typeof obj === 'object') Object.values(obj).forEach((v) => collectRefs(v, out));
  return out;
}
// Rewrites every "idb:xxx" reference in a config tree to whatever `map` says it became
// (used once cloud uploads finish, so the saved config points at real https:// URLs
// instead of this-browser-only blobs).
function replaceRefs(obj, map) {
  if (!obj || typeof obj !== 'object') return;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string' && map.has(v)) obj[k] = map.get(v);
    else if (v && typeof v === 'object') replaceRefs(v, map);
  }
}
const cloudOn = () => typeof GiftStore !== 'undefined' && GiftStore.mode === 'cloud';
function status(msg, kind = '') {
  czStatus.textContent = msg;
  czStatus.className = 'cz-status' + (kind ? ' is-' + kind : '');
  if (msg) { clearTimeout(status.t); status.t = setTimeout(() => { czStatus.textContent = ''; czStatus.className = 'cz-status'; }, 4000); }
}

const TABS = [['text', 'Text'], ['profiles', 'Profiles'], ['hero', 'Hero'], ['rows', 'Rows'], ['player', 'Player'], ['settings', 'Settings']];

function openPanel() {
  stopAuto();
  draft = clone(cfg);
  pending.clear();
  cz.hidden = false;
  document.body.classList.add('cz-open');
  renderTabs();
  renderTab();
}
function closePanel() {
  // throw away unsaved uploads
  pending.forEach((_, id) => { const m = media.get(id); if (m) URL.revokeObjectURL(m.url); media.delete(id); });
  pending.clear();
  draft = null;
  cz.hidden = true;
  document.body.classList.remove('cz-open');
}
function renderTabs() {
  czTabs.innerHTML = TABS.map(([id, label]) => `<button type="button" class="cz-tab${id === czTab ? ' is-active' : ''}" data-tab="${id}">${label}</button>`).join('');
}
czTabs.addEventListener('click', (e) => {
  const b = e.target.closest('[data-tab]');
  if (!b) return;
  czTab = b.dataset.tab;
  renderTabs();
  renderTab();
});

/* -- field helpers (all edits go into `draft`) -- */
const field = (label, path, value, kind = 'text', extra = '') =>
  `<label class="cz-field"><span>${esc(label)}</span>${kind === 'area'
    ? `<textarea data-path="${path}" data-kind="${extra || 'text'}" rows="3">${esc(value)}</textarea>`
    : `<input type="${kind === 'num' ? 'number' : 'text'}" data-path="${path}" data-kind="${kind}" value="${esc(value)}" ${extra}>`}</label>`;
const toggle = (label, path, value) =>
  `<label class="cz-field cz-toggle"><input type="checkbox" data-path="${path}" data-kind="bool" ${value ? 'checked' : ''}><span>${esc(label)}</span></label>`;
function mediaSlot(path, ref, opts = {}) {
  const has = !!srcOf(ref);
  const kind = isVideo(ref) ? 'video' : has ? 'photo' : 'empty';
  return `<div class="cz-media ${opts.wide ? 'is-wide' : ''}" data-mpath="${path}">
    <div class="cz-thumb" data-thumb="${path}"></div>
    <div class="cz-media-meta">
      <span class="cz-kind">${kind === 'video' ? '🎬 Video' : kind === 'photo' ? '🖼 Photo' : '— empty —'}</span>
      <label class="cz-btn cz-btn-file">Change<input type="file" accept="image/*,video/*" data-file="${path}" hidden></label>
      ${opts.removable ? `<button type="button" class="cz-btn cz-btn-ghost" data-remove="${opts.removable}">Remove</button>` : ''}
    </div>
  </div>`;
}
function mediaList(title, path, list, hint) {
  return `<div class="cz-group"><div class="cz-group-head"><h3>${esc(title)}</h3>
      <label class="cz-btn cz-btn-file">+ Add photos / videos<input type="file" accept="image/*,video/*" multiple data-add="${path}" hidden></label></div>
    ${hint ? `<p class="cz-hint">${hint}</p>` : ''}
    <div class="cz-grid">${list.map((ref, i) => mediaSlot(`${path}.${i}`, ref, { removable: `${path}.${i}` })).join('') || '<p class="cz-empty">Nothing here yet — add a photo or a video.</p>'}</div></div>`;
}

function renderTab() {
  const d = draft;
  let html = '';
  if (czTab === 'text') {
    html = `<div class="cz-group"><h3>Title</h3>
      ${field('Words before the name', 'title', d.title)}
      ${field('Name', 'name', d.name)}
      ${field('Title inside the player', 'playerTitle', d.playerTitle)}
      </div>
      <div class="cz-group"><h3>The little facts row</h3><div class="cz-two">
      ${field('Match', 'facts.match', d.facts.match)}${field('Year', 'facts.year', d.facts.year)}
      ${field('Badge', 'facts.age', d.facts.age)}${field('Seasons', 'facts.seasons', d.facts.seasons)}
      ${field('Quality', 'facts.quality', d.facts.quality)}</div></div>
      <div class="cz-group"><h3>Message</h3>${field('Birthday message', 'description', d.description, 'area')}</div>
      <div class="cz-group"><h3>Finale</h3>
      ${field('Finale title ({name} = the name)', 'finale.title', d.finale.title)}
      ${field('Closing lines (one per line)', 'finale.lines', d.finale.lines.join('\n'), 'area', 'lines')}</div>
      <div class="cz-group"><h3>Footer</h3>
      ${field('Footer note', 'footer.note', d.footer.note)}
      ${field('Footer links (comma separated)', 'footer.links', d.footer.links.join(', '), 'area', 'list')}</div>`;
  } else if (czTab === 'profiles') {
    html = `<div class="cz-group"><div class="cz-group-head"><h3>Who's watching?</h3>
      <button type="button" class="cz-btn" data-action="add-profile">+ Add profile</button></div>
      <p class="cz-hint">Square pictures look best. The first profile is the one the cursor picks.</p>
      ${d.profiles.map((p, i) => `<div class="cz-item">
        ${mediaSlot(`profiles.${i}.image`, p.image)}
        <div class="cz-item-fields">${field('Label', `profiles.${i}.label`, p.label)}
        <button type="button" class="cz-btn cz-btn-ghost" data-action="del-profile" data-i="${i}">Remove profile</button></div></div>`).join('')}</div>`;
  } else if (czTab === 'hero') {
    html = `<div class="cz-group"><div class="cz-group-head"><h3>Big pictures behind the title</h3>
        <label class="cz-btn cz-btn-file">+ Add photo / video<input type="file" accept="image/*,video/*" multiple data-add-hero hidden></label></div>
      <p class="cz-hint">Wide pictures or short videos, ~1600×900. They cross-fade with a slow zoom, Netflix-style — give one a name and it fades in with it while that picture is showing.</p>
      <div class="cz-items">${d.hero.images.map((item, i) => `<div class="cz-item">
        ${mediaSlot(`hero.images.${i}.image`, item.image, { removable: `hero.images.${i}` })}
        <div class="cz-item-fields">${field('Name shown while featured (optional)', `hero.images.${i}.title`, item.title || '')}</div>
      </div>`).join('') || '<p class="cz-empty">Nothing here yet — add a photo or a video.</p>'}</div></div>
      <div class="cz-group">${field('Seconds each one stays', 'hero.interval', Math.round(d.hero.interval / 1000), 'num', 'min="1" max="60" data-unit="s"')}</div>`;
  } else if (czTab === 'rows') {
    html = d.rows.map((row, r) => `<div class="cz-group cz-row">
      <div class="cz-group-head">
        <input type="text" class="cz-row-title" data-path="rows.${r}.title" data-kind="text" value="${esc(row.title)}" aria-label="Row title">
        <select data-path="rows.${r}.type" data-kind="text" aria-label="Row style">
          <option value="portrait" ${row.type === 'portrait' ? 'selected' : ''}>Posters</option>
          <option value="landscape" ${row.type === 'landscape' ? 'selected' : ''}>Wide tiles</option>
          <option value="top10" ${row.type === 'top10' ? 'selected' : ''}>Top 10</option>
        </select>
        <button type="button" class="cz-btn cz-btn-ghost" data-action="del-row" data-r="${r}" title="Remove this row">✕</button>
      </div>
      <div class="cz-items">${row.items.map((it, i) => `<details class="cz-item cz-card" ${i === 0 && r === 0 ? 'open' : ''}>
        <summary><span class="cz-card-thumb" data-thumb="rows.${r}.items.${i}.image"></span><span class="cz-card-title">${esc(it.title || 'Untitled')}</span><span class="cz-card-sub">${isVideo(it.image) ? 'video' : srcOf(it.image) ? 'photo' : 'no picture'}</span></summary>
        <div class="cz-card-body">
          <div class="cz-two">
            <div><p class="cz-label">Tile</p>${mediaSlot(`rows.${r}.items.${i}.image`, it.image)}</div>
            <div><p class="cz-label">Hover preview (optional)</p>${mediaSlot(`rows.${r}.items.${i}.preview`, it.preview, { removable: it.preview ? `rows.${r}.items.${i}.preview` : '' })}</div>
          </div>
          ${field('Title', `rows.${r}.items.${i}.title`, it.title)}
          ${field('Text (More Info)', `rows.${r}.items.${i}.text`, it.text, 'area')}
          <div class="cz-two">${field('Tags (comma separated)', `rows.${r}.items.${i}.tags`, (it.tags || []).join(', '), 'list')}
          ${field('Progress % (wide tiles)', `rows.${r}.items.${i}.progress`, it.progress ?? '', 'num', 'min="0" max="100" placeholder="none"')}</div>
          <div class="cz-actions-row">
            <button type="button" class="cz-btn cz-btn-ghost" data-action="move-item" data-r="${r}" data-i="${i}" data-dir="-1" ${i === 0 ? 'disabled' : ''}>↑ Up</button>
            <button type="button" class="cz-btn cz-btn-ghost" data-action="move-item" data-r="${r}" data-i="${i}" data-dir="1" ${i === row.items.length - 1 ? 'disabled' : ''}>↓ Down</button>
            <button type="button" class="cz-btn cz-btn-ghost cz-danger" data-action="del-item" data-r="${r}" data-i="${i}">Remove</button>
          </div>
        </div></details>`).join('')}</div>
      <label class="cz-btn cz-btn-file cz-add-items">+ Add photos / videos to this row<input type="file" accept="image/*,video/*" multiple data-add-items="${r}" hidden></label>
    </div>`).join('') +
      `<div class="cz-group"><button type="button" class="cz-btn" data-action="add-row">+ Add a new row</button></div>`;
  } else if (czTab === 'player') {
    html = mediaList('What plays after "Play"', 'slides.images', d.slides.images, 'Pictures slowly zoom for a few seconds each; videos play to the end (with sound) then the next one starts.') +
      `<div class="cz-group"><div class="cz-two">
      ${field('Seconds each picture stays', 'slides.duration', Math.round(d.slides.duration / 1000), 'num', 'min="1" max="60"')}
      ${field('Time label in the player', 'slides.time', d.slides.time)}</div></div>`;
  } else if (czTab === 'settings') {
    const cloud = cloudOn();
    html = `<div class="cz-group"><h3>Photo & video storage</h3>
      <p class="cz-hint">${cloud
        ? '🌐 Cloud (Cloudflare) — new uploads go to your project and work on any device, forever.'
        : '💻 This browser only — uploads are saved here (IndexedDB) and won\'t appear on other devices. Deploy the free Worker in <code>worker/</code> and paste its URL into <code>cloud-config.js</code> to switch to cloud storage — see the README.'}</p></div>
      <div class="cz-group"><h3>Playback</h3>
      ${toggle('Auto-play: a cursor walks through the site like the video', 'autoplay', d.autoplay)}
      ${field('Seconds between pictures inside a hover preview', 'previewInterval', (d.previewInterval / 1000).toFixed(1), 'num', 'min="0.5" max="10" step="0.5"')}
      ${field('Intro sound file (optional, e.g. assets/audio/tudum.mp3)', 'introSound', d.introSound)}</div>
      <div class="cz-group"><h3>Backup & share</h3>
      <p class="cz-hint">Export saves everything (text + your uploaded photos/videos) to one file. Import it on another device or send it to me to bake into the site.</p>
      <div class="cz-actions-row">
        <button type="button" class="cz-btn" data-action="export">⬇ Export</button>
        <label class="cz-btn cz-btn-file">⬆ Import<input type="file" accept="application/json,.json" data-import hidden></label>
      </div></div>
      <div class="cz-group"><h3>Start over</h3>
      <p class="cz-hint">Removes every customisation from this browser and goes back to the original site.</p>
      <button type="button" class="cz-btn cz-btn-ghost cz-danger" data-action="reset">Reset to original</button></div>`;
  }
  czBody.innerHTML = html;
  czBody.querySelectorAll('[data-thumb]').forEach((box) => { box.innerHTML = ''; box.appendChild(mediaEl(getPath(d, box.dataset.thumb))); });
  czBody.scrollTop = 0;
}

/* -- input changes -> draft -- */
czBody.addEventListener('input', (e) => {
  const el = e.target;
  if (!el.dataset.path) return;
  let v = el.type === 'checkbox' ? el.checked : el.value;
  const kind = el.dataset.kind;
  if (kind === 'list') v = v.split(',').map((s) => s.trim()).filter(Boolean);
  else if (kind === 'lines') v = v.split('\n').map((s) => s.trim()).filter(Boolean);
  else if (kind === 'num') {
    if (v === '') { v = el.dataset.path.endsWith('progress') ? undefined : v; }
    else {
      v = Number(v);
      if (Number.isNaN(v)) return;
      const p = el.dataset.path;
      if (p === 'hero.interval' || p === 'slides.duration' || p === 'previewInterval') v = Math.round(v * 1000);
    }
  }
  setPath(draft, el.dataset.path, v);
  if (el.classList.contains('cz-row-title')) { /* nothing else to refresh */ }
  else if (el.dataset.path.endsWith('.title')) { const card = el.closest('.cz-card'); if (card) card.querySelector('.cz-card-title').textContent = el.value || 'Untitled'; }
});
czBody.addEventListener('change', (e) => {
  const el = e.target;
  if (el.tagName === 'SELECT' && el.dataset.path) setPath(draft, el.dataset.path, el.value);
});

/* -- file pickers -- */
const MAX_MB = 60;
function acceptFile(file) {
  if (!file) return null;
  const okType = /^(image|video)\//.test(file.type);
  if (!okType) { status(`"${file.name}" is not a picture or a video.`, 'error'); return null; }
  if (file.size > MAX_MB * 1024 * 1024) { status(`"${file.name}" is bigger than ${MAX_MB} MB — please use a smaller file.`, 'error'); return null; }
  const id = uid();
  pending.set(id, file);
  registerBlob(id, file);
  return id;
}
czBody.addEventListener('change', (e) => {
  const el = e.target;
  if (el.type !== 'file' || !draft) return; // guard: the panel may have been closed already
  const files = [...(el.files || [])];
  if (!files.length) return;
  if (el.dataset.file) {                       // replace one slot
    const id = acceptFile(files[0]);
    if (id) { setPath(draft, el.dataset.file, id); renderTab(); status('Picture changed — press Save & apply to see it on the site.'); }
  } else if (el.dataset.add) {                 // append to a media list
    const list = getPath(draft, el.dataset.add) || [];
    files.forEach((f) => { const id = acceptFile(f); if (id) list.push(id); });
    setPath(draft, el.dataset.add, list);
    renderTab();
    status(`${files.length} file${files.length > 1 ? 's' : ''} added.`);
  } else if (el.dataset.addItems != null) {    // new tiles in a row
    const row = draft.rows[Number(el.dataset.addItems)];
    files.forEach((f) => {
      const id = acceptFile(f);
      if (id) row.items.push({ image: id, title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '), text: '', tags: [] });
    });
    renderTab();
    status(`${files.length} tile${files.length > 1 ? 's' : ''} added — edit the titles below.`);
  } else if (el.hasAttribute('data-add-hero')) { // new hero background(s)
    files.forEach((f) => { const id = acceptFile(f); if (id) draft.hero.images.push({ image: id, title: '' }); });
    renderTab();
    status(`${files.length} added to the hero — give ${files.length > 1 ? 'them' : 'it'} a name below if you'd like.`);
  } else if (el.hasAttribute('data-import')) {
    importBundle(files[0]);
  }
  el.value = '';
});

/* -- buttons -- */
czBody.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-action], button[data-remove]');
  if (!b) return;
  if (b.dataset.remove) {
    const path = b.dataset.remove;
    const parts = path.split('.'), last = parts.pop(), parent = getPath(draft, parts.join('.'));
    if (Array.isArray(parent)) parent.splice(Number(last), 1); else if (parent) delete parent[last];
    renderTab();
    return;
  }
  const a = b.dataset.action, r = Number(b.dataset.r), i = Number(b.dataset.i);
  if (a === 'add-profile') draft.profiles.push({ label: String(draft.profiles.length + 1), image: '' });
  else if (a === 'del-profile') draft.profiles.splice(i, 1);
  else if (a === 'del-row') draft.rows.splice(r, 1);
  else if (a === 'add-row') draft.rows.push({ title: 'New row', type: 'landscape', items: [] });
  else if (a === 'del-item') draft.rows[r].items.splice(i, 1);
  else if (a === 'move-item') {
    const items = draft.rows[r].items, j = i + Number(b.dataset.dir);
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
  }
  else if (a === 'export') return exportBundle();
  else if (a === 'reset') {
    if (b.dataset.armed) return resetAll();
    b.dataset.armed = '1'; b.textContent = 'Really reset? Click again to confirm';
    setTimeout(() => { delete b.dataset.armed; b.textContent = 'Reset to original'; }, 5000);
    return;
  }
  renderTab();
});

/* -- save / cancel -- */
async function applyDraft() {
  const btn = $('#cz-save');
  btn.disabled = true; btn.textContent = 'Saving…';
  try {
    const next = normalise(draft);
    if (!next.slides.images.length) throw new Error('The player needs at least one picture or video (Player tab).');
    if (!next.profiles.length) throw new Error('Keep at least one profile (Profiles tab).');
    const used = collectRefs(next);
    const urlMap = new Map(); // idb:id -> real https:// URL, for files that made it to the cloud
    let cloudFailures = 0;
    for (const [id, blob] of pending) {
      if (!used.has(id)) continue;
      if (cloudOn()) {
        try { const up = await GiftStore.cloudUploadMedia(blob, 'site'); if (up) { urlMap.set(id, up.url); continue; } }
        catch (e) { cloudFailures++; console.warn('Cloud upload failed, saving this one to the browser instead:', e); }
      }
      if (storageOK) await store.putMedia(id, blob); // local fallback (or the only option, if cloud isn't set up)
    }
    if (urlMap.size) replaceRefs(next, urlMap);
    if (storageOK) {
      await store.putConfig(next);
      for (const id of [...media.keys()]) if (!used.has(id) || urlMap.has(id)) { await store.delMedia(id).catch(() => {}); URL.revokeObjectURL(media.get(id).url); media.delete(id); }
    }
    pending.clear();
    cfg = next;
    draft = clone(cfg);
    rerender();
    const savedWhere = urlMap.size && !cloudFailures ? 'Saved to the cloud ✓ — works on any device.'
      : cloudFailures ? `Saved ✓ (${cloudFailures} file${cloudFailures > 1 ? 's' : ''} couldn't reach the cloud, so ${cloudFailures > 1 ? 'they stay' : 'it stays'} in this browser).`
      : storageOK ? 'Saved ✓ — the site now uses your changes.' : 'Applied for this visit (this browser cannot save).';
    status(savedWhere, cloudFailures ? '' : 'ok');
  } catch (err) {
    status(err.message || 'Could not save.', 'error');
  } finally {
    btn.disabled = false; btn.textContent = 'Save & apply';
  }
}
async function resetAll() {
  try {
    if (storageOK) { await store.clearConfig(); await store.clearMedia(); }
    media.forEach((m) => URL.revokeObjectURL(m.url));
    media.clear();
    pending.clear();
    cfg = clone(config);
    draft = clone(cfg);
    rerender();
    renderTab();
    status('Back to the original site.', 'ok');
  } catch (err) { status('Could not reset: ' + err.message, 'error'); }
}

/* -- export / import (one JSON file with the media inside) -- */
const blobToDataURL = (blob) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(blob); });
async function exportBundle() {
  try {
    status('Preparing your file…');
    const next = normalise(draft);
    const used = collectRefs(next);
    const files = {};
    for (const id of used) {
      const m = media.get(id);
      if (!pending.get(id) && !m) continue;
      const blob = pending.get(id) || (await fetch(m.url).then((r) => r.blob()));
      files[id] = { type: blob.type, data: await blobToDataURL(blob) };
    }
    const json = JSON.stringify({ app: 'birthday-site', version: 1, saved: new Date().toISOString(), config: next, files });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    a.download = `birthday-${(next.name || 'site').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-customisation.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    status('Exported ✓', 'ok');
  } catch (err) { status('Export failed: ' + err.message, 'error'); }
}
async function importBundle(file) {
  try {
    status('Importing…');
    const data = JSON.parse(await file.text());
    if (!data || data.app !== 'birthday-site' || !data.config) throw new Error('That is not a birthday-site export file.');
    for (const [id, f] of Object.entries(data.files || {})) {
      if (!isUpload(id) || !f?.data) continue;
      const blob = await fetch(f.data).then((r) => r.blob());
      pending.set(id, blob);
      registerBlob(id, blob);
    }
    draft = normalise(data.config);
    await applyDraft();
    renderTab();
  } catch (err) { status('Import failed: ' + err.message, 'error'); }
}

$('#cz-close').addEventListener('click', closePanel);
$('#cz-cancel').addEventListener('click', closePanel);
$('#cz-save').addEventListener('click', applyDraft);
cz.addEventListener('click', (e) => { if (e.target === cz) closePanel(); });

/* =====================================================================
   ✎ LIVE EDIT MODE — click any photo, video or text right on the page.
   Every change saves itself immediately (no Save button) using the same
   storage the ✎ Customize panel uses, so the two stay in sync. The panel
   itself is still one tap away ("More settings") for things that don't
   have an obvious on-page click target — adding a whole new row, tuning
   settings, export/import, reset.
   ===================================================================== */
const isEditing = () => document.body.classList.contains('edit-mode');
function persistCfgNow() {
  if (!storageOK) return Promise.resolve();
  return store.putConfig(cfg).catch((e) => console.warn('Could not save that change:', e));
}
// Swaps a rendered element for a real <input>/<textarea> in the same spot — far more
// reliable across browsers than contentEditable, especially on elements nested inside
// buttons. `mutate` writes the new value onto the live cfg object directly.
function startTextEdit(el, mutate, { multiline = false } = {}) {
  if (!el || el.dataset.editingNow) return;
  el.dataset.editingNow = '1';
  const original = el.textContent;
  const field = document.createElement(multiline ? 'textarea' : 'input');
  field.className = 'inline-edit-field';
  if (!multiline) field.type = 'text';
  field.value = original;
  const parent = el.parentNode;
  if (!parent) { delete el.dataset.editingNow; return; }
  parent.replaceChild(field, el);
  field.focus();
  field.select();
  let done = false;
  const finish = (commit) => {
    if (done) return;
    done = true;
    delete el.dataset.editingNow;
    const value = field.value.trim();
    if (field.parentNode) field.parentNode.replaceChild(el, field);
    if (commit && value && value !== original) {
      el.textContent = value;
      mutate(value);
      persistCfgNow();
      rerender();
    }
  };
  field.addEventListener('blur', () => finish(true));
  field.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !multiline) { e.preventDefault(); finish(true); }
    else if (e.key === 'Escape') { e.preventDefault(); finish(false); }
  });
}
// Validates a chosen file and stores it — cloud first when configured, this browser
// otherwise — returning the reference to put into cfg. Shared by every click-to-edit
// picker so they all behave identically. Throws a friendly message on a bad file.
async function resolveUploadRef(file) {
  if (!/^(image|video)\//.test(file.type)) throw new Error(`"${file.name}" isn't a photo or a video.`);
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`"${file.name}" is bigger than ${MAX_MB} MB — please use a smaller file.`);
  if (cloudOn()) {
    try { const up = await GiftStore.cloudUploadMedia(file, 'site'); if (up) return { ref: up.url, cloud: true }; }
    catch (e) { console.warn('Cloud upload failed, saving this one to the browser instead:', e); }
  }
  const id = uid();
  registerBlob(id, file);
  if (storageOK) { try { await store.putMedia(id, file); } catch (e) { console.warn('Could not save this file:', e); } }
  return { ref: id, cloud: false };
}
// Creates a one-shot hidden file input, runs `onFile(file)` with the choice, then removes itself.
function pickFile(onFile) {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*,video/*'; input.hidden = true;
  input.dataset.inlineUpload = '1'; // unambiguous hook for anything that needs to target this exact picker
  document.body.appendChild(input);
  input.addEventListener('change', async () => {
    const file = input.files && input.files[0];
    input.remove();
    if (!file) return;
    showEditHint(cloudOn() ? 'Uploading to the cloud…' : 'Saving…');
    try {
      const { ref, cloud } = await resolveUploadRef(file);
      await onFile(ref);
      showEditHint(cloud ? 'Saved to the cloud ✓' : 'Saved ✓ (this browser only)');
    } catch (e) {
      editError(e.message || 'Could not save that file.');
    }
  });
  input.click();
}
// Replaces item[key] (a live cfg object) with the chosen upload, then redraws everything.
function openInlineFilePicker(item, key) {
  pickFile(async (ref) => {
    item[key] = ref;
    await persistCfgNow();
    rerender();
  });
}
// Replaces ONE slide in the player, in place — without leaving the player or
// restarting the slideshow. Only that slide's element is swapped; the current
// position, timer and pause state are all left exactly as they were.
function openPlayerFilePicker(index) {
  if (index < 0 || index >= slides.imgs.length) return;
  pickFile(async (ref) => {
    cfg.slides.images[index] = ref;
    await persistCfgNow();
    const oldEl = slides.imgs[index];
    if (!oldEl || !oldEl.parentNode) { renderPlayer(); return; } // shouldn't happen, but never leave a hole
    const wasOn = oldEl.classList.contains('is-on');
    const wasPaused = oldEl.classList.contains('is-paused');
    if (oldEl.tagName === 'VIDEO') oldEl.pause();
    const newEl = mediaEl(ref, { player: true });
    newEl.style.setProperty('--dur', `${cfg.slides.duration + 900}ms`);
    if (newEl.tagName === 'VIDEO') newEl.addEventListener('ended', () => { if (slides.running && slides.imgs[index] === newEl) advance(); });
    if (wasOn) newEl.classList.add('is-on');
    if (wasPaused) newEl.classList.add('is-paused');
    oldEl.parentNode.replaceChild(newEl, oldEl);
    slides.imgs[index] = newEl;
    // A freshly swapped-in slide gets a full run of its own time rather than the leftovers.
    if (wasOn) { slides.elapsed = 0; slides.start = performance.now(); paintProgress(); }
    if (wasOn && newEl.tagName === 'VIDEO' && !wasPaused) playVideo(newEl);
    // Everything else on the site (rows, hero) that might use this same picture stays in sync
    // the next time it renders; the player itself is already showing the new one.
    renderPlayerText();
  });
}
// The player's text bits (title, time, finale) — cheap to refresh without touching the slides.
function renderPlayerText() {
  $('#player-title').textContent = cfg.playerTitle;
  $('#time').textContent = cfg.slides.time;
  $('#finale-title').textContent = cfg.finale.title.replace('{name}', cfg.name);
  $('#finale-lines').innerHTML = cfg.finale.lines.map((l) => `<p>${esc(l)}</p>`).join('');
}
function editError(msg) {
  showEditHint(msg, true);
}
let hintTimer = null, playerHintTimer = null;
// Inside the player, status messages ("Saved ✓") borrow the same pill that shows the
// "tap to change it" instruction, so nothing ever stacks two toasts on top of each
// other — and the two branches use separate timers so switching between them (e.g.
// entering the player right after turning editing on) can never leave the other one
// stuck on screen with no timer left to hide it.
function showEditHint(msg, isError) {
  const cueText = !player.hidden && document.getElementById('player-edit-cue-text');
  if (cueText) {
    const oldHint = document.getElementById('edit-hint');
    if (oldHint) { clearTimeout(hintTimer); oldHint.classList.remove('is-on'); } // clean handoff from the home/profiles toast
    const cue = document.getElementById('player-edit-cue');
    if (!cueText.dataset.defaultText) cueText.dataset.defaultText = cueText.textContent;
    clearTimeout(playerHintTimer);
    cueText.textContent = msg || cueText.dataset.defaultText;
    cue.classList.toggle('is-error', !!isError);
    if (msg) playerHintTimer = setTimeout(() => { cueText.textContent = cueText.dataset.defaultText; cue.classList.remove('is-error'); }, isError ? 5000 : 2600);
    return;
  }
  let hint = document.getElementById('edit-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'edit-hint';
    hint.className = 'edit-hint';
    document.body.appendChild(hint);
  }
  hint.textContent = msg || 'Click any photo, video or text to change it — changes save right away. Tap "Done editing" when you\'re finished.';
  hint.classList.toggle('is-error', !!isError);
  hint.classList.add('is-on');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => hint.classList.remove('is-on'), isError ? 5000 : 4200);
}
function setEditMode(on) {
  document.body.classList.toggle('edit-mode', on);
  $('#cz-fab').innerHTML = on
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg><span>Done editing</span>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16z"/><path d="m13.5 6.5 4 4"/></svg><span>Edit</span>';
  $('#cz-more').hidden = !on;
  paintHeroFeature(currentHeroIndex());
  if (!player.hidden) showUI(); // re-arms (or, while editing, cancels) the player's auto-hide
  if (on) showEditHint(!player.hidden ? 'Tap the photo or video to change it. Use ‹ › to move between them.' : undefined);
}
$('#cz-fab').addEventListener('click', () => setEditMode(!isEditing()));
$('#cz-more').addEventListener('click', openPanel);

/* ---------- Gift mode: index.html?gift=<slug> loads a shared cloud gift ---------- */
// Needs cloud-config.js + gift-store.js included in index.html; if they aren't
// (e.g. someone deploys index.html on its own), gift links are simply ignored
// and the site behaves exactly like the personal, single-owner version.
function giftSlugFromURL() {
  try { return new URLSearchParams(location.search).get('gift'); } catch (e) { return null; }
}
function showGiftScreen(title, text, showCreateLink) {
  document.querySelectorAll('.screen').forEach((s) => { s.hidden = true; });
  const el = document.createElement('div');
  el.className = 'screen gift-status';
  el.innerHTML = `<div class="gift-status-card">
      <span class="n-mini" aria-hidden="true"><i></i><i></i><i></i></span>
      <h1>${esc(title)}</h1><p>${esc(text)}</p>
      ${showCreateLink ? '<a href="gift-create.html">Create a new gift</a>' : ''}
    </div>`;
  document.body.appendChild(el);
}
// Turns a gift's uploaded media into the site's rows/hero/slides. Falls back to
// the default pictures for anything the gift has none of, so the site never
// renders empty.
function applyGiftMedia(gift, media) {
  cfg.name = gift.name || cfg.name;
  if (gift.message) cfg.description = gift.message;
  const refs = media.map((m) => m.url);
  if (refs.length) {
    cfg.hero.images = refs.slice(0, 5).map((url) => ({ image: url, title: '' }));
    cfg.slides.images = refs;
    cfg.rows = [{
      title: 'Our Moments', type: 'landscape',
      items: media.map((m, i) => ({ image: m.url, title: `Moment ${i + 1}`, text: 'Added with love for this gift.', tags: [] })),
    }, ...cfg.rows.filter((r) => r.title !== 'Our Moments')];
  }
  cfg.autoplay = false; // let the birthday person explore at their own pace
}
async function tryGiftMode() {
  const slug = giftSlugFromURL();
  if (!slug || typeof GiftStore === 'undefined') return false;
  try {
    const gift = await GiftStore.getGift(slug);
    if (!gift) { showGiftScreen("This gift isn't here", "We couldn't find a gift with this link — it may have been deleted after its free trial ended.", true); return true; }
    if (GiftStore.isExpired(gift.createdAt)) { showGiftScreen('This gift has expired', `Its ${GiftStore.trialDays}-day free trial ended. Buy the gift to keep it forever, or create a new one.`, true); return true; }
    const media = await GiftStore.listMedia(slug);
    cfg = normalise(cfg);
    applyGiftMedia(gift, media);
    document.body.classList.add('is-gift');
    const addLink = document.getElementById('gift-add');
    if (addLink) { addLink.hidden = false; addLink.href = `gift-upload.html?gift=${encodeURIComponent(slug)}`; }
    return false;
  } catch (e) {
    showGiftScreen('Something went wrong', e.message || 'Could not load this gift right now.', true);
    return true;
  }
}

/* ---------- Go ---------- */
(async function start() {
  await loadSaved();
  const blocked = await tryGiftMode();
  if (blocked) return;
  autoOn = cfg.autoplay;
  bindHome();
  bindPlayer();
  renderProfiles();
  renderHome();
  renderPlayer();
  startIntro();
})();
