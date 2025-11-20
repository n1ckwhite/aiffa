import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loadManifest } from 'shared/lessons/api';
import type { Module } from 'shared/lessons/manifest';

export const useManifestNav = (moduleId?: string, lessonId?: string) => {
  const navigate = useNavigate();
  const [mod, setMod] = React.useState<Module | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mf = await loadManifest();
        if (cancelled) return;
        const picked = mf.modules.find((m: any) => m.id === moduleId) as Module | undefined;
        setMod(picked || mf.modules[0] || null);
      } catch {
        setMod(null);
      }
    })();
    return () => { cancelled = true; };
  }, [moduleId]);
  const currentIndex = React.useMemo(() => {
    if (!mod) return 0;
    return Math.max(0, mod.lessons.findIndex((l) => l.id === lessonId));
  }, [mod, lessonId]);
  const prev = mod && currentIndex > 0 ? mod.lessons[currentIndex - 1] : undefined;
  const next = mod && currentIndex < (mod.lessons.length - 1) ? mod.lessons[currentIndex + 1] : undefined;
  const progress = mod && mod.lessons.length > 1 ? ((currentIndex + 1) / mod.lessons.length) * 100 : 0;

  const goPrev = () => { if (!prev || !mod?.id) return; if (prev.id === lessonId) return; navigate(`/learn/${mod.id}/${prev.id}`); };
  const goNext = () => { if (!next || !mod?.id) return; if (next.id === lessonId) return; navigate(`/learn/${mod.id}/${next.id}`); };
  const goTo = (id: string) => { if (!mod?.id) return; if (id === lessonId) return; navigate(`/learn/${mod.id}/${id}`); };

  return { mod, currentIndex, prev, next, progress, goPrev, goNext, goTo };
};


