Run the Tabliss test suite.

Optional argument: a Jest name/path pattern to focus the run (e.g. `migrate`).
If no argument is given, run the whole suite.

Pattern: $ARGUMENTS

Before running, check that `node_modules/` exists. If it does not, run `npm install` first.

## How the test pipeline works

`npm test` runs two steps:
1. `tsc -p tsconfig.test.json` — type-checks and **emits** the compiled
   CommonJS output to `dist/test/`.
2. `jest` — runs against the compiled JS (`jest.config.json` sets
   `rootDir: dist/test`), **not** the `.ts` sources directly.

Because step 1 emits without cleaning, stale compiled files can accumulate in
`dist/test/` and cause Jest to run duplicate/old copies of tests (e.g. a test
count that is an exact multiple of the real one). If the count looks wrong,
`rm -rf dist/test` and re-run.

## Steps

- Whole suite → `npm test`
- Focused run → `npm test -- <pattern>` (the pattern is passed through to Jest)

After running, report the suite/test counts and any failures with their output.
If a count looks doubled, clear `dist/test/` and re-run before reporting.
