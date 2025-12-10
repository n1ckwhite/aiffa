import React from 'react';
import { loadWeeklyManifest } from 'shared/weekly/api';
import { parseWeeklyTaskMd } from 'shared/weekly/md';
import { useUserProfile } from 'entities/user';
import { FaHtml5, FaJs, FaReact } from 'react-icons/fa6';
import { SiGo, SiCss3, SiTypescript, SiNodedotjs, SiGit, SiReact } from 'react-icons/si';
import { createAsyncCache } from 'utils/cache';

type WeeklyTaskMeta = {
  title: string;
  description: string;
  authorName?: string;
  authorUrl?: string;
  tag?: string;
  level?: 'Начальный' | 'Средний' | 'Продвинутый';
  parsedId?: string;
  starsCount?: number;
  commentsCount?: number;
  solvedCount?: number;
};

const parsedMdCache = createAsyncCache<string, WeeklyTaskMeta>();

function iconByTag(tag?: string): React.ElementType {
  switch ((tag || '').toUpperCase()) {
    case 'REACT': return FaReact as unknown as React.ElementType;
    case 'REACTNATIVE':
    case 'RN': return SiReact as unknown as React.ElementType;
    case 'HTML': return FaHtml5 as unknown as React.ElementType;
    case 'JS': return FaJs as unknown as React.ElementType;
    case 'GO': return SiGo as unknown as React.ElementType;
    case 'CSS': return SiCss3 as unknown as React.ElementType;
    case 'TS':
    case 'TYPESCRIPT': return SiTypescript as unknown as React.ElementType;
    case 'NODE':
    case 'NODEJS': return SiNodedotjs as unknown as React.ElementType;
    case 'GIT': return SiGit as unknown as React.ElementType;
    default: return FaJs as unknown as React.ElementType;
  }
}

function colorByTag(tag?: string): string {
  switch ((tag || '').toUpperCase()) {
    case 'REACT':
    case 'REACTNATIVE':
    case 'RN':
      return 'cyan';
    case 'HTML':
      return 'orange';
    case 'CSS':
      return 'blue';
    case 'JS':
      return 'yellow';
    case 'TS':
    case 'TYPESCRIPT':
      return 'blue';
    case 'NODE':
    case 'NODEJS':
      return 'green';
    case 'GIT':
      return 'red';
    case 'GO':
      return 'teal';
    default:
      return 'blue';
  }
}

const inferTag = (lang: string | undefined) => {
  if (!lang) return undefined;
  if (lang === 'html') return 'HTML';
  if (lang === 'go') return 'GO';
  if (lang === 'javascript') return 'JS';
  if (lang === 'css') return 'CSS';
  if (lang === 'typescript') return 'TS';
  if (lang === 'tsx' || lang === 'jsx') return 'REACT';
  return undefined;
};

export type WeeklyTaskListItem = {
  id: string;
  label: string;
  description: string;
  done: boolean;
  authorName?: string;
  authorUrl?: string;
  tag: string;
  icon: React.ElementType;
  color: string;
  level?: 'Начальный' | 'Средний' | 'Продвинутый';
  starsCount?: number;
  commentsCount?: number;
  solvedCount?: number;
};

export const useWeeklyTasksData = () => {
  const { profile } = useUserProfile();
  const [mdData, setMdData] = React.useState<Record<string, WeeklyTaskMeta>>({});

  const [weeklyList, setWeeklyList] = React.useState<Array<{ id: string; mdPath: string; editorLanguage: string }>>([]);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const weeklyManifest = await loadWeeklyManifest();
        if (!cancelled) {
          setWeeklyList(weeklyManifest as any);
        }
        const loadOne = async (w: any) => {
          const value = await parsedMdCache.get(w.mdPath, async () => {
            const res = await fetch(w.mdPath);
            const text = await res.text();
            const parsed = parseWeeklyTaskMd(text);
            const authorUrl = parsed.author?.url || (parsed.author?.github ? `https://github.com/${parsed.author.github}` : undefined);
            const tag = parsed.tag || inferTag(parsed.editorLanguage);
            const starsCount = typeof (parsed as any).stars === 'number' ? (parsed as any).stars : undefined;
            const commentsCount = typeof (parsed as any).comments === 'number' ? (parsed as any).comments : undefined;
            const solvedCount = typeof (parsed as any).solvedCount === 'number' ? (parsed as any).solvedCount : undefined;
            return {
              title: parsed.title || w.id,
              description: parsed.description || '',
              authorName: parsed.author?.name,
              authorUrl,
              tag,
              level: parsed.level,
              parsedId: parsed.id || undefined,
              starsCount,
              commentsCount,
              solvedCount,
            };
          });
          return [w.id, value] as const;
        };
        const entries = await Promise.all(weeklyManifest.map((w: any) => loadOne(w)));
        if (!cancelled) {
          const map: Record<string, WeeklyTaskMeta> = {};
          for (const [id, meta] of entries) map[id] = meta;
          setMdData(map);
        }
      } catch {
        // ignore
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const isReady = React.useMemo(() => weeklyList.length > 0 && weeklyList.every((w) => !!mdData[w.id]), [mdData, weeklyList]);

  const tasks = React.useMemo<WeeklyTaskListItem[]>(() => {
    const doneList = Array.isArray((profile as any).weeklyTasks) ? (profile as any).weeklyTasks : [];
    return weeklyList.map((w) => {
      const m = mdData[w.id as any];
      const effectiveId = m?.parsedId || (w.id as any);
      const doneEntry = doneList.find((t: any) => t.id === effectiveId) || { done: false };
      const label = m?.title || (w.id as any);
      const description = m?.description || '';
      const authorName = m?.authorName;
      const authorUrl = m?.authorUrl;
      const tag = m?.tag || inferTag((w as any).editorLanguage);
      const icon = iconByTag(tag);
      const color = colorByTag(tag);
      const level = m?.level;
      const starsCount = m?.starsCount;
      const commentsCount = m?.commentsCount;
      const solvedCount = m?.solvedCount;
      return {
        id: effectiveId,
        label,
        description,
        done: !!doneEntry.done,
        authorName,
        authorUrl,
        tag: (tag || 'TASK') as string,
        icon,
        color,
        level,
        starsCount,
        commentsCount,
        solvedCount,
      };
    });
  }, [mdData, profile, weeklyList]);

  return { isReady, tasks };
};


