"use client";

import { VStack } from "@chakra-ui/react";
import { LessonPageView } from "widgets/LessonPageView";
import type { Lesson, Module } from "shared/lessons/manifest";

type LessonPageClientProps = {
  initialMarkdown?: string | null;
  initialLesson?: Lesson | null;
  initialModule?: Module | null;
};

const LessonPageClient = ({ initialLesson, initialModule, initialMarkdown }: LessonPageClientProps) => {
  const lesson = initialLesson;
  const mod = initialModule;
  const md = initialMarkdown ?? null;

  if (!lesson || !mod) {
    // 404 рендерится на сервере через notFound() (см. page.tsx)
    return null;
  }

  return (
    <VStack align="stretch" gap={6} pb="32px">
      <LessonPageView lesson={lesson} mod={mod} initialMarkdown={md} />
    </VStack>
  );
};

export default LessonPageClient;


