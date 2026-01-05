export type WeeklyTaskInitialMeta = {
  id: string;
  mdPath: string;
  editorLanguage: string;
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
  updatedAt?: string;
  createdAt?: string;
};

export type WeeklyTasksInitialData = {
  tasks: WeeklyTaskInitialMeta[];
};


