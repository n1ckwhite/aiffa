export type WeeklyTask = {
  id: string;
  done: boolean;
};

export type ProfileLinkKind = "email" | "telegram" | "github" | "website" | "custom";

export type ProfileLink = {
  id: string;
  kind: ProfileLinkKind;
  /**
   * Optional label shown in UI (e.g. "Портфолио", "Работа", "Канал").
   * If empty, UI will use a sensible default per kind.
   */
  label?: string;
  /**
   * Raw user value (e.g. "user@example.com", "@nick", "https://site.com").
   * We keep it for editing convenience.
   */
  value: string;
};

export type UserProfile = {
  name: string;
  bio: string;
  avatarUrl?: string;
  githubUrl?: string;
  githubUsername?: string;
  direction?: string;
  links?: ProfileLink[];
  followersCount?: number;
  followingCount?: number;
  solvedTaskIds?: Record<string, true>;
  xp?: number;
  rating?: number;
  weeklyTasks?: WeeklyTask[];
  weeklySolvedTotal?: number;
};

export type UserProfileContextValue = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
  markTaskSolved: (moduleId: string, lessonId: string, taskId: string, solved: boolean) => void;
  setWeeklyTask: (id: string, updates: Partial<WeeklyTask>) => void;
  resetWeeklyTasks: () => void;
};


