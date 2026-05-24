import { EffectCallback, useEffect, useMemo, useRef } from "react";
import { Cache } from "../plugins";
import { useTime } from "./useTime";

/**
 * A cached effect that automatically reruns after the expires time or on deps change.
 */
export function useCachedEffect(
  effect: EffectCallback,
  expires: Date | number,
  deps: unknown[],
) {
  const time = useTime("absolute");
  const prevDeps = useRef(deps);
  const prevExpires = useRef<Date | number | undefined>(undefined);

  useEffect(() => {
    const depsChanged = !areDepsEqual(prevDeps.current, deps);
    const expired = time >= expires && expires !== prevExpires.current;

    if (depsChanged || expired) {
      prevDeps.current = deps;
      prevExpires.current = expires;
      return effect();
    }
    // We deliberately spread `deps` and depend on `time` here. The hook
    // gates execution internally via prevDeps / prevExpires refs, so
    // including `effect` in the array would re-run the effect on every
    // parent render. eslint can't statically verify the spread shape.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, expires, time]);
}

export type RotatingCache<Item> = {
  items: Item[];
  cursor: number;
  rotated: number;
  deps: unknown[];
};

/**
 * A cache which rotates through a list of items
 */
export function useRotatingCache<T>(
  fetch: () => Promise<T[]>,
  { cache, setCache }: Cache<RotatingCache<T>>,
  timeout: number,
  deps: unknown[],
): T | undefined {
  // Find cursor
  const time = useTime("absolute").getTime();
  const boot = useRef(true);
  const cursor = useMemo(() => {
    if (cache) {
      if (
        (timeout === 0 && boot.current) ||
        (timeout !== 0 && time > cache.rotated + timeout)
      ) {
        const cursor = cache.cursor + 1;
        setCache({ ...cache, cursor, rotated: Date.now() });
        boot.current = false;
        return cursor;
      }
      boot.current = false;
      return cache.cursor;
    }
    return 0;
    // `setCache` is omitted intentionally — it's a stable setter from the
    // plugin API and including it would re-derive the cursor on every
    // parent render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache, time, timeout]);

  // Fetch more when cursor reaches end
  useEffect(() => {
    if (cache && cursor >= cache.items.length - 1) {
      // fetch more
      fetch().then((items) =>
        setCache({
          ...cache,
          items: [...cache.items.slice(-10), ...items],
          cursor: 9,
        }),
      );
    }
    // Cursor is the trigger; `cache`, `fetch`, and `setCache` are read
    // through closures of the latest render but the cursor advance is
    // what gates the fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  // Refresh of deps change
  useEffect(() => {
    if (!cache || !areDepsEqual(deps, cache.deps)) {
      fetch().then((items) =>
        setCache({ items, cursor: 0, rotated: Date.now(), deps }),
      );
    }
    // Spread `deps` so we re-fetch when caller deps change; `cache` for
    // the equality check. `fetch` and `setCache` are reference-stable
    // from the plugin API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, cache]);

  return cache ? cache.items[cursor] : undefined;
}

/**
 * Implementation adapted from react's hook source.
 * Too bad they do not export it.
 */
function areDepsEqual(prevDeps: unknown[], nextDeps: unknown[]) {
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}
