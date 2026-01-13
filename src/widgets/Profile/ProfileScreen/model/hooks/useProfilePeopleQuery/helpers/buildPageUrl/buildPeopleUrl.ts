import type { QueryEntry } from "../../types";
import { serializeQuery } from "../serializeQuery";
import { BuildPageUrlArgs } from "./types";

const PEOPLE_QUERY_KEYS = new Set([
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

  export const buildPeopleUrl = (args: BuildPageUrlArgs): string => {
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
  if (nextMode === "achievements") nextEntries.push(["achievements", null]);
  if (nextMode === "materials") nextEntries.push(["materials", null]);
  if (nextMode === "weekly") nextEntries.push(["weekly", null]);
  if (nextMode === "projects") nextEntries.push(["projects", null]);
  if (nextMode === "articles") nextEntries.push(["articles", null]);
  if (nextMode === "hackathons") nextEntries.push(["hackathons", null]);
  if (nextMode === "sessions") nextEntries.push(["sessions", null]);
  if (nextMode === "contrib-materials") nextEntries.push(["contrib-materials", null]);
  if (nextMode === "contrib-projects") nextEntries.push(["contrib-projects", null]);
  if (nextMode === "contrib-weekly") nextEntries.push(["contrib-weekly", null]);
  if (nextMode === "contrib-articles") nextEntries.push(["contrib-articles", null]);

  const nextSearch = serializeQuery(nextEntries);
  return nextSearch ? `${pathname}?${nextSearch}` : pathname;
};

