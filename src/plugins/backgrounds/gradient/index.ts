import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "background/gradient",
  name: "Colour Gradient",
  description: "Add more splashes of colour.",
  dashboardComponent: lazy(() => import("./Gradient")),
  settingsComponent: lazy(() => import("./GradientSettings")),
};

export default config;
