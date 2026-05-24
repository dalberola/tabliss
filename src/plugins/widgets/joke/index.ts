import { lazy } from "react";
import { Config } from "../../types";
const config: Config = {
  key: "widget/joke",
  name: "Jokes",
  description: "Some amusement or laughter",
  dashboardComponent: lazy(() => import("./Joke")),
  settingsComponent: lazy(() => import("./JokeSettings")),
};

export default config;
