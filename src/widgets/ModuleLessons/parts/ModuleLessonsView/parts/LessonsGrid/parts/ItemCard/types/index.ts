import { useModuleLessonsColors } from "@/widgets/ModuleLessons/colors";

export type LessonAuthor = { username: string; name?: string };

export type LessonCardItem = {
  id?: string;
  title?: string;
  tasks?: unknown[];
  authors?: LessonAuthor[];
  ratingCount?: number;
  views?: number;
  commentsCount?: number;
  updatedAt?: string;
  createdAt?: string;
};

export type ItemCardProps = {
  lesson: LessonCardItem;
  href: string;
  idx: number;
  start: number;
  colors: ReturnType<typeof useModuleLessonsColors>;
  levelAccent: string;
  arrowAnimationCss: string;
  done: boolean;
};


