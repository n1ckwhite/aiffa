import React, { useEffect } from 'react';
import type { Module, Lesson } from 'shared/lessons/manifest';
import { loadManifest } from 'shared/lessons/api';
import { scoreCandidate } from '../lib/search';

type Result = {
  route: string;
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  score: number;
};

export const useDebouncedLessonsSearch = (
  searchQuery: string,
  setResults: (r: Result[]) => void,
  setHighlightIndex: (i: number) => void,
  toast: { (o: any): void },
  searchErrorShown: boolean,
  setSearchErrorShown: (b: boolean) => void
) => {
  const [lessonsFlat, setLessonsFlat] = React.useState<Array<{ moduleId: string; moduleTitle: string; lesson: Lesson }>>([]);
  useEffect(() => {
    let mounted = true;
    loadManifest()
      .then((m) => {
        if (!mounted) return;
        const out: Array<{ moduleId: string; moduleTitle: string; lesson: Lesson }> = [];
        const modules = (m as any)?.modules as Module[] | undefined;
        if (!Array.isArray(modules)) {
          setLessonsFlat([]);
          return;
        }
        for (const mod of modules) {
          if (!Array.isArray(mod.lessons)) continue;
          for (const lesson of mod.lessons) out.push({ moduleId: mod.id, moduleTitle: mod.title, lesson });
        }
        setLessonsFlat(out);
      })
      .catch(() => setLessonsFlat([]));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const q = (searchQuery || '').trim();
    if (!q) {
      setResults([]);
      setHighlightIndex(0);
      return;
    }
    const id = window.setTimeout(() => {
      try {
        const computed = lessonsFlat
          .map((entry) => {
            const s = scoreCandidate(q, entry.lesson.title, entry.moduleTitle, entry.lesson.id);
            return {
              route: `/learn/${entry.moduleId}/${entry.lesson.id}`,
              lessonId: entry.lesson.id,
              lessonTitle: entry.lesson.title,
              moduleId: entry.moduleId,
              moduleTitle: entry.moduleTitle,
              score: s,
            };
          })
          .filter((r) => r.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 8);
        setResults(computed);
        setHighlightIndex(0);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Search error:', err);
        if (!searchErrorShown) {
          try {
            toast({
              title: 'Ошибка поиска',
              description: 'Что-то пошло не так. Попробуйте ещё раз.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            setSearchErrorShown(true);
            window.setTimeout(() => setSearchErrorShown(false), 3500);
          } catch {}
        }
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [searchQuery, lessonsFlat, toast, searchErrorShown, setSearchErrorShown, setResults, setHighlightIndex]);
};



