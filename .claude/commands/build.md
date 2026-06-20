Build the Tabliss project for distribution.

The argument is the build target. Valid values: `web`, `chromium`, `firefox`, `all`.
If no argument is given, default to `all`.

Target: $ARGUMENTS

Run the appropriate command(s):
- `web`      → `npm run build:web`
- `chromium` → `npm run build:chromium`
- `firefox`  → `npm run build:firefox`
- `all`      → run all three sequentially: `npm run build:web && npm run build:chromium && npm run build:firefox`

Before building, check that `node_modules/` exists. If it does not, run `npm install` first.

After each build completes, report:
- Which target finished
- The output directory (`dist/web`, `dist/chromium`, or `dist/firefox`)
- Any warnings or errors from the build output

If a build fails, show the error output and stop — do not continue to remaining targets.
