export type TasksHeaderProps = {
  hasTasks: boolean;
  solvedCount: number;
  total: number;
  colors: {
    chipBgRed: string;
    chipBgYellow: string;
    chipBgGreen: string;
    chipTextRed: string;
    chipTextYellow: string;
    chipTextGreen: string;
    editIconBg: string;
    accent: string;
    backBtnHoverBg: string;
    backBtnActiveBg: string;
  };
  moduleId: string;
  lessonId: string;
};


