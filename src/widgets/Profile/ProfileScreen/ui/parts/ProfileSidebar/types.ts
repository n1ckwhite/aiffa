import type { KeyboardEvent } from "react";
import type { ProfileLink } from "entities/user";
import { AchievementItem } from "@/widgets/AchievementsGrid";

export type ProfileBadgeModel = {
  label: string;
  colorScheme: string;
};

export type ProfileLeftIconColors = {
  people: string;
  xp: string;
  work: string;
  location: string;
  mail: string;
  link: string;
};

export type ProfileSidebarProps = {
  avatarUrl: string;

  name: string;
  bio: string;
  xp: number;
  profileBadge: ProfileBadgeModel;

  workplace: string;
  locationLabel: string;
  emailValue: string;
  displayLinks: ProfileLink[];

  isEditing: boolean;
  editSessionId: number;
  hasTriedSave: boolean;
  editInitial: {
    name: string;
    bio: string;
    workplace: string;
    location: string;
    links: [string, string, string, string];
  } | null;
  saveAction: (formData: FormData) => void;
  isSaving: boolean;
  handleStartEdit: () => void;
  handleCancelEdit: () => void;
  handleStopHotkeys: (e: KeyboardEvent) => void;

  achievedItems: AchievementItem[];
};


