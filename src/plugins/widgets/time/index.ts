import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/time",
  name: "Time",
  description: "Be on time.",
  dashboardComponent: lazy(() => import("./Time")),
  settingsComponent: lazy(() => import("./TimeSettings")),
};

export default config;
