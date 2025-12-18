import React from "react";

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


