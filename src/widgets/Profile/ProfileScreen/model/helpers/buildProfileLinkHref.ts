import type { ProfileLink } from "entities/user";
import { normalizeCustomLinkValue } from "./normalizeCustomLinkValue";

export const buildProfileLinkHref = (link: ProfileLink): string => {
  const kind = String((link as any)?.kind ?? "custom");
  const rawValue = String((link as any)?.value ?? "").trim();
  if (!rawValue) return "#";

  if (kind === "email") {
    const v = rawValue.replace(/^mailto:/i, "");
    return `mailto:${v}`;
  }

  return normalizeCustomLinkValue(rawValue);
};


