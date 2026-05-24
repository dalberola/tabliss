import React from "react";
import "./PluginSkeleton.sass";

/**
 * Suspense fallback for lazy-loaded plugins.
 *
 * Renders an invisible element for the first ~200 ms so fast chunk loads
 * don't flash a skeleton at all. If the load takes longer, a subtle
 * pulsing dot fades in to signal that something is in progress.
 */
const PluginSkeleton: React.FC = () => (
  <div className="PluginSkeleton" aria-hidden="true" />
);

export default PluginSkeleton;
