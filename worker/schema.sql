-- D1 schema for the Birthday Gift API Worker.
-- Apply once with: wrangler d1 execute birthday-gifts --remote --file=./worker/schema.sql
-- (see worker/README.md for the full setup)

CREATE TABLE IF NOT EXISTS gifts (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  paid        INTEGER NOT NULL DEFAULT 0,
  buyer_email TEXT NOT NULL DEFAULT '',
  -- v2 (the Worker also adds these by itself on its first request):
  pass_hash    TEXT NOT NULL DEFAULT '',   -- salted PBKDF2 hash of the gift password
  pass_salt    TEXT NOT NULL DEFAULT '',
  pass_v       INTEGER NOT NULL DEFAULT 0,  -- bumps on every change → old sign-ins stop working
  config       TEXT NOT NULL DEFAULT '',   -- the creator's customised page (JSON)
  updated_at   TEXT NOT NULL DEFAULT '',
  pay_order_id TEXT NOT NULL DEFAULT '',   -- Razorpay order
  pay_id       TEXT NOT NULL DEFAULT '',   -- Razorpay payment
  paid_at      TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS gifts_buyer_email_idx ON gifts (buyer_email);

-- Safe to run again on a database that already has the gifts table without
-- these columns — SQLite/D1 has no "ADD COLUMN IF NOT EXISTS", so run these
-- once by hand if you already deployed before this schema existed:
-- ALTER TABLE gifts ADD COLUMN paid INTEGER NOT NULL DEFAULT 0;
-- ALTER TABLE gifts ADD COLUMN buyer_email TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS gift_media (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL,
  path        TEXT NOT NULL,
  url         TEXT NOT NULL,
  type        TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS gift_media_slug_idx ON gift_media (slug);

-- Wrong-password tries (rate limit: 8 per gift per 15 minutes; cleaned daily).
CREATE TABLE IF NOT EXISTS gift_attempts (
  slug TEXT NOT NULL,
  at   INTEGER NOT NULL
);
