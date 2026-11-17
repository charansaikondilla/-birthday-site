/* =====================================================================
   EDIT EVERYTHING PERSONAL HERE  ⟵ this is the only part you need to touch
   ===================================================================== */
const config = {
  name: 'Nuel',                       // typed after the title, used in the finale too
  title: 'Happy Birthday',            // typed letter by letter on the home screen
  playerTitle: 'Happy Birthday Nuel', // shown at the top of the player
  brand: 'PREMIERE',                  // the red logo text in the top bar
  rank: '#1 in Birthdays Today',      // the line next to the TOP 10 badge (leave '' to hide it)
  pageTitle: 'Happy Birthday {name}', // the browser tab name ({name} = the name)
  profilesHeading: "Who's watching?",
  startScreen: 'intro',               // 'intro' (logo, then Who's watching?) | 'profiles' | 'home'

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
    autoScroll: true, // false = stays on one picture; use the arrows / dots to move
    effect: 'slide',  // 'slide' (one after another) | 'fade'
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
  // Sounds (both made by scripts/make-sounds.mjs; '' = silent). Change them in ✎ Edit → "Change the music".
  introSound: 'assets/audio/premiere-intro.mp3',   // the logo sting at the start
  music: 'assets/audio/happy-birthday-piano.mp3',  // plays during the slideshow + end credits
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
  v.muted = typeof sound !== 'undefined' && sound.muted;
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
  out.hero.autoScroll = out.hero.autoScroll !== false;
  out.hero.effect = out.hero.effect === 'fade' ? 'fade' : 'slide';
  if (!['intro', 'profiles', 'home'].includes(out.startScreen)) out.startScreen = base.startScreen;
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
  // Pages saved before the built-in sounds existed had introSound: '' — give them the new sounds once.
  if (!c.soundsV) { if (!c.introSound) out.introSound = base.introSound; if (c.music == null) out.music = base.music; }
  out.soundsV = 1;
  out.introSound = typeof out.introSound === 'string' ? out.introSound : '';
  out.music = typeof out.music === 'string' ? out.music : '';
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
const introTimers = [];
function endIntro() {
  introTimers.forEach(clearTimeout);
  introTimers.length = 0;
}
function startIntro() {
  intro.hidden = false;
  buildRibbons();
  playIntroSound();
  requestAnimationFrame(() => intro.classList.add('build'));
  introTimers.push(setTimeout(() => intro.classList.add('burst'), 2100));
  introTimers.push(setTimeout(showProfiles, 3950));
}
// Skip Intro jumps straight to the home screen; a click anywhere else on the intro goes to "Who's watching?".
$('#skip-intro').addEventListener('click', (e) => { e.stopPropagation(); endIntro(); intro.hidden = true; openHome(false); });
intro.addEventListener('click', () => { if (!intro.hidden) { endIntro(); showProfiles(); } });
$('#profiles-skip').addEventListener('click', () => { stopAuto(); openHome(false); });

/* ---------- 2. Profiles ---------- */
function renderProfiles() {
  const grid = $('#profiles-grid');
  grid.innerHTML = '';
  cfg.profiles.forEach((p) => {
    const b = document.createElement('button');
    b.className = 'profile';
    b.appendChild(mediaEl(p.image));
    const s = document.createElement('span'); s.textContent = p.label;
    b.appendChild(s);
    b.addEventListener('click', (e) => {
      if (isEditing()) { e.preventDefault(); editProfile(p); return; }
      openHome(true);
    });
    grid.appendChild(b);
  });
}
function showProfiles() {
  endIntro();
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
  const hero = $('#hero'), nav = $('#nf-nav');
  home.addEventListener('scroll', () => {
    const y = home.scrollTop;
    hero.style.transform = `translateY(${y * 0.3}px)`;
    nav.classList.toggle('is-solid', y > 40);
  }, { passive: true });
  addEventListener('resize', () => sliderPainters.forEach((p) => p()));
  // Editing text/media doesn't block normal navigation — Play and More Info still work
  // while ✎ editing is on (editing the player's own slides needs to reach it, after all).
  $('#play').addEventListener('click', () => openPlayer(0));
  $('#more').addEventListener('click', () => openModal(fullTitle(), cfg.description, cfg.hero.images[0]?.image || cfg.slides.images[0], 0));
  $('#bb-replay').addEventListener('click', () => { cycleHero(); typeTitle(); });
  $('#hero-prev').addEventListener('click', () => { heroGo(currentHeroIndex() - 1, -1); restartHeroTimer(); });
  $('#hero-next').addEventListener('click', () => { heroGo(currentHeroIndex() + 1, 1); restartHeroTimer(); });
  let swipeX = null;
  $('#billboard').addEventListener('touchstart', (e) => { swipeX = e.touches[0].clientX; }, { passive: true });
  $('#billboard').addEventListener('touchend', (e) => {
    if (swipeX == null) return;
    const dx = e.changedTouches[0].clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) < 50) return;
    heroGo(currentHeroIndex() + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    restartHeroTimer();
  }, { passive: true });
  $('#hero-dots').addEventListener('click', (e) => {
    const b = e.target.closest('[data-hero]');
    if (!b) return;
    const to = Number(b.dataset.hero), from = currentHeroIndex();
    heroGo(to, to >= from ? 1 : -1);
    restartHeroTimer();
  });

  // ---- Top bar ----
  $('#nf-logo').addEventListener('click', (e) => {
    if (isEditing()) { e.preventDefault(); editLogo(); return; }
    clearSearch();
    home.scrollTo({ top: 0, behavior: 'smooth' });
  });
  $('#nf-links').addEventListener('click', (e) => {
    const a = e.target.closest('[data-row]');
    if (!a) return;
    e.preventDefault();
    clearSearch();
    $$('#nf-links [data-row]').forEach((l) => l.classList.toggle('is-active', l === a));
    const target = a.dataset.row === 'top' ? null : document.getElementById(a.dataset.row);
    home.scrollTo({ top: target ? scrollTopOf(target) - nav.offsetHeight - 10 : 0, behavior: 'smooth' });
  });
  const search = $('#nf-search'), input = $('#nf-search-input');
  $('#nf-search-btn').addEventListener('click', () => {
    search.classList.add('is-open');
    input.focus();
  });
  input.addEventListener('input', () => runSearch(input.value));
  input.addEventListener('blur', () => { if (!input.value) search.classList.remove('is-open'); });
  $('#nf-search-clear').addEventListener('click', () => { clearSearch(); input.focus(); });
  bindPop('nf-bell', 'nf-notes', () => { $('#nf-dot').hidden = true; });
  bindPop('nf-avatar-btn', 'nf-account');
  $('#nf-notes').addEventListener('click', (e) => {
    const b = e.target.closest('[data-note]');
    if (!b) return;
    const [r, i] = b.dataset.note.split('.').map(Number);
    const item = cfg.rows[r]?.items[i];
    closePops();
    if (item) openModal(item.title, item.text, item.preview || item.image, slideIndexOf(item.image));
  });
  $('#nf-account').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    closePops();
    const act = b.dataset.act;
    if (act === 'profile') { activeProfile = Number(b.dataset.i) || 0; paintAccount(); }
    else if (act === 'edit') setEditMode(true);
    else if (act === 'settings') openPanel();
    else if (act === 'profiles') { home.hidden = true; showProfiles(); }
    else if (act === 'signout') signOut();
    else if (act === 'sound') setMuted(!sound.muted);
  });
  $('#profiles-heading').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editProfilesHeading();
  });
  $('#bb-rank').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editRank();
  });
  $('#facts').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editFacts();
  });
  $('#service-code').addEventListener('click', (e) => {
    const b = e.currentTarget;
    b.textContent = b.textContent === 'Service Code' ? `${(cfg.name || 'BDAY').slice(0, 4).toUpperCase()}-${new Date().getFullYear()}` : 'Service Code';
  });
  $('#edit-add-row').addEventListener('click', addRowFromFiles);
  document.addEventListener('click', (e) => { if (!e.target.closest('.nf-pop')) closePops(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closePops();
    if (document.activeElement === input) { clearSearch(); input.blur(); }
  });

  // ---- ✎ Edit mode: a click on the title, message, footer or the big background
  // opens the edit popup (bound once — these elements persist across re-renders) ----
  $('#title').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editTitle();
  });
  $('#description').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editMessage();
  });
  $('#footer-note').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editFooter();
  });
  $('#footer-links').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editFooter();
  });
  $('#hero-feature').addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.stopPropagation();
    editHero();
  });
  // Anywhere on the big picture that isn't a button or a piece of text = change the background.
  $('#billboard').addEventListener('click', (e) => {
    if (!isEditing() || !e.target.isConnected) return;
    if (e.target.closest('button, a, input, #title, #description, #facts, #bb-rank, #hero-feature')) return;
    editHero();
  });
  // A visible "change background" chip, only shown while editing.
  // Edit-mode chips on the big picture: background + music.
  const chips = document.createElement('div');
  chips.className = 'hero-edit-bar';
  chips.innerHTML = '<button type="button" class="hero-edit" id="hero-edit"><span aria-hidden="true">🖼</span> Change this background</button>' +
    '<button type="button" class="hero-edit" id="song-edit"><span aria-hidden="true">🎵</span> Change the music</button>';
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    e.stopPropagation();
    if (b.id === 'song-edit') editSong(); else editHero();
  });
  $('#billboard').appendChild(chips);
}
function renderHero() {
  const hero = $('#hero');
  hero.innerHTML = '';
  cfg.hero.images.forEach((item, i) => {
    const el = mediaEl(item.image);
    el.style.setProperty('--dur', `${cfg.hero.interval + 900}ms`);
    if (i === 0) el.classList.add('is-on');
    hero.appendChild(el);
  });
}
function paintFacts() {
  const f = cfg.facts;
  $('#facts').innerHTML =
    `<span class="match">${esc(f.match)}</span><span>${esc(f.year)}</span><span class="badge">${esc(f.age)}</span><span>${esc(f.seasons)}</span><span>${esc(f.quality)}</span>`;
  $('#bb-rating').textContent = f.age || '';
}
function renderHome() {
  renderHero();
  paintFacts();
  $('#description').textContent = cfg.description;
  $('#nf-logo').textContent = cfg.brand || 'PREMIERE';
  document.title = (cfg.pageTitle || 'Happy Birthday').replace('{name}', cfg.name || '').trim();
  $('#profiles-heading').textContent = cfg.profilesHeading || "Who's watching?";
  paintRank();
  $('#footer-links').innerHTML = cfg.footer.links.map((l) => `<span>${esc(l)}</span>`).join('');
  $('#footer-note').textContent = cfg.footer.note;
  renderRows();
  paintAccount();
  paintNotes();
}

const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const rowId = (r) => `row-${r}`;
const scrollTopOf = (el) => el.getBoundingClientRect().top - home.getBoundingClientRect().top + home.scrollTop;
function renderRows() {
  $('#rows').innerHTML = '';
  sliderPainters.clear();
  cfg.rows.forEach(buildRow);
  observeRows();
  const links = [`<a href="#" data-row="top" class="is-active">Home</a>`]
    .concat(cfg.rows.map((row, r) => (row.items.length ? `<a href="#${rowId(r)}" data-row="${rowId(r)}">${esc(row.title)}</a>` : '')).filter(Boolean).slice(0, 5));
  $('#nf-links').innerHTML = links.join('');
  const q = $('#nf-search-input').value;
  if (q) runSearch(q);
}

// ---- Top-bar menus ----
let activeProfile = 0;
function closePops() {
  $$('.nf-menu').forEach((m) => { m.hidden = true; });
  $$('.nf-pop > button').forEach((b) => b.setAttribute('aria-expanded', 'false'));
}
function bindPop(btnId, menuId, onOpen) {
  const btn = document.getElementById(btnId), menu = document.getElementById(menuId);
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.hidden;
    closePops();
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open && onOpen) onOpen();
  });
}
const signedIn = () => (typeof GiftStore !== 'undefined' && GiftStore.Auth && GiftStore.Auth.isSignedIn && GiftStore.Auth.isSignedIn())
  || !!(sessionStorage.getItem('auth-token') || localStorage.getItem('auth-token'));
