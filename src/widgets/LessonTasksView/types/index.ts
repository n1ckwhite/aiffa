import type { Module, Lesson } from 'shared/lessons/manifest';

export type LessonTasksViewProps = {
  mod: Module;
  lesson: Lesson;
  onTaskSolvedChange: (taskId: string, ok: boolean) => void;
};

export type SolvedById = Record<string, boolean>;


