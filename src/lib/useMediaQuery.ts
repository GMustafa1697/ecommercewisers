import { useCallback, useSyncExternalStore } from "react";

/** The reduced-motion query, shared by the components that follow it. */
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * A live media query for Client Components. `false` on the server and during hydration, then the
 * real value; it re-renders when the query flips.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
