import type { UserProfile, WeeklyTask, ProfileLink } from '../types';
import { DEFAULT_PROFILE, STORAGE_KEY } from '../constants';

const safeParse = (raw: string | null): unknown => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const sanitizeProfileFromUnknown = (data: unknown): UserProfile => {
  const parsed = data as any;
  if (!parsed || typeof parsed !== 'object') return DEFAULT_PROFILE;

  const rawLinks = Array.isArray(parsed.links) ? parsed.links : [];
  const links: ProfileLink[] = rawLinks
    .map((l: any) => ({
      id: typeof l?.id === "string" ? l.id : "",
      kind:
        l?.kind === "email" || l?.kind === "telegram" || l?.kind === "github" || l?.kind === "website" || l?.kind === "custom"
          ? l.kind
          : "custom",
      label: typeof l?.label === "string" ? l.label : "",
      value: typeof l?.value === "string" ? l.value : "",
    }))
    .filter((l: ProfileLink) => !!l.id && !!l.value);

  const safeFollowers =
    typeof parsed.followersCount === "number" && isFinite(parsed.followersCount) && parsed.followersCount >= 0
      ? Math.trunc(parsed.followersCount)
      : 0;
  const safeFollowing =
    typeof parsed.followingCount === "number" && isFinite(parsed.followingCount) && parsed.followingCount >= 0
      ? Math.trunc(parsed.followingCount)
      : 0;

  return {
    name: typeof parsed.name === 'string' ? parsed.name : '',
    bio: typeof parsed.bio === 'string' ? parsed.bio : '',
    avatarUrl: typeof parsed.avatarUrl === 'string' ? parsed.avatarUrl : '',
    githubUrl: typeof parsed.githubUrl === 'string' ? parsed.githubUrl : '',
    githubUsername: typeof parsed.githubUsername === 'string' ? parsed.githubUsername : '',
    direction: typeof parsed.direction === "string" ? parsed.direction : "",
    links,
    followersCount: safeFollowers,
    followingCount: safeFollowing,
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
    weeklySolvedTotal:
      typeof parsed.weeklySolvedTotal === 'number' && isFinite(parsed.weeklySolvedTotal) && parsed.weeklySolvedTotal >= 0
        ? parsed.weeklySolvedTotal
        : 0,
  } as UserProfile;
};

export const loadProfileFromStorage = (): UserProfile => {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const data = safeParse(raw);
    return sanitizeProfileFromUnknown(data);
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


