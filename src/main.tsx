import React from "react";
import { createRoot } from "react-dom/client";
import { register as registerErrorHandler } from "./errorHandler";
import { register as registerServiceWorker } from "./serviceWorker";
import Root from "./views/Root";

// Register error handler
if (!DEV) {
  registerErrorHandler();
}

// Render app into root element
createRoot(document.getElementById("root")!).render(<Root />);

// Register service worker on web
if (!DEV && BUILD_TARGET === "web") {
  registerServiceWorker();
}

// Ask the browser to persist storage so settings aren't evicted under
// storage pressure. Best-effort storage is cleared all-or-nothing per
// origin — IndexedDB included — which presents as "lost all my settings",
// notably around a deploy that inflates the service worker cache. Chromium
// grants this silently via engagement heuristics; Firefox prompts once. The
// manual fallback in settings/Persist.tsx still covers a false result.
if (BUILD_TARGET === "web" && navigator.storage?.persist) {
  navigator.storage.persisted().then((persisted) => {
    if (!persisted) navigator.storage.persist();
  });
}
