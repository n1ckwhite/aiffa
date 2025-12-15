import { Creator } from "@/widgets/Creators/model/types";

export const getFeaturedWeeklyCreators = (items: Creator[] = []) => {
  const weeklyCreators = items.filter((creator) => creator.areas?.includes("weekly"));
  if (weeklyCreators.length === 0) return [];
  return [...weeklyCreators].sort((a, b) => b.contributions.weeklyTasks - a.contributions.weeklyTasks).slice(0, 3);
};


