import React, { Suspense } from "react";
import type { Metadata } from "next";
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

// Важно для скорости: не делаем тяжёлых await здесь.
// Иначе Next не сможет быстро отдать HTML для `{children}` (main‑контент в MainLayout).
export const generateMetadata = ({ params }: LessonRouteParams): Metadata => {
  const url = `${SITE_URL}/learn/${params.moduleId}/${params.lessonId}`;
  const title = "Урок";
  const description = "Материал на платформе AIFFA.";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description,
      type: "article",
    },
  };
};

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


