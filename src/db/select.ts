import { DB } from "../lib";
import { db, WidgetPosition, WidgetState } from "./state";

const LEGACY_POSITIONS: Record<string, WidgetPosition> = {
  topLeft:      { x:  5, y:  8 },
  topCentre:    { x: 50, y:  5 },
  topRight:     { x: 95, y:  5 },
  middleLeft:   { x:  5, y: 50 },
  middleCentre: { x: 50, y: 50 },
  middleRight:  { x: 95, y: 50 },
  bottomLeft:   { x:  5, y: 90 },
  bottomCentre: { x: 50, y: 90 },
  bottomRight:  { x: 95, y: 90 },
};

function normalizePosition(pos: unknown): WidgetPosition {
  if (pos && typeof pos === "object" && "x" in pos && "y" in pos) {
    return pos as WidgetPosition;
  }
  if (typeof pos === "string" && pos in LEGACY_POSITIONS) {
    return LEGACY_POSITIONS[pos];
  }
  return { x: 50, y: 50 };
}

/** Select widgets from database */
export const selectWidgets = (): WidgetState[] => {
  return Array.from(DB.prefix(db, "widget/"))
    .map(([, val]) => val)
    .filter((val): val is WidgetState => val !== null)
    .sort((a, b) => a.order - b.order)
    .map((widget) => ({
      ...widget,
      display: {
        ...widget.display,
        position: normalizePosition(widget.display.position as unknown),
      },
    }));
};
