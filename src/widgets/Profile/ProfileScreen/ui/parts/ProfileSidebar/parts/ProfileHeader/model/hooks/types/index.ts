import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";

export type ProfileHeaderPeopleLinkProps = {
  to: string;
  label: string;
};
  
  export type UseProfileHeaderPeopleLinksArgs = {
    activeMode: ProfilePeopleMode;
    followersCount: number;
    followingCount: number;
  };
  
  export type UseProfileHeaderPeopleLinksResult = {
    followersLinkProps: ProfileHeaderPeopleLinkProps;
    followingLinkProps: ProfileHeaderPeopleLinkProps;
  };