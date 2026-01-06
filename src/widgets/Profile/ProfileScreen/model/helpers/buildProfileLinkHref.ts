import type { ProfileLink } from "entities/user";

export const buildProfileLinkHref = (link: ProfileLink): string => {
  const kind = String((link as any)?.kind ?? "custom");
  const rawValue = String((link as any)?.value ?? "").trim();
  if (!rawValue) return "#";

  if (kind === "email") {
    const v = rawValue.replace(/^mailto:/i, "");
    return `mailto:${v}`;
  }
  if (/^https?:\/\//i.test(rawValue)) return rawValue;
  return `https://${rawValue}`;
};


