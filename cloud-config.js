/* =====================================================================
   CLOUD CONFIG — paste your Worker URL here to go live.
   Leave it blank and the site runs in DEMO MODE: gifts + uploads are
   stored only in this one browser (great for testing, but a second phone
   won't see the same gift). No errors either way.
   ===================================================================== */
window.CLOUD = {
  // Follow worker/README.md (free, ~10 minutes, no credit card) to deploy the
  // included Cloudflare Worker, then paste the URL it gives you here, e.g.
  // 'https://birthday-gift-api.yoursubdomain.workers.dev'
  WORKER_URL: 'https://birthday-gift-api.charan-birthday-sites.workers.dev',

  // Optional: a Stripe "Payment Link" (Stripe Dashboard → Payment Links → +New,
  // no code needed). Paste the checkout URL it gives you. Leave blank to show
  // a friendly "not set up yet" message instead of a broken button.
  STRIPE_PAYMENT_LINK: '',

  // How many days a gift's uploads live before they're deleted. Keep this the
  // same as TRIAL_DAYS in worker/wrangler.toml.
  TRIAL_DAYS: 7,

  // Google Sign-In OAuth Client ID (Google Cloud Console → APIs & Services →
  // Credentials → Create Credentials → OAuth client ID → Web application).
  // Leave blank to keep the old access-code login instead of Gmail sign-in.
  // Keep this the same value as GOOGLE_CLIENT_ID in worker/wrangler.toml.
  GOOGLE_CLIENT_ID: '1013321538760-icp2obo2s7c0c9bkcl27ih30n1kop1m2.apps.googleusercontent.com',
};
