# Razorpay + private gift pages: switching it on

The site code is ready. Your **live Worker still runs the old version**, so passwords and payments only start working after these steps (about 15 minutes). Until then, gifts keep opening without a password and nothing breaks.

## 1. Get Razorpay keys
1. Sign up at https://dashboard.razorpay.com. Start in **Test mode** (toggle in the top bar).
2. Go to **Account & Settings → API Keys → Generate Key**. Copy the **Key ID** (`rzp_test_…`) and the **Key Secret**.
3. Go to **Account & Settings → Webhooks → Add New Webhook**:
   - URL: `https://birthday-gift-api.charan-birthday-sites.workers.dev/razorpay/webhook`
   - Secret: make up a long random string and copy it
   - Events: tick `payment.captured` and `order.paid`

## 2. Give the keys to the Worker (they are never put in the site files)
In this project folder, run:
```
npx wrangler login
cd worker
npx wrangler secret put RAZORPAY_KEY_ID          # paste rzp_test_…
npx wrangler secret put RAZORPAY_KEY_SECRET      # paste the key secret
npx wrangler secret put RAZORPAY_WEBHOOK_SECRET  # paste the webhook secret
```
The price is ₹199 by default. To change it, add `PRICE_INR = "299"` under `[vars]` in `worker/wrangler.toml`.

## 3. Deploy the new Worker
```
npx wrangler deploy
```
The database upgrades itself on the first request: the new columns are added automatically, with no SQL to run.

## 4. Try it
1. Create a gift, choose a password, and press **💳 Keep it forever**.
2. In test mode, pay with Razorpay's test card `4111 1111 1111 1111` (any future date, any CVV).
3. Open the gift link in a private window: you should see the Netflix-style **Sign In** screen.

When everything works, switch Razorpay to **Live mode**. Generate live keys and a live webhook, then repeat step 2 with the live values.

## How the flow works
- **Creator:** signs in → **Create gift** (name + password) → gets the link + password to send on WhatsApp → **✎ Customize their page** (every edit saves to *their* link) → pays ₹199 so the page isn't deleted after the 7-day trial.
- **Her:** opens the link → the Sign In screen → the right password → logo intro with sound → the page made for her.
- **Payments:** the Worker creates the order, so the price can't be changed in the browser. Razorpay's checkout opens, then the Worker checks Razorpay's signature before marking the gift paid. The webhook is a backup if she closes the tab mid-payment.
