#!/usr/bin/env node
/* =====================================================================
   make-sounds.mjs — composes the site's two built-in sounds from scratch
   (pure maths, no samples, no downloads → no copyright problems):

     assets/audio/premiere-intro.mp3        ~4 s cinematic logo sting (two deep hits
                                            + a big swelling chord), timed to the
                                            logo animation on netflix.html
     assets/audio/happy-birthday-piano.mp3  ~1 min "Happy Birthday" (public-domain
                                            melody): music box → piano waltz → key
                                            change with strings → slow, warm ending

   Needs Node 18+ and ffmpeg (set FFMPEG_PATH if it isn't on your PATH).
   Run:  npm run make-sounds
   ===================================================================== */
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'assets', 'audio');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const SR = 44100;
const TAU = Math.PI * 2;

// Deterministic "random" so every run produces the exact same files.
let seed = 20261115;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);

function track(seconds) {
  const n = Math.ceil(seconds * SR);
  return { L: new Float32Array(n), R: new Float32Array(n), n };
}
// Adds one voice: fn(t) → sample, from time t0 for `len` seconds, panned -1..1.
function voice(tr, t0, len, pan, fn) {
  const s0 = Math.max(0, Math.round(t0 * SR)), s1 = Math.min(tr.n, Math.round((t0 + len) * SR));
  const gl = Math.cos((pan + 1) * Math.PI / 4), gr = Math.sin((pan + 1) * Math.PI / 4);
  for (let s = s0; s < s1; s++) {
    const v = fn((s - s0) / SR);
    tr.L[s] += v * gl;
    tr.R[s] += v * gr;
  }
}

/* ---------- instruments ---------- */
// Piano-ish: slightly stretched partials, each decaying faster the higher it is, damped at note end.
function piano(tr, t0, midi, dur, vel = 0.5, pan = 0) {
  const f = hz(midi), tau = 1.9 * (220 / f) ** 0.4, B = 0.0003;
  const parts = [];
  for (let h = 1; h <= 9; h++) {
    const fh = h * f * Math.sqrt(1 + B * h * h);
    if (fh > 15000) break;
    parts.push({ w: TAU * fh, a: vel / h ** 1.35 * (h === 2 ? 0.8 : 1), tau: tau / (1 + 0.45 * (h - 1)), ph: rnd() * TAU });
  }
  const len = dur + 0.6;
  voice(tr, t0, len, pan, (t) => {
    const atk = t < 0.004 ? t / 0.004 : 1;
    const damp = t > dur ? Math.exp(-(t - dur) / 0.12) : 1;
    let v = 0;
    for (const p of parts) v += p.a * Math.exp(-t / p.tau) * Math.sin(p.w * t + p.ph);
    return v * atk * damp * 0.32;
  });
}
// Music box / celesta: bright bell partials.
function bell(tr, t0, midi, vel = 0.5, pan = 0) {
  const f = hz(midi);
  const parts = [[1, 1, 1.5], [2.0, 0.28, 0.9], [3.01, 0.12, 0.45], [5.4, 0.05, 0.2]];
  voice(tr, t0, 2.4, pan, (t) => {
    const atk = t < 0.002 ? t / 0.002 : 1;
    let v = 0;
    for (const [r, a, tau] of parts) v += a * Math.exp(-t / tau) * Math.sin(TAU * f * r * t);
    return v * atk * vel * 0.3;
  });
}
// Soft string pad (two detuned "saws" made of harmonics, gentle vibrato, slow in and out).
function strings(tr, t0, midi, dur, vel = 0.3, pan = 0) {
  const f = hz(midi), att = Math.min(0.7, dur * 0.4), rel = 0.9;
  const det = [-0.0025, 0.0025];
  voice(tr, t0, dur + rel, pan, (t) => {
    const env = t < att ? (t / att) ** 1.6 : t > dur ? Math.exp(-(t - dur) / (rel / 3)) : 1;
    const vib = 1 + 0.0028 * Math.sin(TAU * 5.1 * t);
    let v = 0;
    for (const d of det) for (let h = 1; h <= 10; h++) v += Math.sin(TAU * f * (1 + d) * h * vib * t + h) / (h ** 1.25);
    return v * env * vel * 0.07;
  });
}
// Round bass note.
function bass(tr, t0, midi, dur, vel = 0.5) {
  const f = hz(midi);
  voice(tr, t0, dur + 0.4, 0, (t) => {
    const atk = t < 0.01 ? t / 0.01 : 1;
    const env = Math.exp(-t / 1.4) * (t > dur ? Math.exp(-(t - dur) / 0.1) : 1);
    return (Math.sin(TAU * f * t) + 0.35 * Math.sin(TAU * 2 * f * t)) * env * atk * vel * 0.38;
  });
}
// Deep cinematic hit: a falling sine "thump", a sub tail and a soft click of noise.
function hit(tr, t0, from, to, vel = 1) {
  let lp = 0;
  voice(tr, t0, 2.2, 0, (t) => {
    const f = to + (from - to) * Math.exp(-t / 0.06);
    const body = Math.sin(TAU * (to * t + (from - to) * 0.06 * (1 - Math.exp(-t / 0.06)))) * Math.exp(-t / 0.42);
    const sub = Math.sin(TAU * (f * 0.5) * t) * Math.exp(-t / 0.9) * 0.5;
    lp += 0.08 * ((rnd() * 2 - 1) - lp);
    const click = lp * Math.exp(-t / 0.018) * 2.2;
    return (body + sub + click) * vel * 0.9;
  });
}

