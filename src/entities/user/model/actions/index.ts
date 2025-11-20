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
  let next: WeeklyTask[];
  if (idx >= 0) {
    next = current.map((t, i) => (i === idx ? { id: t.id, done: updates.done ?? t.done } : t));
  } else {
    next = [...current, { id, done: !!updates.done }];
  }
  return { ...prev, weeklyTasks: next } as UserProfile;
};

export const resetWeeklyTasksState = (prev: UserProfile): UserProfile => {
  return { ...prev, weeklyTasks: [] };
};


