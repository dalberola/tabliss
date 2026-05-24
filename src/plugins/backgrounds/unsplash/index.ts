import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "background/unsplash",
  name: "Unsplash",
  description: "Who has time to find their own images.",
  dashboardComponent: lazy(() => import("./Unsplash")),
  settingsComponent: lazy(() => import("./UnsplashSettings")),
  supportsBackdrop: true,
};

export default config;
