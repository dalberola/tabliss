// ESLint flat config — minimum viable rules to catch real bugs and
// enforce a consistent style across the codebase without becoming a
// nuisance. Extend deliberately.

const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");

module.exports = tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "**/*.d.ts"],
  },
  // Base JS recommended
  ...tseslint.configs.recommended,
  // React
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        BUILD_TARGET: "readonly",
        DEV: "readonly",
        GIPHY_API_KEY: "readonly",
        UNSPLASH_API_KEY: "readonly",
        VERSION: "readonly",
        browser: "readonly",
        // Browser globals commonly used (subset).
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Headers: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        Intl: "readonly",
        FileList: "readonly",
        KeyboardEvent: "readonly",
        Promise: "readonly",
        Set: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        alert: "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // React 17+ JSX transform: don't require `import React`.
      "react/react-in-jsx-scope": "off",
      // The codebase uses many `<a onClick>` patterns intentionally.
      "react/no-unescaped-entities": "off",
      // Hooks correctness.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Allow leading underscore for intentionally-unused params/vars.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // `any` is used in a few migration / parsing spots already.
      "@typescript-eslint/no-explicit-any": "off",
      // Empty interfaces and object types are sometimes useful.
      "@typescript-eslint/no-empty-object-type": "off",
      // Style choices left to author until proven otherwise.
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
  // Test files — looser rules
  {
    files: ["src/**/*.test.{ts,tsx}", "src/**/__tests__/**"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        global: "writable",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
