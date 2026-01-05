import type { LessonCardItem, LessonAuthor } from "../types";

const toNumber = (value: unknown, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export const getItemCardMeta = (lesson: LessonCardItem, colors: any) => {
  const totalTasks = Array.isArray(lesson?.tasks) ? lesson.tasks.length : 0;
  const authors: LessonAuthor[] = Array.isArray(lesson?.authors) ? lesson.authors : [];

  const starsCount = toNumber(lesson?.ratingCount, 0);
  const views = toNumber(lesson?.views, 0);
  const commentsCount = toNumber(lesson?.commentsCount, 0);

  const metaColor = colors?.descColor ?? "gray.500";
  const accentColor = colors?.accent ?? colors?.blue?.accent ?? "blue.400";
  const chipBorder = colors?.chipBorder ?? colors?.blue?.chipBorder ?? "blackAlpha.200";

  return { totalTasks, authors, starsCount, views, commentsCount, metaColor, accentColor, chipBorder };
};


