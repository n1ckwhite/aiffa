import type { ProfileLink } from "entities/user";

export const buildNonEmailLinks = (links: ProfileLink[]): ProfileLink[] => {
  return links.filter((l) => String((l as any)?.kind ?? "") !== "email");
};

