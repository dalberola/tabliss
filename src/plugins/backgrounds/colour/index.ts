import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "background/colour",
  name: "Solid Colour",
  description: "Add a splash of colour.",
  dashboardComponent: lazy(() => import("./Colour")),
  settingsComponent: lazy(() => import("./ColourSettings")),
};

export default config;
