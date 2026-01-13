import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { formatCount } from "shared/functions/formatCount";
import { buildPeopleHref } from "../helpers/query";
import { UseProfileHeaderPeopleLinksArgs, UseProfileHeaderPeopleLinksResult } from "./types";
import { ProfileHeaderPeopleLinkProps } from "./types";

export const useProfileHeaderPeopleLinks = (
  args: UseProfileHeaderPeopleLinksArgs,
): UseProfileHeaderPeopleLinksResult => {
  const { followersCount, followingCount } = args;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const followersHref = buildPeopleHref({
    pathname,
    searchParams,
    next: "followers",
  });
  const followingHref = buildPeopleHref({
    pathname,
    searchParams,
    next: "following",
  });

  const followersLinkProps: ProfileHeaderPeopleLinkProps = React.useMemo(() => {
    return {
      to: followersHref,
      label: `${formatCount(followersCount)} подписчики`,
    };
  }, [followersCount, followersHref]);

  const followingLinkProps: ProfileHeaderPeopleLinkProps = React.useMemo(() => {
    return {
      to: followingHref,
      label: `${formatCount(followingCount)} подписан`,
    };
  }, [followingCount, followingHref]);

  return { followersLinkProps, followingLinkProps };
};

