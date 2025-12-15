import { Creator } from "@/widgets/Creators/model/types";

export const getFeaturedArticleCreators = (items: Creator[] = []) => {
  const articleCreators = items.filter((creator) => creator.areas?.includes("articles"));
  if (articleCreators.length === 0) return [];

  return [...articleCreators].sort((a, b) => b.contributions.reviews - a.contributions.reviews).slice(0, 3);
};


