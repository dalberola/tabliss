import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "background/image",
  name: "Upload Images",
  description: "See your own images.",
  dashboardComponent: lazy(() => import("./Image")),
  settingsComponent: lazy(() => import("./ImageSettings")),
  supportsBackdrop: true,
};

export default config;
