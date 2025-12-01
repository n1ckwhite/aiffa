import React from 'react';
import { useUserProfile } from 'entities/user';

type UseCourseProgressArgs = {
  moduleId: string;
  lessonsCount: number;
};

export const useCourseProgress = ({ moduleId, lessonsCount }: UseCourseProgressArgs) => {
  const { profile } = useUserProfile();
  const solvedTaskIds = (profile?.solvedTaskIds || {}) as Record<string, true>;

  const solvedLessonsCount = React.useMemo(() => {
    const lessonIds = new Set<string>();
    Object.keys(solvedTaskIds).forEach((key) => {
      if (!key.startsWith(`${moduleId}/`)) {
        return;
      }
      const parts = key.split('/');
      if (parts.length < 2) {
        return;
      }
      const lessonId = parts[1];
      if (lessonId) {
        lessonIds.add(lessonId);
      }
    });
    const count = lessonIds.size;
    if (!Number.isFinite(lessonsCount) || lessonsCount <= 0) {
      return count;
    }
    return Math.min(count, lessonsCount);
  }, [moduleId, solvedTaskIds, lessonsCount]);

  const hasProgress = solvedLessonsCount > 0 && lessonsCount > 0;

  return {
    solvedLessonsCount,
    lessonsCount,
    hasProgress,
  };
};


