function signOut() {
  sessionStorage.removeItem('auth-token');
  localStorage.removeItem('auth-token');
  location.href = 'login.html';
}
function paintAccount() {
  if (activeProfile >= cfg.profiles.length) activeProfile = 0;
  const me = cfg.profiles[activeProfile];
  const av = $('#nf-avatar');
  av.innerHTML = '';
  if (me) av.appendChild(mediaEl(me.image));
  const gift = document.body.classList.contains('is-gift');
  $('#nf-account').innerHTML =
    cfg.profiles.map((p, i) => (i === activeProfile ? '' : `<button type="button" class="nf-menu-item" data-act="profile" data-i="${i}"><span class="nf-avatar sm" data-avatar="${i}"></span>${esc(p.label || `Profile ${i + 1}`)}</button>`)).join('') +
    `<button type="button" class="nf-menu-item" data-act="profiles"><span class="nf-menu-ic">⇄</span>Switch profile</button>` +
    `<button type="button" class="nf-menu-item" data-act="sound"><span class="nf-menu-ic">${typeof sound !== 'undefined' && sound.muted ? '🔇' : '🔊'}</span>Sound: ${typeof sound !== 'undefined' && sound.muted ? 'Off' : 'On'}</button>` +
    (gift ? '' : `<button type="button" class="nf-menu-item" data-act="edit"><span class="nf-menu-ic">✎</span>Edit this page</button>
      <button type="button" class="nf-menu-item" data-act="settings"><span class="nf-menu-ic">⚙</span>More settings</button>`) +
    `<hr><a class="nf-menu-item" href="index.html"><span class="nf-menu-ic">←</span>Back to Premiere</a>` +
    (signedIn() ? `<button type="button" class="nf-menu-item nf-menu-strong" data-act="signout">Sign out</button>` : '');
  $$('#nf-account [data-avatar]').forEach((s) => { const p = cfg.profiles[Number(s.dataset.avatar)]; if (p) s.appendChild(mediaEl(p.image)); });
}
function paintNotes() {
  const notes = [];
  cfg.rows.forEach((row, r) => row.items.forEach((it, i) => { if (notes.length < 4 && (r === 0 || i === 0)) notes.push({ it, key: `${r}.${i}` }); }));
  $('#nf-notes').innerHTML = notes.length
    ? notes.map(({ it, key }, n) => `<button type="button" class="nf-note" data-note="${key}"><span class="nf-note-img" data-note-img="${key}"></span><span><b>${n === 0 ? 'New Arrival' : 'Just Added'}</b>${esc(it.title || 'A new moment')}<small>${n === 0 ? 'Today' : `${n + 1} days ago`}</small></span></button>`).join('')
    : '<p class="nf-note-empty">No new moments yet.</p>';
  $$('#nf-notes [data-note-img]').forEach((s) => {
    const [r, i] = s.dataset.noteImg.split('.').map(Number);
    const it = cfg.rows[r]?.items[i];
    if (it) s.appendChild(mediaEl(it.image));
  });
  $('#nf-dot').hidden = !notes.length;
}

// ---- Search: filters every tile by title, tags or text ----
function runSearch(raw) {
  const q = raw.trim().toLowerCase();
  const results = $('#nf-results');
  $('#nf-search').classList.toggle('has-text', !!q);
  if (!q) { clearSearch(false); return; }
  home.classList.add('is-searching');
  results.hidden = false;
  const grid = $('#nf-results-grid');
  grid.innerHTML = '';
  const seen = new Set();
  cfg.rows.forEach((row, r) => row.items.forEach((it, i) => {
    const hay = [it.title, it.text, ...(it.tags || []), row.title].join(' ').toLowerCase();
    if (!hay.includes(q) || seen.has(it.image + it.title)) return;
    seen.add(it.image + it.title);
    grid.appendChild(buildCard(it, 'landscape', i));
  }));
  $('#nf-results-head').innerHTML = grid.children.length
    ? `Explore titles related to: <b>${esc(raw.trim())}</b>`
    : `Your search for "<b>${esc(raw.trim())}</b>" did not have any matches.<br><small>Try a moment, a tag or a row name.</small>`;
  home.scrollTop = 0;
}
function clearSearch(resetInput = true) {
  const input = $('#nf-search-input');
  if (resetInput && input) { input.value = ''; if (document.activeElement !== input) $('#nf-search').classList.remove('is-open'); }
  $('#nf-search').classList.remove('has-text');
  home.classList.remove('is-searching');
  $('#nf-results').hidden = true;
  $('#nf-results-grid').innerHTML = '';
}

// ---- ✎ Edit mode: delete / move rows and tiles, with Undo ----
let undoSnap = null, undoTimer = null;
function changeRows(label, mutate) {
  undoSnap = clone(cfg.rows);
  mutate();
  cfg.rows = cfg.rows.filter((row) => row.items.length);
  persistCfgNow();
  renderRows();
  paintNotes();
  showUndo(label);
}
function showUndo(label) {
  let t = document.getElementById('nf-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'nf-toast';
    t.className = 'nf-toast';
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
    t.addEventListener('click', (e) => {
      if (!e.target.closest('[data-undo]') || !undoSnap) return;
      cfg.rows = undoSnap;
      undoSnap = null;
      persistCfgNow();
      renderRows();
      paintNotes();
      t.classList.remove('is-on');
    });
  }
  document.getElementById('edit-hint')?.classList.remove('is-on');
  t.innerHTML = `<span>${esc(label)}</span><button type="button" data-undo>Undo</button>`;
  t.classList.add('is-on');
  clearTimeout(undoTimer);
  undoTimer = setTimeout(() => { t.classList.remove('is-on'); undoSnap = null; }, 7000);
}
const fileTitle = (file) => file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim().slice(0, 40) || 'New moment';
function addRowFromFiles() {
  pickFiles(true, async (refs) => {
    cfg.rows.push({ title: 'New Row', type: 'landscape', items: refs.map(({ ref, file }) => ({ image: ref, title: fileTitle(file), text: 'Added with love.', tags: [] })) });
    await persistCfgNow();
    renderRows();
    paintNotes();
    const block = document.getElementById(rowId(cfg.rows.length - 1));
    if (block) home.scrollTo({ top: scrollTopOf(block) - 90, behavior: 'smooth' });
    showEditHint('New row added ✓ — click its name to rename it.');
  });
}

// Phones & tablets (no mouse hover, or a coarse finger pointer) get native swipe rows. Kept live,
// so turning a phone sideways, docking a tablet or switching DevTools device mode all keep working.
const touchQuery = matchMedia('(hover: none), (pointer: coarse)');
const isTouch = () => document.body.classList.contains('is-touch');
document.body.classList.toggle('is-touch', touchQuery.matches);
const onTouchChange = () => { document.body.classList.toggle('is-touch', touchQuery.matches); sliderPainters.forEach((p) => p()); };
if (touchQuery.addEventListener) touchQuery.addEventListener('change', onTouchChange); else if (touchQuery.addListener) touchQuery.addListener(onTouchChange);
const slideIndexOf = (src) => Math.max(0, cfg.slides.images.indexOf(src));

const ICON = {
  play: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',
  plus: '<svg class="ic-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><svg class="ic-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg>',
  like: '<svg viewBox="0 0 24 24"><path d="M7 11v9H4v-9zM7 11l4-7c1.5 0 2.5 1 2.5 2.5V10H19a2 2 0 0 1 2 2.3l-1 6.4A2 2 0 0 1 18 20H7"/></svg>',
  more: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  chevL: '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
  chevR: '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
};

function buildRow(row, r) {
  if (!row.items.length) return;
  const block = document.createElement('section');
  block.className = `row-block row-${row.type}`;
  block.id = rowId(r);
  block.innerHTML =
    `<div class="row-head"><h2>${esc(row.title)}</h2><span class="explore">Explore All <b>›</b></span>
       <div class="row-tools" aria-label="Row tools">
         <button type="button" data-tool="up" ${r === 0 ? 'disabled' : ''} aria-label="Move row up">↑</button>
         <button type="button" data-tool="down" ${r === cfg.rows.length - 1 ? 'disabled' : ''} aria-label="Move row down">↓</button>
         <button type="button" data-tool="delete" class="row-del">🗑 Delete row</button>
       </div>
       <div class="row-pages" aria-hidden="true"></div></div>
     <div class="slider"><button class="arrow left" aria-label="Scroll left">${ICON.chevL}</button>
     <div class="track"></div><button class="arrow right" aria-label="Scroll right">${ICON.chevR}</button></div>`;
  const track = block.querySelector('.track');
  row.items.forEach((item, i) => track.appendChild(buildCard(item, row.type, i, { r, i })));
  $('#rows').appendChild(block);
  setupSlider(block);
  block.querySelector('.row-tools').addEventListener('click', (e) => {
    const b = e.target.closest('[data-tool]');
    if (!b || !isEditing()) return;
    const tool = b.dataset.tool;
    if (tool === 'delete') changeRows(`Deleted “${row.title || 'row'}”`, () => cfg.rows.splice(r, 1));
    else {
      const to = r + (tool === 'up' ? -1 : 1);
      if (to < 0 || to >= cfg.rows.length) return;
      changeRows(`Moved “${row.title || 'row'}” ${tool}`, () => { const [x] = cfg.rows.splice(r, 1); cfg.rows.splice(to, 0, x); });
    }
  });
  const h2 = block.querySelector('.row-head h2');
  h2.addEventListener('click', (e) => {
    if (!isEditing()) return;
    e.preventDefault();
    editRow(row);
  });
}

function buildCard(item, type, i, at) {
  const card = document.createElement('div');
  card.className = `card ${type === 'top10' ? 'top10' : type}`;
  card._item = item; // lets the edit popup find (and outline) this card
  let del = null;
  if (at) {
    del = document.createElement('button');
    del.type = 'button';
    del.className = 'tile-del';
    del.setAttribute('aria-label', `Remove ${item.title || 'this tile'}`);
    del.textContent = '×';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isEditing()) return;
      changeRows(`Removed “${item.title || 'tile'}”`, () => cfg.rows[at.r].items.splice(at.i, 1));
    });
  }
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
  // In ✎ edit mode a click anywhere on the card (picture or its title) opens the edit popup.
  poster.addEventListener('click', (e) => {
    if (isEditing()) { e.preventDefault(); editCard(item); return; }
    details();
  });
  card.querySelector('.pv-more').addEventListener('click', details);
  // A click anywhere on the hover preview that isn't one of its buttons opens More Info, like Netflix.
  card.querySelector('.preview').addEventListener('click', (e) => { if (!e.target.closest('button')) details(); });
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
  if (del) card.appendChild(del);
  return card;
}

