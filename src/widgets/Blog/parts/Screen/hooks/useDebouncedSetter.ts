import React from "react";

/**
 * Debounces writing `value` into `setDebouncedValue`.
 * Useful when you want to keep an "immediate" value + a debounced value in state,
 * while still being able to set the debounced value synchronously in special cases (e.g. URL sync).
 */
export const useDebouncedSetter = (
  value: string,
  setDebouncedValue: (next: string) => void,
  delayMs: number = 220,
) => {
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs, setDebouncedValue]);
};


