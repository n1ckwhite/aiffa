import { Creator } from "@/widgets/Creators/model/types";

export const getFeaturedProjectCreators = (items: Creator[] = []) => {
  const projectCreators = items.filter((creator) => creator.areas?.includes("projects"));
  if (projectCreators.length === 0) return [];
  return [...projectCreators].sort((a, b) => b.contributions.projects - a.contributions.projects).slice(0, 3);
};


