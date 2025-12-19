import React from 'react';
import type { Module } from 'shared/lessons/manifest';
import { loadManifest } from 'shared/lessons/api';

export const useModuleProjectsLoad = (moduleId?: string, enabled: boolean = true) => {
  const [mod, setMod] = React.useState<Module | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
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
    return () => { cancelled = true; };
  }, [moduleId, enabled]);

  return { mod, loading };
};


