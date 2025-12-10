import type { ValidateResult } from 'shared/weekly/md';

export type MdMeta = {
  title: string;
  description: string;
  tip?: string;
  authorName: string;
  authorUsername?: string;
  authorUrl?: string;
  examples: Array<{ lang: string; code: string }>;
  validator: ((input: string) => ValidateResult) | null;
  editorLanguage: string;
  tag?: string;
  starsCount?: number;
  commentsCount?: number;
  solvedCount?: number;
};


