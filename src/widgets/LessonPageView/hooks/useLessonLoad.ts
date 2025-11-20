import { useEffect, useMemo, useState } from 'react';
import type { Lesson, Module } from 'shared/lessons/manifest';
import { loadLesson, loadManifest } from 'shared/lessons/api';

export const useLessonLoad = (moduleId?: string, lessonId?: string) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [mod, setMod] = useState<Module | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [lsn, mf] = await Promise.all([loadLesson(moduleId, lessonId), loadManifest()]);
        if (cancelled) return;
        setLesson(lsn);
        const first = (mf.modules || [])[0] as Module | undefined;
        const picked = (mf.modules || []).find((m: any) => m.id === moduleId) as Module | undefined;
        setMod(picked || first || null);
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

  return useMemo(() => ({ lesson, mod, loading }), [lesson, mod, loading]);
};


