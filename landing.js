(() => {
  const S = window.SITE;
  const DAYS = (window.CLOUD && window.CLOUD.TRIAL_DAYS) || 7;
  const NAME_KEY = 'premiere-draft-name';
  const AUD_KEY = 'premiere-audience';
  const AUD_KEYS = Object.keys(S.audiences);

  // Content is author-written (landing-content.js), so it may contain simple markup like <em>.
  const t = (s = '') => String(s).replace(/\{days\}/g, DAYS);
  const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const link = key => S.links[key] || '#';
  const arrow = '<span aria-hidden="true">↗</span>';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const store = {
    get: k => { try { return sessionStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} },
  };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pickAudience = () => {
    const fromUrl = new URLSearchParams(location.search).get('for');
    if (AUD_KEYS.includes(fromUrl)) return fromUrl;
    const saved = store.get(AUD_KEY);
    if (AUD_KEYS.includes(saved)) return saved;
    return AUD_KEYS.includes(S.defaultAudience) ? S.defaultAudience : AUD_KEYS[0];
  };
  let aud = pickAudience();
  const A = () => S.audiences[aud];

  const brand = `<a class="brand" href="index.html" aria-label="${esc(S.brand.name)} home"><span class="brand-mark" aria-hidden="true">${esc(S.brand.mark)}<span>✦</span></span><span>${esc(S.brand.name)}<span class="brand-period">.</span></span></a>`;
  const head = (sec, id) => `<p class="eyebrow">${t(sec.eyebrow)}</p><h2 id="${id}">${t(sec.title)}</h2>`;
  const navLinks = S.nav.map(n => `<a href="${n.href}">${t(n.label)}</a>`).join('');

  /* ---------------- Static shell ---------------- */
  const header = `
    <header class="site-header">
      <div class="shell header-inner">
        ${brand}
        <nav class="desktop-nav" aria-label="Main navigation">${navLinks}</nav>
        <a class="header-signin" href="${link('signIn')}">Sign in</a>
        <a class="header-cta" href="${link('create')}" data-create><span data-slot="cta-label"></span> ${arrow}</a>
        <details class="mobile-menu">
          <summary aria-label="Open navigation"><span></span><span></span><span></span></summary>
          <nav aria-label="Mobile navigation">
            ${navLinks}
            <a href="${link('signIn')}">Sign in</a>
            <a class="menu-cta" href="${link('create')}" data-create data-slot="cta-label"></a>
          </nav>
        </details>
      </div>
    </header>`;

  const hero = `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="shell hero-grid">
        <div class="hero-copy">
          <div class="aud-switch" role="group" aria-label="${esc(S.switchLabel)}">
            ${AUD_KEYS.map(k => `<button type="button" data-aud="${k}"><span aria-hidden="true">${S.audiences[k].icon}</span> ${t(S.audiences[k].label)}</button>`).join('')}
            <i class="aud-pill" aria-hidden="true"></i>
          </div>
          <div class="swap" data-slot="hero-copy" aria-live="polite"></div>
          <div class="hero-actions">
            <a class="button button-gold" href="${link('create')}" data-create><span data-slot="cta-label"></span> ${arrow}</a>
            <a class="text-link" href="${link('sample')}">▶&nbsp; Watch the sample</a>
          </div>
          <ul class="hero-chips swap" data-slot="chips" aria-label="What is included"></ul>
        </div>
        <div class="hero-visual">
          <div class="device" aria-label="Live preview of a birthday page">
            <div class="device-screen">
              <div data-slot="slides"></div>
              <div class="device-tint" aria-hidden="true"></div>
              <div class="device-top"><span class="device-n">${esc(S.brand.mark)}</span><span>SERIES</span></div>
              <div class="device-copy">
                <p class="device-title"><span data-slot="preview-title"></span><br><span id="preview-name"></span></p>
                <p class="device-meta"><span class="match">99% Match</span><span>2026</span><span>HD+</span></p>
                <span class="device-play">▶&nbsp; Play</span>
              </div>
              <div class="device-dots" data-slot="dots" aria-hidden="true"></div>
            </div>
          </div>
          <label class="name-try">
            <span>Try it — who’s the birthday star?</span>
            <input id="name-try" type="text" maxlength="24" autocomplete="off">
          </label>
        </div>
      </div>
    </section>`;

  const reel = (() => {
    const imgs = S.reel.map(src => `<img src="${src}" alt="" loading="lazy">`).join('');
    return `<div class="reel" aria-hidden="true"><div class="reel-track">${imgs}${imgs}</div></div>`;
  })();

  const steps = `
    <section class="section process" id="how" aria-labelledby="how-title">
      <div class="shell">
        <div class="section-intro reveal"><p class="eyebrow">How it works</p><h2 id="how-title" data-slot="steps-title"></h2><p data-slot="steps-lead"></p></div>
        <ol class="steps" data-slot="steps"></ol>
      </div>
    </section>`;

  const ways = `
    <section class="section ways" id="ways" aria-labelledby="ways-title">
      <div class="shell">
        <div class="section-intro reveal">${head(S.ways, 'ways-title')}</div>
        <div class="way-grid">
          ${S.ways.cards.map((c, i) => `
            <article class="way reveal" data-way="${c.audience}" style="--d:${i * 100}ms">
              <div class="way-media"><img src="${c.image}" alt="" loading="lazy"><span class="way-tag">${S.audiences[c.audience].icon} ${t(c.tag)}</span></div>
              <div class="way-body">
                <h3>${t(c.title)}</h3>
                <p>${t(c.text)}</p>
                <ul>${c.points.map(p => `<li>${t(p)}</li>`).join('')}</ul>
                <div class="way-actions">
                  <a class="button button-gold" href="${link('create')}" data-create data-set-aud="${c.audience}">${t(c.cta)} ${arrow}</a>
                  <button type="button" class="text-link" data-preview-aud="${c.audience}">Preview this version ↑</button>
                </div>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  const roles = `
    <section class="section roles" id="roles" aria-labelledby="roles-title">
      <div class="shell">
        <div class="section-intro reveal"><p class="eyebrow">Who’s involved</p><h2 id="roles-title" data-slot="roles-title"></h2></div>
        <div class="role-grid" data-slot="roles"></div>
      </div>
    </section>`;

  const ideas = `
    <section class="section ideas" aria-labelledby="ideas-title">
      <div class="shell ideas-grid">
        <div class="reveal"><p class="eyebrow">What to put in it</p><h2 id="ideas-title" data-slot="ideas-title"></h2><p class="ideas-lead" data-slot="ideas-lead"></p></div>
        <ul class="idea-list" data-slot="ideas"></ul>
      </div>
    </section>`;

  const e = S.experience;
  const experience = `
    <section class="section experience" id="experience" aria-labelledby="experience-title">
      <div class="shell">
        <div class="section-intro reveal">${head(e, 'experience-title')}<p>${t(e.lead)}</p></div>
        <div class="screen-frame reveal">
          <div class="screen-bar"><span class="screen-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${t(e.screenLabel)}</span><span aria-hidden="true">↗</span></div>
          <img src="${e.screenshot}" alt="${esc(e.screenshotAlt)}" loading="lazy">
        </div>
        <div class="feature-grid">
          ${e.features.map((f, i) => `<div class="feature reveal" style="--d:${(i % 3) * 80}ms"><span class="feature-index">0${i + 1}</span><h3>${t(f.title)}</h3><p>${t(f.text)}</p></div>`).join('')}
        </div>
        <div class="center reveal"><a class="button button-outline" href="${link('sample')}">${t(e.cta)} ${arrow}</a></div>
      </div>
    </section>`;

  const pricing = `
    <section class="section pricing" id="pricing" aria-labelledby="pricing-title">
      <div class="shell">
        <div class="section-intro reveal">${head(S.pricing, 'pricing-title')}</div>
        <div class="plan-grid">
          ${S.pricing.plans.map((p, i) => `
            <article class="plan reveal${p.featured ? ' is-featured' : ''}" style="--d:${i * 90}ms">
              ${p.badge ? `<span class="plan-badge">${t(p.badge)}</span>` : ''}
              <h3>${t(p.name)}</h3>
              <p class="plan-price">${p.price ? `<strong>${t(p.price)}</strong><span>${t(p.period)}</span>` : '<strong class="soon">Coming soon</strong>'}</p>
              <p class="plan-text">${t(p.text)}</p>
              <ul>${p.features.map(f => `<li>${t(f)}</li>`).join('')}</ul>
              <a class="button ${p.featured ? 'button-gold' : 'button-outline'}" href="${link('create')}" data-create>${t(p.cta)} ${arrow}</a>
              <p class="plan-note">${t(p.note)}</p>
            </article>`).join('')}
        </div>
      </div>
    </section>`;

  const faq = `
    <section class="section faq" id="faq" aria-labelledby="faq-title">
      <div class="shell faq-grid">
        <div class="reveal">${head(S.faq, 'faq-title')}</div>
        <div class="faq-list reveal">
          ${S.faq.items.map(f => `<details><summary>${t(f.q)}<span aria-hidden="true">＋</span></summary><p>${t(f.a)}</p></details>`).join('')}
        </div>
      </div>
    </section>`;

  const closing = `
    <section class="closing" aria-labelledby="closing-title">
      <div class="closing-glow" aria-hidden="true"></div>
      <div class="shell closing-inner reveal">
        <p class="eyebrow">${t(S.closing.eyebrow)}</p>
        <h2 id="closing-title">${t(S.closing.title)}</h2>
        <p>${t(S.closing.text)}</p>
        <div class="closing-actions">
          ${AUD_KEYS.map(k => `<a class="button" href="${link('create')}" data-create data-set-aud="${k}" data-closing="${k}">${S.audiences[k].icon}&nbsp; ${t(S.audiences[k].hero.primaryCta)}</a>`).join('')}
        </div>
      </div>
    </section>`;

  const footer = `
    <footer class="site-footer">
      <div class="shell footer-main">
        ${brand}
        <p>${t(S.brand.tagline)}</p>
        <nav aria-label="Footer navigation">${S.footer.links.map(l => `<a href="${l.href}">${t(l.label)}</a>`).join('')}</nav>
      </div>
      <div class="shell footer-bottom"><span>${t(S.footer.copyright)}</span><span>${t(S.footer.note)}</span></div>
    </footer>
    <a class="mobile-cta" href="${link('create')}" data-create><span data-slot="cta-label"></span> ${arrow}</a>`;

  $('#app').innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    ${header}
    <main id="main">${hero}${reel}${steps}${ways}${roles}${ideas}${experience}${pricing}${faq}${closing}</main>
    ${footer}`;

  /* ---------------- Reveal on scroll ---------------- */
  const io = (!reduced && 'IntersectionObserver' in window)
    ? new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      }), { rootMargin: '0px 0px -8% 0px' })
    : null;
  const reveal = els => els.forEach(el => (io ? io.observe(el) : el.classList.add('is-in')));

  /* ---------------- Audience-dependent parts ---------------- */
  const slot = name => $$(`[data-slot="${name}"]`);
  const fill = (name, html) => slot(name).forEach(el => { el.innerHTML = html; });
  const input = $('#name-try');
  const previewName = $('#preview-name');
  let slideTimer = null;

  const setPreviewName = () => {
    previewName.textContent = input.value.trim() || A().hero.previewDefaultName;
  };

  const startSlides = () => {
    clearInterval(slideTimer);
    const slides = $$('.device-slide');
    const dots = $$('[data-slot="dots"] i');
    if (slides.length < 2 || reduced) return;
    let i = 0;
    slideTimer = setInterval(() => {
      slides[i].classList.remove('is-on'); dots[i].classList.remove('is-on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-on'); dots[i].classList.add('is-on');
    }, 3800);
  };

  const render = () => {
    const a = A();
    const h = a.hero;
    document.body.dataset.audience = aud;

    $$('.aud-switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.aud === aud)));
    $('.aud-switch').dataset.active = String(AUD_KEYS.indexOf(aud));

    fill('hero-copy', `
      <p class="eyebrow"><span class="eyebrow-star" aria-hidden="true">${a.icon}</span> ${t(h.eyebrow)}</p>
      <h1 id="hero-title">${t(h.title)}</h1>
      <p class="hero-lead">${t(h.lead)}</p>`);
    fill('chips', h.chips.map(c => `<li>${t(c)}</li>`).join(''));
    fill('cta-label', t(h.primaryCta));
    fill('preview-title', t(h.previewTitle));
    fill('slides', h.images.map((src, i) => `<img class="device-slide${i === 0 ? ' is-on' : ''}" src="${src}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>`).join(''));
    fill('dots', h.images.map((_, i) => `<i${i === 0 ? ' class="is-on"' : ''}></i>`).join(''));
    input.placeholder = h.previewPlaceholder;
    setPreviewName();
    startSlides();

    fill('steps-title', t(a.steps.title));
    fill('steps-lead', t(a.steps.lead));
    fill('steps', a.steps.items.map((s, i) => `
      <li class="step reveal" style="--d:${i * 90}ms">
        <span class="step-number">0${i + 1}</span>
        <div class="step-icon" aria-hidden="true">${s.icon}</div>
        <h3>${t(s.title)}</h3>
        <p>${t(s.text)}</p>
      </li>`).join(''));

    fill('roles-title', t(a.roles.title));
    fill('roles', a.roles.items.map((r, i) => `
      <article class="role reveal" style="--d:${i * 90}ms">
        <span class="role-tag">${t(r.tag)}</span>
        <h3>${t(r.title)}</h3>
        <ul>${r.points.map(p => `<li>${t(p)}</li>`).join('')}</ul>
      </article>`).join(''));

    fill('ideas-title', t(a.ideas.title));
    fill('ideas-lead', t(a.ideas.lead));
    fill('ideas', a.ideas.items.map((it, i) => `<li class="reveal" style="--d:${i * 50}ms"><span aria-hidden="true">${a.icon}</span>${t(it)}</li>`).join(''));

    $$('[data-way]').forEach(c => c.classList.toggle('is-active', c.dataset.way === aud));
    $$('[data-closing]').forEach(b => {
      const on = b.dataset.closing === aud;
      b.classList.toggle('button-gold', on);
      b.classList.toggle('button-outline', !on);
    });

    reveal($$('.reveal:not(.is-in)'));
  };

  const setAudience = (key, { animate = true } = {}) => {
    if (!AUD_KEYS.includes(key) || key === aud) return;
    aud = key;
    store.set(AUD_KEY, aud);
    const url = new URL(location.href);
    url.searchParams.set('for', aud);
    history.replaceState(null, '', url);
    const swaps = $$('.swap');
    if (!animate || reduced) { render(); return; }
    swaps.forEach(el => el.classList.add('is-out'));
    setTimeout(() => { render(); swaps.forEach(el => el.classList.remove('is-out')); }, 180);
  };

  render();
  store.set(AUD_KEY, aud);

  /* ---------------- Events ---------------- */
  $$('.aud-switch button').forEach(b => b.addEventListener('click', () => setAudience(b.dataset.aud)));

  $$('[data-preview-aud]').forEach(b => b.addEventListener('click', () => {
    setAudience(b.dataset.previewAud, { animate: false });
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }));

  // Live name preview; the typed name + audience are carried over to the gift form.
  const savedName = store.get(NAME_KEY);
  if (savedName) { input.value = savedName; setPreviewName(); }
  input.addEventListener('input', () => { setPreviewName(); store.set(NAME_KEY, input.value.trim()); });
  document.addEventListener('click', ev => {
    const a = ev.target.closest('[data-create]');
    if (!a) return;
    if (a.dataset.setAud) store.set(AUD_KEY, a.dataset.setAud);
    if (input.value.trim()) store.set(NAME_KEY, input.value.trim());
  });

  // Header shadow + mobile CTA visibility
  const headerEl = $('.site-header');
  const mobileCta = $('.mobile-cta');
  const closingEl = $('.closing');
  const onScroll = () => {
    headerEl.classList.toggle('is-scrolled', scrollY > 10);
    const nearEnd = closingEl.getBoundingClientRect().top < innerHeight;
    mobileCta.classList.toggle('is-on', scrollY > innerHeight * 0.7 && !nearEnd);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menu = $('.mobile-menu');
  $$('a', menu).forEach(a => a.addEventListener('click', () => menu.removeAttribute('open')));
})();
