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

  return "stats";
};

