import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ProfilePeopleMode } from "../../../types";
import type { QueryEntry } from "../types";
import { serializeQuery } from "./serializeQuery";

const PEOPLE_QUERY_KEYS = new Set(["followers", "following"]);

export const buildPeopleUrl = (args: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  nextMode: ProfilePeopleMode;
}): string => {
  const { pathname, searchParams, nextMode } = args;

  const currentEntries: QueryEntry[] = [];
  for (const [key, value] of searchParams.entries()) {
    const normalizedKey = key.toLowerCase();
    if (PEOPLE_QUERY_KEYS.has(normalizedKey)) continue;
    currentEntries.push([key, value]);
  }

  const nextEntries: QueryEntry[] = [...currentEntries];

  if (nextMode === "followers") nextEntries.push(["followers", null]);
  if (nextMode === "following") nextEntries.push(["following", null]);

  const nextSearch = serializeQuery(nextEntries);
  return nextSearch ? `${pathname}?${nextSearch}` : pathname;
};

