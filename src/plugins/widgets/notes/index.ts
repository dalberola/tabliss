import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/notes",
  name: "Notes",
  description: "Jot something down.",
  dashboardComponent: lazy(() =>
    import("./Notes").then((m) => ({ default: m.Notes })),
  ),
};

export default config;
