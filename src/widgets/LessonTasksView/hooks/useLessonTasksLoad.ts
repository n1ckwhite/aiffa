import React from 'react';
import type { Lesson, Module } from 'shared/lessons/manifest';
import { loadLesson, loadManifest } from 'shared/lessons/api';

export const useLessonTasksLoad = (moduleId?: string, lessonId?: string) => {
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const [mod, setMod] = React.useState<Module | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [lsn, mf] = await Promise.all([loadLesson(moduleId, lessonId), loadManifest()]);
        if (cancelled) return;
        setLesson(lsn);
        const fallback = (mf.modules || [])[0] as Module | undefined;
        const picked = (mf.modules || []).find((m: any) => m.id === moduleId) as Module | undefined;
        setMod(picked || fallback || null);
      } catch {
        if (cancelled) return;
        setLesson(null);
        setMod(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [moduleId, lessonId]);

  return { lesson, mod, loading };
};


