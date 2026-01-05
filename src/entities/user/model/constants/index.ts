import type { UserProfile } from '../types';

export const STORAGE_KEY = 'aiffa:userProfile';
export const PROFILE_COOKIE_KEY = 'aiffa_profile';

export const DEFAULT_PROFILE: UserProfile = {
  name: '',
  bio: '',
  avatarUrl: '',
  githubUrl: 'https://github.com/n1cikwhite',
  githubUsername: '',
  direction: '',
  workplace: '',
  location: '',
  links: [],
  followersCount: 0,
  followingCount: 0,
  solvedTaskIds: {},
  xp: 0,
  rating: 0,
  weeklyTasks: [],
  weeklySolvedTotal: 0,
};


