/*
 * Syncs the per-language catalogues in src/locales/lang/ against the source
 * messages, deterministically.
 *
 * The `translations` npm script runs `formatjs extract` first, which writes the
 * source catalogue (English defaults) to
 * src/locales/extractedMessages/en.json as `{ id: defaultMessage }`. This
 * script then rewrites every src/locales/lang/<code>.json so that it:
 *   - keeps every existing translation untouched,
 *   - fills any missing message id with the English default,
 *   - drops ids that are no longer in the source,
 *   - sorts keys.
 *
 * Because the output depends only on the inputs (no timestamps, no random
 * ordering), running it twice on an unchanged tree produces no diff — which a
 * CI guard can rely on, unlike the previous react-intl-translations-manager
 * flow.
 *
 * To add a language: create an empty src/locales/lang/<code>.json (`{}`), add
 * it to `localeOptions` in src/locales/locales.ts, then run
 * `npm run translations` to populate it.
 */

const fs = require("fs");
const path = require("path");

const langDir = path.join(__dirname, "..", "src", "locales", "lang");
const sourceFile = path.join(
  __dirname,
  "..",
  "src",
  "locales",
  "extractedMessages",
  "en.json",
);

const defaults = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
const ids = Object.keys(defaults).sort();

const files = fs
  .readdirSync(langDir)
  .filter((name) => name.endsWith(".json") && !name.startsWith("whitelist"));

for (const name of files) {
  const file = path.join(langDir, name);
  const existing = JSON.parse(fs.readFileSync(file, "utf8"));

  // Build in sorted id order so the output is deterministic.
  const next = {};
  for (const id of ids) {
    next[id] = Object.prototype.hasOwnProperty.call(existing, id)
      ? existing[id]
      : defaults[id];
  }

  fs.writeFileSync(file, JSON.stringify(next, null, 2) + "\n");
}

console.log(`Synced ${files.length} locales against ${ids.length} messages.`);
