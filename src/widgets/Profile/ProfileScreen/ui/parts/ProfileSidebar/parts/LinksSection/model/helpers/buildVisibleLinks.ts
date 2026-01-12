import type { ProfileLink } from "entities/user";
import { buildProfileLinkHref, linkErrorMessageByCode, validateCustomLinkValue } from "../../../../../../../model/helpers";
import { PROFILE_LINKS_VIEW_MAX } from "../../data/constants";

export type VisibleLink = {
  id: string;
  href: string;
  value: string;
};

export type BuildVisibleLinksResult = {
  visibleLinks: VisibleLink[];
  viewErrorCodes: Array<keyof typeof linkErrorMessageByCode>;
};

export const buildVisibleLinks = (links: ProfileLink[]): BuildVisibleLinksResult => {
  const visibleLinks: VisibleLink[] = [];
  const viewErrorCodes: Array<keyof typeof linkErrorMessageByCode> = [];

  for (const l of links) {
    if (visibleLinks.length >= PROFILE_LINKS_VIEW_MAX) break;

    const raw = String((l as any)?.value ?? "").trim();
    const { normalized, error } = validateCustomLinkValue(raw);
    const value = normalized || raw;
    if (!value) continue;

    let id = "";
    if (typeof (l as any)?.id === "string") id = String((l as any).id);
    if (!id) id = value;

    if (error) {
      viewErrorCodes.push(error);
      visibleLinks.push({ id, href: "#", value });
      continue;
    }

    visibleLinks.push({ id, href: buildProfileLinkHref({ ...l, value: normalized }), value });
  }

  return { visibleLinks, viewErrorCodes };
};

