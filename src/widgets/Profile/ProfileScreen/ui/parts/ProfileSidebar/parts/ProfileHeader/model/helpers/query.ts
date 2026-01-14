import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";
import type { ReadonlyURLSearchParams } from "next/navigation";

type QueryEntry = readonly [string, string | null];

const CLEAR_KEYS = new Set([
  "followers", "following", "achievements", "actions", "materials", "weekly",
  "projects", "hackathons", "sessions", "contrib-materials", "contrib-projects",
  "contrib-weekly", "contrib-articles", "page", "stats", "contribution"
]);

const readEntries = (sp: ReadonlyURLSearchParams): QueryEntry[] =>
  Array.from(sp.entries()).map(([k, v]) => [k, v === "" ? null : v] as QueryEntry);

const serialize = (entries: QueryEntry[]): string =>
  entries.map(([k, v]) => v === null ? encodeURIComponent(k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");

export const buildPeopleHref = ({
  pathname,
  searchParams,
  next
}: {
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  next: ProfilePeopleMode;
}): string => {
  const entries = readEntries(searchParams).filter(([k]) => !CLEAR_KEYS.has(k.trim().toLowerCase()));
  entries.push([next, null]);
  const query = serialize(entries);
  return query ? `${pathname}?${query}` : pathname;
};
