import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ProfilePeopleMode } from "../../../../../../model/types";

type QueryEntry = readonly [key: string, value: string | null];

const serializeQuery = (entries: readonly QueryEntry[]): string => {
  return entries
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      if (value === null) return encodedKey;
      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

export const buildPeopleHref = (args: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  next: ProfilePeopleMode;
}): string => {
  const { pathname, searchParams, next } = args;

  const baseEntries: QueryEntry[] = [];
  for (const [key, value] of searchParams.entries()) {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey === "followers") continue;
    if (normalizedKey === "following") continue;
    if (normalizedKey === "page") continue;
    baseEntries.push([key, value]);
  }

  const nextEntries: QueryEntry[] = [...baseEntries];
  if (next === "followers") nextEntries.push(["followers", null]);
  if (next === "following") nextEntries.push(["following", null]);

  const nextSearch = serializeQuery(nextEntries);
  if (!nextSearch) return pathname;
  return `${pathname}?${nextSearch}`;
};

