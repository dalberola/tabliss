import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/css",
  name: "Custom CSS",
  description: "Make your new tab more style-ish (advanced users).",
  dashboardComponent: lazy(() => import("./Css")),
  settingsComponent: lazy(() => import("./CssSettings")),
};

export default config;
