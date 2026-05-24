import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/workHours",
  name: "Work Hours",
  description: "Count down the working hours.",
  dashboardComponent: lazy(() => import("./WorkHours")),
  settingsComponent: lazy(() => import("./WorkHoursSettings")),
};

export default config;
