"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import LessonPageSkeleton from "pages/LessonPage/Skeleton";
import { LessonPageView } from "widgets/LessonPageView";
import { useLessonLoad } from "widgets/LessonPageView/hooks/useLessonLoad";

type LessonPageClientProps = {
  moduleId: string;
  lessonId: string;
  initialMarkdown?: string | null;
};

const LessonPageClient = ({ moduleId, lessonId, initialMarkdown }: LessonPageClientProps) => {
  // const { lesson, mod, loading } = useLessonLoad(moduleId, lessonId);

  // if (loading || !lesson || !mod) {
  //   return (
  //     <VStack align="stretch" gap={6} pb="32px">
  //       <LessonPageSkeleton />
  //     </VStack>
  //   );
  // }

  // return (
  //   <VStack align="stretch" gap={6} pb="32px">
  //     <LessonPageView lesson={lesson} mod={mod} initialMarkdown={initialMarkdown} />
  //   </VStack>
  // );
  return (
    <LessonPageSkeleton />

  )
};

export default LessonPageClient;


