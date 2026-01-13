import { AchievementItem } from "@/widgets/AchievementsGrid";
import { ProfilePeopleMode } from "@/widgets/Profile/ProfileScreen/model/types";

export type ProfileRightColumnProps = {
    mode: ProfilePeopleMode;
    achievementItems: readonly AchievementItem[];
  };