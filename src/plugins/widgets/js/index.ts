import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/js",
  name: "Custom JS",
  description: "Program in your program.",
  dashboardComponent: lazy(() => import("./Js")),
  settingsComponent: lazy(() => import("./JsSettings")),
};

export default config;
