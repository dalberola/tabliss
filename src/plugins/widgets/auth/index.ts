import { lazy } from "react";

import { Config } from "../../types";

const config: Config = {
  key: "widget/auth",
  name: "Account Sync",
  description: "Sign in to sync your settings across devices.",
  dashboardComponent: lazy(() => import("./Auth")),
  settingsComponent: lazy(() => import("./AuthSettings")),
};

export default config;
