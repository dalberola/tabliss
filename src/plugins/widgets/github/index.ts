import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/github",
  name: "GitHub Calendar",
  description: "Get motivated by green squares.",
  dashboardComponent: lazy(() => import("./GitHub")),
  settingsComponent: lazy(() => import("./GitHubSettings")),
};

export default config;
