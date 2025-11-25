export type ContentProps = {
  completed?: boolean;
  onClose: () => void;
  onContinue?: () => void;
  context?: 'lesson' | 'weekly';
};


