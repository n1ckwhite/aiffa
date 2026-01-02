export type WeeklyTaskInitialMeta = {
  /** ID из манифеста (например, weekly-1) */
  id: string;
  /** Путь к md в public (например, /weekly/weekly-1.md) */
  mdPath: string;
  /** Язык редактора из манифеста */
  editorLanguage: string;
  /** ID из frontmatter (если есть). Нужен для сопоставления "done" из профиля */
  parsedId?: string;

  title: string;
  description: string;
  authorName?: string;
  authorUrl?: string;
  tag?: string;
  level?: "Начальный" | "Средний" | "Продвинутый";
  starsCount?: number;
  commentsCount?: number;
  solvedCount?: number;
};

export type WeeklyTasksInitialData = {
  tasks: WeeklyTaskInitialMeta[];
};


