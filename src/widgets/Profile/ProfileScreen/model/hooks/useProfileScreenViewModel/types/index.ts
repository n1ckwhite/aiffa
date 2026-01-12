import { ProfileLink, UserProfile } from "@/entities/user";
import { AchievementItem } from "@/widgets/AchievementsGrid";

export type ProfileBadgeModel = {
  label: string;
  colorScheme: string;
};

export type UseProfileScreenViewModelArgs = {
  profile: UserProfile;
  achievementItems: AchievementItem[];
};

export type UseProfileScreenViewModelResult = {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  xp: number;
  followersCount: number;
  followingCount: number;
  profileLinks: ProfileLink[];
  displayLinks: ProfileLink[];
  profileBadge: ProfileBadgeModel;
  emailValue: string;
  workplace: string;
  locationLabel: string;
  achievedItems: AchievementItem[];
};