"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import LessonTasksSkeleton from "pages/LessonTasksPage/Skeleton";
import { useUserProfile } from "entities/user";
import { LessonTasksView } from "widgets/LessonTasksView";
import { useLessonTasksLoad } from "widgets/LessonTasksView/hooks/useLessonTasksLoad";
import { useScrollTopOnChange } from "widgets/LessonTasksView/hooks/useScrollTopOnChange";
import LessonFeedback from "@/widgets/Lessons/LessonFeedback";

type LessonTasksPageClientProps = {
  moduleId: string;
  lessonId: string;
};

const LessonTasksPageClient = ({ moduleId, lessonId }: LessonTasksPageClientProps) => {
  const { lesson, mod: currentModule, loading } = useLessonTasksLoad(moduleId, lessonId);
  useScrollTopOnChange([moduleId, lessonId]);

  const { markTaskSolved } = useUserProfile();

  if (loading || !lesson || !currentModule) {
    return (
      <VStack align="stretch" gap={6} pb="32px">
        <LessonTasksSkeleton />
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap={6} pb="32px" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <LessonTasksView
        mod={currentModule}
        lesson={lesson}
        onTaskSolvedChange={(taskId, ok) => {
          try {
            markTaskSolved(currentModule.id, lesson.id, taskId, ok);
          } catch {
            // ignore
          }
        }}
      />
      <LessonFeedback
        lessonKey={`${currentModule.id}/${lesson.id}/tasks`}
        questionText="Было полезно потренироваться?"
      />
    </VStack>
  );
};

export default LessonTasksPageClient;


