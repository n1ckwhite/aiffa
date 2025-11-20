import React from 'react';
import { createAsyncCache } from 'utils/cache';

const lessonMdCache = createAsyncCache<string, string>();

export const useLessonMarkdown = (mdPath?: string | null, initialMd?: string | null) => {
  const [md, setMd] = React.useState<string | null>(initialMd ?? null);

  React.useEffect(() => {
    if (!mdPath) {
      if (!initialMd) {
        setMd(null);
      }
      return;
    }

    if (initialMd) {
      // Если markdown уже был передан с сервера, не делаем повторный fetch
      return;
    }

    let cancelled = false;
    lessonMdCache
      .get(mdPath, async () => {
        const r = await fetch(mdPath as string);
        const text = await r.text();
        return text;
      })
      .then((text) => {
        if (!cancelled) setMd(text);
      })
      .catch(() => {
        if (!cancelled) setMd('# Ошибка загрузки урока');
      });
    return () => {
      cancelled = true;
    };
  }, [mdPath, initialMd]);

  return md;
};


