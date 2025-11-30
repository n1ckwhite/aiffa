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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({ params }: LessonTasksRouteParams): Promise<Metadata> => {
  const lesson = await loadLesson(params.moduleId, params.lessonId);
  const lessonAny = lesson as any;
  const url = `${SITE_URL}/learn/${params.moduleId}/${params.lessonId}/tasks`;

  return {
    title: lessonAny ? `${lessonAny.title} — задачи` : "Задачи по уроку",
    description: lessonAny?.description ?? undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: lessonAny ? `${lessonAny.title} — задачи` : "Задачи по уроку",
      description: lessonAny?.description ?? undefined,
      type: "article",
    },
  };
};

const LessonTasksRoutePage = ({ params }: LessonTasksRouteParams) => {
  const { moduleId, lessonId } = params;
  const url = `${SITE_URL}/learn/${moduleId}/${lessonId}/tasks`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExerciseAction",
            name: "Задачи по уроку",
            url,
            inLanguage: "ru-RU",
          }),
        }}
      />
      <LessonTasksPageClient moduleId={moduleId} lessonId={lessonId} />
    </>
  );
};

export default LessonTasksRoutePage;


