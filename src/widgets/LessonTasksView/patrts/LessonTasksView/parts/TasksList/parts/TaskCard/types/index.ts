export type TaskCardColors = {
  descColor: string;
  accent: string;
  borderColor: any;
  indexChipBg: string;
  taskCardBg: string;
  taskCardBorder: string;
  taskCardHoverBg: string;
  linkColor: string;
};

export type TaskCardProps = {
  task: any;
  idx: number;
  solvedById: Record<string, boolean>;
  setSolved: (taskId: string, ok: boolean) => void;
  colors: TaskCardColors;
  onValidated: (headerId: string) => void;
};


