<h1 align="center">Tabliss</h1>

<p align="center">A beautiful, customisable New Tab page for Firefox and Chrome.</p>

![Tabliss Screenshot](screenshot.png)

<p align="center"><a href="https://tabliss.io">https://tabliss.io</a></p>

## Usage

Install dependencies with `npm install` before running the following scripts.

- `npm run dev[:target]` Local development server
- `npm run build[:target]` Production build
- `npm run lint` / `npm run lint:fix` Lint the source with ESLint
- `npm test` Type-check and run the Jest suite
- `npm run translations` Manage translation files

Targets are `web` (default), `chromium`, and `firefox`. Contributors using
[Claude Code](https://claude.com/claude-code) have project skills for these
workflows — see [`.claude/README.md`](.claude/README.md).

To develop with external services you will additionally need to signup for your own API keys
and enter them into your `.env` file. Get started by copying the example provided `cp .env.example .env`.

## Translations

Checkout the guide to [adding translations](TRANSLATING.md).
