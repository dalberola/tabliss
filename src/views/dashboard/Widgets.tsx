import React from "react";
import { selectWidgets } from "../../db/select";
import { db } from "../../db/state";
import { useSelector, useValue } from "../../lib/db/react";
import DraggableWidget from "./DraggableWidget";
import "./Widgets.sass";

const Widgets: React.FC = () => {
  const focus = useValue(db, "focus");
  const widgets = useSelector(db, selectWidgets);

  return (
    <div className="Widgets fullscreen">
      {!focus &&
        widgets.map((widget) => (
          <DraggableWidget key={widget.id} widget={widget} />
        ))}
    </div>
  );
};

export default Widgets;
