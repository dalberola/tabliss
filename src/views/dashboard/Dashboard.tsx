import React from "react";
import { db } from "../../db/state";
import { useValue } from "../../lib/db/react";
import Background from "./Background";
import "./Dashboard.sass";
import Overlay from "./Overlay";
import Widgets from "./Widgets";

const Dashboard: React.FC = () => {
  const background = useValue(db, "background");
  const theme = (background.display.luminosity ?? 0) > 0 ? "light" : "dark";

  // Persist the theme for the next page load's synchronous init script
  // (see target/<target>/index.html) AND keep the live <html> class in
  // sync so siblings of <Dashboard> (e.g. the Settings sidebar) can
  // theme themselves via descendant selectors.
  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className={`Dashboard fullscreen ${theme}`}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

export default React.memo(Dashboard);
