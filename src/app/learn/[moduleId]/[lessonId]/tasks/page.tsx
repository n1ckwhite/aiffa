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

const LessonTasksRoutePage = async ({ params }: LessonTasksRouteParams) => {
  const { moduleId, lessonId } = params;
  const url = `${SITE_URL}/learn/${moduleId}/${lessonId}/tasks`;
  const lesson = await loadLesson(moduleId, lessonId);
  const lessonAny = lesson as any;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ExerciseAction",
            name: lessonAny ? `${lessonAny.title} — задачи` : "Задачи по уроку",
            url,
            inLanguage: "ru-RU",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Материалы",
                item: `${SITE_URL}/learn`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: lessonAny?.moduleTitle ?? moduleId,
                item: `${SITE_URL}/learn/${moduleId}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: lessonAny?.title ?? lessonId,
                item: `${SITE_URL}/learn/${moduleId}/${lessonId}`,
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Задачи",
                item: url,
              },
            ],
          }),
        }}
      />
      <LessonTasksPageClient moduleId={moduleId} lessonId={lessonId} />
    </>
  );
};

export default LessonTasksRoutePage;


