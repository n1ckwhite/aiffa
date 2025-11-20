import React from 'react';
import type { Module } from 'shared/lessons/manifest';
import { loadManifest } from 'shared/lessons/api';

export type ProjectInfo = {
  id: string;
  title: string;
  mdPath: string;
  repoUrl?: string;
  authors?: Array<{ username: string; name: string }>;
} | undefined;

export const useModuleProjectLoad = (moduleId?: string, projectId?: string) => {
  const [mod, setMod] = React.useState<Module | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const mf = await loadManifest();
        if (cancelled) return;
        const picked = mf.modules.find((m: any) => m.id === moduleId) as Module | undefined;
        setMod(picked || mf.modules[0] || null);
      } catch {
        if (!cancelled) setMod(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  const project = React.useMemo<ProjectInfo>(() => {
    if (!mod) return undefined;

    const many = (mod as any).projects as ProjectInfo[] | undefined;
    const one = (mod as any).project as ProjectInfo | undefined;

    if (Array.isArray(many) && many.length > 0) {
      if (projectId) {
        return many.find((p) => p && p.id === projectId) || many[0];
      }
      return many[0];
    }

    return one;
  }, [mod, projectId]);

  return { mod, project, loading };
};

