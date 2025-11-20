import React from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { loadLesson } from "shared/lessons/api";
import LessonPageClient from "./LessonPageClient";

type LessonRouteParams = {
  params: {
    moduleId: string;
    lessonId: string;
  };
};

export const generateMetadata = async ({ params }: LessonRouteParams): Promise<Metadata> => {
  const lesson = await loadLesson(params.moduleId, params.lessonId);
  const lessonAny = lesson as any;

  return {
    title: lessonAny?.title ?? "Урок",
    description: lessonAny?.description ?? undefined
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

  return <LessonPageClient moduleId={moduleId} lessonId={lessonId} initialMarkdown={initialMarkdown} />;
};

export default LessonRoutePage;


