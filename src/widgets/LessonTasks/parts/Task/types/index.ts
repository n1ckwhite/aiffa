import type React from 'react';
import type { LessonTask } from 'shared/lessons/manifest';

export type TaskRendererProps = {
  task: LessonTask;
  accent: string;
  borderColor: string;
  descColor: string;
  onSolvedChange: (ok: boolean) => void;
  onValidated?: () => void;
};

export type UseTaskRendererParams = Pick<TaskRendererProps, 'task' | 'onSolvedChange' | 'onValidated'>;

export type UseTaskRendererResult = {
  value: string;
  checked: Record<string, boolean>;
  ok: boolean | null;
  wrongAnimKey: number;
  handleValueChange: (nextValue: string) => void;
  handleCheckboxToggle: (id: string, isChecked: boolean) => void;
  handleValidateTerminal: () => void;
  handleValidateMcq: () => void;
  handleValidateCheckbox: () => void;
  handleValidateText: () => void;
  handleInputKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

