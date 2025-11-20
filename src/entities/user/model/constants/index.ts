import type { UserProfile } from '../types';

export const STORAGE_KEY = 'universe:userProfile';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Пользователь',
  bio: 'Описание',
  avatarUrl: '',
  githubUrl: '',
  githubUsername: '',
  solvedTaskIds: {},
  xp: 0,
  rating: 0,
  weeklyTasks: [],
};


