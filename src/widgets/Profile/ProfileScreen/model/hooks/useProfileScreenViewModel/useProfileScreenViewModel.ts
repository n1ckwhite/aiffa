import React from "react";
import { PLACEHOLDER_AVATAR_URL } from "../../constants";
import { ProfileBadgeModel, UseProfileScreenViewModelArgs, UseProfileScreenViewModelResult } from "./types";
import {
  buildBadge,
  buildUsernameFallback,
  pickAchievedItems,
  pickEmail,
  safeNonNegativeInt,
  safeProfileLinks,
  safeTrim,
} from "./helpers";

export const useProfileScreenViewModel = ({
  profile,
  achievementItems,
}: UseProfileScreenViewModelArgs): UseProfileScreenViewModelResult => {
  return React.useMemo(() => {
    const name = safeTrim(profile?.name);
    const bio = safeTrim(profile?.bio);

    const rawGithubUsername = safeTrim((profile as any)?.githubUsername);
    const username = (rawGithubUsername || buildUsernameFallback(name)).toLowerCase();

    const avatarUrl = safeTrim(profile?.avatarUrl) || PLACEHOLDER_AVATAR_URL;
    const xp = safeNonNegativeInt(profile?.xp);
    const followersCount = safeNonNegativeInt(profile?.followersCount);
    const followingCount = safeNonNegativeInt(profile?.followingCount);

    const profileLinks = safeProfileLinks(profile?.links);
    const displayLinks = profileLinks;

    const workplace = safeTrim(profile?.workplace);
    const locationLabel = safeTrim(profile?.location);

    const emailValue = pickEmail(profileLinks);
    const profileBadge = buildBadge(displayLinks.length);
    const achievedItems = pickAchievedItems(achievementItems);

    return {
      name,
      username,
      bio,
      avatarUrl,
      xp,
      followersCount,
      followingCount,
      profileLinks,
      displayLinks,
      profileBadge,
      emailValue,
      workplace,
      locationLabel,
      achievedItems,
    };
  }, [achievementItems, profile]);
};

