import type { WeeklyTask } from '../types';

export const getWeeklyTask = (profile: unknown, taskId: string): WeeklyTask => {
  const list = Array.isArray((profile as any)?.weeklyTasks) ? (profile as any).weeklyTasks : [];
  const found = list.find((x: any) => x?.id === taskId);
  return found || { id: taskId, label: 'Задача', description: '', done: false };
};

