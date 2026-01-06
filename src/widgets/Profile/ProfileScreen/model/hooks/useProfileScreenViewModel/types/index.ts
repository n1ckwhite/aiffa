import { ProfileLink, UserProfile } from "@/entities/user";

export type ProfileBadgeModel = {
    label: string;
    colorScheme: string;
  };
  
  export type UseProfileScreenViewModelArgs = {
    profile: UserProfile;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    achievementItems: any;
  };
  
  export type UseProfileScreenViewModelResult = {
    name: string;
    bio: string;
    avatarUrl: string;
    xp: number;
    profileLinks: ProfileLink[];
    displayLinks: ProfileLink[];
    profileBadge: ProfileBadgeModel;
    emailValue: string;
    workplace: string;
    locationLabel: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    achievedItems: any[];
  };