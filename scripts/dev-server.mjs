#!/usr/bin/env node
/**
 * dev-server.mjs
 * ---------------------------------------------------------------------------
 * A tiny local server for `npm run dev`. Zero dependencies — only Node's
 * built-in "http", "fs", "path" and "url" modules, so `npm install` has
 * nothing to fetch and nothing to go wrong.
 *
 * Why this project needs a real server at all (not just double-clicking
 * index.html): opening the file directly uses the file:// protocol, and
 * browsers block or restrict several things there — most importantly the
 * microphone (getUserMedia requires a "secure context": https, or http on
 * localhost) and fetch() (used for the optional manifest.json auto-upgrade
 * under assets/photos and assets/videos). Serving over http://localhost
 * avoids both of those problems, which is exactly
 * what GitHub Pages will do for real visitors too.
 *
 * Usage:
 *   npm run dev
 *   → open the printed http://localhost:PORT address in your browser
 *
 * Set a different port if 5173 is busy:  PORT=3000 npm run dev
 * ---------------------------------------------------------------------------
 */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
// A directory URL's path (ROOT above) already ends in a separator on every platform —
// strip it once here so path-safety comparisons below don't end up comparing against a
// doubled separator (which silently rejected every request, including legitimate ones).
const ROOT_NORMALIZED = normalize(ROOT).replace(/[\\/]+$/, "");
const PORT = Number(process.env.PORT) || 5173;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function contentTypeFor(path) {
  return MIME_TYPES[extname(path).toLowerCase()] || "application/octet-stream";
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let requestPath = decodeURIComponent(url.pathname);
    if (requestPath === "/") requestPath = "/index.html";

    // Resolve safely inside ROOT — reject any path that escapes it (e.g. "../../etc").
    const filePath = normalize(join(ROOT, requestPath));
    if (filePath !== ROOT_NORMALIZED && !filePath.startsWith(ROOT_NORMALIZED + sep)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Forbidden");
      return;
    }

    const info = await stat(filePath).catch(() => null);
    if (!info || !info.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 — not found: " + requestPath);
      return;
    }

    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": contentTypeFor(filePath),
      "Cache-Control": "no-cache" // always serve the latest file while developing
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("500 — server error: " + err.message);
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\nPort ${PORT} is already in use.`);
    console.error(`Try:  PORT=3000 npm run dev\n`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`\n  Birthday site running at:`);
  console.log(`  → http://localhost:${PORT}\n`);
  console.log(`  Open that link in Chrome, Safari, or Edge — not by double-clicking`);
  console.log(`  index.html directly, which disables the microphone and a few other`);
  console.log(`  things browsers only allow over http(s), not file://.\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
