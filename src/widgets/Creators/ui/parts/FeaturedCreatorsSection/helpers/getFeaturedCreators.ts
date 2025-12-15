import type { Creator } from "../../../model/types";

export const getFeaturedCreators = (items: Creator[] = []) => {
  const materialsCreators = items.filter((creator) => creator.areas?.includes("materials"));
  if (materialsCreators.length === 0) return [];
  return [...materialsCreators].sort((a, b) => b.contributions.lessons - a.contributions.lessons);
};


