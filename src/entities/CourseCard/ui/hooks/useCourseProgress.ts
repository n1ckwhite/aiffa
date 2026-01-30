import React from 'react';
import { loadManifest } from 'shared/lessons/api';

type UseCourseProgressArgs = {
  moduleId: string;
  lessonsCount: number;
};

export const useCourseProgress = ({ moduleId, lessonsCount }: UseCourseProgressArgs) => {
  const [taskIdsByLessonId, setTaskIdsByLessonId] = React.useState<Record<string, string[]>>({});

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mf = await loadManifest();
        if (cancelled) return;

        const picked = (mf.modules || []).find((m: any) => m.id === moduleId) as any | undefined;
        const lessons = (picked?.lessons || []) as any[];

        const next: Record<string, string[]> = {};
        lessons.forEach((lesson: any) => {
          const lessonId = String(lesson?.id || '');
          if (!lessonId) return;
          const tasks = Array.isArray(lesson?.tasks) ? lesson.tasks : [];
          const ids = tasks.map((t: any) => String(t?.id || '')).filter(Boolean);
          next[lessonId] = ids;
        });

        setTaskIdsByLessonId(next);
      } catch {
        if (!cancelled) setTaskIdsByLessonId({});
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  const completedLessonsCount = React.useMemo(() => {
    if (!moduleId) return 0;

    let completed = 0;
    for (const [lessonId, taskIds] of Object.entries(taskIdsByLessonId)) {
      // Считаем прогресс только по урокам с задачами: "закрыт полностью список задач".
      if (!Array.isArray(taskIds) || taskIds.length === 0) {
        continue;
      }

      const isLessonCompleted = taskIds.every((taskId) => {
        const key = `${moduleId}/${lessonId}/${taskId}`;
        return false;
      });

      if (isLessonCompleted) {
        completed += 1;
      }
    }

    if (!Number.isFinite(lessonsCount) || lessonsCount <= 0) {
      return completed;
    }
    return Math.min(completed, lessonsCount);
  }, [moduleId, lessonsCount, taskIdsByLessonId]);

  const hasProgress = completedLessonsCount > 0 && lessonsCount > 0;

  return {
    completedLessonsCount,
    lessonsCount,
    hasProgress,
  };
};
















































































