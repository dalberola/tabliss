Start the Tabliss development server.

The argument is the build target. Valid values: `web`, `chromium`, `firefox`.
If no argument is given, default to `web`.

Target: $ARGUMENTS

Run the appropriate command:
- `web`      → `npm run dev:web`
- `chromium` → `npm run dev:chromium`
- `firefox`  → `npm run dev:firefox`

Before running, check that `node_modules/` exists. If it does not, run `npm install` first.

After starting the server, tell the user:
- Which URL to open (for `web`: http://localhost:8080)
- For extension targets (`chromium`/`firefox`): remind them to load the unpacked extension from `dist/<target>/` in their browser's extension manager, and that the dev server watches for changes and rebuilds automatically.
