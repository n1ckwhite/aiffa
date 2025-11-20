import React from 'react';

export const useStudyProgress = (profile: unknown) => {
  const [totalLessons, setTotalLessons] = React.useState<number>(0);
  const [isManifestLoaded, setManifestLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    let mounted = true;
    import('shared/lessons/manifest').then((mod) => {
      if (!mounted) return;
      try {
        const modules = (mod.manifest?.modules || []) as any[];
        const count = modules.reduce((sum: number, m: any) => sum + ((m?.lessons || []).length), 0);
        setTotalLessons(count);
      } catch {
        setTotalLessons(0);
      } finally {
        setManifestLoaded(true);
      }
    }).catch(() => setManifestLoaded(true));
    return () => { mounted = false; };
  }, []);

  const completedLessons = React.useMemo(() => {
    const ids = Object.keys((profile as any)?.solvedTaskIds || {});
    const set = new Set<string>();
    for (const key of ids) {
      const parts = key.split('/');
      const mod = parts[0];
      const lesson = parts[1];
      if (mod && lesson) set.add(`${mod}/${lesson}`);
    }
    return set.size;
  }, [profile]);
  const studyProgressPct = totalLessons > 0 ? Math.max(0, Math.min(100, (completedLessons / totalLessons) * 100)) : 0;
  return { isManifestLoaded, studyProgressPct };
};


