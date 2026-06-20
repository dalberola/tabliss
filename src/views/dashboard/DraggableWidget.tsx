import React, { useCallback, useState } from "react";
import { setWidgetDisplay } from "../../db/action";
import { WidgetPosition, WidgetState } from "../../db/state";
import { getConfig } from "../../plugins";
import Plugin from "../shared/Plugin";
import Widget from "./Widget";

type Props = {
  widget: WidgetState;
};

const DraggableWidget: React.FC<Props> = ({ widget }) => {
  const { display, id, key } = widget;
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number } | null>(null);

  const livePos: WidgetPosition = dragOffset
    ? {
        x: Math.max(0, Math.min(100, display.position.x + dragOffset.dx)),
        y: Math.max(0, Math.min(100, display.position.y + dragOffset.dy)),
      }
    : display.position;

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = display.position;
      let moved = false;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        if (!moved && dx * dx + dy * dy < 25) return;
        if (!moved) {
          moved = true;
          document.body.style.userSelect = "none";
        }
        setDragOffset({
          dx: (dx / window.innerWidth) * 100,
          dy: (dy / window.innerHeight) * 100,
        });
      };

      const onUp = (ev: MouseEvent) => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
        document.body.style.userSelect = "";
        if (moved) {
          const dx = ev.clientX - startX;
          const dy = ev.clientY - startY;
          setWidgetDisplay(id, {
            position: {
              x: Math.max(0, Math.min(100, startPos.x + (dx / window.innerWidth) * 100)),
              y: Math.max(0, Math.min(100, startPos.y + (dy / window.innerHeight) * 100)),
            },
          });
        }
        setDragOffset(null);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [display.position, id],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${livePos.x}%`,
        top: `${livePos.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: dragOffset ? "grabbing" : "grab",
        pointerEvents: "all",
      }}
      onMouseDown={onMouseDown}
    >
      <Widget {...display}>
        <Plugin id={id} component={getConfig(key).dashboardComponent} />
      </Widget>
    </div>
  );
};

export default DraggableWidget;
