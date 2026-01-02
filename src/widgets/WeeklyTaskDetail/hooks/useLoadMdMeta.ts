import React from 'react';
import { getWeeklyInfoById } from 'shared/weekly/manifest';
import { loadWeeklyManifest } from 'shared/weekly/api';
import { compileValidator, parseWeeklyTaskMd } from 'shared/weekly/md';
import type { MdMeta } from '../types/MdMeta';
import { createAsyncCache } from 'utils/cache';

const mdMetaCache = createAsyncCache<string, MdMeta>();

const buildMetaFromMd = (md: string, fallbackLabel: string, fallbackDesc: string): MdMeta => {
  const parsed = parseWeeklyTaskMd(md);
  return {
    title: parsed.title || fallbackLabel,
    description: parsed.description || fallbackDesc || '',
    tip: parsed.tip,
    authorName: parsed.author?.name || 'Автор',
    authorUsername: parsed.author?.github,
    authorUrl: parsed.author?.url,
    examples: parsed.examples || [],
    validator: compileValidator(parsed.validatorSource),
    editorLanguage: parsed.editorLanguage,
    tag: parsed.tag,
    starsCount: parsed.stars,
    commentsCount: parsed.comments,
    solvedCount: parsed.solvedCount,
  };
};

export const useLoadMdMeta = (
  taskId: string,
  fallbackLabel: string,
  fallbackDesc: string,
  initialMd?: string
) => {
  const [mdMeta, setMdMeta] = React.useState<MdMeta | null>(() => {
    if (!initialMd || initialMd.trim().length === 0) return null;
    try {
      return buildMetaFromMd(initialMd, fallbackLabel, fallbackDesc);
    } catch {
      return null;
    }
  });
  React.useEffect(() => {
    // Если сервер уже передал md и мы смогли распарсить meta — не делаем лишних fetch.
    if (mdMeta && initialMd && initialMd.trim().length > 0) return;
    let cancelled = false;
    (async () => {
      let mdPath = getWeeklyInfoById(taskId || '')?.mdPath;
      try {
        if (!mdPath) {
          const list = await loadWeeklyManifest();
          for (const w of list) {
            const res0 = await fetch(w.mdPath);
            const text0 = await res0.text();
            const p0 = parseWeeklyTaskMd(text0);
            if (p0.id && p0.id === taskId) { mdPath = w.mdPath; break; }
          }
        }
        if (!mdPath) return;
        const meta = await mdMetaCache.get(mdPath, async () => {
          const res = await fetch(mdPath as string);
          const text = await res.text();
          return buildMetaFromMd(text, fallbackLabel, fallbackDesc);
        });
        if (!cancelled) setMdMeta(meta);
      } catch(error) {
        console.error('Error loading MD meta', error);
      }
    })();
    return () => { cancelled = true; };
  }, [taskId, fallbackLabel, fallbackDesc, initialMd, mdMeta]);
  return mdMeta;
};


