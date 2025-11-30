import React from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { loadLesson, loadManifest } from "shared/lessons/api";
import LessonPageClient from "./LessonPageClient";

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

const readLessonMarkdown = async (mdPath?: string | null): Promise<string | null> => {
  if (!mdPath) return null;
  try {
    const relative = mdPath.startsWith("/") ? mdPath.slice(1) : mdPath;
    const filePath = path.join(process.cwd(), "public", relative);
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch {
    return null;
  }
};

const LessonRoutePage = async ({ params }: LessonRouteParams) => {
  const { moduleId, lessonId } = params;
  const lesson = await loadLesson(moduleId, lessonId);
  const initialMarkdown = await readLessonMarkdown(lesson?.mdPath);
  const lessonAny = lesson as any;
  const url = `${SITE_URL}/learn/${moduleId}/${lessonId}`;
  const manifest = await loadManifest();
  const moduleAny = (manifest.modules || []).find(
    (mod: any) => mod.id === moduleId
  ) as any;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: lessonAny?.title ?? "Урок",
            description: lessonAny?.description,
            url,
            inLanguage: "ru-RU",
            author: (lessonAny?.authors || []).map((author: any) => ({
              "@type": "Person",
              name: author.name ?? author.username,
            })),
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
                name: moduleAny?.title ?? moduleId,
                item: `${SITE_URL}/learn/${moduleId}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: lessonAny?.title ?? lessonId,
                item: url,
              },
            ],
          }),
        }}
      />
      <LessonPageClient
        moduleId={moduleId}
        lessonId={lessonId}
        initialMarkdown={initialMarkdown}
      />
    </>
  );
};

export default LessonRoutePage;


