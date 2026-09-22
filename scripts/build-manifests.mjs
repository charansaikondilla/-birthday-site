#!/usr/bin/env node
/**
 * build-manifests.mjs
 * ---------------------------------------------------------------------------
 * Automates adding photos (and local video files) to the birthday site.
 *
 * WHAT IT DOES
 *   1. Scans assets/photos/ for image files and writes assets/photos/manifest.json.
 *   2. Scans assets/videos/ for local video files and writes assets/videos/manifest.json.
 *   3. If a manifest already exists, your captions/dates/locations/notes for files
 *      that are still there are KEPT — only new files are added and removed files
 *      are dropped. Re-running this after adding one more photo never erases your
 *      earlier edits.
 *
 * HOW TO USE IT
 *   1. Install Node.js (free, one-time): https://nodejs.org  (LTS version)
 *   2. Drop your photos into assets/photos/ (any of .jpg .jpeg .png .webp .avif)
 *      and/or short local video clips into assets/videos/ (.mp4 .webm .mov .m4v)
 *   3. From the project folder, run:
 *          node scripts/build-manifests.mjs
 *   4. Open assets/photos/manifest.json (and assets/videos/manifest.json) in any
 *      text editor and fill in captions / dates / locations / notes — every field
 *      is plain text, no code involved.
 *   5. Refresh the website. script.js automatically prefers manifest.json over the
 *      hand-written arrays in birthdayConfig when one exists — you never have to
 *      touch script.js again for ordinary photo/video updates.
 *
 * NOTE ON VIDEOS: this script only ever manages LOCAL FILES it finds on disk.
 * A YouTube/Vimeo embed has no local file, so add those entries by hand — either
 * directly in birthdayConfig.videos inside script.js, or by editing
 * assets/videos/manifest.json after running this script once (local file entries
 * you already generated will be preserved the next time you re-run it).
 *
 * This script has ZERO npm dependencies — it only uses Node's built-in
 * "fs" and "path" modules, so there is nothing else to install.
 * ---------------------------------------------------------------------------
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

/** Natural sort so "photo-2" comes before "photo-10". */
function naturalCompare(a, b) {
  const chunk = (s) => s.match(/(\d+|\D+)/g) || [];
  const ca = chunk(a);
  const cb = chunk(b);
  for (let i = 0; i < Math.max(ca.length, cb.length); i++) {
    const x = ca[i] || "";
    const y = cb[i] || "";
    const nx = Number(x);
    const ny = Number(y);
    const bothNumeric = !Number.isNaN(nx) && !Number.isNaN(ny) && x !== "" && y !== "";
    if (bothNumeric) {
      if (nx !== ny) return nx - ny;
    } else if (x !== y) {
      return x < y ? -1 : 1;
    }
  }
  return 0;
}

function listFiles(dir, extensions) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extensions.has(extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort(naturalCompare);
}

function loadExistingManifest(path) {
  if (!existsSync(path)) return [];
  try {
    const data = JSON.parse(readFileSync(path, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn(`  (!) Couldn't read ${path} as JSON — starting fresh for this file. (${err.message})`);
    return [];
  }
}

function titleCaseFromFilename(name) {
  const stem = basename(name, extname(name));
  return stem.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Builds the new manifest for a folder of local files, keeping prior edits by
 *  matching on the `src` field. Any prior entries that aren't plain local files
 *  matched by `matchSrc` (e.g. a manually-added YouTube/Vimeo entry) are kept
 *  as-is, appended after the freshly scanned files. */
function buildManifest({ folderAbs, folderRel, extensions, existing, makeEntry, isManagedEntry }) {
  const files = listFiles(folderAbs, extensions);
  const previousBySrc = new Map();
  const untouched = [];

  for (const item of existing) {
    if (isManagedEntry(item)) {
      previousBySrc.set(item.src, item);
    } else {
      untouched.push(item); // e.g. a hand-added YouTube/Vimeo embed — never touched by this script
    }
  }

  const fresh = files.map((filename, index) => {
    const src = `${folderRel}/${filename}`;
    const prior = previousBySrc.get(src);
    if (prior) return prior; // keep every field the user already filled in
    return makeEntry(src, filename, index);
  });

  const removed = [...previousBySrc.keys()].filter((src) => !files.some((f) => `${folderRel}/${f}` === src));
  return { manifest: [...fresh, ...untouched], addedCount: fresh.filter((f) => !previousBySrc.has(f.src)).length, removedCount: removed.length };
}

function run() {
  console.log("Scanning assets/ for photos and local videos…\n");

  // ---- Photos --------------------------------------------------------------
  const photosDirAbs = join(ROOT, "assets", "photos");
  const photosManifestPath = join(photosDirAbs, "manifest.json");
  const existingPhotos = loadExistingManifest(photosManifestPath);

  const { manifest: photoManifest, addedCount: photosAdded, removedCount: photosRemoved } = buildManifest({
    folderAbs: photosDirAbs,
    folderRel: "assets/photos",
    extensions: IMAGE_EXTENSIONS,
    existing: existingPhotos,
    isManagedEntry: (item) => item && typeof item.src === "string" && item.src.startsWith("assets/photos/"),
    makeEntry: (src, filename) => ({
      src,
      alt: titleCaseFromFilename(filename),
      chapterTitle: "",
      caption: "",
      date: "",
      location: "",
      note: "",
      tilt: ""
    })
  });

  if (photoManifest.length) {
    writeFileSync(photosManifestPath, JSON.stringify(photoManifest, null, 2) + "\n", "utf8");
    console.log(`✓ assets/photos/manifest.json written — ${photoManifest.length} photo(s) (${photosAdded} new, ${photosRemoved} removed).`);
  } else {
    console.log("  No photos found in assets/photos/ — nothing written (the site will keep using the example entries in script.js until you add some).");
  }

  // ---- Local video files -----------------------------------------------------
  const videosDirAbs = join(ROOT, "assets", "videos");
  const videosManifestPath = join(videosDirAbs, "manifest.json");
  const existingVideos = loadExistingManifest(videosManifestPath);

  const { manifest: videoManifest, addedCount: videosAdded, removedCount: videosRemoved } = buildManifest({
    folderAbs: videosDirAbs,
    folderRel: "assets/videos",
    extensions: VIDEO_EXTENSIONS,
    existing: existingVideos,
    isManagedEntry: (item) => item && item.type === "file" && typeof item.src === "string" && item.src.startsWith("assets/videos/"),
    makeEntry: (src, filename) => ({
      type: "file",
      src,
      poster: "",
      alt: titleCaseFromFilename(filename),
      chapterTitle: "",
      caption: "",
      date: "",
      location: "",
      note: "",
      orientation: "landscape"
    })
  });

  if (videoManifest.length) {
    writeFileSync(videosManifestPath, JSON.stringify(videoManifest, null, 2) + "\n", "utf8");
    console.log(`✓ assets/videos/manifest.json written — ${videoManifest.length} video(s) (${videosAdded} new local file(s), ${videosRemoved} removed).`);
  } else if (existsSync(videosDirAbs)) {
    console.log("  No local video files found in assets/videos/ — that's fine, videos are optional.");
  }

  console.log("\nDone. Open the manifest.json file(s) above in any text editor to fill in captions, dates, locations and notes.");
}

run();
