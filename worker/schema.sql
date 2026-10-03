-- D1 schema for the Birthday Gift API Worker.
-- Apply once with: wrangler d1 execute birthday-gifts --remote --file=./worker/schema.sql
-- (see worker/README.md for the full setup)

CREATE TABLE IF NOT EXISTS gifts (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  paid        INTEGER NOT NULL DEFAULT 0,
  buyer_email TEXT NOT NULL DEFAULT ''
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
