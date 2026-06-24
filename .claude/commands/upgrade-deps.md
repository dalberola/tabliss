Update project dependencies safely, resolving deprecations and audit issues.

Optional argument: a specific package to focus on. If omitted, sweep the whole
dependency tree.

Focus: $ARGUMENTS

This project pins modern majors (React 19, webpack 5, ESLint 9, TypeScript 5.9).
Treat every bump as guilty until proven green. Work in **risk-ordered waves** and
**verify after each wave** — never batch unrelated majors into one untested step.

## Baseline first

Establish a green baseline before changing anything:
```
npm run build:web   # webpack build (2 "[big]" bundle-size warnings are expected/benign)
npm test            # tsc + jest, 28 tests
npm run lint        # ESLint flat config
npm outdated        # what's behind
npm audit           # known vulns
```

## Waves

1. **Safe minor/patch** — same-major bumps. Apply together, then verify.
2. **Build tooling majors** (css-loader, dotenv, webpack-cli, loaders) — verify
   web **and** extension builds (`build:chromium`, `build:firefox`) **and** the
   dev server (`npm run dev:web` → expect "compiled successfully"; it falls back
   off port 8080 if taken).
3. **Code-affecting majors** — bumps that need source edits. Read every consumer
   first (`grep -rn "<pkg>" src`). Known migrations already done once here:
   - `date-fns` 2→4 / `date-fns-tz` 1→3: `utcToZonedTime`→`toZonedTime`,
     `zonedTimeToUtc`→`fromZonedTime`.
   - `@sentry/browser` 7→10: `autoSessionTracking` was removed — disable sessions
     by filtering the default `BrowserSession` integration instead.
   - `react-error-boundary` 4→6: `onError`'s first arg widened to `unknown`.
4. **Risky language/lint majors** (TypeScript, ESLint) — attempt, but only keep
   if the tree stays clean. See current holds below.

## Verify after every wave

`npm run build:web && npm test && npm run lint`, plus the extension builds and a
dev-server smoke test for any tooling change. Commit each wave separately with a
message listing the bumps and what was verified. If on `main`, branch first.

## Current intentional holds (do not bump without clearing the blocker)

- **TypeScript 6** — GA, but forces the tsconfig off the deprecated
  `moduleResolution: node10`. The test build emits CommonJS to `dist/test`
  (`jest.config.json` runs the compiled JS), which conflicts with the modern
  `moduleResolution: bundler`, so TS 6 needs either `ignoreDeprecations: "6.0"`
  or a risky `node16` test-emit migration. It also sits at the top edge of
  `typescript-eslint`'s supported range (`<6.1.0`). Held at 5.9.x.
- **ESLint 10** — `eslint-plugin-react` has no release supporting ESLint 10
  (peer caps at `^9.7`). Adopting it ships an unmet peer dependency. Held at 9.x
  until the plugin supports 10.

## Audit / vulns

- `overrides.uuid` forces `sockjs` (via `webpack-dev-server`) onto a patched uuid.
- The remaining `npm audit` findings are the **js-yaml** chain pulled in by
  `@istanbuljs/load-nyc-config` (Jest coverage tooling). It pins `js-yaml ^3`,
  which has no patched release, and the fixed `js-yaml` (4.1.2+/5.x) removes the
  `safeLoad` API that loader needs — so it cannot be overridden without breaking
  coverage. These are dev-only and moderate; document, don't force.

When done, report: what was bumped, what required source changes, what was held
and why, and the final build/test/lint/audit state.
