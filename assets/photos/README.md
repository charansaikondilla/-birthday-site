# assets/photos/

Put your photos here: **`photo-01.webp`, `photo-02.webp`, `photo-03.webp` …**

- Portrait orientation (3:4) looks best. For a landscape photo, set `orientation: "landscape"` on that entry.
- Recommended: WebP, quality ~80, longest side ~1200px (keeps each photo well under 300 KB).
  Quick conversion: https://squoosh.app (free, runs in your browser).
- Images are lazy-loaded and their space is reserved, so there are no layout jumps.
- A missing file shows a soft "photo coming soon" card — the layout never breaks.

Each photo's text (chapter title, caption, date, location, handwritten note, tilt) is
configured in `script.js` → `birthdayConfig.photos`.

## Automate it (recommended once you have more than a couple of photos)

Instead of hand-editing `script.js` every time, just drop files in this folder and run:

```
node scripts/build-manifests.mjs
```

This writes `assets/photos/manifest.json`, which the website automatically prefers over the
hand-written array in `script.js` when it exists. Open that file in any text editor afterwards
to fill in captions, dates, locations and notes — plain text, no code. Re-running the command
after adding more photos keeps every caption you already typed; it only adds new files and
drops ones you removed. See `scripts/build-manifests.mjs` for full details, or the project's
main `README.md` for the step-by-step guide.
