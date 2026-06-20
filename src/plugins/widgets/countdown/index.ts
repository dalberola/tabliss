import { lazy } from "react";
import { Config } from "../../types";

const config: Config = {
  key: "widget/countdown",
  name: "Countdown",
  description: "Count down to any moment.",
  dashboardComponent: lazy(() => import("./Countdown")),
  settingsComponent: lazy(() => import("./CountdownSettings")),
};

export default config;
