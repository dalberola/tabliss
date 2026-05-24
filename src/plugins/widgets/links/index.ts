import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/links",
  name: "Quick Links",
  description: "I heard you like bookmarks.",
  dashboardComponent: lazy(() => import("./Links")),
  settingsComponent: lazy(() => import("./LinksSettings")),
};

export default config;
