import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { ProfilePeopleMode } from "../../../../../../../model/types";
import { formatCount } from "shared/functions/formatCount";
import { buildPeopleHref } from "../helpers/query";
import { UseProfileHeaderPeopleLinksArgs, UseProfileHeaderPeopleLinksResult } from "./types";
import { ProfileHeaderPeopleLinkProps } from "./types";

export const useProfileHeaderPeopleLinks = (
  args: UseProfileHeaderPeopleLinksArgs,
): UseProfileHeaderPeopleLinksResult => {
  const { activeMode, mutedColor, activeColor, followersCount, followingCount } = args;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFollowersOpen = activeMode === "followers";
  const isFollowingOpen = activeMode === "following";

  const followersNextByOpen: Record<number, ProfilePeopleMode> = {
    0: "followers",
    1: "stats",
  };
  const followingNextByOpen: Record<number, ProfilePeopleMode> = {
    0: "following",
    1: "stats",
  };

  const followersHref = buildPeopleHref({
    pathname,
    searchParams,
    next: followersNextByOpen[Number(isFollowersOpen)],
  });
  const followingHref = buildPeopleHref({
    pathname,
    searchParams,
    next: followingNextByOpen[Number(isFollowingOpen)],
  });

  const followersLinkProps: ProfileHeaderPeopleLinkProps = React.useMemo(() => {
    return {
      to: followersHref,
      label: `${formatCount(followersCount)} подписчики`,
      color: isFollowersOpen ? activeColor : mutedColor,
      textDecoration: isFollowersOpen ? "underline" : "none",
    };
  }, [activeColor, followersCount, followersHref, isFollowersOpen, mutedColor]);

  const followingLinkProps: ProfileHeaderPeopleLinkProps = React.useMemo(() => {
    return {
      to: followingHref,
      label: `${formatCount(followingCount)} подписан`,
      color: isFollowingOpen ? activeColor : mutedColor,
      textDecoration: isFollowingOpen ? "underline" : "none",
    };
  }, [activeColor, followingCount, followingHref, isFollowingOpen, mutedColor]);

  return { followersLinkProps, followingLinkProps };
};

