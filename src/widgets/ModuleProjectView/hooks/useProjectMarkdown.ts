import React from 'react';
import { createAsyncCache } from 'utils/cache';

const projectMdCache = createAsyncCache<string, string>();

export const useProjectMarkdown = (mdPath?: string) => {
  const [md, setMd] = React.useState<string>('');
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!mdPath) return;
      try {
        const text = await projectMdCache.get(mdPath, async () => {
          const res = await fetch(mdPath as string);
          const txt = await res.text();
          return txt;
        });
        if (!cancelled) setMd(text);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [mdPath]);
  return md;
};


