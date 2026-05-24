import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/ipInfo",
  name: "IP Info",
  description: "Displays data on your IP and location",
  dashboardComponent: lazy(() => import("./IpInfo")),
  settingsComponent: lazy(() => import("./IpInfoSettings")),
};

export default config;
