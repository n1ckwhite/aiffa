export type VoteChoice = 'up' | 'down';

export type LessonFeedbackProps = {
  lessonKey: string;
  questionText?: string;
  /**
   * Коллбек, вызывается при выборе реакции (лайк/дизлайк).
   */
  onVoteChange?: (choice: VoteChoice) => void;
  /**
   * Коллбек для CTA «Поставить звезду» после положительного отзыва.
   */
  onSupportClick?: () => void;
};


