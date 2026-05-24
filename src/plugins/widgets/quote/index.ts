import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/quote",
  name: "Quotes",
  description: "Be inspired (or not, there's categories).",
  dashboardComponent: lazy(() => import("./Quote")),
  settingsComponent: lazy(() => import("./QuoteSettings")),
};

export default config;