function setupSlider(block) {
  const slider = block.querySelector('.slider'), track = block.querySelector('.track');
  const left = block.querySelector('.arrow.left'), right = block.querySelector('.arrow.right');
  const pagesEl = block.querySelector('.row-pages');
  let offset = 0;
  const touchMode = () => document.body.classList.contains('is-touch'); // phones: the row scrolls natively
  const maxOffset = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const gap = () => parseFloat(getComputedStyle(track).columnGap) || 0;
  const step = () => track.clientWidth + gap();
  const clamp = (v) => Math.max(0, Math.min(maxOffset(), v));
  const paint = () => {
    offset = Math.min(offset, maxOffset());
    track.style.transform = `translateX(${-offset}px)`;
    left.disabled = offset <= 0;
    right.disabled = offset >= maxOffset() - 1;
    const pages = maxOffset() > 1 ? Math.ceil(maxOffset() / step()) + 1 : 0;
    const cur = offset >= maxOffset() - 1 ? pages - 1 : Math.round(offset / step());
    pagesEl.innerHTML = pages > 1 ? Array.from({ length: pages }, (_, n) => `<i${n === cur ? ' class="is-on"' : ''}></i>`).join('') : '';
  };
  // Settles on the nearest card edge so a swipe never stops halfway through a card.
  const snap = (v) => {
    const card = track.firstElementChild;
    const w = card ? card.getBoundingClientRect().width + gap() : 0;
    return w > 0 && v < maxOffset() - 2 ? clamp(Math.round(v / w) * w) : clamp(v);
  };
  left.addEventListener('click', () => { offset = Math.max(0, offset - step()); paint(); });
  right.addEventListener('click', () => { offset = Math.min(maxOffset(), offset + step()); paint(); });

  // ---- Laptop trackpad: a two-finger sideways swipe (or Shift + mouse wheel) moves the row ----
  let wheelTimer = 0;
  slider.addEventListener('wheel', (e) => {
    if (touchMode() || maxOffset() <= 0) return;
    const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (!sideways) return; // up/down still scrolls the page
    e.preventDefault();    // also stops the browser's "swipe = go back a page" gesture
    track.classList.add('is-dragging');
    offset = clamp(offset + sideways * (e.deltaMode === 1 ? 16 : 1));
    paint();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => { track.classList.remove('is-dragging'); offset = snap(offset); paint(); }, 160);
  }, { passive: false });

  // ---- Drag with a finger (touch-screen laptops), pen or mouse; a quick flick keeps going a bit ----
  let drag = null;
  track.addEventListener('dragstart', (e) => e.preventDefault()); // no "ghost image" when dragging a photo
  track.addEventListener('pointerdown', (e) => {
    if (touchMode() || (e.pointerType === 'mouse' && e.button !== 0) || maxOffset() <= 0) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, start: offset, moved: false, lastX: e.clientX, lastT: performance.now(), v: 0 };
  });
  track.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) >= Math.abs(dx)) { drag = null; return; } // mostly up/down: let the page scroll
      drag.moved = true;
      try { track.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
      track.classList.add('is-dragging');
    }
    const now = performance.now();
    drag.v = (e.clientX - drag.lastX) / Math.max(1, now - drag.lastT); // px per ms
    drag.lastX = e.clientX; drag.lastT = now;
    const raw = drag.start - dx, max = maxOffset();
    offset = raw < 0 ? raw / 3 : raw > max ? max + (raw - max) / 3 : raw; // soft resistance past the ends
    track.style.transform = `translateX(${-offset}px)`;
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if (!d.moved) return;
    track.classList.remove('is-dragging');
    offset = snap(offset - d.v * 260);
    paint();
    // The click that follows a drag must not open the card the finger/mouse happened to end on.
    const swallow = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
    track.addEventListener('click', swallow, true);
    setTimeout(() => track.removeEventListener('click', swallow, true), 80);
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // Brings one card into view (used while the edit popup moves from card to card).
  block.revealCard = (card) => {
    if (!card) return;
    if (touchMode()) { slider.scrollTo({ left: Math.max(0, card.offsetLeft - (slider.clientWidth - card.offsetWidth) / 2), behavior: 'smooth' }); return; }
    const l = card.offsetLeft, r = l + card.offsetWidth;
    if (l < offset || r > offset + track.clientWidth) { offset = snap(l - (track.clientWidth - card.offsetWidth) / 2); paint(); }
  };
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
// Shows hero picture `to`. In "slide" mode the new one pushes in from the right
// (or from the left when going back), so the pictures move one after another.
function heroGo(to, dir = 1) {
  const imgs = [...$('#hero').children];
  if (!imgs.length) return;
  const n = imgs.length;
  to = ((to % n) + n) % n;
  const from = currentHeroIndex();
  if (to === from) return;
  const next = imgs[to], prev = imgs[from];
  if (cfg.hero.effect === 'slide' && prev) {
    next.classList.add('no-anim', dir > 0 ? 'is-next' : 'is-prev');
    next.classList.remove(dir > 0 ? 'is-prev' : 'is-next');
    void next.offsetWidth; // commit the start position before sliding
    next.classList.remove('no-anim');
    prev.classList.remove('is-on', 'is-next', 'is-prev');
    prev.classList.add(dir > 0 ? 'is-prev' : 'is-next');
  } else if (prev) prev.classList.remove('is-on');
  next.classList.remove('is-next', 'is-prev');
  next.classList.add('is-on');
  if (next.tagName === 'VIDEO') next.play().catch(() => {});
  paintHeroFeature(to);
  paintHeroDots(to);
}
function paintHeroDots(active = currentHeroIndex()) {
  const n = $('#hero').children.length;
  $('#hero-dots').innerHTML = n > 1
    ? Array.from({ length: n }, (_, i) => `<button type="button" data-hero="${i}" aria-label="Picture ${i + 1}"${i === active ? ' class="is-on" aria-current="true"' : ''}></button>`).join('')
    : '';
  $('#billboard').classList.toggle('has-many', n > 1);
}
function cycleHero() {
  clearInterval(heroTimer);
  const hero = $('#hero');
  hero.classList.toggle('is-slide', cfg.hero.effect === 'slide');
  const imgs = [...hero.children];
  imgs.forEach((el, i) => { el.classList.remove('is-prev', 'is-next'); el.classList.toggle('is-on', i === 0); });
  paintHeroFeature(0);
  paintHeroDots(0);
  restartHeroTimer();
}
function restartHeroTimer() {
  clearInterval(heroTimer);
  if (!cfg.hero.autoScroll || $('#hero').children.length < 2) return;
  heroTimer = setInterval(() => heroGo(currentHeroIndex() + 1, 1), cfg.hero.interval);
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
  // Shows the ✎ Edit button. (Skip Intro / "start on Home" never pass through the
  // profiles screen, which is where this used to be set — so Edit was missing there.)
  document.body.classList.add('is-ready');
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
    // In edit mode a tap on the picture/video opens the edit popup; otherwise it toggles the controls.
    if (isEditing()) { editSlide(slides.index); return; }
    playerUI.classList.contains('is-hidden') ? showUI() : hideUI();
  });
  // The controls layer covers the whole picture, so while editing (when it stays visible)
  // a tap on the picture lands here, not on #slides — send it to the same popup.
  playerUI.addEventListener('click', (e) => {
    if (!isEditing() || !e.target.isConnected) return;
    if (e.target.closest('#player-title')) { editPlayerText(); return; }
    if (e.target.closest('button, .progress, .tools, .icon')) return;
    editSlide(slides.index);
  });
  $('#finale').addEventListener('click', (e) => {
    if (!isEditing() || e.target.closest('button')) return;
    editFinale();
  });
  playerUI.addEventListener('pointermove', showUI);
  $('#replay').addEventListener('click', () => location.reload());
  $('#finale-home').addEventListener('click', () => openHome(false));
  $('#player-edit-chip').addEventListener('click', () => setEditMode(false));
  // 🔊 sound on/off, in the player's top bar
  const sb = document.createElement('button');
  sb.type = 'button';
  sb.id = 'sound-btn';
  sb.className = 'icon sound-btn';
  sb.addEventListener('click', () => setMuted(!sound.muted));
  const top = playerUI.querySelector('.ui-top');
  top.insertBefore(sb, top.querySelector('.cast'));
  paintSoundBtn();
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
  const paused = player.classList.contains('is-paused');
  // While paused, ‹ › only change the picture — the clock stays stopped until Play.
  if (!slides.running && !paused) { slides.running = true; slides.raf = requestAnimationFrame(frame); }
  if (paused) el.classList.add('is-paused');
  if (el.tagName === 'VIDEO') { try { el.currentTime = 0; } catch (e) { /* not loaded yet */ } if (!paused) playVideo(el); }
  syncMusic();
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
    musicPause();
  } else {
    slides.start = performance.now() - slides.elapsed;
    slides.running = true;
    if (el) { el.classList.remove('is-paused'); if (el.tagName === 'VIDEO') playVideo(el); }
    slides.raf = requestAnimationFrame(frame);
    showUI();
    syncMusic();
  }
}
function stopSlides() {
  slides.running = false;
  cancelAnimationFrame(slides.raf);
  clearTimeout(slides.hideTimer);
  slides.imgs.forEach((el) => { if (el.tagName === 'VIDEO') el.pause(); });
  musicStop();
}
function showFinale() {
  stopSlides();
  hideUI();

  // Build the credits block with dynamic name
  const creditsBlock = document.getElementById('credits-block');
  if (creditsBlock) {
    const rows = [
      ['Starring', esc(cfg.name) || 'The Birthday Star'],
      ['Produced By', 'Everyone Who Loves You'],
      ['Directed By', 'Love &amp; Friendship'],
      ['Special Thanks', 'You, for being you'],
    ];
    creditsBlock.innerHTML = rows.map(([label, value]) =>
      `<div class="credit-row"><span class="credit-label">${label}</span><span class="credit-value">${value}</span></div>`
    ).join('');
  }
  const footerEl = document.getElementById('credits-footer');
  if (footerEl) footerEl.textContent = cfg.footer?.note || `Made with love · ${new Date().getFullYear()}`;

  finale.hidden = false;
  musicPlay(); // the song carries on under the end credits

  // Scroll credits after 1 s delay — calculate distance dynamically
  setTimeout(() => {
    const reel = document.getElementById('credits-reel');
    const wrap = document.getElementById('credits-wrap');
    if (!reel || !wrap) return;
    const reelH = reel.scrollHeight;
    const wrapH = wrap.clientHeight;
    const duration = Math.max(14, (reelH + wrapH) / 55); // 55 px/s
    reel.style.transform = `translateY(${wrapH}px)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reel.style.transition = `transform ${duration}s linear`;
        reel.style.transform = `translateY(-${reelH}px)`;
      });
    });
    // Show action buttons after 60 % of the scroll completes
    setTimeout(() => {
      const actions = document.getElementById('credits-actions');
      if (actions) actions.classList.add('is-visible');
    }, duration * 600);
  }, 1000);
}

/* ---------- Sound: the intro sting + the song during the slideshow ----------
   Browsers block sound until the visitor has tapped once, so anything that gets
   blocked is simply retried on the next tap. 🔊 in the player (and in the profile
   menu) switches every sound on/off and is remembered on this device. */
const sound = {
  muted: (() => { try { return localStorage.getItem('nf-muted') === '1'; } catch (e) { return false; } })(),
  music: null, musicSrc: '', fadeTimer: 0, introDone: false, introWaiting: false, musicWaiting: false,
};
const MUSIC_VOL = 0.6;
function playIntroSound() {
  if (sound.introDone || sound.muted) return;
  const src = srcOf(cfg.introSound);
  if (!src) return;
  const a = new Audio(src);
  a.volume = 0.9;
  const p = a.play();
  if (p && p.then) p.then(() => { sound.introDone = true; sound.introWaiting = false; }, () => { sound.introWaiting = true; });
  else sound.introDone = true;
}
function musicEl() {
  const src = srcOf(cfg.music);
  if (!src) return null;
  if (!sound.music || sound.musicSrc !== src) {
    if (sound.music) sound.music.pause();
    const a = new Audio();
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    a.src = src;
    a.addEventListener('error', () => { if (sound.music === a) { sound.music = null; sound.musicSrc = ''; } }); // missing/broken file → just no music
    sound.music = a;
    sound.musicSrc = src;
  }
  return sound.music;
}
// Fades the song's volume (a timer, not rAF, so it still finishes in a background tab).
function musicFade(to, ms, then) {
  const a = sound.music;
  if (!a) return;
  clearInterval(sound.fadeTimer);
  const from = a.volume, t0 = Date.now();
  sound.fadeTimer = setInterval(() => {
    const k = Math.min(1, (Date.now() - t0) / ms);
    try { a.volume = Math.max(0, Math.min(1, from + (to - from) * k)); } catch (e) { /* iOS: volume is read-only */ }
    if (k >= 1) { clearInterval(sound.fadeTimer); if (then) then(); }
  }, 30);
}
function musicPlay() {
  if (sound.muted) return;
  const a = musicEl();
  if (!a) return;
  const p = a.play();
  if (p && p.then) p.then(() => { sound.musicWaiting = false; }, () => { sound.musicWaiting = true; });
  musicFade(MUSIC_VOL, 900);
}
function musicPause(ms = 350) {
  const a = sound.music;
  if (!a || a.paused) return;
  musicFade(0, ms, () => a.pause());
}
function musicStop() {
  const a = sound.music;
  if (!a) return;
  musicFade(0, 600, () => { a.pause(); try { a.currentTime = 0; } catch (e) { /* not loaded */ } });
}
// In the player: the song plays under photos, and waits while a video slide plays its own sound.
function syncMusic() {
  if (player.hidden || player.classList.contains('is-paused')) return;
  if (!finale.hidden) { musicPlay(); return; }
  const el = slides.imgs[slides.index];
  if (el && el.tagName === 'VIDEO') musicPause(); else musicPlay();
}
function resetMusic() {
  if (sound.music) { clearInterval(sound.fadeTimer); sound.music.pause(); sound.music.removeAttribute('src'); sound.music = null; sound.musicSrc = ''; }
  syncMusic();
}
function setMuted(m) {
  sound.muted = !!m;
  try { localStorage.setItem('nf-muted', m ? '1' : '0'); } catch (e) { /* private mode */ }
  slides.imgs.forEach((el) => { if (el.tagName === 'VIDEO') el.muted = sound.muted; });
  if (sound.muted) musicPause(150); else syncMusic();
  paintSoundBtn();
  paintAccount();
}
const SOUND_ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/></svg>';
const SOUND_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg>';
function paintSoundBtn() {
  const b = document.getElementById('sound-btn');
  if (!b) return;
  // Both icons stay in the button and only swap visibility — replacing them mid-click would
  // detach the clicked element and confuse the click handlers further up.
  if (!b.firstElementChild) b.innerHTML = `<span class="snd-on">${SOUND_ON}</span><span class="snd-off">${SOUND_OFF}</span>`;
  b.classList.toggle('is-muted', sound.muted);
  b.setAttribute('aria-label', sound.muted ? 'Turn sound on' : 'Turn sound off');
  b.setAttribute('aria-pressed', String(!sound.muted));
}
// The first tap after a blocked sound plays it (intro on the logo / profiles screen, song in the player).
document.addEventListener('pointerdown', () => {
  if (sound.introWaiting && !sound.introDone && (!intro.hidden || !profiles.hidden)) { sound.introWaiting = false; playIntroSound(); }
  if (sound.musicWaiting && !player.hidden) { sound.musicWaiting = false; setTimeout(syncMusic, 0); }
}, true);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { if (sound.music && !sound.music.paused) sound.music.pause(); }
  else syncMusic();
});

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
  typeGen++; // stop a half-finished typewriter so it can't append to the new title
  $('#title-text').textContent = fullTitle();
  $('#title').classList.add('done');
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
  if (ep.spec) epClose(); // never show the edit popup and the panel together
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
      <div class="cz-group"><h3>Page names</h3><div class="cz-two">
      ${field('Browser tab name ({name} = the name)', 'pageTitle', d.pageTitle)}
      ${field('Profiles screen heading', 'profilesHeading', d.profilesHeading)}</div>
      <p class="cz-hint">Row names are the links in the top bar — rename them in the Rows tab.</p></div>
      <div class="cz-group"><h3>Top bar &amp; badge</h3><div class="cz-two">
      ${field('Logo text (top-left)', 'brand', d.brand)}
      ${field('TOP 10 line (empty = hide)', 'rank', d.rank)}</div></div>
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
      <div class="cz-group"><h3>Scrolling</h3>
      ${toggle('Auto-scroll the pictures one after another', 'hero.autoScroll', d.hero.autoScroll)}
      <div class="cz-two">${field('Seconds each one stays', 'hero.interval', Math.round(d.hero.interval / 1000), 'num', 'min="1" max="60" data-unit="s"')}
      <label class="cz-field"><span>Effect</span><select data-path="hero.effect" aria-label="Hero effect">
        <option value="slide" ${d.hero.effect === 'slide' ? 'selected' : ''}>Slide — one after another</option>
        <option value="fade" ${d.hero.effect === 'fade' ? 'selected' : ''}>Fade</option></select></label></div>
      <p class="cz-hint">With auto-scroll off, the arrows and dots on the big picture still move between them.</p></div>`;
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
      <div class="cz-group"><h3>When the page opens</h3>
      <label class="cz-field"><span>Start screen</span><select data-path="startScreen" aria-label="Start screen">
        <option value="intro" ${d.startScreen === 'intro' ? 'selected' : ''}>Logo intro, then Who’s watching? (with Skip)</option>
        <option value="profiles" ${d.startScreen === 'profiles' ? 'selected' : ''}>Who’s watching? (with Skip)</option>
        <option value="home" ${d.startScreen === 'home' ? 'selected' : ''}>Straight to the home page</option></select></label></div>
      <div class="cz-group"><h3>Playback</h3>
      ${toggle('Auto-play: a cursor walks through the site like the video', 'autoplay', d.autoplay)}
      ${field('Seconds between pictures inside a hover preview', 'previewInterval', (d.previewInterval / 1000).toFixed(1), 'num', 'min="0.5" max="10" step="0.5"')}
      ${field('Intro sound file (\x27\x27 = silent)', 'introSound', d.introSound)}
      ${field('Song during the slideshow (\x27\x27 = none)', 'music', d.music)}
      <p class="cz-hint">To use your own song, press ✎ Edit → 🎵 Change the music.</p></div>
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
    if (id) { setPath(draft, el.dataset.file, id); renderTab(); status('Changed — press Save & apply to see it on the site.'); }
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
    const forGift = !!(giftCtx && giftCtx.owner);
    for (const [id, blob] of pending) {
      if (!used.has(id)) continue;
      if (forGift) { // the creator editing a gift: every file goes to her gift
        const { ref } = await resolveUploadRef(blob, { audio: /^audio\//.test(blob.type || '') });
        if (ref !== id) urlMap.set(id, ref);
        continue;
      }
      if (cloudOn()) {
        try { const up = await GiftStore.cloudUploadMedia(blob, 'site'); if (up) { urlMap.set(id, up.url); continue; } }
        catch (e) { cloudFailures++; console.warn('Cloud upload failed, saving this one to the browser instead:', e); }
      }
      if (storageOK) await store.putMedia(id, blob); // local fallback (or the only option, if cloud isn't set up)
    }
    if (urlMap.size) replaceRefs(next, urlMap);
    if (forGift) await GiftStore.saveGiftConfig(giftCtx.slug, next);
    else if (storageOK) {
      await store.putConfig(next);
      for (const id of [...media.keys()]) if (!used.has(id) || urlMap.has(id)) { await store.delMedia(id).catch(() => {}); URL.revokeObjectURL(media.get(id).url); media.delete(id); }
    }
    pending.clear();
    cfg = next;
    draft = clone(cfg);
    rerender();
    const savedWhere = forGift ? 'Saved to her page ✓ — she sees it on her link.'
      : urlMap.size && !cloudFailures ? 'Saved to the cloud ✓ — works on any device.'
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
    if (giftCtx && giftCtx.owner) { // a gift: back to the page built from its photos (this browser's own page untouched)
      cfg = normalise(clone(config));
      applyGiftMedia(giftCtx.gift, giftCtx.media);
      cfg.autoplay = false;
      await GiftStore.saveGiftConfig(giftCtx.slug, cfg);
      draft = clone(cfg);
      rerender();
      renderTab();
      status('Her page is back to how it started.', 'ok');
      return;
    }
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
   ✎ LIVE EDIT MODE
   Press ✎ Edit (bottom-right) and the page becomes editable: a click on any
   card, photo, video or piece of text opens an on-screen popup that shows
   what's there now and asks what to change. Nothing changes until you press
   "Save changes" — Cancel, × or Esc leave the page exactly as it was.
   Saved changes use the same storage as the Customize panel (the cloud when
   cloud-config.js is set up, otherwise this browser), so they survive a reload.
   ===================================================================== */
const isEditing = () => document.body.classList.contains('edit-mode');
// Saves cfg. Resolves true when it was stored, false when this browser can't keep it.
function persistCfgNow() {
  // The creator editing a gift: save to HER link (the cloud), never to this browser's own page.
  if (giftCtx && giftCtx.owner) {
    return GiftStore.saveGiftConfig(giftCtx.slug, cfg).then(() => true, (e) => { console.warn('Could not save that change to the gift:', e); return false; });
  }
  if (!storageOK) return Promise.resolve(false);
  return store.putConfig(cfg).then(() => true, (e) => { console.warn('Could not save that change:', e); return false; });
}
// Validates a chosen file and stores it — cloud first when configured, this browser
// otherwise — returning the reference to put into cfg. Throws a friendly message on a bad file.
// A song / sound file? (Some systems leave file.type empty, so the extension counts too.)
const isAudioFile = (file) => /^audio\//.test(file.type) || (!file.type && /\.(mp3|m4a|aac|wav|ogg|oga|opus|flac)$/i.test(file.name));
async function resolveUploadRef(file, opts = {}) {
  if (opts.audio ? !isAudioFile(file) : !/^(image|video)\//.test(file.type)) throw new Error(`"${file.name}" isn't ${opts.audio ? 'a song / sound file' : 'a photo or a video'}.`);
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`"${file.name}" is bigger than ${MAX_MB} MB — please use a smaller file.`);
  // The creator editing a gift: the file goes to HER gift (photos, videos and songs), so she sees it too.
  if (giftCtx && giftCtx.owner) {
    let timer = 0;
    const limit = Math.max(60000, (file.size / 100000) * 1000);
    try {
      const up = await Promise.race([
        GiftStore.uploadGiftAsset(giftCtx.slug, file),
        new Promise((_, no) => { timer = setTimeout(() => no(new Error('The upload is taking too long — check your internet connection and try again.')), limit); }),
      ]);
      if (up && up.url) return { ref: up.url, cloud: true };
    } finally { clearTimeout(timer); }
    // demo mode (no cloud): fall through and keep it in this browser
  }
  // Songs stay in this browser: the general cloud upload only accepts photos and videos.
  // Not signed in → the cloud would refuse, so don't even ask.
  else if (cloudOn() && !opts.audio && GiftStore.Auth && GiftStore.Auth.isSignedIn()) {
    // Never wait forever on a stalled connection: allow ~100 KB/s (at least 45 s), then
    // keep the file in this browser instead so the save still finishes.
    const limit = Math.max(45000, (file.size / 100000) * 1000);
    let timer = 0;
    try {
      const up = await Promise.race([
        GiftStore.cloudUploadMedia(file, 'site'),
        new Promise((_, no) => { timer = setTimeout(() => no(new Error('the cloud took too long to answer')), limit); }),
      ]);
      if (up && up.url) return { ref: up.url, cloud: true };
    } catch (e) {
      console.info('Cloud upload unavailable, keeping this file in the browser instead:', e.message || e);
    } finally { clearTimeout(timer); }
  }
  const id = uid();
  registerBlob(id, file);
  if (storageOK) { try { await store.putMedia(id, file); } catch (e) { console.warn('Could not save this file:', e); } }
  return { ref: id, cloud: false };
}
// Opens the file chooser (one or several photos/videos), stores each choice and hands
// back [{ ref, file }]. Bad files are skipped with a friendly message. Must be called
// straight from a click, or the browser refuses to open the chooser.
function pickFiles(multiple, onRefs) {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*,video/*'; input.multiple = !!multiple; input.hidden = true;
  document.body.appendChild(input);
  input.addEventListener('cancel', () => input.remove());
  input.addEventListener('change', async () => {
    const files = [...(input.files || [])];
    input.remove();
    if (!files.length) return;
    showEditHint(`Saving ${files.length} file${files.length > 1 ? 's' : ''}…`);
    const out = [];
    let lastErr = '';
    for (const file of files) {
      try { out.push({ ref: (await resolveUploadRef(file)).ref, file }); }
      catch (e) { lastErr = e.message || 'Could not save that file.'; }
    }
    if (!out.length) { editError(lastErr || 'Nothing was added.'); return; }
    try { await onRefs(out); } catch (e) { editError(e.message || 'Could not add those files.'); return; }
    if (lastErr) editError(`${lastErr} The others were added.`);
  });
  input.click();
}
// Frees uploaded files nothing points at any more (e.g. the photo a card had before
// you changed it), so the browser's storage doesn't fill up with old versions.
function pruneMedia() {
  if (!storageOK || giftCtx) return; // a gift's files live in the cloud — never touch this browser's own page files
  const keep = collectRefs(cfg);
  if (undoSnap) collectRefs(undoSnap, keep);
  pending.forEach((_, id) => keep.add(id));
  for (const [id, m] of [...media]) {
    if (keep.has(id)) continue;
    URL.revokeObjectURL(m.url);
    media.delete(id);
    store.delMedia(id).catch(() => {});
  }
}
const splitList = (s) => String(s ?? '').split(',').map((x) => x.trim()).filter(Boolean);
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/* ---------- The edit popup ---------- */
const ep = { el: null, spec: null, media: [], dirty: false, busy: false, resumePlayer: false, opener: null, armed: -1, armTimer: 0, ask: null, target: null };
const ARROW_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>';
const ARROW_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';

function epEnsure() {
  if (ep.el) return ep.el;
  const el = document.createElement('div');
  el.id = 'ep';
  el.className = 'ep';
  el.hidden = true;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'ep-title');
  el.innerHTML = `<div class="ep-card" tabindex="-1">
      <header class="ep-head">
        <div class="ep-head-text"><p class="ep-kicker"><span aria-hidden="true">✎</span> Edit mode<span class="ep-swipe" id="ep-swipe"></span></p><h2 id="ep-title"></h2><p class="ep-sub" id="ep-sub"></p></div>
        <div class="ep-nav" id="ep-nav" hidden>
          <button type="button" class="ep-arrow" data-ep="prev" aria-label="Previous one">${ARROW_L}</button>
          <span class="ep-count" id="ep-count" aria-live="polite"></span>
          <button type="button" class="ep-arrow" data-ep="next" aria-label="Next one">${ARROW_R}</button>
        </div>
        <button type="button" class="ep-x" data-ep="cancel" aria-label="Close without saving">×</button>
      </header>
      <div class="ep-body" id="ep-body"></div>
      <p class="ep-msg" id="ep-msg" role="status" aria-live="polite"></p>
      <div class="ep-ask" id="ep-ask" hidden></div>
      <footer class="ep-foot"><div class="ep-tools" id="ep-tools"></div>
        <div class="ep-main"><button type="button" class="ep-btn ep-ghost" data-ep="cancel">Cancel</button>
        <button type="button" class="ep-btn ep-primary" data-ep="save" id="ep-save">Save changes</button></div></footer>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', epClick);
  el.addEventListener('input', (e) => { if (e.target.closest('#ep-body') && !e.target.dataset.file) epDirty(); });
  el.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.file != null) { const f = t.files && t.files[0]; t.value = ''; if (f) epSetFile(Number(t.dataset.file), f); return; }
    if (t.closest('#ep-body')) epDirty();
  });
  // Drag a photo, video or song from the computer straight onto its square.
  el.addEventListener('dragover', (e) => { const t = e.target.closest('.ep-thumb'); if (!t) return; e.preventDefault(); t.classList.add('is-drop'); });
  el.addEventListener('dragleave', (e) => { const t = e.target.closest('.ep-thumb'); if (t) t.classList.remove('is-drop'); });
  el.addEventListener('drop', (e) => {
    const t = e.target.closest('.ep-thumb');
    if (!t) return;
    e.preventDefault();
    t.classList.remove('is-drop');
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) epSetFile(Number(t.dataset.m), f);
  });
  // Swipe left / right on the popup = the next / previous card (phones and touch screens).
  let sw = null;
  el.addEventListener('touchstart', (e) => {
    sw = null;
    if (!ep.spec || !ep.spec.nav || e.touches.length !== 1 || e.target.closest('input, textarea, select, audio')) return;
    sw = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
  }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (!sw) return;
    const t = e.changedTouches[0], dx = t.clientX - sw.x, dy = t.clientY - sw.y, quick = Date.now() - sw.t < 800;
    sw = null;
    if (quick && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) epGo(dx < 0 ? 1 : -1);
  }, { passive: true });
  // Two-finger sideways swipe on a laptop trackpad does the same.
  let wheelAcc = 0, wheelLock = 0, wheelIdle = 0;
  el.addEventListener('wheel', (e) => {
    if (!ep.spec || !ep.spec.nav || Math.abs(e.deltaX) <= Math.abs(e.deltaY) || e.target.closest('textarea, input, audio')) return;
    e.preventDefault();
    if (Date.now() < wheelLock) return;
    wheelAcc += e.deltaX;
    clearTimeout(wheelIdle);
    wheelIdle = setTimeout(() => { wheelAcc = 0; }, 220);
    if (Math.abs(wheelAcc) > 90) { const d = wheelAcc > 0 ? 1 : -1; wheelAcc = 0; wheelLock = Date.now() + 650; epGo(d); }
  }, { passive: false });
  ep.el = el;
  return el;
}

// spec = { title, sub (text or function), media: [{ label, value, kind: 'audio'?, optional, shape, hint }],
//          fields: [{ key, label, value, kind: text|area|num|select|check, half, max, options, hint }],
//          tools: [{ label, run, disabled(), danger, close }], nav: { count(), prev(), next() },
//          target() (element to outline on the page), onShow(), note, validate(vals), save(vals, refs), refresh() }
function openEditor(spec, opts = {}) {
  if (!isEditing()) return;
  if (ep.spec) epClose();
  epEnsure();
  stopAuto();
  closePops();
  closeModal();
  ep.spec = spec;
  ep.dirty = false;
  ep.busy = false;
  ep.armed = -1;
  ep.opener = document.activeElement;
  ep.media = (spec.media || []).map(() => ({ file: null, url: '', cleared: false }));
  $('#ep-title').textContent = spec.title;
  $('#ep-body').innerHTML = (spec.media || []).map(epMediaHTML).join('') +
    (spec.fields || []).map(epFieldHTML).join('') +
    (spec.note ? `<p class="ep-note">${esc(spec.note)}</p>` : '');
  $('#ep-body').scrollTop = 0; // each card starts at its top (the box is reused when swiping)
  ep.media.forEach((_, i) => epPaintMedia(i));
  epRefresh();
  epMsg('');
  epHideAsk();
  epBusy(false);
  // Hold still whatever moves underneath while the popup is open.
  clearInterval(heroTimer);
  ep.resumePlayer = false;
  if (!player.hidden && finale.hidden && !player.classList.contains('is-paused')) { togglePause(); ep.resumePlayer = true; }
  ep.el.hidden = false;
  document.body.classList.add('ep-open');
  try { if (spec.onShow) spec.onShow(); } catch (err) { console.warn(err); }
  epSetTarget(spec.target ? spec.target() : null);
  requestAnimationFrame(() => {
    if (!ep.spec) return;
    // Jump into the first text box with a mouse — but not on phones (no surprise keyboard) and
    // not after ‹ › (so the arrow keys keep moving between cards).
    const first = !opts.fromNav && !isTouch() && ep.el.querySelector('#ep-body input:not([type=file]):not([type=checkbox]), #ep-body textarea');
    if (first) { first.focus(); if (first.select && first.type !== 'number') first.select(); }
    else ep.el.querySelector('.ep-card').focus({ preventScroll: true });
  });
}
// soft = we're only switching to the next card: keep the player paused and the backdrop up.
function epClose(soft = false) {
  if (!ep.spec) return;
  clearTimeout(ep.armTimer);
  ep.media.forEach((m) => { if (m.url) URL.revokeObjectURL(m.url); });
  ep.media = [];
  ep.spec = null;
  ep.busy = false;
  ep.ask = null;
  epSetTarget(null);
  ep.el.hidden = true;
  ep.el.classList.remove('is-busy');
  $('#ep-body').innerHTML = ''; // also stops any preview video / song
  document.body.classList.remove('ep-open');
  if (soft) return;
  if (ep.resumePlayer && !player.hidden && player.classList.contains('is-paused')) togglePause();
  ep.resumePlayer = false;
  if (!home.hidden) restartHeroTimer();
  const back = ep.opener;
  ep.opener = null;
  if (back && back.focus && document.contains(back)) back.focus({ preventScroll: true });
}
function epCancel() {
  if (!ep.spec || ep.busy) return;
  if (ep.dirty) { epAsk('close'); return; }
  epClose();
}
// The little question bar: "throw changes away?" (closing) or "save before moving on?" (‹ ›).
function epAsk(kind, go) {
  ep.ask = { kind, go };
  const box = $('#ep-ask');
  box.innerHTML = kind === 'nav'
    ? '<span>Save your changes before moving on?</span><button type="button" class="ep-btn ep-ghost" data-ep="ask-keep">Stay</button><button type="button" class="ep-btn ep-ghost" data-ep="ask-drop">Don’t save</button><button type="button" class="ep-btn ep-primary" data-ep="ask-save">Save &amp; go</button>'
    : '<span>You changed something. Throw those changes away?</span><button type="button" class="ep-btn ep-ghost" data-ep="ask-keep">Keep editing</button><button type="button" class="ep-btn ep-danger-solid" data-ep="ask-drop">Discard</button>';
  box.hidden = false;
  box.querySelector(kind === 'nav' ? '[data-ep="ask-save"]' : '[data-ep="ask-keep"]').focus();
}
function epHideAsk() {
  ep.ask = null;
  const box = $('#ep-ask');
  if (box) { box.hidden = true; box.innerHTML = ''; }
}
// ‹ › — open the neighbour (card, slide, background, profile, row) without closing the popup.
function epGo(dir) {
  if (!ep.spec || ep.busy || !ep.spec.nav) return;
  const open = dir < 0 ? ep.spec.nav.prev() : ep.spec.nav.next();
  const card = ep.el.querySelector('.ep-card');
  if (!open) { card.classList.remove('ep-bump'); void card.offsetWidth; card.classList.add('ep-bump'); return; } // already at the end
  const go = () => epSwitch(open, dir);
  if (ep.dirty) { epAsk('nav', go); return; }
  go();
}
function epSwitch(open, dir) {
  const resume = ep.resumePlayer, opener = ep.opener;
  epClose(true);
  open({ fromNav: true });
  if (ep.spec) {
    ep.resumePlayer = ep.resumePlayer || resume;
    ep.opener = opener;
    const card = ep.el.querySelector('.ep-card');
    card.classList.remove('ep-in-next', 'ep-in-prev', 'ep-bump');
    void card.offsetWidth; // restart the slide-in animation
    card.classList.add(dir > 0 ? 'ep-in-next' : 'ep-in-prev');
  } else {
    if (resume && !player.hidden && player.classList.contains('is-paused')) togglePause();
    if (!home.hidden) restartHeroTimer();
  }
}
// Outlines (in red) the thing being edited on the page behind, and scrolls it into view.
function epSetTarget(el) {
  if (ep.target && ep.target !== el) ep.target.classList.remove('ep-target');
  ep.target = el || null;
  if (!el) return;
  el.classList.add('ep-target');
  const block = el.closest('.row-block');
  if (block) {
    if (el.classList.contains('card') && block.revealCard) block.revealCard(el);
    const top = scrollTopOf(block) - 80;
    if (!home.hidden && (top < home.scrollTop || top > home.scrollTop + home.clientHeight - 200)) home.scrollTo({ top, behavior: 'smooth' });
  }
}
function epDirty() {
  ep.dirty = true;
  epHideAsk();
}
function epMsg(text, isError) {
  const m = $('#ep-msg');
  if (!m) return;
  m.textContent = text || '';
  m.classList.toggle('is-error', !!isError);
}
function epBusy(on) {
  ep.busy = on;
  ep.el.classList.toggle('is-busy', on);
  ep.el.querySelectorAll('.ep-foot button, .ep-x').forEach((b) => { b.disabled = on || (b.dataset.tool != null && b.dataset.off === '1'); });
  $('#ep-save').textContent = on ? 'Saving…' : 'Save changes';
  epPaintNav();
}
function epPaintNav() {
  const nav = ep.spec && ep.spec.nav;
  const box = $('#ep-nav');
  if (!box) return;
  box.hidden = !nav;
  $('#ep-swipe').textContent = nav ? (isTouch() ? ' · swipe for the next one' : ' · ‹ › or ← → for the next one') : '';
  if (!nav) return;
  $('#ep-count').textContent = nav.count ? nav.count() : '';
  box.querySelector('[data-ep="prev"]').disabled = ep.busy || !nav.prev();
  box.querySelector('[data-ep="next"]').disabled = ep.busy || !nav.next();
}
// Re-draws the subtitle, the ‹ › arrows and the tool buttons (positions/counts change after a move or an add).
function epRefresh() {
  if (!ep.spec) return;
  const s = ep.spec;
  $('#ep-sub').textContent = typeof s.sub === 'function' ? s.sub() : (s.sub || '');
  $('#ep-tools').innerHTML = (s.tools || []).map((t, i) => {
    const off = !!(t.disabled && t.disabled());
    return `<button type="button" class="ep-btn ep-tool${t.danger ? ' ep-danger' : ''}" data-tool="${i}" data-off="${off ? 1 : 0}"${off ? ' disabled' : ''}>${esc(t.label)}</button>`;
  }).join('');
  epPaintNav();
}
function epMediaHTML(m, i) {
  const audio = m.kind === 'audio';
  return `<div class="ep-media is-${audio ? 'audio' : (m.shape || 'wide')}">
      <button type="button" class="ep-thumb" data-m="${i}" data-pick="${i}" aria-label="Change ${esc(m.label)}" title="Click to choose, or drop a ${audio ? 'song' : 'photo / video'} here"></button>
      <div class="ep-media-side">
        <p class="ep-label">${esc(m.label)}</p>
        <p class="ep-kind" id="ep-kind-${i}"></p>
        ${audio ? `<audio class="ep-audio" id="ep-aud-${i}" controls preload="none" hidden></audio>` : ''}
        <div class="ep-media-btns">
          <button type="button" class="ep-btn" data-pick="${i}"><span aria-hidden="true">${audio ? '🎵' : '📷'}</span> ${audio ? 'Choose a song' : 'Change photo / video'}</button>
          ${m.optional ? `<button type="button" class="ep-btn ep-ghost" data-clear="${i}">${audio ? 'No sound' : 'Remove'}</button>` : ''}
          <button type="button" class="ep-btn ep-ghost" data-revert="${i}" hidden>Undo</button>
        </div>
        ${m.hint ? `<p class="ep-hint">${esc(m.hint)}</p>` : ''}
        <input type="file" accept="${audio ? 'audio/*,.mp3,.m4a,.aac,.wav,.ogg' : 'image/*,video/*'}" data-file="${i}" hidden>
      </div>
    </div>`;
}
const audioName = (ref) => (isUpload(ref) ? 'Your uploaded song' : decodeURIComponent(String(ref).split('/').pop() || 'song'));
function epPaintMedia(i) {
  const m = ep.spec.media[i], st = ep.media[i];
  const thumb = ep.el.querySelector(`.ep-thumb[data-m="${i}"]`);
  const kind = document.getElementById(`ep-kind-${i}`);
  if (!thumb || !kind) return;
  thumb.innerHTML = '';
  thumb.classList.toggle('is-new', !!st.file);
  const revert = ep.el.querySelector(`[data-revert="${i}"]`);
  if (revert) revert.hidden = !(st.file || st.cleared);
  const clear = ep.el.querySelector(`[data-clear="${i}"]`);
  if (clear) clear.hidden = st.cleared || (!st.file && !srcOf(m.value));
  if (m.kind === 'audio') {
    const src = st.file ? st.url : (st.cleared ? '' : srcOf(m.value));
    thumb.innerHTML = `<span class="ep-note-art${src ? '' : ' is-off'}" aria-hidden="true">${src ? '♪' : '🔇'}</span>`;
    kind.textContent = st.file ? `New song: ${st.file.name} — goes live when you press Save`
      : st.cleared ? 'No sound — happens when you press Save'
      : src ? `🎵 ${audioName(m.value)} — press ▶ to listen` : 'No sound yet — choose a song';
    const au = document.getElementById(`ep-aud-${i}`);
    if (au) {
      au.pause();
      if (src) { if (au.getAttribute('src') !== src) au.src = src; au.hidden = false; }
      else { au.removeAttribute('src'); au.hidden = true; }
    }
    return;
  }
  let node, text;
  if (st.file) {
    const vid = st.file.type.startsWith('video/');
    node = document.createElement(vid ? 'video' : 'img');
    node.src = st.url;
    if (vid) { node.muted = true; node.loop = true; node.autoplay = true; node.playsInline = true; node.setAttribute('playsinline', ''); node.play().catch(() => {}); }
    else node.alt = '';
    text = `New ${vid ? 'video' : 'photo'}: ${st.file.name} — goes live when you press Save`;
  } else if (st.cleared || !srcOf(m.value)) {
    node = mediaEl('');
    text = st.cleared ? 'Will be removed when you press Save' : 'Empty — choose a photo or a video';
  } else {
    node = mediaEl(m.value);
    text = isVideo(m.value) ? '🎬 Video showing now' : '🖼 Photo showing now';
  }
  thumb.appendChild(node);
  kind.textContent = text;
}
function epSetFile(i, file) {
  if (!ep.spec || ep.busy || !ep.media[i]) return;
  const audio = ep.spec.media[i].kind === 'audio';
  if (audio ? !isAudioFile(file) : !/^(image|video)\//.test(file.type)) {
    epMsg(`"${file.name}" isn't ${audio ? 'a song / sound file' : 'a photo or a video'} — please pick another file.`, true);
    return;
  }
  if (file.size > MAX_MB * 1024 * 1024) { epMsg(`"${file.name}" is bigger than ${MAX_MB} MB — please pick a smaller file.`, true); return; }
  const st = ep.media[i];
  if (st.url) URL.revokeObjectURL(st.url);
  st.file = file;
  st.url = URL.createObjectURL(file);
  st.cleared = false;
  epDirty();
  epMsg('');
  epPaintMedia(i);
}
function epFieldHTML(f) {
  const id = `ep-f-${f.key}`;
  const attrs = `id="${id}" data-key="${f.key}"${f.max ? ` maxlength="${f.max}"` : ''}${f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : ''}`;
  let ctl;
  if (f.kind === 'check') {
    return `<label class="ep-check" for="${id}"><input type="checkbox" id="${id}" data-key="${f.key}"${f.value ? ' checked' : ''}><span>${esc(f.label)}</span></label>`;
  } else if (f.kind === 'area') {
    ctl = `<textarea ${attrs} rows="${f.rows || 4}">${esc(f.value ?? '')}</textarea>`;
  } else if (f.kind === 'select') {
    ctl = `<select id="${id}" data-key="${f.key}">${f.options.map(([v, l]) => `<option value="${esc(v)}"${v === f.value ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  } else {
    ctl = `<input ${attrs} type="${f.kind === 'num' ? 'number' : 'text'}" value="${esc(f.value ?? '')}" autocomplete="off"${f.attrs ? ' ' + f.attrs : ''}>`;
  }
  return `<label class="ep-field${f.half ? ' is-half' : ''}" for="${id}"><span>${esc(f.label)}</span>${ctl}${f.hint ? `<small>${esc(f.hint)}</small>` : ''}</label>`;
}
function epValues() {
  const v = {};
  ep.el.querySelectorAll('#ep-body [data-key]').forEach((c) => { v[c.dataset.key] = c.type === 'checkbox' ? c.checked : c.value; });
  return v;
}
function epClick(e) {
  if (e.target === ep.el) { epCancel(); return; } // click on the dark backdrop
  const b = e.target.closest('button');
  if (!b || !ep.spec || b.disabled) return;
  if (b.dataset.pick != null) { if (!ep.busy) ep.el.querySelector(`input[data-file="${b.dataset.pick}"]`).click(); return; }
  if (b.dataset.clear != null) {
    const st = ep.media[Number(b.dataset.clear)];
    if (st.url) URL.revokeObjectURL(st.url);
    Object.assign(st, { file: null, url: '', cleared: true });
    epDirty();
    epPaintMedia(Number(b.dataset.clear));
    return;
  }
  if (b.dataset.revert != null) {
    const st = ep.media[Number(b.dataset.revert)];
    if (st.url) URL.revokeObjectURL(st.url);
    Object.assign(st, { file: null, url: '', cleared: false });
    epPaintMedia(Number(b.dataset.revert));
    return;
  }
  if (b.dataset.tool != null) { epTool(Number(b.dataset.tool), b); return; }
  const act = b.dataset.ep;
  const ask = ep.ask;
  if (act === 'save') epSave();
  else if (act === 'cancel') epCancel();
  else if (act === 'prev') epGo(-1);
  else if (act === 'next') epGo(1);
  else if (act === 'ask-keep') epHideAsk();
  else if (act === 'ask-drop') { epHideAsk(); if (ask && ask.kind === 'nav') ask.go(); else epClose(); }
  else if (act === 'ask-save') { epHideAsk(); epSave(ask && ask.go); }
}
function epTool(i, btn) {
  const t = ep.spec.tools[i];
  if (!t || ep.busy) return;
  // Anything destructive asks once more, right on the button.
  if (t.danger && ep.armed !== i) {
    ep.armed = i;
    btn.textContent = t.confirm || 'Sure? Click again';
    btn.classList.add('is-armed');
    clearTimeout(ep.armTimer);
    ep.armTimer = setTimeout(() => { ep.armed = -1; epRefresh(); }, 4000);
    return;
  }
  ep.armed = -1;
  clearTimeout(ep.armTimer);
  if (t.close) epClose();
  const fail = (err) => (ep.spec ? epMsg(err.message || 'That did not work — please try again.', true) : editError(err.message || 'That did not work.'));
  // run() is called synchronously — a file chooser may only open straight from a click.
  let result;
  try { result = t.run(); } catch (err) { fail(err); return; }
  Promise.resolve(result).then(() => epRefresh(), fail);
}
// after = what to do once saved (used by "Save & go" to open the next card).
async function epSave(after) {
  if (ep.busy || !ep.spec) return;
  const spec = ep.spec;
  if (!ep.dirty) {
    if (after) { after(); return; }
    epClose();
    showEditHint('Nothing changed — no need to save.');
    return;
  }
  const vals = epValues();
  const problem = spec.validate && spec.validate(vals);
  if (problem) { epMsg(problem, true); return; }
  epBusy(true);
  try {
    const refs = [];
    for (let i = 0; i < ep.media.length; i++) {
      const st = ep.media[i], audio = spec.media[i].kind === 'audio';
      if (st.file) { epMsg(cloudOn() && !audio ? 'Uploading your file…' : 'Saving your file…'); refs[i] = (await resolveUploadRef(st.file, { audio })).ref; }
      else refs[i] = st.cleared ? '' : undefined;
    }
    epMsg('Saving…');
    await spec.save(vals, refs);
    const kept = await persistCfgNow();
    (spec.refresh || refreshAll)();
    if (after) after(); else epClose();
    pruneMedia();
    showEditHint(kept ? (spec.saved || 'Saved ✓ — your change is live on the page.') : 'Changed for this visit — this browser could not save it for next time.', !kept);
  } catch (err) {
    if (ep.spec === spec) { epBusy(false); epMsg(err.message || 'Could not save — please try again.', true); }
  }
}
// Keys while the popup is open. Runs before the page's own key handlers (capture on
// window), so Esc closes only the popup — never the player behind it.
window.addEventListener('keydown', (e) => {
  if (!ep.spec) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (ep.ask) epHideAsk(); else epCancel();
    return;
  }
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
    if (e.target.closest && e.target.closest('input, textarea, select, audio')) return; // moving the text cursor
    e.preventDefault();
    e.stopImmediatePropagation();
    epGo(e.key === 'ArrowLeft' ? -1 : 1);
    return;
  }
  if (e.key === 'Enter' && !e.isComposing) {
    const t = e.target;
    if ((e.ctrlKey || e.metaKey) || (t.matches && t.matches('#ep-body input[type=text], #ep-body input[type=number]'))) { e.preventDefault(); epSave(); }
    return;
  }
  if (e.key === 'Tab') { // keep keyboard focus inside the popup
    const items = [...ep.el.querySelectorAll('button:not([disabled]), input:not([type=file]):not([disabled]), textarea, select, audio[controls]:not([hidden])')].filter((x) => x.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || !ep.el.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}, true);

/* ---------- Refresh helpers (redraw only what an edit touched) ---------- */
function showHeroAt(i) {
  const imgs = [...$('#hero').children];
  if (!imgs.length) return;
  i = Math.max(0, Math.min(i, imgs.length - 1));
  imgs.forEach((el, k) => { el.classList.remove('is-prev', 'is-next'); el.classList.toggle('is-on', k === i); });
  if (imgs[i].tagName === 'VIDEO') imgs[i].play().catch(() => {});
  paintHeroFeature(i);
  paintHeroDots(i);
}
// Redraws everything but stays on the background picture that was showing.
function refreshAll() {
  const k = currentHeroIndex();
  rerender();
  if (!home.hidden && k > 0) showHeroAt(k);
}
function refreshHero(i) {
  renderHero();
  cycleHero();
  showHeroAt(i);
  if (ep.spec) clearInterval(heroTimer);
}
// Rebuilds the slideshow and shows slide i (used after a move / add / remove inside the player).
function rebuildPlayerAt(i) {
  renderPlayer();
  if (player.hidden || !finale.hidden || !slides.imgs.length) return;
  slides.index = -1;
  goTo(Math.max(0, Math.min(i, slides.imgs.length - 1)));
}
// Swaps ONE slide in place — the slideshow keeps its position and pause state.
function replaceSlide(index, ref) {
  const oldEl = slides.imgs[index];
  if (!oldEl || !oldEl.parentNode) { rebuildPlayerAt(index); return; }
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
}
// The player's text bits (title, time, finale) — cheap to refresh without touching the slides.
function renderPlayerText() {
  $('#player-title').textContent = cfg.playerTitle;
  $('#time').textContent = cfg.slides.time;
  $('#finale-title').textContent = cfg.finale.title.replace('{name}', cfg.name);
  $('#finale-lines').innerHTML = cfg.finale.lines.map((l) => `<p>${esc(l)}</p>`).join('');
}
function paintRank() {
  const t = $('#bb-rank-text');
  const empty = !cfg.rank;
  t.textContent = empty ? (isEditing() ? '+ Add a TOP 10 line' : '') : cfg.rank;
  t.classList.toggle('is-placeholder', empty && isEditing());
  $('#bb-rank').hidden = empty && !isEditing();
}

/* ---------- What each click opens ---------- */
function rowPosOf(item) {
  for (let r = 0; r < cfg.rows.length; r++) {
    const i = cfg.rows[r].items.indexOf(item);
    if (i >= 0) return { r, i };
  }
  return null;
}
// Every card on the page, row by row — what ‹ › walks through.
const allCards = () => cfg.rows.flatMap((r) => r.items);
const cardElOf = (item) => [...document.querySelectorAll('#rows .card')].find((c) => c._item === item) || null;
function editCard(item, opts) {
  const pos = rowPosOf(item);
  const type = pos ? cfg.rows[pos.r].type : 'landscape';
  const move = (d) => {
    const p = rowPosOf(item);
    if (!p) return;
    const items = cfg.rows[p.r].items, j = p.i + d;
    if (j < 0 || j >= items.length) return;
    changeRows(`Moved “${item.title || 'card'}” ${d < 0 ? 'left' : 'right'}`, () => { [items[p.i], items[j]] = [items[j], items[p.i]]; });
  };
  openEditor({
    title: 'Change this card?',
    nav: {
      count: () => { const a = allCards(); return `${a.indexOf(item) + 1} / ${a.length}`; },
      prev: () => { const a = allCards(), k = a.indexOf(item); return k > 0 ? (o) => editCard(a[k - 1], o) : null; },
      next: () => { const a = allCards(), k = a.indexOf(item); return k >= 0 && k < a.length - 1 ? (o) => editCard(a[k + 1], o) : null; },
    },
    target: () => cardElOf(item),
    sub: () => { const p = rowPosOf(item); return p ? `${cfg.rows[p.r].title || 'Row'} · card ${p.i + 1} of ${cfg.rows[p.r].items.length}` : 'A card on the home page'; },
    media: [
      { label: 'Photo or video on the card', value: item.image, shape: type === 'portrait' ? 'tall' : 'wide' },
      { label: 'Hover preview (optional)', value: item.preview, optional: true, shape: 'wide', hint: 'Shows when someone points at the card. Leave it empty to use the card picture.' },
    ],
    fields: [
      { key: 'title', label: 'Text on the card (title)', value: item.title, max: 60, placeholder: 'e.g. Our First Trip' },
      { key: 'text', label: 'Words shown in “More Info”', value: item.text, kind: 'area', rows: 3, max: 600, placeholder: 'A line or two about this memory' },
      { key: 'tags', label: 'Tags (comma separated)', value: (item.tags || []).join(', '), half: true, max: 120, placeholder: 'Love, Trip, Summer' },
      ...(type === 'landscape' ? [{ key: 'progress', label: 'Red progress bar % (empty = none)', value: item.progress ?? '', kind: 'num', half: true, attrs: 'min="0" max="100" step="1" inputmode="numeric"' }] : []),
    ],
    tools: pos ? [
      { label: '← Move left', run: () => move(-1), disabled: () => { const p = rowPosOf(item); return !p || p.i === 0; } },
      { label: 'Move right →', run: () => move(1), disabled: () => { const p = rowPosOf(item); return !p || p.i >= cfg.rows[p.r].items.length - 1; } },
      { label: '🗑 Delete card', danger: true, close: true, confirm: 'Delete it? Click again', run: () => { const p = rowPosOf(item); if (p) changeRows(`Removed “${item.title || 'card'}”`, () => cfg.rows[p.r].items.splice(p.i, 1)); } },
    ] : [],
    validate: (v) => (v.title.trim() ? '' : 'Please give the card a title — it’s the text shown on it.'),
    save(v, refs) {
      item.title = v.title.trim();
      item.text = v.text.trim();
      item.tags = splitList(v.tags);
      if ('progress' in v) {
        const n = Number(v.progress);
        if (v.progress === '' || Number.isNaN(n)) delete item.progress;
        else item.progress = Math.max(0, Math.min(100, Math.round(n)));
      }
      if (refs[0]) item.image = refs[0];
      if (refs[1] !== undefined) { if (refs[1]) item.preview = refs[1]; else delete item.preview; }
    },
    refresh: () => { renderRows(); paintNotes(); },
    saved: 'Card saved ✓',
  }, opts);
}
function editRow(row, opts) {
  const idx = () => cfg.rows.indexOf(row);
  const move = (d) => {
    const r = idx(), to = r + d;
    if (r < 0 || to < 0 || to >= cfg.rows.length) return;
    changeRows(`Moved “${row.title || 'row'}” ${d < 0 ? 'up' : 'down'}`, () => { const [x] = cfg.rows.splice(r, 1); cfg.rows.splice(to, 0, x); });
  };
  openEditor({
    title: 'Change this row?',
    nav: {
      count: () => `${idx() + 1} / ${cfg.rows.length}`,
      prev: () => { const k = idx(); return k > 0 ? (o) => editRow(cfg.rows[k - 1], o) : null; },
      next: () => { const k = idx(); return k >= 0 && k < cfg.rows.length - 1 ? (o) => editRow(cfg.rows[k + 1], o) : null; },
    },
    target: () => { const b = document.getElementById(rowId(idx())); return b ? b.querySelector('.row-head h2') : null; },
    sub: () => `Row ${idx() + 1} of ${cfg.rows.length} · ${plural(row.items.length, 'card')}`,
    fields: [
      { key: 'title', label: 'Row name', value: row.title, max: 50, hint: 'The first few rows are also the links in the top bar.' },
      { key: 'type', label: 'Card style', kind: 'select', value: row.type, options: [['portrait', 'Tall posters'], ['landscape', 'Wide tiles'], ['top10', 'Top 10 — with big numbers']] },
    ],
    tools: [
      { label: '↑ Move up', run: () => move(-1), disabled: () => idx() <= 0 },
      { label: '↓ Move down', run: () => move(1), disabled: () => idx() < 0 || idx() >= cfg.rows.length - 1 },
      { label: '＋ Add photos / videos', run: () => pickFiles(true, async (added) => {
        row.items.push(...added.map(({ ref, file }) => ({ image: ref, title: fileTitle(file), text: 'Added with love.', tags: [] })));
        await persistCfgNow();
        renderRows(); paintNotes(); epRefresh();
        showEditHint(`${plural(added.length, 'card')} added to “${row.title}” ✓`);
      }) },
      { label: '🗑 Delete row', danger: true, close: true, confirm: 'Delete the whole row? Click again', run: () => { const r = idx(); if (r >= 0) changeRows(`Deleted “${row.title || 'row'}”`, () => cfg.rows.splice(r, 1)); } },
    ],
    validate: (v) => (v.title.trim() ? '' : 'Please give the row a name.'),
    save(v) {
      row.title = v.title.trim();
      if (['portrait', 'landscape', 'top10'].includes(v.type)) row.type = v.type;
    },
    refresh: () => { renderRows(); paintNotes(); },
    saved: 'Row saved ✓',
  }, opts);
}
function editHero(index, opts) {
  let i = index ?? currentHeroIndex();
  if (i < 0) i = 0;
  const item = cfg.hero.images[i];
  const addMore = () => pickFiles(true, async (added) => {
    cfg.hero.images.push(...added.map(({ ref }) => ({ image: ref, title: '' })));
    await persistCfgNow();
    refreshHero(item ? cfg.hero.images.indexOf(item) : 0);
    epRefresh();
    showEditHint(`${plural(added.length, 'background')} added ✓ — they take turns behind the title.`);
  });
  if (!item) { addMore(); return; } // no backgrounds at all yet → straight to choosing some
  const idx = () => cfg.hero.images.indexOf(item);
  openEditor({
    title: 'Change this background?',
    nav: {
      count: () => `${idx() + 1} / ${cfg.hero.images.length}`,
      prev: () => { const k = idx(); return k > 0 ? (o) => editHero(k - 1, o) : null; },
      next: () => { const k = idx(); return k >= 0 && k < cfg.hero.images.length - 1 ? (o) => editHero(k + 1, o) : null; },
    },
    onShow: () => { if (!home.hidden && currentHeroIndex() !== idx()) showHeroAt(idx()); },
    sub: () => `Big picture ${idx() + 1} of ${cfg.hero.images.length} behind the title`,
    media: [{ label: 'Background photo or video', value: item.image, shape: 'wide', hint: 'Wide pictures (about 1600×900) or short videos look best.' }],
    fields: [{ key: 'title', label: '“Featuring” name shown with it (optional)', value: item.title || '', max: 40, placeholder: 'e.g. Our First Date' }],
    tools: [
      { label: '＋ Add more backgrounds', run: addMore },
      { label: '🗑 Remove this background', danger: true, close: true, confirm: 'Remove it? Click again', disabled: () => cfg.hero.images.length < 2, run: async () => {
        const k = idx();
        if (k < 0 || cfg.hero.images.length < 2) return;
        cfg.hero.images.splice(k, 1);
        await persistCfgNow();
        refreshHero(Math.max(0, k - 1));
        showEditHint('Background removed ✓');
      } },
    ],
    save(v, refs) {
      item.title = v.title.trim();
      if (refs[0]) item.image = refs[0];
    },
    refresh: () => refreshHero(idx()),
    saved: 'Background saved ✓',
  }, opts);
}
function editTitle() {
  openEditor({
    title: 'Change the big title?',
    sub: 'Typed letter by letter on the home screen',
    fields: [
      { key: 'title', label: 'Words before the name', value: cfg.title, max: 40, half: true, placeholder: 'Happy Birthday' },
      { key: 'name', label: 'Their name', value: cfg.name, max: 30, half: true, placeholder: 'e.g. Ananya' },
      { key: 'playerTitle', label: 'Title at the top of the player', value: cfg.playerTitle, max: 60 },
    ],
    note: 'The name is also used in the browser tab and in the end credits.',
    validate: (v) => (v.name.trim() || v.title.trim() ? '' : 'Please type at least their name.'),
    save(v) {
      const oldAuto = fullTitle();
      const pt = v.playerTitle.trim();
      cfg.title = v.title.trim();
      cfg.name = v.name.trim();
      // The player title follows the new name unless it was customised separately.
      cfg.playerTitle = !pt || (pt === cfg.playerTitle && cfg.playerTitle === oldAuto) ? fullTitle() : pt;
    },
    saved: 'Title saved ✓',
  });
}
function editMessage() {
  openEditor({
    title: 'Change the birthday message?',
    sub: 'The paragraph under the title',
    fields: [{ key: 'description', label: 'Your message', value: cfg.description, kind: 'area', rows: 6, max: 1200 }],
    validate: (v) => (v.description.trim() ? '' : 'The message can’t be empty — write a line or two.'),
    save(v) { cfg.description = v.description.trim(); },
    refresh: () => { $('#description').textContent = cfg.description; },
    saved: 'Message saved ✓',
  });
}
function editFacts() {
  const f = cfg.facts;
  openEditor({
    title: 'Change the little facts row?',
    sub: 'The “98% Match · 2007 · 18+” line under the title',
    fields: [
      { key: 'match', label: 'Match', value: f.match, max: 24, half: true },
      { key: 'year', label: 'Year', value: f.year, max: 12, half: true },
      { key: 'age', label: 'Badge', value: f.age, max: 8, half: true },
      { key: 'seasons', label: 'Seasons', value: f.seasons, max: 24, half: true },
      { key: 'quality', label: 'Quality', value: f.quality, max: 8, half: true },
    ],
    save(v) { Object.keys(v).forEach((k) => { cfg.facts[k] = v[k].trim(); }); },
    refresh: () => { paintFacts(); renderRows(); },
    saved: 'Saved ✓',
  });
}
function editRank() {
  openEditor({
    title: 'Change the TOP 10 line?',
    sub: 'Shown next to the red TOP 10 badge',
    fields: [{ key: 'rank', label: 'Text (leave empty to hide the badge)', value: cfg.rank, max: 40, placeholder: '#1 in Birthdays Today' }],
    save(v) { cfg.rank = v.rank.trim(); },
    refresh: paintRank,
    saved: 'Saved ✓',
  });
}
function editLogo() {
  openEditor({
    title: 'Change the logo text?',
    sub: 'The red name at the top-left',
    fields: [{ key: 'brand', label: 'Logo text', value: cfg.brand, max: 20, placeholder: 'PREMIERE' }],
    validate: (v) => (v.brand.trim() ? '' : 'Please type a logo text.'),
    save(v) { cfg.brand = v.brand.trim(); },
    refresh: () => { $('#nf-logo').textContent = cfg.brand; },
    saved: 'Logo saved ✓',
  });
}
function editFooter() {
  openEditor({
    title: 'Change the footer?',
    sub: 'The small print at the very bottom',
    fields: [
      { key: 'note', label: 'Footer note', value: cfg.footer.note, max: 120 },
      { key: 'links', label: 'Footer links (comma separated)', value: cfg.footer.links.join(', '), kind: 'area', rows: 3, max: 600 },
    ],
    save(v) { cfg.footer.note = v.note.trim(); cfg.footer.links = splitList(v.links); },
    refresh: () => {
      $('#footer-links').innerHTML = cfg.footer.links.map((l) => `<span>${esc(l)}</span>`).join('');
      $('#footer-note').textContent = cfg.footer.note;
    },
    saved: 'Footer saved ✓',
  });
}
function editProfilesHeading() {
  openEditor({
    title: 'Change the heading?',
    sub: 'The question above the profile pictures',
    fields: [{ key: 'h', label: 'Heading', value: cfg.profilesHeading, max: 40, placeholder: "Who's watching?" }],
    validate: (v) => (v.h.trim() ? '' : 'Please type a heading.'),
    save(v) { cfg.profilesHeading = v.h.trim(); },
    refresh: () => { $('#profiles-heading').textContent = cfg.profilesHeading; },
    saved: 'Heading saved ✓',
  });
}
function editProfile(p, opts) {
  const idx = () => cfg.profiles.indexOf(p);
  openEditor({
    title: 'Change this profile?',
    nav: {
      count: () => `${idx() + 1} / ${cfg.profiles.length}`,
      prev: () => { const k = idx(); return k > 0 ? (o) => editProfile(cfg.profiles[k - 1], o) : null; },
      next: () => { const k = idx(); return k >= 0 && k < cfg.profiles.length - 1 ? (o) => editProfile(cfg.profiles[k + 1], o) : null; },
    },
    target: () => document.querySelectorAll('#profiles-grid .profile')[idx()] || null,
    sub: () => `Profile ${idx() + 1} of ${cfg.profiles.length}`,
    media: [{ label: 'Profile picture', value: p.image, shape: 'square', hint: 'Square pictures look best.' }],
    fields: [{ key: 'label', label: 'Name under the picture', value: p.label, max: 24 }],
    tools: [
      { label: '＋ Add a profile', disabled: () => cfg.profiles.length >= 5, run: () => pickFiles(false, async (added) => {
        cfg.profiles.push({ label: fileTitle(added[0].file).slice(0, 24), image: added[0].ref });
        await persistCfgNow();
        renderProfiles(); paintAccount(); epRefresh();
        showEditHint('Profile added ✓ — click it to rename it.');
      }) },
      { label: '🗑 Remove profile', danger: true, close: true, confirm: 'Remove it? Click again', disabled: () => cfg.profiles.length < 2, run: async () => {
        const k = idx();
        if (k < 0 || cfg.profiles.length < 2) return;
        cfg.profiles.splice(k, 1);
        await persistCfgNow();
        renderProfiles(); paintAccount();
        showEditHint('Profile removed ✓');
      } },
    ],
    save(v, refs) {
      p.label = v.label.trim();
      if (refs[0]) p.image = refs[0];
    },
    refresh: () => { renderProfiles(); paintAccount(); },
    saved: 'Profile saved ✓',
  }, opts);
}
function editSlide(index, opts) {
  if (index < 0 || index >= cfg.slides.images.length) return;
  let at = index; // follows this slide when it's moved
  const n = () => cfg.slides.images.length;
  const moveSlide = async (d) => {
    const to = at + d;
    if (to < 0 || to >= n()) return;
    const list = cfg.slides.images;
    [list[at], list[to]] = [list[to], list[at]];
    at = to;
    await persistCfgNow();
    rebuildPlayerAt(at);
  };
  openEditor({
    title: 'Change this picture in the slideshow?',
    nav: {
      count: () => `${at + 1} / ${n()}`,
      prev: () => (at > 0 ? (o) => editSlide(at - 1, o) : null),
      next: () => (at < n() - 1 ? (o) => editSlide(at + 1, o) : null),
    },
    onShow: () => { if (!player.hidden && finale.hidden && slides.index !== at) goTo(at); },
    sub: () => `Slide ${at + 1} of ${n()} — plays after “Play”`,
    media: [{ label: 'Photo or video', value: cfg.slides.images[index], shape: 'wide', hint: 'Photos stay a few seconds with a slow zoom; videos play to the end with sound.' }],
    tools: [
      { label: '← Earlier', disabled: () => at <= 0, run: () => moveSlide(-1) },
      { label: 'Later →', disabled: () => at >= n() - 1, run: () => moveSlide(1) },
      { label: '＋ Add after this one', run: () => pickFiles(true, async (added) => {
        cfg.slides.images.splice(at + 1, 0, ...added.map((a) => a.ref));
        await persistCfgNow();
        rebuildPlayerAt(at);
        epRefresh();
        showEditHint(`${plural(added.length, 'picture')} added to the slideshow ✓`);
      }) },
      { label: '🗑 Remove from slideshow', danger: true, close: true, confirm: 'Remove it? Click again', disabled: () => n() < 2, run: async () => {
        if (n() < 2) return;
        cfg.slides.images.splice(at, 1);
        await persistCfgNow();
        rebuildPlayerAt(Math.min(at, n() - 1));
        showEditHint('Removed from the slideshow ✓');
      } },
    ],
    save(v, refs) { if (refs[0]) cfg.slides.images[at] = refs[0]; },
    refresh: () => replaceSlide(at, cfg.slides.images[at]),
    saved: 'Slide saved ✓',
  }, opts);
}
function editPlayerText() {
  openEditor({
    title: 'Change the player text?',
    sub: 'Shown at the top and bottom of the player',
    fields: [
      { key: 'playerTitle', label: 'Title at the top', value: cfg.playerTitle, max: 60 },
      { key: 'time', label: 'Time label', value: cfg.slides.time, max: 12, half: true },
      { key: 'secs', label: 'Seconds each photo stays', value: Math.round(cfg.slides.duration / 1000), kind: 'num', half: true, attrs: 'min="1" max="60" step="1" inputmode="numeric"' },
    ],
    tools: [{ label: '🎵 Change the music', run: () => { if (ep.dirty) { epAsk('nav', () => epSwitch(editSong, 1)); return; } epSwitch(editSong, 1); } }],
    validate: (v) => { const s = Number(v.secs); return Number.isFinite(s) && s >= 1 && s <= 60 ? '' : 'Seconds must be a number from 1 to 60.'; },
    save(v) {
      cfg.playerTitle = v.playerTitle.trim() || fullTitle();
      cfg.slides.time = v.time.trim();
      cfg.slides.duration = Math.round(Number(v.secs)) * 1000;
    },
    refresh: () => { renderPlayerText(); slides.imgs.forEach((el) => el.style.setProperty('--dur', `${cfg.slides.duration + 900}ms`)); },
    saved: 'Saved ✓',
  });
}
function editFinale() {
  openEditor({
    title: 'Change the end credits?',
    sub: 'Shown after the last picture',
    fields: [
      { key: 'title', label: 'Big title ({name} = their name)', value: cfg.finale.title, max: 60 },
      { key: 'lines', label: 'Closing lines (one per line)', value: cfg.finale.lines.join('\n'), kind: 'area', rows: 4, max: 800 },
    ],
    save(v) {
      cfg.finale.title = v.title.trim() || 'Happy Birthday, {name}';
      cfg.finale.lines = v.lines.split('\n').map((s) => s.trim()).filter(Boolean);
    },
    refresh: renderPlayerText,
    saved: 'Credits saved ✓',
  });
}

function editSong(opts) {
  openEditor({
    title: 'Change the music?',
    sub: 'The song plays during the slideshow and the end credits',
    media: [
      { kind: 'audio', label: 'Song for the slideshow', value: cfg.music, optional: true, hint: 'MP3, M4A or WAV, up to 60 MB — her favourite song is perfect. Your own songs are kept in this browser.' },
      { kind: 'audio', label: 'Intro sound (with the logo at the start)', value: cfg.introSound, optional: true },
    ],
    tools: [{
      label: '↺ Use the built-in sounds', close: true,
      disabled: () => cfg.music === config.music && cfg.introSound === config.introSound,
      run: async () => { cfg.music = config.music; cfg.introSound = config.introSound; await persistCfgNow(); resetMusic(); pruneMedia(); showEditHint('Built-in sounds are back ✓'); },
    }],
    save(v, refs) {
      if (refs[0] !== undefined) cfg.music = refs[0];
      if (refs[1] !== undefined) cfg.introSound = refs[1];
    },
    refresh: resetMusic,
    saved: 'Music saved ✓',
  }, opts);
}

/* ---------- Hints, the edit bar and the ✎ Edit switch ---------- */
function editError(msg) {
  showEditHint(msg, true);
}
let hintTimer = null, playerHintTimer = null;
// While the popup is open, messages appear inside it. Inside the player they borrow the
// "tap to change it" pill; everywhere else they're a small toast at the bottom.
function showEditHint(msg, isError) {
  if (ep.spec && msg) { epMsg(msg, isError); return; }
  const cueText = !player.hidden && document.getElementById('player-edit-cue-text');
  if (cueText) {
    const oldHint = document.getElementById('edit-hint');
    if (oldHint) { clearTimeout(hintTimer); oldHint.classList.remove('is-on'); }
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
    hint.setAttribute('role', 'status');
    document.body.appendChild(hint);
  }
  hint.textContent = msg || 'Click any card, photo, video or text — a popup asks what to change.';
  hint.classList.toggle('is-error', !!isError);
  hint.classList.add('is-on');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => hint.classList.remove('is-on'), isError ? 5000 : 3400);
}
function ensureEditBar() {
  if (document.getElementById('edit-bar')) return;
  const bar = document.createElement('div');
  bar.id = 'edit-bar';
  bar.className = 'edit-bar';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = '<i class="edit-bar-dot"></i><span class="edit-bar-long"><b>Edit mode is on</b> — click any card, photo, video or text</span><span class="edit-bar-short"><b>Editing</b> — tap anything</span>';
  document.body.appendChild(bar);
}
function setEditMode(on) {
  if (!on && ep.spec) epClose();
  document.body.classList.toggle('edit-mode', on);
  ensureEditBar();
  const fab = $('#cz-fab');
  fab.innerHTML = on
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg><span>Done editing</span>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16z"/><path d="m13.5 6.5 4 4"/></svg><span>Edit</span>';
  fab.setAttribute('aria-pressed', String(on));
  fab.setAttribute('aria-label', on ? 'Done editing' : 'Turn on editing — click any photo, video or text to change it');
  $('#cz-more').hidden = !on;
  paintHeroFeature(currentHeroIndex());
  paintRank();
  if (!player.hidden) showUI(); // re-arms (or, while editing, cancels) the player's auto-hide
  if (on) showEditHint(!player.hidden ? 'Tap the picture to change it. Use ‹ › to move between them.' : undefined);
  else showEditHint('Editing finished ✓ — everything you saved stays.');
}
$('#cz-fab').addEventListener('click', () => setEditMode(!isEditing()));
$('#cz-more').addEventListener('click', openPanel);
$('#cz-side').addEventListener('click', openPanel);

/* ---------- Gift mode: netflix.html?gift=<slug> — one private page per person ----------
   • Her (the birthday person): a Netflix-style sign-in screen asks for the password the
     creator chose → then the intro, profiles and her customised page.
   • The creator (signed in, it's their gift): straight in, and ✎ Edit saves to HER link —
     every change is what she will see. Add &preview=1 to see the password screen as her.
   Needs cloud-config.js + gift-store.js; without them gift links are ignored. */
let giftCtx = null; // { slug, owner, gift, media }
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
// Every string anywhere in the page settings (to know which photos are already on it).
function stringsIn(obj, out = new Set()) {
  if (typeof obj === 'string') out.add(obj);
  else if (obj && typeof obj === 'object') Object.values(obj).forEach((v) => stringsIn(v, out));
  return out;
}
// First time (nothing customised yet): build the page from the photos friends added,
// falling back to the default pictures for anything it has none of.
function applyGiftMedia(gift, media) {
  cfg.name = gift.name || cfg.name;
  cfg.playerTitle = fullTitle();
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
  cfg.giftSeen = media.map((m) => m.id);
}
// Already customised: keep the creator's page, and add any NEW photos friends uploaded
// since (once — if the creator deletes one from the page it stays deleted).
function mergeNewContributions(media) {
  const seen = new Set(cfg.giftSeen || []), onPage = stringsIn(cfg);
  const fresh = media.filter((m) => !seen.has(m.id) && !onPage.has(m.url));
  if (fresh.length) {
    let row = cfg.rows.find((r) => r.title === 'From friends & family');
    if (!row) { row = { title: 'From friends & family', type: 'landscape', items: [] }; cfg.rows.unshift(row); }
    fresh.forEach((m) => row.items.push({ image: m.url, title: 'A new moment', text: 'Added with love for this gift.', tags: [] }));
    fresh.forEach((m) => { if (!cfg.slides.images.includes(m.url)) cfg.slides.images.push(m.url); });
  }
  cfg.giftSeen = media.map((m) => m.id);
}
function applyGift(gift, media) {
  if (gift.config && typeof gift.config === 'object') {
    cfg = normalise(gift.config);
    mergeNewContributions(media);
  } else {
    cfg = normalise(clone(config));
    applyGiftMedia(gift, media);
  }
  cfg.autoplay = false; // let the birthday person explore at their own pace
}

/* ---------- The Netflix-style sign-in screen (password) ---------- */
function showGate(gift) {
  return new Promise((resolve) => {
    document.querySelectorAll('.screen').forEach((s) => { s.hidden = true; });
    const posters = ['moment-1', 'slide-1', 'moment-2', 'slide-2', 'moment-3', 'slide-7', 'moment-4', 'slide-9', 'moment-5', 'slide-5', 'moment-6', 'slide-3', 'hero-1', 'slide-4', 'hero-2', 'slide-6', 'hero-3', 'slide-8'];
    const wall = Array.from({ length: 40 }, (_, i) => `<i style="background-image:url('assets/netflix/${posters[(i * 7) % posters.length]}.jpg')"></i>`).join('');
    const gate = document.createElement('div');
    gate.className = 'gate';
    gate.id = 'gate';
    gate.innerHTML = `
      <div class="gate-wall" aria-hidden="true">${wall}</div>
      <header class="gate-top"><span class="gate-logo">${esc(cfg.brand || 'PREMIERE')}</span></header>
      <main class="gate-card">
        <form class="gate-form" novalidate>
          <h1>Sign In</h1>
          <p class="gate-for">${gift.name ? `A private birthday page for <b>${esc(gift.name)}</b> 🎁` : 'A private birthday page 🎁'}<br>Enter the password you were sent.</p>
          <div class="gate-field" id="gate-field">
            <input id="gate-pw" type="password" name="password" autocomplete="current-password" maxlength="64" placeholder=" " required aria-describedby="gate-err">
            <label for="gate-pw">Password</label>
            <button type="button" class="gate-eye" id="gate-eye" aria-label="Show the password">SHOW</button>
          </div>
          <p class="gate-err" id="gate-err" role="alert" hidden></p>
          <button class="gate-go" id="gate-go" type="submit">Sign In</button>
          <label class="gate-remember"><input type="checkbox" id="gate-remember" checked> Remember me on this device</label>
          <p class="gate-help">Don't know the password? Ask the person who sent you this link — they chose it just for you.</p>
          <p class="gate-fine">This page is private: only people with the password can open it.</p>
        </form>
      </main>
      <footer class="gate-foot">Made with love · ${esc(cfg.brand || 'PREMIERE')}</footer>`;
    document.body.appendChild(gate);
    const form = gate.querySelector('form'), pw = gate.querySelector('#gate-pw'), err = gate.querySelector('#gate-err');
    const field = gate.querySelector('#gate-field'), go = gate.querySelector('#gate-go'), eye = gate.querySelector('#gate-eye');
    const showError = (msg) => {
      err.innerHTML = `<span aria-hidden="true">⊗</span><span>${esc(msg)}</span>`;
      err.hidden = false;
      field.classList.add('is-bad');
      gate.classList.remove('is-shake'); void gate.offsetWidth; gate.classList.add('is-shake');
    };
    eye.addEventListener('click', () => {
      const show = pw.type === 'password';
      pw.type = show ? 'text' : 'password';
      eye.textContent = show ? 'HIDE' : 'SHOW';
      eye.setAttribute('aria-label', show ? 'Hide the password' : 'Show the password');
      pw.focus();
    });
    pw.addEventListener('input', () => { err.hidden = true; field.classList.remove('is-bad'); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const value = pw.value;
      if (!value.trim()) { showError('Please enter the password.'); pw.focus(); return; }
      go.disabled = true;
      go.textContent = 'Signing in…';
      let r;
      try { r = await GiftStore.unlockGift(gift.slug, value, gate.querySelector('#gate-remember').checked); }
      catch (ex) { r = { error: ex.message || 'Could not reach the server — check your internet connection.' }; }
      go.disabled = false;
      go.textContent = 'Sign In';
      if (r && r.gift) {
        gate.classList.add('is-out');
        setTimeout(() => { gate.remove(); resolve(r); }, 420);
        return;
      }
      const msg = r && r.status === 401 ? 'Incorrect password. Please try again, or ask the person who sent you this link.'
        : r && r.status === 429 ? 'Too many wrong tries. Please wait 15 minutes, then try again.'
        : (r && r.error) || 'Something went wrong — please try again.';
      showError(msg);
      pw.select();
    });
    if (!isTouch()) setTimeout(() => pw.focus(), 60);
  });
}

/* ---------- The creator's bar: whose page this is + quick actions ---------- */
function showOwnerBar() {
  const g = giftCtx.gift;
  const bar = document.createElement('div');
  bar.className = 'owner-bar';
  bar.id = 'owner-bar';
  bar.innerHTML = `<span class="owner-bar-text"><b>✎ ${g.name ? `${esc(g.name)}’s page` : 'Your gift page'}</b><span class="owner-bar-sub"> — what you change here is exactly what she sees</span></span>
    <span class="owner-bar-actions">
      <button type="button" data-ob="edit">✎ Edit</button>
      <button type="button" data-ob="copy">🔗 Copy her link</button>
      <a href="${esc(GiftStore.viewLinkFor(giftCtx.slug))}&amp;preview=1" target="_blank" rel="noopener">👁 See it as her</a>
      <a href="my-gifts.html">🔑 Password &amp; payment</a>
    </span>`;
  bar.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-ob]');
    if (!b) return;
    if (b.dataset.ob === 'edit') { setEditMode(!isEditing()); return; }
    const link = GiftStore.viewLinkFor(giftCtx.slug);
    try { await navigator.clipboard.writeText(link); } catch (err) { /* older browsers: show it instead */ }
    showEditHint(`Link copied ✓ — send it to her with the password you chose: ${link}`);
  });
  document.body.appendChild(bar);
}

async function tryGiftMode() {
  const slug = giftSlugFromURL();
  if (!slug || typeof GiftStore === 'undefined') return false;
  const preview = new URLSearchParams(location.search).has('preview');
  try {
    const gift = await GiftStore.getGift(slug);
    if (!gift) { showGiftScreen("This gift isn't here", "We couldn't find a gift with this link — it may have been deleted after its free trial ended.", true); return true; }
    if (!gift.paid && GiftStore.isExpired(gift.createdAt)) { showGiftScreen('This gift has expired', `Its ${GiftStore.trialDays}-day free trial ended. Buy the gift to keep it forever, or create a new one.`, true); return true; }
    const owner = gift.owner && !preview;
    let full;
    if (owner) full = await GiftStore.loadGift(slug);
    else if (gift.locked && (preview || !GiftStore.Keys.get(slug))) full = await showGate(gift);
    else {
      full = await GiftStore.loadGift(slug);
      if (full && full.locked) full = await showGate(gift); // the saved key is old (password changed)
    }
    if (!full || !full.gift) { showGiftScreen("This gift isn't here", "We couldn't open this gift — it may have been deleted.", true); return true; }
    giftCtx = { slug, owner, gift: full.gift, media: full.media || [] };
    applyGift(full.gift, giftCtx.media);
    if (owner) {
      document.body.classList.add('is-gift-owner');
      showOwnerBar();
    } else {
      document.body.classList.add('is-gift');
      const addLink = document.getElementById('gift-add');
      if (addLink) { addLink.hidden = false; addLink.href = `gift-upload.html?gift=${encodeURIComponent(slug)}`; }
    }
    return false;
  } catch (e) {
    showGiftScreen('Something went wrong', e.message || 'Could not load this gift right now.', true);
    return true;
  }
}

/* ---------- Authentication & Logout ---------- */
function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.hidden = false;
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('auth-token');
        localStorage.removeItem('auth-token');
        window.location.href = 'login.html';
      }
    });
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
  // netflix.html?edit=1 → straight to Home with editing on (used by "Skip" on the
  // sign-in page, so people can start making their page without an account).
  // Never for a visitor opening someone else's gift.
  const wantsEdit = new URLSearchParams(location.search).has('edit') && (!giftCtx || giftCtx.owner);
  if (wantsEdit) { openHome(false); setEditMode(true); }
  else if (cfg.startScreen === 'home') openHome(false);
  else if (cfg.startScreen === 'profiles') showProfiles();
  else startIntro();
})();
