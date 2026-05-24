import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "background/giphy",
  name: "GIPHY",
  description: "Hurt your eyes in every new tab.",
  dashboardComponent: lazy(() => import("./Giphy")),
  settingsComponent: lazy(() => import("./GiphySettings")),
  supportsBackdrop: true,
};

export default config;
