# Cloudflare Setup — Step by Step

Turn on **cloud mode** so every photo and video people upload is shared across all devices.  
Cost: **free** (Cloudflare's free tier covers anything this project will realistically use — Workers: 100k requests/day; R2: 10 GB storage + **zero bandwidth fees**).

---

## Fast path — automated (recommended)

Use an **API token** — no browser timeout, no OAuth issues.

**Step 1 — Create the token (30 seconds)**
1. Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token** → **Use template** next to **"Edit Cloudflare Workers"**
3. Click **Continue to summary** → **Create Token**
4. Copy the token (you only see it once)

**Step 2 — Run the setup script**

In Claude Code, type `!` then paste this (replace with your real token):

```
! $env:CLOUDFLARE_API_TOKEN="PASTE_YOUR_TOKEN_HERE"; node "worker/setup.mjs"
```

That's it — the script creates the database, storage bucket, deploys the Worker, and updates your config automatically.

Done. Your site is in cloud mode. Skip straight to "Verify it worked" below.

---

## What you need (both paths)

- A free Cloudflare account → [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
- [Node.js](https://nodejs.org) installed (for `npx` — no other install needed)

---

---

## Manual path (if the script fails or you prefer step by step)

## Step 1 — Authenticate with Cloudflare

**Recommended — API token (no browser flow):**

```powershell
$env:CLOUDFLARE_API_TOKEN="your-token-here"
```

Get a token at [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) → Create Token → "Edit Cloudflare Workers" template.

**Alternative — OAuth login** (open a real terminal window, not Claude Code's `!` prefix):
```bash
npx wrangler login
```
A browser tab opens — sign in and click **Allow** within 2 minutes.

---

## Step 2 — Create the database

```bash
npx wrangler d1 create birthday-gifts
```

The command prints something like:

```
✅ Successfully created DB 'birthday-gifts'
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Copy that `database_id`.**

Open `worker/wrangler.toml` and paste it in place of `REPLACE_WITH_YOUR_DATABASE_ID`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "birthday-gifts"
database_id = "paste-your-id-here"   # ← paste here
```

---

## Step 3 — Create the photo/video storage bucket

```bash
npx wrangler r2 bucket create gift-media
```

---

## Step 4 — Make the bucket public (so photos load fast)

1. Go to [Cloudflare Dashboard → R2](https://dash.cloudflare.com/?to=/:account/r2/buckets)
2. Click the **gift-media** bucket
3. Click **Settings** → **Public Development URL** → **Enable**
4. Copy the URL it shows — it looks like `https://pub-xxxxxxxxxxxxxxxx.r2.dev`

Open `worker/wrangler.toml` and paste that URL in place of `REPLACE_WITH_YOUR_R2_PUBLIC_URL`:

```toml
[vars]
R2_PUBLIC_URL = "https://pub-xxxxxxxxxxxxxxxx.r2.dev"   # ← paste here (no trailing slash)
TRIAL_DAYS = "7"
```

---

## Step 5 — Set up the database tables

```bash
npx wrangler d1 execute birthday-gifts --remote --file=./schema.sql
```

---

## Step 6 — Deploy the Worker

```bash
npx wrangler deploy
```

The command prints your Worker URL:

```
https://birthday-gift-api.YOUR-SUBDOMAIN.workers.dev
```

**Copy that URL.**

---

## Step 7 — Paste the Worker URL into the site

Open **`cloud-config.js`** (in the project root) and paste the URL:

```js
window.CLOUD = {
  WORKER_URL: 'https://birthday-gift-api.YOUR-SUBDOMAIN.workers.dev',  // ← paste here
  STRIPE_PAYMENT_LINK: '',   // optional — see below
  TRIAL_DAYS: 7,
};
```

Save the file, then **reload any page** — the site is now in cloud mode. Gifts and uploads appear on every phone and browser, not just yours.

---

## Verify it worked

Open this URL in a browser (swap in your Worker's domain):

```
https://birthday-gift-api.YOUR-SUBDOMAIN.workers.dev/gifts/anything
```

You should see `{"error":"not found"}` — that is correct and means the Worker is running.

---

## Stripe payment link — make "Buy this gift" actually unlock the gift

This makes each person's payment unlock *their own* gift specifically (not
just open a generic checkout page). Needs the Worker deployed first (above).

**1. Create the Payment Link**
1. [Stripe Dashboard → Payment Links → + New](https://dashboard.stripe.com/payment-links)
2. Create any product/price (e.g. "Birthday Gift — keep forever")
3. Copy the checkout URL (starts with `https://buy.stripe.com/…`)
4. Paste it into `cloud-config.js` as `STRIPE_PAYMENT_LINK`

The site automatically appends `?client_reference_id=<the gift's slug>` to
this link every time someone clicks Buy — that's what tells Stripe (and
later, your Worker) *which* gift the payment was for. You don't need to do
anything for this part; it's already wired into `gift-create.html`.

**2. Create the webhook (this is what unlocks the gift after payment)**
1. [Stripe Dashboard → Developers → Webhooks → + Add endpoint](https://dashboard.stripe.com/webhooks)
2. Endpoint URL: `https://birthday-gift-api.YOUR-SUBDOMAIN.workers.dev/stripe/webhook`
3. Select event: `checkout.session.completed`
4. Save, then click into the new webhook and copy its **Signing secret** (starts with `whsec_`)
5. Set it on your Worker:
   ```bash
   npx wrangler secret put STRIPE_WEBHOOK_SECRET
   ```
   (paste the `whsec_…` value when prompted — this is a secret, never put it in a file)

**3. Test it**
1. Create a gift, click "Buy this gift", pay with a [Stripe test card](https://docs.stripe.com/testing) (`4242 4242 4242 4242`, any future date, any CVC)
2. Switch back to the gift-create tab — within ~10 seconds it should show "✓ Paid — this gift is kept forever" and the Buy button disappears
3. That gift will now never be deleted by the trial-expiry cleanup, no matter how old it gets

**Demo mode note:** if you haven't deployed the Worker yet (`cloud-config.js` has
no `WORKER_URL`), clicking Buy just marks the gift paid locally in that one
browser (honor system) — there's no server yet to verify a real payment. Deploy
the Worker to get real, verified per-gift payments via the webhook above.

---

## Changing the trial length

Edit **both** these values and keep them equal:

| File | Variable |
|------|----------|
| `cloud-config.js` | `TRIAL_DAYS: 7` |
| `worker/wrangler.toml` | `TRIAL_DAYS = "7"` |

After editing `wrangler.toml`, run `npx wrangler deploy` again.

---

## Troubleshooting

Stream live Worker logs to see exact errors:

```bash
npx wrangler tail
```

Common fixes:

| Symptom | Fix |
|---------|-----|
| Uploads show a CORS error | Make sure `WORKER_URL` in `cloud-config.js` has no trailing slash |
| Photos don't load | Double-check `R2_PUBLIC_URL` in `wrangler.toml` — must match the Public URL shown in the Cloudflare dashboard |
| "not found" on every gift | The `schema.sql` step (Step 5) may not have run — rerun it |
| Worker prints an error | Run `npx wrangler tail` and check the logs |
