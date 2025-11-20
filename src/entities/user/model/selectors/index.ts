import type { UserProfile } from '../types';

export const selectSolvedTaskIds = (profile: UserProfile): Record<string, true> => {
  return profile.solvedTaskIds || {};
};

export const selectWeeklyTasks = (profile: UserProfile) => {
  return Array.isArray(profile.weeklyTasks) ? profile.weeklyTasks : [];
};

export const selectUserName = (profile: UserProfile): string => profile.name;

export const selectGithub = (profile: UserProfile) => ({
  url: profile.githubUrl || '',
  username: profile.githubUsername || '',
});


