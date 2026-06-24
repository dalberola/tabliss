import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { capture as captureException } from "../../errorHandler";
import { useApi } from "../../hooks";
import { API } from "../../plugins";
import Crashed from "./Crashed";
import PluginSkeleton from "./PluginSkeleton";

type Props = {
  id: string;
  component: React.ComponentType<API<any, any>>;
};

const Plugin: React.FC<Props> = ({ id, component: Component }) => {
  // Create plugin API
  const api = useApi(id);

  return (
    <React.Suspense fallback={<PluginSkeleton />}>
      <Component {...api} />
    </React.Suspense>
  );
};

export default withErrorBoundary(Plugin, {
  FallbackComponent: Crashed,
  // react-error-boundary v6 widened `onError`'s first arg to `unknown`.
  onError: (error) =>
    captureException(error instanceof Error ? error : new Error(String(error))),
});
