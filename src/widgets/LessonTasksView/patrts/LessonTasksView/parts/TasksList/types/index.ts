import type { Lesson } from 'shared/lessons/manifest';

export type TasksListProps = {
  moduleId: string;
  lesson: Lesson;
  solvedById: Record<string, boolean>;
  setSolved: (taskId: string, ok: boolean) => void;
  descColor: string;
  accent: string;
  borderColor: any;
  indexChipBg: string;
  taskCardBg: string;
  taskCardBorder: string;
  taskCardHoverBg: string;
  linkColor: string;
  onValidated: (headerId: string) => void;
};


