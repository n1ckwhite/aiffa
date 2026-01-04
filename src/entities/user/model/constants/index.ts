import type { UserProfile } from '../types';

export const STORAGE_KEY = 'aiffa:userProfile';
export const PROFILE_COOKIE_KEY = 'aiffa_profile';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Пользователь',
  bio: 'Описание',
  avatarUrl: '',
  githubUrl: '',
  githubUsername: '',
  direction: '',
  links: [],
  followersCount: 0,
  followingCount: 0,
  solvedTaskIds: {},
  xp: 0,
  rating: 0,
  weeklyTasks: [],
  weeklySolvedTotal: 0,
};


