# Adding Translations

This document gives you a step by step guide for how to add your own translations to Tabliss!
The whole app is translatable — the dashboard and the entire settings menu, including every widget and background panel.

1. Fork and checkout the repository
2. Run `npm install` to download the dependencies
3. Create an empty catalogue file for your language: `src/locales/lang/<code>.json` containing just `{}`
4. Run `npm run translations` — this extracts the source messages (via `@formatjs/cli`) and fills every `src/locales/lang/*.json` with the English defaults for any missing keys
5. With the help of the default messages and descriptions, edit your `<code>.json` with your translated messages
6. Add your language to the `localeOptions` list in `src/locales/locales.ts` — its `code`, `label` (the name in that language), `name` (an English name for the tooltip), and `rtl: true` if it is written right-to-left. The settings dropdown and the active-locale list are generated from this list, and the catalogue is loaded on demand — no separate dropdown edit or manual `import` needed.
7. Commit your updated files
8. Submit a Pull Request back to the Tabliss repository!

You can test your changes at anytime by running a local development build of Tabliss with `npm start`.

> `npm run translations` is deterministic: re-running it on an unchanged tree
> produces no diff. So it's safe to run any time, and CI can verify catalogues
> are in sync.

> Language catalogues are code-split: each `src/locales/lang/<code>.json` is
> bundled as its own chunk and fetched only when that language is active, so
> adding a translation does not grow the bundle every visitor downloads.
