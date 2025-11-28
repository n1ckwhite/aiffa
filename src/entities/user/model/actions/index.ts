import type { UserProfile, WeeklyTask } from '../types';
import { DEFAULT_PROFILE } from '../constants';

export const updateProfileState = (prev: UserProfile, updates: Partial<UserProfile>): UserProfile => {
  return { ...prev, ...updates };
};

export const resetProfileState = (): UserProfile => {
  return DEFAULT_PROFILE;
};

export const markTaskSolvedState = (
  prev: UserProfile,
  moduleId: string,
  lessonId: string,
  taskId: string,
  solved: boolean
): UserProfile => {
  const key = `${moduleId}/${lessonId}/${taskId}`;
  const nextSolved = { ...(prev.solvedTaskIds || {}) } as Record<string, true>;
  if (solved) {
    nextSolved[key] = true;
  } else {
    delete nextSolved[key];
  }
  return { ...prev, solvedTaskIds: nextSolved } as UserProfile;
};

export const setWeeklyTaskState = (
  prev: UserProfile,
  id: string,
  updates: Partial<WeeklyTask>
): UserProfile => {
  const current = Array.isArray(prev.weeklyTasks) ? prev.weeklyTasks : [];
  const idx = current.findIndex((t) => t.id === id);
  const prevDone = idx >= 0 ? !!current[idx].done : false;
  const nextDone = typeof updates.done === 'boolean' ? updates.done : prevDone;

  let nextTasks: WeeklyTask[];
  if (idx >= 0) {
    nextTasks = current.map((t, i) => (i === idx ? { id: t.id, done: nextDone } : t));
  } else {
    nextTasks = [...current, { id, done: nextDone }];
  }

  const safeTotal =
    typeof prev.weeklySolvedTotal === 'number' && isFinite(prev.weeklySolvedTotal) && prev.weeklySolvedTotal >= 0
      ? prev.weeklySolvedTotal
      : 0;
  let weeklySolvedTotal = safeTotal;

  if (!prevDone && nextDone) {
    weeklySolvedTotal += 1;
  } else if (prevDone && !nextDone && weeklySolvedTotal > 0) {
    weeklySolvedTotal -= 1;
  }

  return { ...prev, weeklyTasks: nextTasks, weeklySolvedTotal } as UserProfile;
};

export const resetWeeklyTasksState = (prev: UserProfile): UserProfile => {
  return { ...prev, weeklyTasks: [] };
};


