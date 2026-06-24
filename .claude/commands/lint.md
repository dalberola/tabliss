Lint the Tabliss source with ESLint.

The argument controls the mode. Valid values: `check`, `fix`.
If no argument is given, default to `check`.

Mode: $ARGUMENTS

Run the appropriate command:
- `check` → `npm run lint`
- `fix`   → `npm run lint:fix`

Before running, check that `node_modules/` exists. If it does not, run `npm install` first.

The ESLint flat config lives in `eslint.config.js`. It is intentionally
minimal (see the header comment there). `@typescript-eslint/no-explicit-any`
and `@typescript-eslint/no-empty-object-type` are disabled on purpose, and
unused vars/args/errors prefixed with `_` are allowed.

After running, report:
- The number of errors and warnings (a clean run prints nothing).
- For `fix`: which files were changed, and any problems that remain because
  they are not auto-fixable.

Do not weaken or disable rules to make warnings disappear — fix the code, or
ask before changing `eslint.config.js`.
