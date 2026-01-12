import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";

export type ProfileHeaderPeopleLinkProps = {
    to: string;
    label: string;
    color: string;
    textDecoration: "none" | "underline";
  };
  
  export type UseProfileHeaderPeopleLinksArgs = {
    activeMode: ProfilePeopleMode;
    mutedColor: string;
    activeColor: string;
    followersCount: number;
    followingCount: number;
  };
  
  export type UseProfileHeaderPeopleLinksResult = {
    followersLinkProps: ProfileHeaderPeopleLinkProps;
    followingLinkProps: ProfileHeaderPeopleLinkProps;
  };