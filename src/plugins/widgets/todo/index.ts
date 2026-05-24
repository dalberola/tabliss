import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/todo",
  name: "Todos",
  description: "Add reminders to procrastinate.",
  dashboardComponent: lazy(() => import("./Todo")),
  settingsComponent: lazy(() => import("./TodoSettings")),
};

export default config;
