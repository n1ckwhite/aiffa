import { createAsyncCache } from 'utils/cache';
import { WeeklyTaskInfo } from './manifest/types';

const weeklyCache = createAsyncCache<string, WeeklyTaskInfo[]>();

export const loadWeeklyManifest = async (): Promise<WeeklyTaskInfo[]> => {
  return weeklyCache.get('weekly', async () => {
    const mod = await import('./manifest');
    return (mod.weeklyManifest || []) as WeeklyTaskInfo[];
  });
};


