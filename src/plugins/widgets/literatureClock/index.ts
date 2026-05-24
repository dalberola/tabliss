/**
 * Literature Clock Widget for Tabliss
 * Forked by Ngoc L.B. <contact@ngoclb.com>
 * ===
 * Clock using time quotes from the literature, based on work and idea by Jaap Meijers (E-reader clock).
 * @url http://jenevoldsen.com/literature-clock/
 * @url https://github.com/JohannesNE/literature-clock
 */
import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/literature-clock",
  name: "Literature Clock",
  description: "Check the time, with sophistication.",
  dashboardComponent: lazy(() => import("./LiteratureClock")),
  settingsComponent: lazy(() => import("./LiteratureClockSettings")),
};

export default config;
