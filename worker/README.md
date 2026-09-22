# Deploying the Birthday Gift API (Cloudflare Worker)

This is the one piece of server code the project needs — everything else is
static files. It exists because R2's real API keys are true secrets and can
never be put in a browser; this Worker holds them instead, and the site talks
to it over plain HTTPS.

**Cost: free**, on Cloudflare's free tier, for anything this project would
realistically use (Workers: 100,000 requests/day; R2: 10 GB storage free and
**zero bandwidth charges, ever** — the reason R2 is worth the extra setup step
over a plainer option, especially for videos people will watch more than once).

## One-time setup (about 10 minutes)

You'll need [Node.js](https://nodejs.org) installed (for `npx`). No separate
Cloudflare CLI install is required — `npx` fetches it on demand.

```bash
cd worker

# 1) Log in (opens a browser tab; free account is fine, no card needed)
npx wrangler login

# 2) Create the database and note the "database_id" it prints
npx wrangler d1 create birthday-gifts

# 3) Create the storage bucket
npx wrangler r2 bucket create gift-media
```

Now open **`wrangler.toml`** and paste the `database_id` from step 2 in place of
`REPLACE_WITH_YOUR_DATABASE_ID`.

**4) Turn the bucket public** so photos/videos can load directly (fast, and
free bandwidth, instead of round-tripping through the Worker):
Cloudflare dashboard → R2 → **gift-media** bucket → Settings → **Public
Development URL** → Enable. Copy the `https://pub-xxxxxxxx.r2.dev` URL it
gives you, and paste it into `wrangler.toml` in place of
`REPLACE_WITH_YOUR_R2_PUBLIC_URL` (no trailing slash).

*(A `pub-….r2.dev` URL is meant for exactly this — trying it out and small/
personal use. If you later run this for many people, Cloudflare's own
recommendation is to put a custom domain you own in front of the bucket
instead, which is also free — same Settings page, "Custom Domains".)*

```bash
# 5) Load the database schema
npx wrangler d1 execute birthday-gifts --remote --file=./schema.sql

# 6) Deploy
npx wrangler deploy
```

`wrangler deploy` prints your Worker's URL, e.g.
`https://birthday-gift-api.yoursubdomain.workers.dev`. Copy it into
**`cloud-config.js`** (in the project root) as `WORKER_URL`. That's it —
reload any of the site's pages and gifts now live in the cloud.

## Verifying it worked

Open `https://<your-worker-url>/gifts/anything` in a browser — you should see
`{"error":"not found"}` (that's correct: no gift named "anything" exists yet).
If you see a Cloudflare error page instead, re-check steps 2–6.

## Changing the trial length

Edit **both** `TRIAL_DAYS` in `wrangler.toml` (then `npx wrangler deploy`
again) **and** `TRIAL_DAYS` in `cloud-config.js` — keep the two numbers equal.

## If something looks wrong later

`npx wrangler tail` streams live logs from the deployed Worker — the fastest
way to see the exact error a failed request hit.
