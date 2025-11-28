export type WeeklyTask = {
  id: string;
  done: boolean;
};

export type UserProfile = {
  name: string;
  bio: string;
  avatarUrl?: string;
  githubUrl?: string;
  githubUsername?: string;
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


