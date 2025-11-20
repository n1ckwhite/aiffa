export interface WeeklyTaskParsed {
    id: string;
    title: string;
    description: string;
    author: { name: string; github?: string; url?: string; avatar?: string };
    tip?: string;
    examples: Array<{ lang: string; code: string }>;
    validatorSource?: string;
    editorLanguage: string;
    level?: 'Начальный' | 'Средний' | 'Продвинутый';
    tag?: string;
    color?: string;
    reward?: number;
  };