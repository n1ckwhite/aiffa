export type LessonCardProps = {
  moduleId: string;
  lesson: any;
  indexLabel: number | React.ReactNode;
  done: boolean;
  colors: {
    cardBg: string;
    cardHoverBg: string;
    borderColor: string;
    indexBg: string;
    accent: string;
    chipBorder: string;
  };
  accentColor: string;
  arrowAnimation: string;
  topBarBefore?: Record<string, any>;
};


