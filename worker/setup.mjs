#!/usr/bin/env node
/**
 * Birthday Site — one-command Cloudflare setup
 *
 * Run this AFTER logging in with:   npx wrangler login
 * Then run:                         node setup.mjs
 *
 * What it does (fully automated):
 *  1. Creates D1 database  "birthday-gifts"
 *  2. Creates R2 bucket    "gift-media"
 *  3. Enables the R2 public dev-URL
 *  4. Updates wrangler.toml with the real IDs/URLs
 *  5. Loads the database schema
 *  6. Deploys the Worker
 *  7. Writes the Worker URL into ../cloud-config.js
 */

import { execSync, spawnSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const green  = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red    = (s) => `\x1b[31m${s}\x1b[0m`;
const bold   = (s) => `\x1b[1m${s}\x1b[0m`;

function step(n, msg) {
  console.log(`\n${bold(`[${n}/7]`)} ${msg}`);
}
function ok(msg)   { console.log(green(`  ✓ ${msg}`)); }
function warn(msg) { console.log(yellow(`  ⚠ ${msg}`)); }
function die(msg)  { console.error(red(`\n✗ ${msg}\n`)); process.exit(1); }

function run(cmd, { json = false, cwd = __dirname } = {}) {
  try {
    const out = execSync(`npx --yes ${cmd}`, {
      cwd,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    if (!json) return out;
    // wrangler often prints a header line before JSON — extract just the JSON
    const match = out.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (match) return JSON.parse(match[1]);
    throw new Error(`No JSON in output: ${out.slice(0, 200)}`);
  } catch (e) {
    if (e.stdout || e.stderr) {
      const combined = ((e.stdout || '') + (e.stderr || '')).trim();
      throw new Error(combined || e.message);
    }
    throw e;
  }
}

// ─── Load token from file if env var not set ───────────────────────────────
if (!process.env.CLOUDFLARE_API_TOKEN) {
  const tokenFile = resolve(__dirname, 'token.txt');
  try {
    const raw = readFileSync(tokenFile, 'utf8').trim();
    if (raw && raw !== 'PASTE_YOUR_TOKEN_HERE') {
      process.env.CLOUDFLARE_API_TOKEN = raw;
      console.log('  (Using token from token.txt)');
    }
  } catch { /* no file — will fail at whoami below */ }
}

// ─── Check login ───────────────────────────────────────────────────────────
console.log(bold('\n🎂  Birthday Site — Cloudflare Setup\n'));

try {
  const who = run('wrangler whoami');
  // handles both OAuth ("Logged in as X") and API token ("associated with the email: X")
  const email = who.match(/email[^:]*:\s*([\w.@+\-]+)/i)?.[1]
             || who.match(/Logged in as\s+([\w.@+\-]+)/i)?.[1]
             || 'authenticated';
  ok(`Authenticated as: ${email}`);
} catch {
  die(
    'Not authenticated. Two options:\n\n' +
    '  Option A — API token (recommended, no browser timeout):\n' +
    '    1. Go to: https://dash.cloudflare.com/profile/api-tokens\n' +
    '    2. Create Token → "Edit Cloudflare Workers" template → Create\n' +
    '    3. Run:  $env:CLOUDFLARE_API_TOKEN="paste-token-here"; node setup.mjs\n\n' +
    '  Option B — OAuth login (must run in a REAL terminal window, not Claude):\n' +
    '    npx wrangler login'
  );
}

// ─── Step 1 — D1 database ──────────────────────────────────────────────────
step(1, 'Creating D1 database "birthday-gifts"…');

let databaseId;
try {
  const out = run('wrangler d1 create birthday-gifts');
  const match = out.match(/database_id\s*=\s*["']?([0-9a-f-]{36})["']?/i);
  if (!match) throw new Error('Could not parse database_id from output');
  databaseId = match[1];
  ok(`Database created  →  id: ${databaseId}`);
} catch (e) {
  // Already exists — list to find its id
  if (/already exists/i.test(e.message)) {
    warn('Database already exists — looking up its id…');
    try {
      const list = run('wrangler d1 list --json', { json: true });
      const db = (Array.isArray(list) ? list : list.result || [])
        .find((d) => d.name === 'birthday-gifts');
      if (!db) die('Could not find "birthday-gifts" in your D1 databases.');
      databaseId = db.uuid || db.id;
      ok(`Found existing database  →  id: ${databaseId}`);
    } catch (e2) {
      die(`Could not list D1 databases: ${e2.message}`);
    }
  } else {
    die(`D1 create failed: ${e.message}`);
  }
}

// ─── Step 2 — R2 bucket ────────────────────────────────────────────────────
step(2, 'Creating R2 bucket "gift-media"…');

try {
  run('wrangler r2 bucket create gift-media');
  ok('Bucket created');
} catch (e) {
  if (/already exists/i.test(e.message) || /bucket with that name/i.test(e.message)) {
    warn('Bucket already exists — continuing');
  } else {
    die(`R2 bucket create failed: ${e.message}`);
  }
}

// ─── Step 3 — Enable public dev-URL ────────────────────────────────────────
step(3, 'Enabling public r2.dev URL on "gift-media"…');

let r2PublicUrl;
try {
  const out = run('wrangler r2 bucket dev-url enable gift-media');
  const match = out.match(/https:\/\/pub-[a-f0-9]+\.r2\.dev/i);
  if (match) {
    r2PublicUrl = match[0];
    ok(`Public URL: ${r2PublicUrl}`);
  } else {
    // Maybe already enabled — try get
    warn('Could not parse URL from enable output — trying get…');
    const out2 = run('wrangler r2 bucket dev-url get gift-media');
    const match2 = out2.match(/https:\/\/pub-[a-f0-9]+\.r2\.dev/i);
    if (!match2) die('Could not get the R2 public URL. Enable it manually in the Cloudflare dashboard under R2 → gift-media → Settings → Public Development URL, then paste it into wrangler.toml and re-run step 6.');
    r2PublicUrl = match2[0];
    ok(`Public URL: ${r2PublicUrl}`);
  }
} catch (e) {
  die(`R2 dev-url enable failed: ${e.message}`);
}

// ─── Step 4 — Patch wrangler.toml ─────────────────────────────────────────
step(4, 'Updating wrangler.toml…');

const tomlPath = resolve(__dirname, 'wrangler.toml');
let toml = readFileSync(tomlPath, 'utf8');

toml = toml
  .replace(/database_id\s*=\s*"REPLACE_WITH_YOUR_DATABASE_ID"/,
           `database_id = "${databaseId}"`)
  .replace(/R2_PUBLIC_URL\s*=\s*"REPLACE_WITH_YOUR_R2_PUBLIC_URL"/,
           `R2_PUBLIC_URL = "${r2PublicUrl}"`);

writeFileSync(tomlPath, toml, 'utf8');
ok('wrangler.toml updated');

// ─── Step 5 — Run schema ───────────────────────────────────────────────────
step(5, 'Loading database schema…');

try {
  run('wrangler d1 execute birthday-gifts --remote --file=./schema.sql');
  ok('Schema applied');
} catch (e) {
  // Schema errors are often "table already exists" — acceptable
  if (/already exists/i.test(e.message)) {
    warn('Tables already exist — skipping');
  } else {
    die(`Schema execution failed: ${e.message}`);
  }
}

// ─── Step 6 — Deploy Worker ────────────────────────────────────────────────
step(6, 'Deploying the Worker…');

let workerUrl;
try {
  const out = run('wrangler deploy');
  // Worker URL format: name.subdomain.workers.dev
  const match = out.match(/https:\/\/[\w-]+\.[\w-]+\.workers\.dev/i)
             || out.match(/https:\/\/[\w.-]+\.workers\.dev/i);
  if (!match) die(`Deployed but could not find the Worker URL in output:\n${out.slice(0, 400)}`);
  workerUrl = match[0];
  ok(`Worker deployed  →  ${workerUrl}`);
} catch (e) {
  die(`Deploy failed: ${e.message}`);
}

// ─── Step 7 — Patch cloud-config.js ───────────────────────────────────────
step(7, 'Writing Worker URL into cloud-config.js…');

const cfgPath = resolve(ROOT, 'cloud-config.js');
let cfg = readFileSync(cfgPath, 'utf8');

cfg = cfg.replace(
  /WORKER_URL:\s*'[^']*'/,
  `WORKER_URL: '${workerUrl}'`
);

writeFileSync(cfgPath, cfg, 'utf8');
ok(`cloud-config.js updated`);

// ─── Done ─────────────────────────────────────────────────────────────────
console.log(`
${bold(green('✅  Setup complete!'))}

Your birthday site is now in cloud mode.

  Worker URL    → ${workerUrl}
  R2 bucket     → ${r2PublicUrl}
  Database      → birthday-gifts (${databaseId})

${bold('Next steps:')}
  1. Reload your site — gifts and uploads now work on any device.
  2. Open gift-create.html to create your first gift link + QR code.
  3. Share the gift link and anyone can add their photos/videos.
  4. The birthday person opens index.html?gift=<slug> — no login needed.

${yellow('Optional:')} add a Stripe Payment Link to cloud-config.js → STRIPE_PAYMENT_LINK
  to enable the "Buy this gift" button.
`);
