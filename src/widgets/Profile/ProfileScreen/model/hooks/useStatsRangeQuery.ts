import React from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import type { StatsRange } from "../types";

const rangeOrder: readonly StatsRange[] = ["week", "month", "all"];

const parseRange = (raw: string | null, fallback: StatsRange): StatsRange => {
  if (!raw) return fallback;
  if (rangeOrder.includes(raw as StatsRange)) return raw as StatsRange;
  return fallback;
};

const getParamCaseInsensitive = (sp: ReadonlyURLSearchParams, key: string): string | null => {
  return sp.get(key) ?? sp.get(key.toLowerCase());
};

/**
 * Keep a StatsRange value in the URL query string.
 * - Persists across refresh/share
 * - Preserves other query params
 * - Deletes the param when it equals defaultValue (clean URLs)
 */
export const useStatsRangeQuery = ({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: StatsRange;
}): [StatsRange, (next: StatsRange) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = React.useMemo(
    () => parseRange(getParamCaseInsensitive(searchParams, key), defaultValue),
    [defaultValue, key, searchParams],
  );

  const setValue = React.useCallback(
    (next: StatsRange) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      const shouldDelete = next === defaultValue;
      const methodByShouldDelete = ["set", "delete"] as const;
      const method = methodByShouldDelete[Number(shouldDelete)];

      if (method === "set") nextParams.set(key, next);
      if (method === "delete") nextParams.delete(key);
      // Also remove the lower-cased variant (in case it was produced by a "lower-case everything" normalizer).
      if (key.toLowerCase() !== key) nextParams.delete(key.toLowerCase());

      const nextSearch = nextParams.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [defaultValue, key, pathname, router, searchParams],
  );

  return [value, setValue];
};


