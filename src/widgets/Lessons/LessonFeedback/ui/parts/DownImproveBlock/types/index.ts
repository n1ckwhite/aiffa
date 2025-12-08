import { ImprovementTexts } from "@/widgets/Lessons/LessonFeedback/data/improvementTexts";

export type ImproveReason = 'short' | 'hard' | 'errors';

export type DownImproveBlockProps = {
  improveReason: ImproveReason | null;
  onChangeReason: (reason: ImproveReason) => void;
  texts: ImprovementTexts;
  thanksColor: string;
  textCol: string;
  chipBg: string;
  chipHover: string;
  border: string;
};