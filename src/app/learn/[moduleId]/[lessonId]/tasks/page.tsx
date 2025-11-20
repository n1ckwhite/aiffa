import React from "react";
import type { Metadata } from "next";
import { loadLesson } from "shared/lessons/api";
import LessonTasksPageClient from "./LessonTasksPageClient";

type LessonTasksRouteParams = {
  params: {
    moduleId: string;
    lessonId: string;
  };
};

export const generateMetadata = async ({ params }: LessonTasksRouteParams): Promise<Metadata> => {
  const lesson = await loadLesson(params.moduleId, params.lessonId);
  const lessonAny = lesson as any;

  return {
    title: lessonAny ? `${lessonAny.title} — задачи` : "Задачи по уроку",
    description: lessonAny?.description ?? undefined
  };
};

const LessonTasksRoutePage = ({ params }: LessonTasksRouteParams) => {
  const { moduleId, lessonId } = params;
  return <LessonTasksPageClient moduleId={moduleId} lessonId={lessonId} />;
};

export default LessonTasksRoutePage;


