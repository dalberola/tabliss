import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/nba",
  name: "NBA Scores",
  description: "Keep up to date with today's NBA games.",
  dashboardComponent: lazy(() => import("./Nba")),
  settingsComponent: lazy(() => import("./NbaSettings")),
};

export default config;
