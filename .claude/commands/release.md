Prepare a Tabliss release.

The argument is the new semver version (e.g. `2.8.3`). If omitted, ask which
version to cut — do not guess.

Version: $ARGUMENTS

## Steps

1. **Sanity-check the tree is green** before touching anything:
   `npm run build:web && npm test && npm run lint`. Stop if any fails.

2. **Bump the version** in `package.json` (`"version"`). Use plain semver — no
   `^`/`~`. This field feeds the `VERSION` define in the build.

   **It does not feed the extension manifests.** `target/chromium/manifest.json`
   and `target/firefox/manifest.json` each hardcode their own `"version"` and are
   copied verbatim by CopyWebpackPlugin, so they must be bumped by hand in the
   same commit. Miss this and the extensions ship labelled with the previous
   version. Verify after building:
   `node -p "require('./dist/chromium/manifest.json').version"`.

3. **Update `CHANGELOG.md`.** Follow the existing Keep-a-Changelog style:
   - New `## [<version>] - <YYYY-MM-DD>` section at the top, under the intro.
   - A one-line summary sentence describing the release's theme.
   - `### Added` / `### Changed` / `### Fixed` subsections as needed, each entry
     leading with a **bold summary**, then the why/what in plain prose (match the
     density of the existing entries — they explain root causes, not just labels).
   - Derive entries from `git log <previous-tag-or-version>..HEAD`. Do not invent
     changes; only list what actually landed.

4. **Build all distribution targets:** `npm run build:web && npm run build:chromium
   && npm run build:firefox`. Confirm each emits to `dist/web`, `dist/chromium`,
   `dist/firefox` with no errors (the 2 `[big]` bundle-size warnings are expected).

5. **Report** the new version, the changelog section you wrote, and the build
   output locations.

Do **not** create a git tag, commit, or push unless explicitly asked. Stop after
preparing the working tree and let the user review the changelog.
