-- D1 schema for the Birthday Gift API Worker.
-- Apply once with: wrangler d1 execute birthday-gifts --remote --file=./worker/schema.sql
-- (see worker/README.md for the full setup)

CREATE TABLE IF NOT EXISTS gifts (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gift_media (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL,
  path        TEXT NOT NULL,
  url         TEXT NOT NULL,
  type        TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS gift_media_slug_idx ON gift_media (slug);
