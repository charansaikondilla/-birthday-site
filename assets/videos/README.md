# assets/videos/  (optional)

Two ways to add a video — mix and match freely:

## 1. A local file you host yourself
Put a short, compressed clip here (e.g. `clip-01.mp4`, H.264, under ~15 MB — GitHub has a
100 MB per-file hard limit and gets slow well before that). Then either:
- run `node scripts/build-manifests.mjs` from the project root to auto-detect it, or
- add it by hand to `birthdayConfig.videos` in `script.js`:
  ```js
  { type: "file", src: "assets/videos/clip-01.mp4", poster: "", chapterTitle: "…" }
  ```

## 2. A YouTube or Vimeo embed (recommended for anything longer than a few seconds)
Free, unlimited bandwidth, nothing to host. Upload the video as **Unlisted** (not Public) so
only someone with the link can find it, then add it by hand in `script.js`:
```js
{ type: "youtube", videoId: "dQw4w9WgXcQ", chapterTitle: "…" }   // the part after v= in the URL
{ type: "vimeo",   videoId: "76979871",    chapterTitle: "…" }   // the number in the Vimeo URL
```
`scripts/build-manifests.mjs` only manages **local files** it finds on disk — it can't see a
YouTube/Vimeo link, so those two are always added by hand, either directly in `script.js` or
by editing `assets/videos/manifest.json` after the script has run once.

Videos never autoplay. YouTube/Vimeo embeds show a poster + play button and only load the
player once tapped (fast, and no third-party request happens until then). A missing local
file shows the same graceful "video coming soon" placeholder that missing photos get.
