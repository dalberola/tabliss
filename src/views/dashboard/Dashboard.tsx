import React from "react";
import { db } from "../../db/state";
import { useValue } from "../../lib/db/react";
import Background from "./Background";
import "./Dashboard.sass";
import Overlay from "./Overlay";
import Widgets from "./Widgets";

const Dashboard: React.FC = () => {
  const background = useValue(db, "background");
  // Theme is derived from the active background's luminosity so widget
  // text contrasts the image. This stays scoped to .Dashboard — the
  // Settings sidebar and modals follow the OS prefers-color-scheme
  // instead (see src/styles.sass).
  const theme = (background.display.luminosity ?? 0) > 0 ? "light" : "dark";

  return (
    <div className={`Dashboard fullscreen ${theme}`}>
      <Background />
      <Widgets />
      <Overlay />
    </div>
  );
};

export default React.memo(Dashboard);
