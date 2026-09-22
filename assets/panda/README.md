# assets/panda/

Two ways to show the panda — the site checks them in this order:

## 1. A story sprite sheet (used automatically — `panda-sprint.png`)

A grid of poses in one image. Instead of one generic run cycle, each story beat (running in,
arriving, delivering, running off) picks its own list of frames, so the current sheet's
4×4 grid is used like this:

| Beat | Frames used | Why |
| --- | --- | --- |
| Running in | 0, 1, 2, 3, 4, 5 | A big energetic run, looped while it crosses the screen |
| Arriving | 10 | Calm, standing, holding the envelope |
| Delivering | 11 | Big joyful smile — the "delivered!" moment |
| Running off | 14, 15 | Turns, then recedes into the distance |

Frames 6–7 (peeking around a doorway) and 8–9, 12–13 (letters stacked on the ground) are
in the sheet but unused here — 6–7 have a doorway edge drawn right into the artwork that
would show as a stray line with nothing to attach it to, and 8–9/12–13 are extra flavour
poses not needed for this site's single-envelope story. Feel free to swap any of the frame
numbers in `script.js` → `birthdayConfig.panda.sprite` if you'd rather use different ones —
`columns`/`rows` tell the site how the grid is laid out, and `runFrames`/`leaveFrames`
(lists) plus `arriveFrame`/`deliverFrame` (single numbers) pick the poses, all 0-indexed
reading left-to-right then top-to-bottom.

- The sheet doesn't need a transparent background — `mix-blend-mode: multiply` in
  `style.css` knocks out a plain white background automatically against the site's cream
  page. A background that isn't white/very light won't disappear the same way.
- Every frame should keep the panda anchored to the same ground line, or it will visibly
  hop up and down between poses. A frame drawn "closer" (bigger) is fine and reads as the
  panda approaching — that's used deliberately in the running-in beat here.
- Want your own version, more poses, or a cleaner sheet without a watermark? See
  **"Generating a new sprite sheet"** in the main project `README.md` for a ready-to-use
  image-generation prompt.
- Missing or fails to load → falls back to `panda.png` below automatically. Nothing breaks.

## 2. A single still image (`panda.png`) — fallback

Used only if no sprite sheet is configured, or it fails to load.

- PNG or WebP, transparent background, ~400×400px.
- The panda should face **right** (it runs in from the left). If your artwork faces left,
  set `panda.facesRight: false` in `script.js` and it will be flipped automatically.
- Ideally the panda is holding a small envelope — the big envelope appears from its hands.
- If this file is also missing, a built-in illustrated SVG panda is shown instead.

Configured in `script.js` → `birthdayConfig.panda.image`.