/* ---------- a small stereo reverb (Schroeder: 4 combs + 2 all-passes per side) ---------- */
function reverb(tr, wet = 0.22, size = 1) {
  const out = (src, spread) => {
    const combs = [1557, 1617, 1491, 1422].map((d) => ({ b: new Float32Array(Math.round((d + spread) * size)), i: 0, f: 0 }));
    const aps = [556, 441].map((d) => ({ b: new Float32Array(Math.round((d + spread) * size)), i: 0 }));
    const res = new Float32Array(src.length);
    for (let s = 0; s < src.length; s++) {
      const x = src[s] * 0.015;
      let y = 0;
      for (const c of combs) {
        const o = c.b[c.i];
        c.f = o * 0.8 + c.f * 0.2; // damping
        c.b[c.i] = x + c.f * 0.84;
        c.i = (c.i + 1) % c.b.length;
        y += o;
      }
      for (const a of aps) {
        const o = a.b[a.i];
        a.b[a.i] = y + o * 0.5;
        a.i = (a.i + 1) % a.b.length;
        y = o - y;
      }
      res[s] = y;
    }
    return res;
  };
  const rl = out(tr.L, 0), rr = out(tr.R, 23);
  for (let s = 0; s < tr.n; s++) { tr.L[s] += rl[s] * wet * 10; tr.R[s] += rr[s] * wet * 10; }
}

/* ---------- finishing: normalise, fade, write WAV, encode MP3 ---------- */
function finish(tr, fadeOut = 0.3) {
  let peak = 0;
  for (let s = 0; s < tr.n; s++) peak = Math.max(peak, Math.abs(tr.L[s]), Math.abs(tr.R[s]));
  const g = peak > 0 ? 0.89 / peak : 1; // -1 dBFS
  const fo = Math.round(fadeOut * SR);
  for (let s = 0; s < tr.n; s++) {
    const k = s > tr.n - fo ? (tr.n - s) / fo : 1;
    const fi = s < 64 ? s / 64 : 1;
    tr.L[s] *= g * k * fi;
    tr.R[s] *= g * k * fi;
  }
}
function wav(tr) {
  const buf = Buffer.alloc(44 + tr.n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + tr.n * 4, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(tr.n * 4, 40);
  for (let s = 0, o = 44; s < tr.n; s++, o += 4) {
    buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(tr.L[s] * 32767))), o);
    buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(tr.R[s] * 32767))), o + 2);
  }
  return buf;
}
async function save(tr, name, title) {
  const tmp = join(OUT, name.replace(/\.mp3$/, '.tmp.wav'));
  await writeFile(tmp, wav(tr));
  const r = spawnSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', tmp, '-c:a', 'libmp3lame', '-q:a', '2',
    '-metadata', `title=${title}`, '-metadata', 'artist=Premiere (generated)', join(OUT, name)], { stdio: 'inherit' });
  await rm(tmp, { force: true });
  if (r.error || r.status !== 0) throw new Error(`ffmpeg failed for ${name} — is ffmpeg installed? (set FFMPEG_PATH)`);
  console.log(`  ✓ assets/audio/${name}  (${(tr.n / SR).toFixed(1)} s)`);
}

