#!/usr/bin/env node
/**
 * render-film.mjs
 * ---------------------------------------------------------------------------
 * Exports the animated hero film (film.html / film.js) to an MP4 you can post
 * on Instagram, WhatsApp, YouTube or use in ads.
 *
 * Zero npm dependencies: it serves the site with Node's built-in http module,
 * drives your installed Chrome / Edge through the DevTools protocol (Node's
 * built-in WebSocket), captures the film frame by frame — every frame is
 * exact, never dropped — and pipes the frames into ffmpeg.
 *
 * Needs: Node 22+, Google Chrome or Microsoft Edge (or set CHROME_PATH),
 *        and ffmpeg on your PATH (or set FFMPEG_PATH).
 *
 * Usage:
 *   npm run render-film
 *   node scripts/render-film.mjs --for couple --name "Ananya"
 *   node scripts/render-film.mjs --for friends --name "Nuel" --out assets/video/friends.mp4
 *   node scripts/render-film.mjs --audio song.mp3          (adds music, fades it out at the end)
 *
 * Options:
 *   --for couple|friends   which version (default: couple)
 *   --name "Text"          the birthday star's name (default: the content default)
 *   --width 1920           output width; height is width × 9/16 (default 1920 → 1080p)
 *   --fps 30               frames per second (default 30)
 *   --out path.mp4         output file (default assets/video/premiere-film-<for>.mp4)
 *   --audio file           optional soundtrack (mp3/m4a/wav)
 * A poster image (<out>-poster.jpg) is saved next to the video.
 * ---------------------------------------------------------------------------
 */
import { createServer } from 'node:http';
import { readFile, mkdir, mkdtemp, rm, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname, normalize, resolve, dirname, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- options ---------- */
const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : fallback;
};
const audience = opt('for', 'couple');
const name = opt('name', '');
const width = Math.max(320, parseInt(opt('width', '1920'), 10) || 1920);
const height = Math.round((width * 9) / 16 / 2) * 2; // even number for H.264
const fps = Math.min(60, Math.max(12, parseInt(opt('fps', '30'), 10) || 30));
const out = resolve(ROOT, opt('out', `assets/video/premiere-film-${audience}.mp4`));
const audio = opt('audio', '');

if (typeof WebSocket === 'undefined') fail('This script needs Node 22 or newer (for the built-in WebSocket).');
if (audio && !existsSync(resolve(audio))) fail(`Audio file not found: ${audio}`);

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

/* ---------- find Chrome / Edge ---------- */
const findChrome = () => {
  const env = process.env.CHROME_PATH;
  if (env && existsSync(env)) return env;
  const pf = process.env.PROGRAMFILES || 'C:\\Program Files';
  const pf86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
  const local = process.env.LOCALAPPDATA || '';
  const candidates = [
    join(pf, 'Google/Chrome/Application/chrome.exe'),
    join(pf86, 'Google/Chrome/Application/chrome.exe'),
    join(local, 'Google/Chrome/Application/chrome.exe'),
    join(pf86, 'Microsoft/Edge/Application/msedge.exe'),
    join(pf, 'Microsoft/Edge/Application/msedge.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge',
  ];
  return candidates.find(p => p && existsSync(p));
};

/* ---------- tiny static server ---------- */
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
};
const serve = () => new Promise(res => {
  const server = createServer(async (req, resp) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const rel = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
      const file = resolve(ROOT, rel || 'index.html');
      if (file !== ROOT && !file.startsWith(ROOT + sep)) { resp.writeHead(403); resp.end(); return; }
      const info = await stat(file);
      const target = info.isDirectory() ? join(file, 'index.html') : file;
      const body = await readFile(target);
      resp.writeHead(200, { 'Content-Type': MIME[extname(target).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      resp.end(body);
    } catch {
      resp.writeHead(404); resp.end('Not found');
    }
  });
  server.listen(0, '127.0.0.1', () => res(server));
});

/* ---------- minimal DevTools-protocol client ---------- */
class CDP {
  constructor(url) {
    this.ws = new WebSocket(url);
    this.seq = 0;
    this.pending = new Map();
    this.ws.addEventListener('message', ev => {
      const msg = JSON.parse(typeof ev.data === 'string' ? ev.data : Buffer.from(ev.data).toString());
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: ok, reject: bad } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) bad(new Error(msg.error.message)); else ok(msg.result);
      }
    });
  }
  open() {
    return new Promise((ok, bad) => {
      this.ws.addEventListener('open', ok, { once: true });
      this.ws.addEventListener('error', () => bad(new Error('Could not connect to the browser.')), { once: true });
    });
  }
  send(method, params = {}, sessionId) {
    const id = ++this.seq;
    this.ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    return new Promise((ok, bad) => this.pending.set(id, { resolve: ok, reject: bad }));
  }
  close() { try { this.ws.close(); } catch { /* ignore */ } }
}

