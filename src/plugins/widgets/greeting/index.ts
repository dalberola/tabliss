import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/greeting",
  name: "Greeting",
  description: "Be personally greeted all day.",
  dashboardComponent: lazy(() => import("./Greeting")),
  settingsComponent: lazy(() => import("./GreetingSettings")),
};

export default config;
