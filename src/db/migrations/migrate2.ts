import { State } from "../state";
import { Version2Config } from "./migrate1";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (input: Version2Config): any {
  return {
    background: input.backgrounds.find((background) => background.active),
    ...Object.fromEntries(
      input.widgets.map((widget, index) => [
        `widget/${widget.id}`,
        { ...widget, order: index },
      ]),
    ),
    ...Object.fromEntries(
      Object.entries(input.data).map(([key, val]) => [`data/${key}`, val]),
    ),
    ...(input.locale ? { locale: input.locale } : {}),
    timeZone: input.timeZone ?? null,
    focus: false,
  };
}
