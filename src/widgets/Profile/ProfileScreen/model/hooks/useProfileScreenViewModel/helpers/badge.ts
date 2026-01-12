import type { ProfileBadgeModel } from "../types";

export const buildBadge = (linksCount: number): ProfileBadgeModel => {
  if (linksCount > 0) return { label: "Контрибьютор", colorScheme: "purple" };
  return { label: "Автор AIFFA", colorScheme: "blue" };
};

