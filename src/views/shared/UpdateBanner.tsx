import React from "react";

import { SW_UPDATE_EVENT } from "../../serviceWorker";
import "./UpdateBanner.sass";

/**
 * Dismissible bottom banner shown when the service worker has cached a new
 * version of the app. Clicking "Reload" reloads the page so the new bundle
 * activates. Dismissing it hides the banner until the next update.
 */
const UpdateBanner: React.FC = () => {
  const [available, setAvailable] = React.useState(false);

  React.useEffect(() => {
    const onUpdate = () => setAvailable(true);
    window.addEventListener(SW_UPDATE_EVENT, onUpdate);
    return () => window.removeEventListener(SW_UPDATE_EVENT, onUpdate);
  }, []);

  if (!available) return null;

  return (
    <div className="UpdateBanner" role="status" aria-live="polite">
      <span>A new version of Tabliss is available.</span>
      <button
        className="button button--primary"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
      <button
        className="UpdateBanner-dismiss"
        onClick={() => setAvailable(false)}
        aria-label="Dismiss"
        title="Dismiss"
      >
        ×
      </button>
    </div>
  );
};

export default UpdateBanner;