/* ---------- 1. the intro sting (matches the logo: builds 0–2.1 s, bursts at 2.1 s, ends ~4 s) ---------- */
function makeIntro() {
  const tr = track(4.6);
  hit(tr, 0.08, 150, 52, 0.55);
  hit(tr, 0.5, 130, 46, 0.6);
  // the swell: a wide D chord whose brightness rises into the burst, then blooms and fades
  const chord = [38, 45, 50, 54, 57, 62, 66];
  chord.forEach((m, k) => {
    const f = hz(m), pan = (k / (chord.length - 1)) * 1.2 - 0.6;
    voice(tr, 0.7, 3.9, pan, (t) => {
      const T = t + 0.7;
      const rise = T < 2.1 ? ((T - 0.7) / 1.4) ** 2.2 : Math.exp(-(T - 2.1) / 0.75);
      const bright = 1.2 + 7 * (T < 2.1 ? (T - 0.7) / 1.4 : Math.exp(-(T - 2.1) / 0.5));
      const vib = 1 + 0.002 * Math.sin(TAU * 4.6 * t + k);
      let v = 0;
      for (const d of [-0.003, 0.003]) for (let h = 1; h <= 12; h++) v += Math.exp(-(h - 1) / bright) * Math.sin(TAU * f * (1 + d) * h * vib * t + h * k) / h;
      return v * rise * (m < 45 ? 0.42 : 0.27);
    });
  });
  // the burst: sub boom + a soft sparkle on top
  voice(tr, 2.1, 2.4, 0, (t) => Math.sin(TAU * 36 * t) * Math.exp(-t / 1.0) * 0.7);
  [86, 93, 90, 98].forEach((m, k) => bell(tr, 2.12 + k * 0.07, m, 0.22, k % 2 ? 0.5 : -0.5));
  reverb(tr, 0.3, 1.25);
  finish(tr, 0.4);
  return tr;
}

