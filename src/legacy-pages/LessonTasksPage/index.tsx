import React from 'react';
import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserProfile } from 'entities/user';
import LessonTasksSkeleton from './Skeleton';
import { LessonTasksView } from 'widgets/LessonTasksView';
import { useLessonTasksLoad } from 'widgets/LessonTasksView/hooks/useLessonTasksLoad';
import { useScrollTopOnChange } from 'widgets/LessonTasksView/hooks/useScrollTopOnChange';
import LessonFeedback from '@/widgets/Lessons/LessonFeedback';

const LessonTasksPage: React.FC = () => {
  const params = useParams();
  const { lesson, mod: currentModule, loading } = useLessonTasksLoad(params.moduleId, params.lessonId);
  useScrollTopOnChange([params.moduleId, params.lessonId]);

  const { markTaskSolved } = useUserProfile();

  if (loading || !lesson || !currentModule) {
    return (
      <VStack align="stretch" gap={6} pb="32px">
        <LessonTasksSkeleton />
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap={6} pb="32px">
      <LessonTasksView
        mod={currentModule}
        lesson={lesson}
        onTaskSolvedChange={(taskId, ok) => {
          try {
            markTaskSolved(currentModule.id, lesson.id, taskId, ok);
          } catch {}
        }}
      />
      <LessonFeedback
        lessonKey={`${currentModule.id}/${lesson.id}/tasks`}
        questionText="Было полезно потренироваться?"
      />
    </VStack>
  );
};

export default LessonTasksPage;


