import { useEffect } from "react";

function isInputEvent(event: KeyboardEvent) {
  return (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement ||
    (event.target instanceof HTMLSpanElement &&
      Boolean(event.target.contentEditable))
  );
}

export function useKeyPress(
  callback: (event: KeyboardEvent) => void,
  detectKeys: string[],
  ignoreInputEvents = true,
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        detectKeys.includes(event.key) &&
        !(ignoreInputEvents && isInputEvent(event)) &&
        !(event.ctrlKey || event.metaKey || event.altKey)
      ) {
        callback(event);
      }
    };
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [callback, detectKeys, ignoreInputEvents]);
}