/* ---------- 2. "Happy Birthday" (public-domain melody, original arrangement) ---------- */
const MELODY = [ // [semitones above C, beats] — pickup "Hap-py" then 8 bars of 3/4
  [-5, 0.75], [-5, 0.25], [-3, 1], [-5, 1], [0, 1], [-1, 2],
  [-5, 0.75], [-5, 0.25], [-3, 1], [-5, 1], [2, 1], [0, 2],
  [-5, 0.75], [-5, 0.25], [7, 1], [4, 1], [0, 1], [-1, 1], [-3, 1],
  [5, 0.75], [5, 0.25], [4, 1], [0, 1], [2, 1], [0, 3],
];
// chords per bar (bar n starts at beat 1 + 3n): root (semitones above C) + chord tones
const BARS = [
  [0, [0, 4, 7]], [-5, [-5, -1, 2, 5]], [-5, [-5, -1, 2, 5]], [0, [0, 4, 7]],
  [0, [0, 4, 7, 10]], [5, [5, 9, 12]], [0, [0, 4, 7], -5, [-5, -1, 2, 5]], [0, [0, 4, 7]],
];
function makeSong() {
  const beat = 0.6;
  const verses = 4, verseBeats = 24; // the last C of each verse overlaps the next "Hap-py"
  const total = verses * verseBeats + 1;
  const ritFrom = total - 7; // slow down over the last bars
  const timeAt = (b) => (b <= ritFrom ? b * beat : (ritFrom + (b - ritFrom) + 0.75 * (b - ritFrom) ** 2 / 12) * beat);
  const tr = track(timeAt(total + 2) + 4);
  const C4 = 60;
  for (let v = 0; v < verses; v++) {
    const key = v >= 2 ? 2 : 0; // verses 3–4 go up a step
    const b0 = v * verseBeats;
    const last = v === verses - 1;
    // melody
    let b = 0;
    MELODY.forEach(([semi, len], i) => {
      const isLast = i === MELODY.length - 1;
      const L = isLast ? (last ? 4 : 2) : len;
      const t = timeAt(b0 + b) + (rnd() - 0.5) * 0.012, d = timeAt(b0 + b + L) - timeAt(b0 + b);
      const m = C4 + 12 + semi + key;
      const vel = 0.55 + (len >= 1 ? 0.08 : 0) + (rnd() - 0.5) * 0.06;
      if (v === 0) bell(tr, t, m + 12, vel * 0.9, 0.15);
      else {
        piano(tr, t, m, d * 0.95, vel, 0.1);
        if (v >= 2) piano(tr, t, m + 12, d * 0.9, vel * 0.32, 0.25); // octave sparkle
        if (v === 3) strings(tr, t, m, d, 0.22, -0.2);
      }
      b += len;
    });
    // accompaniment (bar 1 starts on beat 1 of the verse)
    BARS.forEach((bar, n) => {
      const start = b0 + 1 + n * 3;
      const parts = bar.length === 4 ? [[bar[0], bar[1], 2], [bar[2], bar[3], 1]] : [[bar[0], bar[1], 3]];
      let off = 0;
      parts.forEach(([root, tones, beats]) => {
        for (let k = 0; k < beats; k++) {
          const bt = start + off + k;
          if (bt >= total + (last ? 0 : 1)) continue;
          const t = timeAt(bt), d = timeAt(bt + 1) - t;
          if (v === 0) { if (k === 0) strings(tr, t, C4 - 12 + root + key, timeAt(bt + beats) - t, 0.14, 0); continue; }
          if (k === 0 && off === 0 || (k === 0 && beats < 3)) {
            bass(tr, t, C4 - 24 + root + key, d * (beats > 1 ? 1.9 : 0.9), v >= 2 ? 0.55 : 0.45);
            if (v >= 2) strings(tr, t, C4 - 12 + root + key, timeAt(bt + beats) - t, 0.2, -0.3);
          } else {
            tones.forEach((tn, j) => piano(tr, t + j * 0.008, C4 + tn + key, d * 0.7, 0.2 + (v >= 2 ? 0.05 : 0), -0.25 + j * 0.15));
          }
        }
        off += beats;
      });
    });
  }
  // the ending: a rolled C chord (up a step) with strings and a last bell
  const tEnd = timeAt(total);
  [36, 48, 55, 60, 64, 67, 72, 76].forEach((m, j) => piano(tr, tEnd + j * 0.06, m + 2, 3.2, 0.32, -0.4 + j * 0.1));
  [48, 55, 64, 67].forEach((m) => strings(tr, tEnd, m + 2, 2.8, 0.2, 0));
  bell(tr, tEnd + 0.55, 86, 0.3, 0.3);
  reverb(tr, 0.2, 1.1);
  finish(tr, 1.2);
  return tr;
}

await mkdir(OUT, { recursive: true });
console.log('Composing sounds…');
await save(makeIntro(), 'premiere-intro.mp3', 'Premiere — intro');
await save(makeSong(), 'happy-birthday-piano.mp3', 'Happy Birthday (piano waltz)');
console.log('Done. They are used by netflix.html (see `introSound` and `music` in script.js).');
