/* =====================================================================
   PREMIERE FILM — the animated product video in the landing-page hero
   ---------------------------------------------------------------------
   A ~32-second "film" that shows the whole product, scene by scene:
     1. Start your love story   (type a name + note, create the gift)
     2. Add your moments        (photos & videos upload, a friend joins)
     3. Send it at midnight     (clock flips to 12:00, link sent, "Seen")
     4. The big reveal          (logo intro + "Who's watching?")
     5. Their streaming page    (billboard with their name, rows of memories)
     6. The finale              (slideshow player → credits → call to action)

   It is drawn with HTML + CSS (film.css), not a video file, so it:
     • stays razor sharp on any screen and weighs almost nothing,
     • shows the visitor's own typed name everywhere, live,
     • can pause, loop and jump between chapters like a real player.

   Every CSS animation is driven from one JavaScript clock, so pausing and
   seeking are exact, and scripts/render-film.mjs can export the very same
   film to an .mp4 frame by frame.

   Text and pictures come from `film` in landing-content.js.

   API:  const film = PremiereFilm.mount(hostElement, options)
         film.play() / pause() / toggle() / seek(seconds)
         film.setName('Ananya')  film.setContent({...})  film.ready()
   ===================================================================== */
(() => {
  'use strict';

  const CW = 960;            // the film is designed on a fixed 960×540 canvas
  const CH = 540;            // and scaled to fit whatever box it lives in
  const FADE = 0.28;         // seconds of fade between scenes

  const SCENES = [
    { id: 'create', dur: 5 },
    { id: 'upload', dur: 5 },
    { id: 'midnight', dur: 5.2 },
    { id: 'intro', dur: 4.6 },
    { id: 'home', dur: 5.2 },
    { id: 'finale', dur: 7 },
  ];
  const START = [];
  let TOTAL = 0;
  SCENES.forEach(s => { START.push(TOTAL); TOTAL = Math.round((TOTAL + s.dur) * 1000) / 1000; });

  // Used when landing-content.js has no `film` block (or misses a field).
  const DEFAULTS = {
    brand: 'premiere',
    mark: 'P',
    defaultName: 'My Love',
    chapters: ['Start your love story', 'Add your moments', 'Send it at midnight', 'The big reveal', 'Their own streaming page', 'The love-note finale'],
    formTag: 'New gift',
    formTitle: 'A birthday gift for…',
    nameLabel: 'Who’s the birthday star?',
    noteLabel: 'Your love note — it plays last',
    note: 'Happy birthday, my love. Here’s every moment I never want to forget ♥',
    createLabel: 'Create gift',
    readyLabel: 'Your private link is ready',
    link: 'premiere.gift/just-for-you',
    uploadTitle: 'Our moments, for {name}',
    uploadSub: 'Just you — or a few of their best friends too',
    countLabel: 'memories added',
    addLabel: '＋ Add photos & videos',
    friend: 'Riya',
    friendAction: 'added a surprise video 🎥',
    clockKicker: 'Midnight',
    clockLine: 'It’s officially their birthday.',
    chatWith: '♥ {name}',
    chatStatus: 'online',
    sent: 'Happy birthday, my love ♥ press play',
    cardSub: 'premiere · tap to play ▶',
    reply: 'wait… you made this?? 😭❤️',
    whoTitle: 'Who’s watching?',
    profiles: ['{name}', 'You', 'Us', 'Besties'],
    navLinks: ['Home', 'Our Story', 'Trips', 'My List'],
    series: 'SERIES',
    title: 'Happy Birthday',
    match: '99% Match',
    year: '2026',
    seasons: '1 Season of Us',
    rowTitle: 'Our Special Moments',
    playLabel: 'Play',
    moreLabel: 'More Info',
    episode: 'E1 · The day we met',
    original: 'ORIGINAL',
    creditsTitle: 'Happy Birthday,',
    credits: ['Starring {name}', 'Written & directed by someone who loves you'],
    endLine: 'Make theirs in two minutes.',
    endCta: 'Create a gift',
    hero: 'assets/netflix/slide-7.jpg',
    avatar: 'assets/netflix/profile-2.jpg',
    images: [
      'assets/netflix/slide-2.jpg', 'assets/netflix/slide-7.jpg', 'assets/netflix/slide-4.jpg', 'assets/netflix/slide-6.jpg',
      'assets/netflix/slide-1.jpg', 'assets/netflix/slide-9.jpg', 'assets/netflix/moment-1.jpg', 'assets/netflix/slide-5.jpg',
    ],
    player: ['assets/netflix/slide-7.jpg', 'assets/netflix/slide-2.jpg', 'assets/netflix/slide-4.jpg'],
    profileImages: ['assets/netflix/profile-1.jpg', 'assets/netflix/profile-2.jpg', 'assets/netflix/profile-3.jpg', 'assets/netflix/profile-4.jpg'],
  };

  /* ---------------- helpers ---------------- */
  const esc = (s = '') => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  // "{name}" in any text becomes a live slot that always shows the current name.
  const fmt = (s = '') => esc(s).replace(/\{name\}/g, '<span data-n></span>');
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const chars = s => Array.from(String(s)); // emoji-safe
  const typed = (str, local, start, cps) => {
    const list = chars(str);
    return list.slice(0, clamp(Math.floor((local - start) * cps), 0, list.length)).join('');
  };
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const pick = (arr, i) => arr[i % arr.length];
  const list = (v, fallback) => (Array.isArray(v) && v.length ? v : fallback);
  const setText = (el, v) => { if (el && el._v !== v) { el._v = v; el.textContent = v; } };
  const setOpacity = (el, v) => { if (el && el._o !== v) { el._o = v; el.style.opacity = String(v); } };

  const CURSOR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 2.5 19.5 12l-6.8 1.5-3.6 6.8z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  const ICON = {
    play: '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg>',
    pause: '<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4h4v16h-4zM13.5 4h4v16h-4z"/></svg>',
    full: '<svg class="i-line" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  };

  const hearts = specs => specs.map(([x, d, dur, z, ch]) =>
    `<i class="f-heart" style="left:${x}px;--d:${d}s;--dur:${dur}s;--z:${z}px">${ch || '♥'}</i>`).join('');

  /* ---------------- the six scenes ---------------- */
  const build = c => {
    const img = (src, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${esc(src)}" alt="" draggable="false">`;
    const cap = i => `<div class="f-cap"><b>0${i + 1}</b><span>${esc(pick(c.chapters, i))}</span></div>`;
    const mark = `<span class="f-mark">${esc(c.mark)}</span>`;
    const images = list(c.images, DEFAULTS.images);
    const player = list(c.player, DEFAULTS.player);
    const profileImages = list(c.profileImages, DEFAULTS.profileImages);
    const profiles = list(c.profiles, DEFAULTS.profiles).slice(0, 4);
    const credits = list(c.credits, DEFAULTS.credits).slice(0, 3);
    const nav = list(c.navLinks, DEFAULTS.navLinks).slice(0, 4);

    const create = `
      <section class="sc sc-create">
        ${cap(0)}
        <div class="cr-card">
          <div class="cr-top">${mark}<span class="cr-brand">${esc(c.brand)}<i>.</i></span><span class="cr-tag">${esc(c.formTag)}</span></div>
          <h4>${esc(c.formTitle)}</h4>
          <p class="cr-label">${esc(c.nameLabel)}</p>
          <div class="cr-field" data-ref="fieldName"><span data-ref="tyName"></span><i class="f-caret" data-ref="caretName"></i></div>
          <p class="cr-label">${esc(c.noteLabel)}</p>
          <div class="cr-field cr-note" data-ref="fieldNote"><span data-ref="tyNote"></span><i class="f-caret" data-ref="caretNote"></i></div>
          <div class="cr-act">
            <div class="cr-btn">${esc(c.createLabel)} <span>↗</span></div>
            <div class="cr-done"><b>✓</b>${esc(c.readyLabel)}</div>
          </div>
        </div>
        <div class="cr-link"><span>🔗</span><span class="cr-url">${esc(c.link)}</span><b>Copy</b></div>
        ${hearts([[700, 4.2, 1.6, 16], [742, 4.35, 1.5, 12, '✦'], [236, 4.3, 1.7, 14]])}
        <i class="f-rip"></i>
        <div class="f-cur">${CURSOR}</div>
      </section>`;

    const upload = `
      <section class="sc sc-upload">
        ${cap(1)}
        <div class="up-card">
          <div class="up-head">
            <div><h4>${fmt(c.uploadTitle)}</h4><p>${esc(c.uploadSub)}</p></div>
            <span class="up-live"><i></i>Live</span>
          </div>
          <div class="up-grid">
            ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `
              <div class="up-tile" style="--i:${i}">${img(pick(images, i))}
                ${i === 5 ? '<span class="up-vid">▶</span>' : ''}
                <span class="up-bar"><i></i></span><b class="up-ok">✓</b>
              </div>`).join('')}
          </div>
          <div class="up-foot"><span>📷 <b data-ref="count">0</b> ${esc(c.countLabel)}</span><span class="up-btn">${esc(c.addLabel)}</span></div>
        </div>
        <div class="up-toast"><span class="up-av">${esc(chars(c.friend)[0] || '♥')}</span><span><b>${esc(c.friend)}</b> ${esc(c.friendAction)}</span></div>
        ${hearts([[120, 2.2, 2.2, 18], [860, 2.8, 2.4, 14], [90, 3.6, 2, 12, '✦'], [880, 4, 1.8, 16]])}
      </section>`;

    const burst = [[-70, -60], [60, -80], [150, -50], [190, 20], [-90, 30], [30, 70], [120, 80], [-40, -100]]
      .map(([dx, dy], k) => `<i style="--dx:${dx}px;--dy:${dy}px">${k % 2 ? '♥' : '✦'}</i>`).join('');
    const midnight = `
      <section class="sc sc-mid">
        <div class="mid-stars"></div>
        ${cap(2)}
        <div class="mid-clock">
          <p class="mid-kicker">${esc(c.clockKicker)}</p>
          <div class="mid-time">
            <span class="t1">11:59<small>PM</small></span>
            <span class="t2">12:00<small>AM</small></span>
            <div class="mid-burst">${burst}</div>
          </div>
          <p class="mid-line">${fmt(c.clockLine)}</p>
        </div>
        <div class="phone"><div class="ph-screen">
          <div class="ph-status"><span>12:00</span><span class="ph-sig"><i></i><i></i><i></i><b></b></span></div>
          <div class="ph-head">${img(c.avatar)}<div><b>${fmt(c.chatWith)}</b><small>${esc(c.chatStatus)}</small></div></div>
          <div class="ph-body">
            <div class="bub out ph-b1">${fmt(c.sent)}</div>
            <div class="ph-card">${img(c.hero)}<div><b>${esc(c.title)}, <span data-n></span></b><small>${esc(c.cardSub)}</small></div></div>
            <div class="ph-rcpt"><span class="r1">Delivered</span><span class="r2">Seen ✓✓</span></div>
            <div class="ph-reply">
              <div class="bub in ph-typing"><i></i><i></i><i></i></div>
              <div class="bub in ph-b3">${fmt(c.reply)}</div>
            </div>
          </div>
        </div></div>
      </section>`;

    const rayColors = ['#e50914', '#ff6f91', '#b1060f', 'var(--fa)', '#ff3d3d', '#7a0a12', '#ffb3c1'];
    const rays = Array.from({ length: 14 }, (_, k) =>
      `<i style="--k:${k};--x:${Math.round((k - 6.5) * 64)}px;--c:${rayColors[k % rayColors.length]}"></i>`).join('');
    const intro = `
      <section class="sc sc-intro">
        <div class="in-logo"><svg viewBox="0 0 120 170" aria-hidden="true">
          <rect class="in-stem" x="8" y="8" width="30" height="154"/>
          <path class="in-bowl" d="M23 23H64a38 38 0 0 1 0 76H23" pathLength="1"/>
        </svg></div>
        <div class="in-rays">${rays}</div>
        <div class="in-flash"></div>
        <div class="in-prof">
          <h4>${esc(c.whoTitle)}</h4>
          <div class="in-grid">
            ${profiles.map((p, i) => `<div class="in-p" style="--i:${i}"><div class="in-img">${img(pick(profileImages, i))}</div><span>${fmt(p)}</span></div>`).join('')}
          </div>
        </div>
        ${cap(3)}
        <i class="f-rip"></i>
        <div class="f-cur">${CURSOR}</div>
      </section>`;

    const home = `
      <section class="sc sc-home">
        <div class="hm-bg">${img(c.hero)}</div>
        <div class="hm-shade"></div>
        <div class="hm-nav">${mark}${nav.map(n => `<span>${esc(n)}</span>`).join('')}<span class="hm-av">${img(pick(profileImages, 0))}</span></div>
        ${cap(4)}
        <div class="hm-copy">
          <p class="hm-series">${mark}${esc(c.series)}</p>
          <p class="hm-title">${esc(c.title)}</p>
          <p class="hm-name" data-ref="hmName"></p>
          <p class="hm-facts"><span class="m">${esc(c.match)}</span><span>${esc(c.year)}</span><span class="b">HD</span><span>${esc(c.seasons)}</span></p>
          <p class="hm-desc">${esc(c.note)}</p>
          <div class="hm-btns"><span class="hm-play">▶&nbsp; ${esc(c.playLabel)}</span><span class="hm-more">ⓘ&nbsp; ${esc(c.moreLabel)}</span></div>
        </div>
        <div class="hm-row">
          <p>${esc(c.rowTitle)}</p>
          <div class="hm-thumbs">${[2, 0, 3, 5, 6, 7].map((n, i) => `<div style="--i:${i}">${img(pick(images, n))}${i === 1 ? '<em><i></i></em>' : ''}</div>`).join('')}</div>
        </div>
        <i class="f-rip"></i>
        <div class="f-cur">${CURSOR}</div>
        <div class="hm-wipe"></div>
      </section>`;

    const finale = `
      <section class="sc sc-finale">
        <div class="fi-slides">${player.slice(0, 3).map((src, i) => `<div class="fi-slide" style="--d:${(i * 0.95).toFixed(2)}s">${img(src)}</div>`).join('')}</div>
        <div class="fi-ui">
          <div class="fi-top"><span class="fi-back">←</span><span class="fi-title"><b>${esc(c.title)}, <span data-n></span></b> &nbsp;${esc(c.episode)}</span></div>
          <div class="fi-bar"><i></i></div>
          <span class="fi-time">24:05</span>
        </div>
        <div class="fi-black"></div>
        <div class="fi-credits">
          <p class="fi-badge">${mark}${esc(c.original)}</p>
          <p class="fi-head">${esc(c.creditsTitle)}<em><span data-n></span> ♥</em></p>
          <div class="fi-lines">${credits.map((l, i) => `<p style="--i:${i}">${fmt(l)}</p>`).join('')}</div>
        </div>
        ${hearts([[110, 3.2, 3, 22], [230, 3.7, 2.6, 14], [330, 4.4, 3, 18, '✦'], [640, 3.4, 2.8, 16], [760, 3.9, 3.1, 24], [860, 4.6, 2.5, 14, '✦'], [180, 5.1, 2.6, 16], [700, 5.4, 2.4, 18]])}
        <div class="fi-end">
          <p class="fi-brand">${esc(c.brand)}<i>.</i></p>
          <p class="fi-line">${esc(c.endLine)}</p>
          <span class="fi-cta">${esc(c.endCta)} ↗</span>
        </div>
        ${cap(5)}
      </section>`;

    return create + upload + midnight + intro + home + finale;
  };

  /* ---------------- per-frame text that CSS can't do (typing, counters) ---------------- */
  const TICKS = {
    create(l, r, st) {
      const nameEnd = 0.6 + chars(st.name).length / 13;
      const noteStart = Math.max(1.5, nameEnd + 0.25);
      const noteCps = Math.max(42, chars(st.note).length / Math.max(0.6, 3.25 - noteStart));
      setText(r.tyName, typed(st.name, l, 0.6, 13));
      setText(r.tyNote, typed(st.note, l, noteStart, noteCps));
      const blink = Math.floor(l * 2.6) % 2 === 0;
      const onName = l >= 0.3 && l < noteStart - 0.1;
      const onNote = l >= noteStart - 0.1 && l < 3.5;
      setOpacity(r.caretName, onName && (l < nameEnd || blink) ? 1 : 0);
      setOpacity(r.caretNote, onNote && (l < 3.25 || blink) ? 1 : 0);
      if (r.fieldName) r.fieldName.classList.toggle('is-focus', onName);
      if (r.fieldNote) r.fieldNote.classList.toggle('is-focus', onNote);
    },
    upload(l, r) {
      let n = 0;
      for (let i = 0; i < 8; i++) if (l >= 1.45 + i * 0.28) n++;
      setText(r.count, String(n));
    },
    home(l, r, st) {
      setText(r.hmName, typed(st.name, l, 0.9, 11));
    },
  };

  /* ---------------- mount ---------------- */
  const mount = (host, options = {}) => {
    const o = Object.assign({
      content: {},          // the `film` block from landing-content.js
      name: '',             // the birthday star's name
      autoplay: true,       // start when visible (pauses when scrolled away / tab hidden)
      ui: null,             // element to put the player controls in (none = no controls)
      render: false,        // export mode for scripts/render-film.mjs: no clock, no controls
      posterTime: START[4] + 3.2,
    }, options);

    host.classList.add('film-host');
    host.querySelectorAll('.film, .film-big, .film-poster').forEach(el => el.remove());
    const film = document.createElement('div');
    film.className = 'film';
    film.setAttribute('aria-hidden', 'true');
    host.appendChild(film);

    // Drive every CSS animation from our clock when the browser allows it (all modern ones do).
    const driven = typeof Element !== 'undefined' && typeof Element.prototype.getAnimations === 'function';
    film.classList.toggle('is-driven', driven);

    const st = { name: '', note: '' };
    let content = {};
    let t = 0, cur = -1, anims = [], sceneEls = [], refs = {};
    let playing = false, last = null, raf = 0;
    let inView = !('IntersectionObserver' in window);
    let userPaused = !o.autoplay;

    /* fit the 960×540 canvas inside the host, centred */
    const fit = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      const s = Math.min(w / CW, h / CH);
      film.style.transform = `translate(${((w - CW * s) / 2).toFixed(2)}px, ${((h - CH * s) / 2).toFixed(2)}px) scale(${s.toFixed(5)})`;
    };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(host);
    else window.addEventListener('resize', fit);

    /* controls */
    let ui = null, segs = [], timeEl = null, big = null;
    if (o.ui && !o.render) {
      ui = o.ui;
      ui.classList.add('film-ui');
      const fsOK = !!(host.requestFullscreen || host.webkitRequestFullscreen);
      ui.innerHTML = `
        <button type="button" class="fu-btn fu-play" aria-label="Pause the film">${ICON.pause}${ICON.play}</button>
        <div class="fu-segs">${SCENES.map(s => `<button type="button" class="fu-seg" style="flex:${s.dur} 1 0"><i></i></button>`).join('')}</div>
        <span class="fu-time">0:00 / ${mmss(TOTAL)}</span>
        ${fsOK ? `<button type="button" class="fu-btn fu-full" aria-label="Watch full screen">${ICON.full}</button>` : ''}`;
      segs = [...ui.querySelectorAll('.fu-seg')];
      timeEl = ui.querySelector('.fu-time');
      ui.querySelector('.fu-play').addEventListener('click', () => toggle());
      segs.forEach((b, i) => b.addEventListener('click', () => { seek(START[i]); if (!playing) play(); }));
      const fsBtn = ui.querySelector('.fu-full');
      if (fsBtn) fsBtn.addEventListener('click', () => {
        const inFs = document.fullscreenElement || document.webkitFullscreenElement;
        try {
          if (inFs) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
          else {
            const req = host.requestFullscreen || host.webkitRequestFullscreen;
            const p = req.call(host);
            if (p && p.catch) p.catch(() => {});
            if (!playing) play();
          }
        } catch { /* fullscreen not allowed here — ignore */ }
      });

      big = document.createElement('button');
      big.type = 'button';
      big.className = 'film-big';
      big.innerHTML = `<b>${ICON.play}</b><span>Play the ${Math.round(TOTAL)}-second film</span>`;
      big.hidden = true;
      big.addEventListener('click', e => { e.stopPropagation(); play(); });
      host.appendChild(big);
      host.addEventListener('click', e => { if (!e.target.closest('.film-big')) toggle(); });
    }

    const updateUI = (i, local) => {
      if (!ui) return;
      segs.forEach((b, k) => {
        const f = k < i ? 1 : k > i ? 0 : clamp(local / SCENES[k].dur, 0, 1);
        const v = `scaleX(${f.toFixed(4)})`;
        const bar = b.firstElementChild;
        if (bar._v !== v) { bar._v = v; bar.style.transform = v; }
        b.classList.toggle('is-current', k === i);
      });
      setText(timeEl, `${mmss(t)} / ${mmss(TOTAL)}`);
    };
    const updatePlayState = () => {
      film.classList.toggle('is-paused', !playing);
      if (!ui) return;
      ui.classList.toggle('is-paused', !playing);
      const btn = ui.querySelector('.fu-play');
      btn.setAttribute('aria-label', playing ? 'Pause the film' : 'Play the film');
      if (big) big.hidden = playing || !userPaused;
    };

    /* the clock */
    const seek = time => {
      t = ((Number(time) || 0) % TOTAL + TOTAL) % TOTAL;
      let i = SCENES.length - 1;
      while (i > 0 && t < START[i]) i--;
      const local = t - START[i];
      if (i !== cur) {
        sceneEls.forEach((el, k) => {
          el.classList.toggle('is-on', k === i);
          if (k !== i) setOpacity(el, 0);
        });
        cur = i;
        anims = driven && sceneEls[i] ? sceneEls[i].getAnimations({ subtree: true }) : [];
      }
      if (driven) {
        const ms = local * 1000;
        for (const a of anims) { try { a.currentTime = ms; } catch { /* ignore */ } }
      }
      const dur = SCENES[i].dur;
      setOpacity(sceneEls[i], +clamp(Math.min(local / FADE, (dur - local) / FADE), 0, 1).toFixed(3));
      const tick = TICKS[SCENES[i].id];
      if (tick) tick(local, refs, st);
      updateUI(i, local);
    };

    const frame = now => {
      if (!playing) return;
      if (last !== null) t += Math.min(0.1, Math.max(0, (now - last) / 1000));
      last = now;
      seek(t);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (playing || o.render) return;
      playing = true; last = null;
      raf = requestAnimationFrame(frame);
      updatePlayState();
    };
    const stop = () => {
      playing = false;
      cancelAnimationFrame(raf);
      updatePlayState();
    };
    const wanted = () => inView && !userPaused && !document.hidden;
    const sync = () => (wanted() ? start() : stop());
    const play = () => { userPaused = false; inView = true; sync(); };
    const pause = () => { userPaused = true; stop(); };
    const toggle = () => (playing ? pause() : play());

    if (!o.render) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
          inView = entries[entries.length - 1].isIntersecting;
          sync();
        }, { threshold: 0.3 }).observe(host);
      }
      document.addEventListener('visibilitychange', sync);
    }

    /* content + name */
    const setName = name => {
      st.name = String(name || '').trim() || content.defaultName || DEFAULTS.defaultName;
      film.querySelectorAll('[data-n]').forEach(el => { el.textContent = st.name; });
      film.style.setProperty('--nl', String(Math.max(7, chars(st.name).length)));
      if (!playing) seek(t);
    };
    const setContent = (next = {}) => {
      content = Object.assign({}, DEFAULTS, next);
      st.note = content.note;
      film.innerHTML = build(content);
      sceneEls = [...film.querySelectorAll('.sc')];
      refs = {};
      film.querySelectorAll('[data-ref]').forEach(el => { refs[el.dataset.ref] = el; });
      segs.forEach((b, i) => {
        const label = `Chapter ${i + 1}: ${pick(content.chapters, i)}`;
        b.setAttribute('aria-label', label);
        b.title = label;
      });
      cur = -1;
      setName(st.name || o.name);
      seek(t);
    };

    /* resolves when fonts + pictures are ready (used by the MP4 exporter) */
    const ready = () => {
      const fontLoads = [];
      if (document.fonts && document.fonts.load) {
        ['700 64px Caveat', '400 40px "Playfair Display"', 'italic 400 40px "Playfair Display"', '400 14px "DM Sans"', '700 14px "DM Sans"']
          .forEach(f => fontLoads.push(document.fonts.load(f).catch(() => {})));
      }
      const imgs = [...film.querySelectorAll('img')].map(im =>
        (im.complete && im.naturalWidth ? Promise.resolve() : new Promise(res => { im.addEventListener('load', res, { once: true }); im.addEventListener('error', res, { once: true }); }))
          .then(() => (im.decode ? im.decode().catch(() => {}) : null)));
      const all = Promise.all([...fontLoads, ...imgs]).then(() => (document.fonts ? document.fonts.ready : null));
      const timeout = new Promise(res => setTimeout(res, 10000));
      return Promise.race([all, timeout]).then(() => { fit(); seek(t); return true; });
    };

    setContent(o.content);
    if (o.render || !o.autoplay) seek(o.render ? 0 : o.posterTime);
    updatePlayState();
    if (!o.render && !('IntersectionObserver' in window)) sync();

    return { play, pause, toggle, seek, setName, setContent, ready, fit, get duration() { return TOTAL; }, get time() { return t; }, get playing() { return playing; } };
  };

  window.PremiereFilm = { mount, duration: TOTAL, scenes: SCENES.map((s, i) => ({ ...s, start: START[i] })) };
})();
