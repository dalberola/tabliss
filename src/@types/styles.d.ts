// Style sheets are side-effect imports handled by css-loader/sass-loader at
// build time. TypeScript 6 reports TS2882 for side-effect imports it cannot
// resolve to a module, so declare them as empty modules.
declare module "*.css";
declare module "*.sass";
