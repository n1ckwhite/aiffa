import { WeeklyTaskInfo } from "./types";

export const weeklyManifest: WeeklyTaskInfo[] = [
  { id: 'weekly-1', mdPath: '/weekly/weekly-1.md', tag: 'CSS', color: 'blue', icon: (() => null) as any, editorLanguage: 'css' },
  { id: 'weekly-2', mdPath: '/weekly/weekly-2.md', tag: 'CSS', color: 'blue', icon: (() => null) as any, editorLanguage: 'css' },
  { id: 'weekly-3', mdPath: '/weekly/weekly-3.md', tag: 'HTML', color: 'orange', icon: (() => null) as any, editorLanguage: 'html' },
  { id: 'weekly-4', mdPath: '/weekly/weekly-4.md', tag: 'CSS', color: 'blue', icon: (() => null) as any, editorLanguage: 'css' },
  { id: 'weekly-5', mdPath: '/weekly/weekly-5.md', tag: 'HTML', color: 'orange', icon: (() => null) as any, editorLanguage: 'html' },
  { id: 'weekly-6', mdPath: '/weekly/weekly-6.md', tag: 'JS', color: 'yellow', icon: (() => null) as any, editorLanguage: 'javascript' },
  { id: 'weekly-7', mdPath: '/weekly/weekly-7.md', tag: 'CSS', color: 'blue', icon: (() => null) as any, editorLanguage: 'css' },
  { id: 'weekly-8', mdPath: '/weekly/weekly-8.md', tag: 'JS', color: 'yellow', icon: (() => null) as any, editorLanguage: 'javascript' },
  { id: 'weekly-9', mdPath: '/weekly/weekly-9.md', tag: 'HTML', color: 'orange', icon: (() => null) as any, editorLanguage: 'html' },
];

export function getWeeklyInfoById(id: string): WeeklyTaskInfo | undefined {
  return weeklyManifest.find((w) => w.id === id);
}

export type { WeeklyTaskInfo } from './types';


