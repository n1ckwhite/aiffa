import React, { Suspense } from "react";
import type { Metadata } from "next";
import { loadLesson } from "shared/lessons/api";
import LessonPageClient from "./LessonPageClient";
import SeoStructuredData from "./SeoStructuredData";

type LessonRouteParams = {
  params: {
    moduleId: string;
    lessonId: string;
  };
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({ params }: LessonRouteParams): Promise<Metadata> => {
  const lesson = await loadLesson(params.moduleId, params.lessonId);
  const lessonAny = lesson as any;
  const url = `${SITE_URL}/learn/${params.moduleId}/${params.lessonId}`;

  const baseTitle = lessonAny?.title ?? "Материал";
  const description =
    lessonAny?.description ??
    `Материал «${baseTitle}» на платформе AIFFA: практические задания и материалы для разработчиков.`;

  return {
    title: baseTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: baseTitle,
      description,
      type: "article",
    },
  };
};

// Важно для скорости: не делаем тяжёлых await здесь.
// Данные подтягиваются в client-компоненте со скелетоном (как на /learn/:id).
const LessonRoutePage = ({ params }: LessonRouteParams) => {
  const { moduleId, lessonId } = params;

  return (
    <>
      <LessonPageClient moduleId={moduleId} lessonId={lessonId} />
      <Suspense fallback={null}>
        <SeoStructuredData moduleId={moduleId} lessonId={lessonId} />
      </Suspense>
    </>
  );
};

export default LessonRoutePage;


