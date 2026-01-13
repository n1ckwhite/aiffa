import type { ReadonlyURLSearchParams } from "next/navigation";

export type QueryEntry = readonly [key: string, value: string | null];

export const toEntries = (sp: ReadonlyURLSearchParams): QueryEntry[] => {
  const entries: QueryEntry[] = [];
  for (const [key, value] of sp.entries()) {
    const normalizedValue = value === "" ? null : value;
    entries.push([key, normalizedValue]);
  }
  return entries;
};

export const serializeQuery = (entries: readonly QueryEntry[]): string => {
  return entries
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      if (value === null) return encodedKey;
      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

export const buildPageHref = (args: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  nextPage: number;
}): string => {
  const { pathname, searchParams, nextPage } = args;

  const safeNextPage = Number.isFinite(nextPage) && nextPage > 0 ? Math.floor(nextPage) : 1;
  const baseEntries = toEntries(searchParams).filter(([key]) => key.toLowerCase() !== "page");

  const nextEntries: QueryEntry[] = [...baseEntries];
  if (safeNextPage > 1) nextEntries.push(["page", String(safeNextPage)]);

  const nextSearch = serializeQuery(nextEntries);
  return nextSearch ? `${pathname}?${nextSearch}` : pathname;
};

