import type { CourseManifest, Lesson, Module } from './manifest';
import { createAsyncCache } from 'utils/cache';

const manifestCache = createAsyncCache<string, CourseManifest>();

export const loadManifest = async (): Promise<CourseManifest> => {
  return manifestCache.get('manifest', async () => {
    const mod = await import('./manifest');
    return mod.manifest as CourseManifest;
  });
};

export const loadModules = async (): Promise<Module[]> => {
  const m = await loadManifest();
  return (m.modules || []) as Module[];
};

export const loadLesson = async (moduleId?: string, lessonId?: string): Promise<Lesson> => {
  const mod = await import('./manifest');
  return mod.findLesson(moduleId, lessonId) as Lesson;
};


