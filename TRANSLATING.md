# Adding Translations

This document gives you a step by step guide for how to add your own translations to Tabliss!
Translations are currently only available for the main dashboard (not the settings menu).

1. Fork and checkout the repository
2. Run `npm install` to download the dependencies
3. Add your language code to the languages array in `scripts/translations.js`
4. Run `npm run translations` to generate your language files in `src/locales/lang`
5. With the help of the default messages and descriptions, edit the JSON file with your translated messages
6. Add your language to the `localeOptions` list in `src/locales/locales.ts` — its `code`, `label` (the name in that language), and `name` (an English name for the tooltip). The settings dropdown and the active-locale list are generated from this list, and the catalogue is loaded on demand — no separate dropdown edit or manual `import` needed.
7. Commit your updated files
8. Submit a Pull Request back to the Tabliss repository!

You can test your changes at anytime by running a local development build of Tabliss with `npm start`.

> Language catalogues are code-split: each `src/locales/lang/<code>.json` is
> bundled as its own chunk and fetched only when that language is active, so
> adding a translation does not grow the bundle every visitor downloads.
