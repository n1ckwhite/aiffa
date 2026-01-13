import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";
import type { ReadonlyURLSearchParams } from "next/navigation";

type QueryEntry = readonly [key: string, value: string | null];

/**
 * Keys that represent "modes" or "context" inside the profile page.
 * When navigating to followers/following we intentionally drop these keys
 * so URL never becomes something like `?weekly&followers` or `?stats=all&followers`.
 */
const MODE_QUERY_KEYS_TO_CLEAR = new Set([
  "followers",
  "following",
  "achievements",
  "actions",
  "materials",
  "weekly",
  "projects",
  "articles",
  "hackathons",
  "sessions",
  "contrib-materials",
  "contrib-projects",
  "contrib-weekly",
  "contrib-articles",
]);

/**
 * Keys that should not "stick" when switching to followers/following.
 */
const CONTEXT_QUERY_KEYS_TO_CLEAR = new Set(["page", "stats", "contribution"]);

const normalizeKey = (key: string): string => key.trim().toLowerCase();

const isBareParamValue = (value: string): boolean => value === "";

const readQueryEntries = (sp: ReadonlyURLSearchParams): QueryEntry[] => {
  const entries: QueryEntry[] = [];
  for (const [key, value] of sp.entries()) {
    // Keep "bare" params like `?followers` (which become `followers=` in URLSearchParams) without the '='.
    const normalizedValue = isBareParamValue(value) ? null : value;
    entries.push([key, normalizedValue]);
  }
  return entries;
};

const serializeQueryEntries = (entries: readonly QueryEntry[]): string => {
  return entries
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      if (value === null) return encodedKey;
      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join("&");
};

const shouldClearKey = (key: string): boolean => {
  const normalized = normalizeKey(key);
  if (MODE_QUERY_KEYS_TO_CLEAR.has(normalized)) return true;
  if (CONTEXT_QUERY_KEYS_TO_CLEAR.has(normalized)) return true;
  return false;
};

const withoutClearedKeys = (searchParams: ReadonlyURLSearchParams): QueryEntry[] => {
  return readQueryEntries(searchParams).filter(([key]) => !shouldClearKey(key));
};

export const buildPeopleHref = (args: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  next: ProfilePeopleMode;
}): string => {
  const { pathname, searchParams, next } = args;

  const nextEntries: QueryEntry[] = [...withoutClearedKeys(searchParams)];

  if (next === "followers") nextEntries.push(["followers", null]);
  if (next === "following") nextEntries.push(["following", null]);

  const nextSearch = serializeQueryEntries(nextEntries);
  return nextSearch ? `${pathname}?${nextSearch}` : pathname;
};

