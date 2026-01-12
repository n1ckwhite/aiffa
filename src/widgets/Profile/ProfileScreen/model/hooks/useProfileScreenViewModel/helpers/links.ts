import type { ProfileLink } from "entities/user";
import { DEFAULT_PROFILE_EMAIL } from "../../../constants";
import { safeTrim } from "./safe";

const PROFILE_LINK_KINDS = new Set<ProfileLink["kind"]>(["email", "telegram", "github", "website", "custom"]);

export const safeProfileLinks = (raw: unknown): ProfileLink[] => {
  if (!Array.isArray(raw)) return [];

  const result: ProfileLink[] = [];

  for (const item of raw) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const record = item as any;

    const id = safeTrim(record?.id);
    const value = safeTrim(record?.value);
    if (!id || !value) continue;

    const rawKind = safeTrim(record?.kind) || "custom";
    const kind = PROFILE_LINK_KINDS.has(rawKind) ? (rawKind as ProfileLink["kind"]) : "custom";
    const label = safeTrim(record?.label);

    result.push({
      id,
      kind,
      value,
      ...(label ? { label } : {}),
    });
  }

  return result;
};

export const pickEmail = (links: ProfileLink[]): string => {
  for (const l of links) {
    if (l.kind !== "email") continue;
    const raw = safeTrim(l.value);
    if (!raw) continue;
    return raw.replace(/^mailto:/i, "");
  }
  return DEFAULT_PROFILE_EMAIL;
};

