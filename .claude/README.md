# Claude Code config for Tabliss

This directory holds project-scoped helpers for [Claude Code](https://claude.com/claude-code)
and the in-app preview tooling. Everything here is committed so the whole team
(and any agent working in the repo) shares the same workflows.

## Slash-command skills (`commands/`)

Invoke from Claude Code as `/<name> [argument]`.

| Command | Argument | What it does |
| --- | --- | --- |
| `/dev` | `web` \| `chromium` \| `firefox` (default `web`) | Start the dev server / watch build. |
| `/build` | `web` \| `chromium` \| `firefox` \| `all` (default `all`) | Production build for one or all targets. |
| `/lint` | `check` \| `fix` (default `check`) | Run ESLint (`eslint.config.js` is intentionally minimal). |
| `/test` | optional Jest pattern | Run the `tsc` + Jest suite. Notes the `dist/test` stale-output gotcha. |
| `/new-widget` | widget name | Scaffold a widget plugin under `src/plugins/widgets/` and register it. |
| `/new-background` | background name | Scaffold a background plugin under `src/plugins/backgrounds/` and register it. |
| `/upgrade-deps` | optional package | Risk-ordered dependency-update workflow, incl. current intentional holds (TS 6, ESLint 10) and the audit residuals. |
| `/release` | semver version | Bump version, write the changelog entry, build all targets. |

## Preview (`launch.json`)

Defines the `dev` server config (`npm run dev:web`, port 8080) used by the
preview tools. The dev server falls back to the next free port (e.g. 8081) when
8080 is occupied.

## Conventions worth knowing

- **Verify every change** against `npm run build:web && npm test && npm run lint`
  before considering it done. The build prints two `[big]` bundle-size warnings —
  those are expected and benign.
- **Plugins** (widgets and backgrounds) share one shape: `types.ts`,
  `<Name>.tsx`, `<Name>Settings.tsx`, `index.ts`, registered in the sibling
  `index.ts`. Add `reducer/actions/api` files only for plugins that fetch remote
  data.
- **Tests** run against compiled CommonJS in `dist/test`, not the `.ts` sources —
  see `/test` if the test count ever looks doubled.
