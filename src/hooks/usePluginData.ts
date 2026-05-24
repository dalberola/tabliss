import { useCallback } from "react";

import type { API } from "../plugins";

/**
 * Plugin settings convenience hook.
 *
 * Returns a `[data, patch]` tuple where:
 * - `data` is the current plugin data, falling back to `defaults` when
 *   no stored value exists yet.
 * - `patch` accepts a partial update and merges it into the current
 *   data before calling `setData`, eliminating the
 *   `setData({ ...data, field: value })` boilerplate that appears at
 *   every settings input.
 *
 * Example:
 *
 *   const [data, patch] = usePluginData(api, defaultData);
 *   <input
 *     value={data.name}
 *     onChange={(e) => patch({ name: e.target.value })}
 *   />
 */
export function usePluginData<D, C = unknown>(
  api: API<D, C>,
  defaults: D,
): [D, (partial: Partial<D>) => void] {
  const data = api.data ?? defaults;
  const patch = useCallback(
    (partial: Partial<D>) => api.setData({ ...data, ...partial }),
    [api, data],
  );
  return [data, patch];
}
