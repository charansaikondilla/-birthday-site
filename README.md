# Birthday — a streaming-style birthday site

A private birthday website that plays exactly like the reference video, from start to end:

1. **Intro** — the red "N" logo builds stroke by stroke, holds, then bursts into colour ribbons.
2. **Who's watching?** — four photo profiles; an on-screen cursor picks the first one (any real tap/click takes over).
3. **Home** — left icon sidebar, "N SERIES" tag, the title typed out in marker handwriting, match / year / 18+ / season / HD+ facts, the birthday message, **Play** and **More Info**, then a scrolling page of rows: **Special Moments**, **Continue Watching** (with red progress bars), **Top 10 Memories** (big outlined numbers), **Trending Now**, **My List**, and a footer. Rows slide in as you scroll, the hero picture parallaxes away, and on desktop hovering a tile grows it into a preview card whose picture keeps changing, with Play / + / like / more buttons, match %, badges and tags. Arrows appear at the row edges to slide them; on phones the rows swipe.
4. **Player** — the video clips are replaced by **pictures**: a slow-zoom slideshow inside the player chrome (back arrow, title, rewind/pause/forward 10, red progress bar, 50:50, Speed / Lock / Episode / Audio & Subtitle). The controls fade out after a few seconds; tap the picture to bring them back.
5. **Finale** — "Happy Birthday, NAME" with your closing lines, **Replay** and **Back to Home**.

Pure HTML / CSS / vanilla JavaScript. No build step, no backend, no dependencies. Deploys to GitHub Pages as-is.

```
index.html       – the five screens + More Info modal
style.css        – the design, the intro animation, responsive rules
script.js        – ✏️ config (ALL personal text & pictures) + the logic
assets/netflix/  – the pictures used by the site (see below)
```

## ✎ Edit live, right on the page

Press the **Edit** pill (bottom-right). The page itself becomes editable — no panel, no forms:

- **Any photo, video, hero background, or profile picture** — click it, pick a new file, done. A small 🎥 badge marks what's clickable.
- **Any visible text** — the title, the message, a row's name, a tile's title, the hero's "Featuring" name, a profile's label — click it, type, press **Enter** (or click away). It saves immediately, no Save button.
- A one-time hint explains this when you turn editing on; press **Done editing** to go back to a normal, clickable site.
- Tap **More settings** (appears next to Edit while you're editing) for anything that doesn't have an obvious on-page spot: adding a whole new row, More Info text, tags, player settings, export/import, reset.

Editing the big title directly sets it as the whole title+name combined — for the separate "words before the name" / "name" fields, use More settings → Text.

## ⚙ More settings (the full panel)

Everything above lives on top of a complete settings panel, reached via **More settings** while editing. It has six tabs:

| Tab | What you can change |
| --- | --- |
| **Text** | Title words, the name, player title, the facts row, the birthday message, finale title + lines, footer |
| **Profiles** | Each "Who's watching?" picture and label; add / remove profiles |
| **Hero** | The big pictures (or videos) behind the title, and how long each stays |
| **Rows** | Every row: rename it, change its style (posters / wide tiles / Top 10), change each tile's picture **or video**, hover preview, title, text, tags and progress; add tiles straight from your camera roll; reorder or remove; add whole new rows |
| **Player** | The pictures and videos that play after **Play** (videos play to the end with sound), seconds per picture, the time label |
| **Settings** | Auto-play on/off, hover speed, intro sound, **Export / Import** and **Reset to original** |

Press **Save & apply** and the site re-draws instantly. Everything (text *and* uploaded photos / videos)
is saved in that browser (IndexedDB), so it is still there after a refresh.

- **Export** downloads one `.json` file with all your text and media. **Import** it on another device — or
  send it back to get the customised version baked into the site files for GitHub Pages.
- Uploads are per browser: a visitor on another device sees the default site until you bake the export in
  (or put your files in `assets/` and edit `config` in `script.js`).
- Files up to 60 MB each; any picture or video format the browser can show.

## 1. Personalise it

Open `script.js`. Everything personal is in the `config` object at the very top:

| Key | What it is |
| --- | --- |
| `name` | Typed after the title (`HAPPY BIRTHDAY NUEL`) and used in the finale |
| `title` | The words typed before the name |
| `playerTitle` | Title shown at the top of the player |
| `facts` | `match`, `year`, `age`, `seasons`, `quality` — the small row under the title |
| `description` | The birthday message |
| `profiles[]` | The four "Who's watching?" pictures and their labels |
| `hero.images[]` | Big pictures/videos behind the title. Each one is `{ image, title }` — they cross-fade with a slow zoom every `hero.interval` ms, and `title` (optional) fades in top-right while that one is featured, Netflix-style |
| `rows[]` | The rows under the title. Each has a `title`, a `type` (`portrait`, `landscape` or `top10`) and `items[]` |
| `rows[].items[]` | `image` (the tile), `title`, `text` (More Info), and optionally `preview` (wide picture for the hover card), `previews[]` (pictures the hover card cycles through), `tags[]`, `match`, `progress` (0–100, shows a red bar) |
| `previewInterval` | ms between picture changes inside a hover preview |
| `footer` | `links[]` and the closing `note` |
| `slides.images[]` | The pictures that play after **Play**, `slides.duration` ms each |
| `slides.time` | The time label in the player (`50:50` in the video) |
| `finale` | Closing title (`{name}` is replaced) and lines |
| `autoplay` | `false` (default) = fully manual — every step (profile, Play…) needs a real tap/click. `true` = a demo cursor walks through the site by itself, like the reference video |
| `introSound` | Optional sound file for the intro, e.g. `assets/audio/tudum.mp3` (browsers may block sound before the first tap) |

## 2. Add your pictures

Drop your own photos into `assets/netflix/` and point the config at them. Any size works — they are
cropped to fit. Recommended:

- `profile-*.jpg` — square, ~400×400
- `hero-*.jpg` and `slide-*.jpg` — landscape, ~1600×900
- `moment-*.jpg` — portrait, ~600×900

The pictures currently in that folder are frames taken from the reference video, so you can see the
layout straight away — replace them with your own.

## 3. Test locally

```
npm run dev
# → http://localhost:5173
```

Needs [Node.js](https://nodejs.org) (no `npm install` required). Any other static server works too
(e.g. `python -m http.server 8000`). Port busy? `PORT=3000 npm run dev`.

## 4. Deploy to GitHub Pages

1. Create a repository and push these files to the `main` branch.
2. Repository → **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
3. Your site is live at `https://<username>.github.io/<repo>/`.

The page has `noindex`, so keep the repo private and share the link only with the birthday person.

## Notes

- Works on phones (portrait and landscape), tablets and desktops.
- Keyboard: **Esc** closes More Info or leaves the player.
- `prefers-reduced-motion` turns off the slow zoom on the slideshow.
- This is a personal, non-commercial birthday greeting styled after a streaming app; the logo and
  icons are drawn in CSS/SVG in this project.

## 🎁 The "Gift" product — one link, multiple people, auto-expiring trial

This turns the site into something you can hand out (by link or QR code) so several
people can add their own photos/videos before the birthday, with uploads kept for a
free trial and then deleted.

**Pages:**

| Page | Who opens it | What it does |
| --- | --- | --- |
| `gift-create.html` | You (the organiser) | Type a name + a short message → get a unique shareable link **and** a QR code |
| `gift-upload.html?gift=<code>` | Everyone you send the link/QR to | Drag-and-drop photos & videos — no account, no login. Shows the trial countdown. |
| `index.html?gift=<code>` | The birthday person (or anyone) | The actual Netflix-style site, built from everyone's uploads |

**Two storage modes**, both already wired up and working:

1. **Demo mode** (default, zero setup) — gifts and uploads are saved in *that one browser*
   via IndexedDB. Great for trying the whole flow yourself right now. A second phone
   won't see the same gift, since nothing leaves that device.
2. **Cloud mode** (Cloudflare — R2 storage + D1 database, one free account, **zero
   bandwidth cost ever**, which matters once people are watching videos): follow
   **`worker/README.md`** (~10 minutes, needs Node.js, no credit card) to deploy the
   included Worker, then paste the URL it gives you into `cloud-config.js` as
   `WORKER_URL`. That's it — reload any of the three pages above and they're now
   talking to your Cloudflare project instead of the browser. The Worker's own
   scheduled job deletes anything older than `TRIAL_DAYS` automatically (keep that
   number the same in both `cloud-config.js` and `worker/wrangler.toml`).

**"Buy this gift"** — the button on `gift-create.html` opens whatever URL you put in
`STRIPE_PAYMENT_LINK` inside `cloud-config.js`. Create that link for free at
[Stripe Dashboard → Payment Links → "+ New"](https://dashboard.stripe.com/payment-links)
(no code) once you have a Stripe account, then paste the checkout URL in. Until you do,
the button shows a friendly "not set up yet" message instead of breaking.

**Privacy — how "only people with the link" actually holds up:** there's no login system —
a gift's code *is* its key, the same idea as an unlisted Google Drive link. Two things make
that true rather than just assumed:

1. **The code is unguessable.** It's a long random string, generated in the browser, never
   sequential or based on anything public.
2. **There is no "list everything" door.** `worker/src/index.js` — the only thing that
   ever touches the database or storage — exposes exactly five routes: create one gift,
   fetch one gift by its exact code, add one upload, list one gift's uploads, delete one
   upload. None of them can return more than one gift's data, by construction — there's
   no route that lists gifts, so there's nothing to lock down after the fact.

What this **isn't**: a password. Anyone who has the link (or somehow guesses it) can view
and add to that gift — same as anyone with an unlisted Drive link. Don't put a gift's link
anywhere public, and don't use this for anything that needs real access control.

**Other good-to-knows:**
- Every screen (create, upload, expired, missing) and the full cloud read/write path were
  tested end-to-end — including a mocked "cloud outage" to confirm a failed upload falls
  back to local storage instead of breaking — no console errors.
- This is one gift per link. If you want to run it as a real multi-customer product, the
  code is already built for it — you're just running the same static files for everyone,
  each with their own `?gift=` code.