const launchBrowser = async exe => {
  const profile = await mkdtemp(join(tmpdir(), 'premiere-film-'));
  const proc = spawn(exe, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--mute-audio',
    '--force-color-profile=srgb', '--font-render-hinting=none', '--disable-background-timer-throttling',
    `--window-size=${width},${height}`, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const wsUrl = await new Promise((ok, bad) => {
    let buf = '';
    const timer = setTimeout(() => bad(new Error('The browser did not start within 30 seconds.')), 30000);
    proc.stderr.on('data', d => {
      buf += d.toString();
      const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) { clearTimeout(timer); ok(m[1]); }
    });
    proc.on('exit', code => { clearTimeout(timer); bad(new Error(`The browser exited early (code ${code}).`)); });
  });
  return { proc, profile, wsUrl };
};

const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- main ---------- */
const main = async () => {
  const chrome = findChrome();
  if (!chrome) fail('Could not find Chrome or Edge. Install one, or set CHROME_PATH to its executable.');
  const ffmpegBin = process.env.FFMPEG_PATH || 'ffmpeg';

  await mkdir(dirname(out), { recursive: true });
  const server = await serve();
  const port = server.address().port;
  const { proc, profile, wsUrl } = await launchBrowser(chrome);
  const cdp = new CDP(wsUrl);
  let ff = null;

  const cleanup = async () => {
    try { await cdp.send('Browser.close'); } catch { /* ignore */ }
    cdp.close();
    try { proc.kill(); } catch { /* ignore */ }
    server.close();
    await wait(300);
    await rm(profile, { recursive: true, force: true }).catch(() => {});
  };

  try {
    await cdp.open();
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
    const page = (m, p) => cdp.send(m, p, sessionId);
    const evaluate = async (expression, awaitPromise = false) => {
      const r = await page('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result.value;
    };

    await page('Page.enable');
    await page('Runtime.enable');
    await page('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    const qs = new URLSearchParams({ render: '1', for: audience });
    if (name) qs.set('name', name);
    const url = `http://127.0.0.1:${port}/film.html?${qs}`;
    console.log(`▶ Loading ${url}`);
    await page('Page.navigate', { url });

    // Wait for the film (fonts + pictures) to be ready.
    let ready = false;
    for (let i = 0; i < 100 && !ready; i++) {
      await wait(200);
      try { ready = await evaluate('window.__filmReady ? window.__filmReady.then(() => true) : false', true); } catch { ready = false; }
    }
    if (!ready) throw new Error('The film page did not get ready. Is film.html present and error-free?');
    const duration = await evaluate('window.__film.duration');
    const frames = Math.ceil(duration * fps);

    // Poster frame (the "their own streaming page" scene).
    const posterT = await evaluate('(window.PremiereFilm.scenes.find(s => s.id === "home") || { start: 0 }).start + 3.3');
    await evaluate(`window.__film.seek(${posterT})`);
    const poster = await page('Page.captureScreenshot', { format: 'jpeg', quality: 90 });
    const posterPath = out.replace(/\.mp4$/i, '') + '-poster.jpg';
    await writeFile(posterPath, Buffer.from(poster.data, 'base64'));

    // ffmpeg: JPEG frames in → H.264 MP4 out.
    const ffArgs = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', 'pipe:0'];
    if (audio) ffArgs.push('-i', resolve(audio));
    ffArgs.push('-vf', 'scale=in_range=full:out_range=tv,format=yuv420p', '-color_range', 'tv', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps), '-movflags', '+faststart');
    if (audio) ffArgs.push('-c:a', 'aac', '-b:a', '192k', '-af', `afade=t=out:st=${Math.max(0, duration - 2).toFixed(2)}:d=2`, '-t', duration.toFixed(3), '-shortest');
    ffArgs.push(out);
    ff = spawn(ffmpegBin, ffArgs, { stdio: ['pipe', 'inherit', 'inherit'] });
    const ffDone = new Promise((ok, bad) => {
      ff.on('error', err => bad(new Error(err.code === 'ENOENT' ? 'ffmpeg was not found. Install it or set FFMPEG_PATH.' : err.message)));
      ff.on('exit', code => (code === 0 ? ok() : bad(new Error(`ffmpeg exited with code ${code}`))));
    });
    ffDone.catch(() => {}); // reported below

    console.log(`● Rendering ${frames} frames at ${width}×${height}, ${fps} fps (${duration.toFixed(1)}s)…`);
    const t0 = Date.now();
    for (let f = 0; f < frames; f++) {
      await evaluate(`window.__film.seek(${(f / fps).toFixed(5)})`);
      const shot = await page('Page.captureScreenshot', { format: 'jpeg', quality: 94 });
      const buf = Buffer.from(shot.data, 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % fps === 0 || f === frames - 1) {
        const pct = Math.round(((f + 1) / frames) * 100);
        process.stdout.write(`\r  ${String(pct).padStart(3)}%  frame ${f + 1}/${frames}`);
      }
    }
    ff.stdin.end();
    await ffDone;
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    const size = (await stat(out)).size;
    console.log(`\n✔ Saved ${out} (${(size / 1048576).toFixed(1)} MB) in ${secs}s`);
    console.log(`✔ Poster ${posterPath}`);
  } catch (err) {
    if (ff && ff.stdin && !ff.stdin.destroyed) { try { ff.stdin.destroy(); } catch { /* ignore */ } }
    await cleanup();
    fail(err.message || String(err));
  }
  await cleanup();
};

main();
