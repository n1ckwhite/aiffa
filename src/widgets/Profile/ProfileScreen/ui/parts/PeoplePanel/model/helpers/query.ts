import type { ReadonlyURLSearchParams } from "next/navigation";

export type QueryEntry = readonly [key: string, value: string | null];

export const toEntries = (sp: ReadonlyURLSearchParams): QueryEntry[] => {
  const entries: QueryEntry[] = [];
  for (const [key, value] of sp.entries()) {
    // Keep "bare" params like `?followers` (which become `followers=` in URLSearchParams) without the '='.
    const normalizedValue = value === "" ? null : value;
    entries.push([key, normalizedValue]);
  }
  return entries;
};

export const serializeQuery = (entries: readonly QueryEntry[]): string => {
  return entries
    .map(([key, rawValue]) => {
      const encodedKey = encodeURIComponent(key);
      if (rawValue === null) return encodedKey;
      return `${encodedKey}=${encodeURIComponent(rawValue)}`;
    })
    .join("&");
};

export const buildPageHref = (args: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  nextPage: number;
}): string => {
  const { pathname, searchParams, nextPage } = args;

  const baseEntries = toEntries(searchParams).filter(([key]) => key.toLowerCase() !== "page");
  const shouldDelete = nextPage <= 1;

  const entriesByShouldDelete: Record<number, QueryEntry[]> = {
    0: [...baseEntries, ["page", String(nextPage)]],
    1: baseEntries,
  };
  const nextEntries = entriesByShouldDelete[Number(shouldDelete)];
  const nextSearch = serializeQuery(nextEntries);
  if (!nextSearch) return pathname;
  return `${pathname}?${nextSearch}`;
};

