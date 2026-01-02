import React, { Suspense } from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { notFound } from "next/navigation";
import { loadLesson } from "shared/lessons/api";
import { loadManifest } from "shared/lessons/api";
import LessonPageClient from "./LessonPageClient";
import SeoStructuredData from "./SeoStructuredData";

type LessonRouteParams = {
  params:
    | { moduleId: string; lessonId: string }
    | Promise<{ moduleId: string; lessonId: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

const readPublicMarkdownOrNull = async (mdPath?: string | null): Promise<string | null> => {
  const relative = (mdPath || "").trim().replace(/^\/+/, "");
  if (!relative) return null;
  const filePath = path.join(process.cwd(), "public", relative);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
};

export const generateMetadata = async ({ params }: LessonRouteParams): Promise<Metadata> => {
  const { moduleId, lessonId } = await Promise.resolve(params);
  const lesson = await loadLesson(moduleId, lessonId);
  const lessonAny = lesson as any;
  const url = `${SITE_URL}/learn/${moduleId}/${lessonId}`;

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

const LessonRoutePage = async ({ params }: LessonRouteParams) => {
  const { moduleId, lessonId } = await Promise.resolve(params);

  let lesson: any = null;
  let mod: any = null;
  try {
    const [lsn, manifest] = await Promise.all([loadLesson(moduleId, lessonId), loadManifest()]);
    lesson = lsn as any;
    mod =
      (manifest.modules || []).find((m: any) => m.id === moduleId) ||
      (manifest.modules || [])[0] ||
      null;
  } catch {
    return notFound();
  }

  if (!lesson || !mod) {
    return notFound();
  }

  const initialMarkdown = await readPublicMarkdownOrNull(lesson?.mdPath);
  if (lesson?.mdPath && !initialMarkdown) {
    return notFound();
  }

  return (
    <>
      <LessonPageClient
        initialLesson={lesson}
        initialModule={mod}
        initialMarkdown={initialMarkdown}
      />
      <Suspense fallback={null}>
        <SeoStructuredData moduleId={moduleId} lessonId={lessonId} />
      </Suspense>
    </>
  );
};

export default LessonRoutePage;


