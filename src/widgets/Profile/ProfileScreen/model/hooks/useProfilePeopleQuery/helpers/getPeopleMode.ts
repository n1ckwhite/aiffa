import type { ReadonlyURLSearchParams } from "next/navigation";
import type { ProfilePeopleMode } from "../../../types";
import { hasParamCaseInsensitive } from "./hasParamCaseInsensitive";

export const getPeopleMode = (searchParams: ReadonlyURLSearchParams): ProfilePeopleMode => {
  const isAchievements = hasParamCaseInsensitive(searchParams, "achievements");
  if (isAchievements) return "achievements";

  const isFollowers = hasParamCaseInsensitive(searchParams, "followers");
  if (isFollowers) return "followers";

  const isFollowing = hasParamCaseInsensitive(searchParams, "following");
  if (isFollowing) return "following";

  const isMaterials = hasParamCaseInsensitive(searchParams, "materials");
  if (isMaterials) return "materials";

  const isWeekly = hasParamCaseInsensitive(searchParams, "weekly");
  if (isWeekly) return "weekly";

  const isProjects = hasParamCaseInsensitive(searchParams, "projects");
  if (isProjects) return "projects";

  const isHackathons = hasParamCaseInsensitive(searchParams, "hackathons");
  if (isHackathons) return "hackathons";

  const isSessions = hasParamCaseInsensitive(searchParams, "sessions");
  if (isSessions) return "sessions";

  const isContribMaterials = hasParamCaseInsensitive(searchParams, "contrib-materials");
  if (isContribMaterials) return "contrib-materials";

  const isContribProjects = hasParamCaseInsensitive(searchParams, "contrib-projects");
  if (isContribProjects) return "contrib-projects";

  const isContribWeekly = hasParamCaseInsensitive(searchParams, "contrib-weekly");
  if (isContribWeekly) return "contrib-weekly";

  const isContribArticles = hasParamCaseInsensitive(searchParams, "contrib-articles");
  if (isContribArticles) return "contrib-articles";

  return "stats";
};

