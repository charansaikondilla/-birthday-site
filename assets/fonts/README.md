# assets/fonts/  (optional)

By default the site loads free Google Fonts:
- Cormorant Garamond (headings, serif)
- Inter (body, sans-serif)
- Caveat (handwritten notes)

To self-host instead (works offline / no third-party requests):

1. Download the WOFF2 files (e.g. from https://gwfh.mranftl.com) into this folder.
2. Remove the `<link href="https://fonts.googleapis.com/...">` line from `index.html`.
3. Add to the top of `style.css`:

```css
@font-face { font-family: 'Cormorant Garamond'; src: url('assets/fonts/cormorant-garamond-500.woff2') format('woff2'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'Inter'; src: url('assets/fonts/inter-400.woff2') format('woff2'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Caveat'; src: url('assets/fonts/caveat-500.woff2') format('woff2'); font-weight: 500; font-display: swap; }
```

The font stacks in `:root` already include safe fallbacks, so the site never breaks without them.
