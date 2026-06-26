import { lazy } from "react";

import { Config } from "../../types";

const config: Config = {
  key: "widget/auth",
  name: "Sync status",
  description: "Show your account sync status on the dashboard.",
  dashboardComponent: lazy(() => import("./Auth")),
  settingsComponent: lazy(() => import("./AuthSettings")),
};

export default config;
