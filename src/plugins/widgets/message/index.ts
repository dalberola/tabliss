import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/message",
  name: "Message",
  description: "Add your own text.",
  dashboardComponent: lazy(() => import("./Message")),
  settingsComponent: lazy(() => import("./MessageSettings")),
};

export default config;
