import type { UserProfile, WeeklyTask } from '../types';
import { DEFAULT_PROFILE, STORAGE_KEY } from '../constants';

const safeParse = (raw: string | null): unknown => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const sanitizeProfile = (data: unknown): UserProfile => {
  const parsed = data as any;
  if (!parsed || typeof parsed !== 'object') return DEFAULT_PROFILE;
  return {
    name: typeof parsed.name === 'string' ? parsed.name : '',
    bio: typeof parsed.bio === 'string' ? parsed.bio : '',
    avatarUrl: typeof parsed.avatarUrl === 'string' ? parsed.avatarUrl : '',
    githubUrl: typeof parsed.githubUrl === 'string' ? parsed.githubUrl : '',
    githubUsername: typeof parsed.githubUsername === 'string' ? parsed.githubUsername : '',
    solvedTaskIds: typeof parsed.solvedTaskIds === 'object' && parsed.solvedTaskIds ? parsed.solvedTaskIds : {},
    xp: typeof parsed.xp === 'number' && isFinite(parsed.xp) && parsed.xp >= 0 ? parsed.xp : 0,
    rating: typeof parsed.rating === 'number' && isFinite(parsed.rating) && parsed.rating >= 0 ? parsed.rating : 0,
    weeklyTasks: Array.isArray(parsed.weeklyTasks)
      ? (parsed.weeklyTasks
          .map((t: any) => ({
            id: typeof t?.id === 'string' ? t.id : '',
            done: typeof t?.done === 'boolean' ? t.done : false,
          }))
          .filter((t: WeeklyTask) => t.id))
      : [],
  } as UserProfile;
};

export const loadProfileFromStorage = (): UserProfile => {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const data = safeParse(raw);
    return sanitizeProfile(data);
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveProfileToStorage = (profile: UserProfile): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
};

export const clearProfileStorage = (): void => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};


