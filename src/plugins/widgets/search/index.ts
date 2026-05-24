import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/search",
  name: "Search Box",
  description: "Move your URL bar.",
  dashboardComponent: lazy(() => import("./Search")),
  settingsComponent: lazy(() => import("./SearchSettings")),
};

export default config;
