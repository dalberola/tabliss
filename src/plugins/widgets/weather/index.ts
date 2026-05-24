import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/weather",
  name: "Weather",
  description: "Add a window to see outside.",
  dashboardComponent: lazy(() => import("./Weather")),
  settingsComponent: lazy(() => import("./WeatherSettings")),
};

export default config;
