"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import { useUserProfile } from "entities/user";
import { LessonTasksView } from "widgets/LessonTasksView";
import { useScrollTopOnChange } from "widgets/LessonTasksView/hooks/useScrollTopOnChange";
import LessonFeedback from "@/widgets/Lessons/LessonFeedback";
import type { Lesson, Module } from "shared/lessons/manifest";

type LessonTasksPageClientProps = {
  moduleId: string;
  lessonId: string;
  initialLesson?: Lesson | null;
  initialModule?: Module | null;
};

const LessonTasksPageClient = ({ moduleId, lessonId, initialLesson, initialModule }: LessonTasksPageClientProps) => {
  const lesson = initialLesson ?? null;
  const currentModule = initialModule ?? null;
  useScrollTopOnChange([moduleId, lessonId]);

  const { markTaskSolved } = useUserProfile();

  const wrapperProps = {
    align: "stretch",
    gap: 6,
    pb: "32px",
    px: { base: 4, md: 6 },
    py: { base: 8, md: 10 },
  } as const;

  if (!lesson || !currentModule) return <VStack {...wrapperProps} />;

  return (
    <VStack {...wrapperProps}>
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


