import type { ReadonlyURLSearchParams } from "next/navigation";
import type { StatsRange } from "../../../../../model/types";

type QueryEntry = readonly [key: string, value: string | null];

const toEntries = (sp: ReadonlyURLSearchParams): QueryEntry[] => {
  const entries: QueryEntry[] = [];
  for (const [key, value] of sp.entries()) {
    // Keep "bare" params like `?followers` (which become `followers=` in URLSearchParams) without the '='.
    const normalizedValue = value === "" ? null : value;
    entries.push([key, normalizedValue]);
  }
  return entries;
};

const serializeQuery = (entries: readonly QueryEntry[]): string => {
  return entries
    .map(([key, rawValue]) => {
      const encodedKey = encodeURIComponent(key);
      if (rawValue === null) return encodedKey;
      return `${encodedKey}=${encodeURIComponent(rawValue)}`;
    })
    .join("&");
};

export const buildHrefForRange = (args: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  paramKey: string;
  defaultValue: StatsRange;
  next: StatsRange;
}): string => {
  const { pathname, searchParams, paramKey, defaultValue, next } = args;

  const baseEntries = toEntries(searchParams).filter(([key]) => key.toLowerCase() !== paramKey);
  const shouldDelete = next === defaultValue;

  const entriesByShouldDelete: Record<number, QueryEntry[]> = {
    0: [...baseEntries, [paramKey, next]],
    1: baseEntries,
  };
  const nextEntries = entriesByShouldDelete[Number(shouldDelete)];

  const nextSearch = serializeQuery(nextEntries);
  if (!nextSearch) return pathname;
  return `${pathname}?${nextSearch}`;
};

