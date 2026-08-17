Update project dependencies safely, resolving deprecations and audit issues.

Optional argument: a specific package to focus on. If omitted, sweep the whole
dependency tree.

Focus: $ARGUMENTS

This project pins modern majors (React 19, webpack 5, ESLint 9, TypeScript 6)
and requires **Node >= 24** (`engines`, `.nvmrc`, and all CI jobs).
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
   - `typescript` 5.9→6: needs an explicit `rootDir` in `tsconfig.test.json`
     (TS5011), `ignoreDeprecations: "6.0"` for `moduleResolution: node`
     (TS5107), and `src/@types/styles.d.ts` declaring `*.css`/`*.sass` — TS 6
     raises TS2882 on side-effect imports it cannot resolve.
4. **Risky language/lint majors** (TypeScript, ESLint) — attempt, but only keep
   if the tree stays clean. See current holds below.

## Verify after every wave

`npm run build:web && npm test && npm run lint`, plus the extension builds and a
dev-server smoke test for any tooling change. Commit each wave separately with a
message listing the bumps and what was verified. If on `main`, branch first.

## Current intentional holds (do not bump without clearing the blocker)

- **TypeScript 7** — `typescript-eslint` hard-refuses to load against it
  ("typescript-eslint does not support TS 7.0"; peer caps at `<6.1.0`), and TS 7
  *removes* `moduleResolution: node10`, so `ignoreDeprecations` no longer helps
  — the test emit must migrate to `node16`/ESM first. `ts-loader` also fails to
  read the config. Held at 6.0.x; track typescript-eslint issue #10940.
- **ESLint 10** — `eslint-plugin-react` still has no release supporting ESLint
  10 (latest 7.37.5 peers on `^9.7`; the `next` tag is a stale 2018 RC). ESLint
  10 *does* run the suite clean, so the only cost is an unmet peer dependency.
  Held at 9.x until the plugin supports 10.
- **nanoid 6** — ESM-only (`"type": "module"`). `npm test` runs jest over
  CommonJS emitted to `dist/test` with no transform step, and
  `plugins/widgets/todo/actions.ts` imports nanoid, so the suite dies with
  "Cannot use import statement outside a module". Needs a jest ESM migration,
  not a version bump. Held at 3.3.x (which is patched — 0 vulns).
- **react-intl** — pinned to an **exact** `10.1.20`, deliberately. 10.1.21 was
  unpublished and 10.1.22 (current `latest`) pins an exact dependency on
  `@formatjs/icu-messageformat-parser@3.5.17`, which was never published, so any
  caret range fails to install with ETARGET. Restore the caret once upstream
  ships a working release.

## Audit / vulns

- The tree is currently at **0 vulnerabilities**; `npm audit fix` resolves
  everything in-range. The old js-yaml/`@istanbuljs` blocker no longer applies —
  patched releases have since landed.
- The old `overrides.uuid` pin is **gone**: it existed to patch `sockjs` via
  webpack-dev-server 5, and wds 6 no longer depends on sockjs.
- `overrides` now pins `@emnapi/core` and `@emnapi/runtime` to `1.10.0`. Do not
  remove it — see the lockfile section below.
- Remaining deprecation warning is `inflight`, reached only through jest's
  coverage tooling (`jest → babel-plugin-istanbul → test-exclude@6 → glob@7`).
  Upstream; not actionable here.

## Lockfile

Incremental `npm install`/`npm uninstall` cycles can leave `package-lock.json`
out of sync on optional platform-specific deps, which breaks `npm ci` (every CI
job uses it) while local `npm install` stays happy. Before finishing, always run
`rm -rf node_modules && npm ci` and re-verify; if it errors, `npm install` to
resync and commit the lockfile.

**A green local `npm ci` does not prove CI will pass.** Dev machines here are
darwin-arm64; CI is linux-x64, and npm can resolve the same lockfile differently
on each. This bit once already: jest → `unrs-resolver` has an optional
`wasm32-wasi` binding pinning `@emnapi/core`/`@emnapi/runtime` at an exact
`1.10.0`, while its sibling `@napi-rs/wasm-runtime` declares those same two as
*peer* deps with `^1.7.1 || ^2.0.0-alpha.4`. Local npm deduped onto 1.10.0; CI
resolved the range to 1.11.3 and failed every job with "Missing:
@emnapi/core@1.11.3 from lock file". Regenerating the lockfile did not fix it,
and `--os=linux --cpu=x64` did **not** reproduce it. The fix was the `overrides`
pin now in package.json.

So: if a change touches the lockfile in any non-trivial way, **push a branch and
let CI verify on Linux before merging to main** — `push.yml` runs `on: push`, so
any branch gets the full matrix. Cheaper than a red main.

When done, report: what was bumped, what required source changes, what was held
and why, and the final build/test/lint/audit state.
