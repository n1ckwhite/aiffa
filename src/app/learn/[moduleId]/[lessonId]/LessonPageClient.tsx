"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import LessonPageSkeleton from "pages/LessonPage/Skeleton";
import { LessonPageView } from "widgets/LessonPageView";
import { useLessonLoad } from "widgets/LessonPageView/hooks/useLessonLoad";
import { useLessonMarkdown } from "widgets/LessonPageView/hooks/useLessonMarkdown";

type LessonPageClientProps = {
  moduleId: string;
  lessonId: string;
  initialMarkdown?: string | null;
};

const LessonPageClient = ({ moduleId, lessonId, initialMarkdown }: LessonPageClientProps) => {
  const { lesson, mod, loading } = useLessonLoad(moduleId, lessonId);
  const md = useLessonMarkdown(lesson?.mdPath, initialMarkdown ?? null);

  const isMarkdownReady = Boolean(md) || !lesson?.mdPath;

  if (loading || !lesson || !mod || !isMarkdownReady) {
    return (
      <VStack align="stretch" gap={6} pb="32px">
        <LessonPageSkeleton />
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap={6} pb="32px">
      <LessonPageView lesson={lesson} mod={mod} initialMarkdown={md} />
    </VStack>
  );
};

export default LessonPageClient;


