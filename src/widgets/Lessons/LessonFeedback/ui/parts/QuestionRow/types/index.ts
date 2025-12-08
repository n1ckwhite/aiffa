import { VoteChoice } from "@/widgets/Lessons/LessonFeedback/types";

export type QuestionRowProps = {
    text: string;
    choice: VoteChoice | null;
    pulsing: VoteChoice | null;
    onVoteUp: () => void;
    onVoteDown: () => void;
    textCol: string;
    upColor: string;
    downColor: string;
    chipBg: string;
    chipHover: string;
    thumbIdleColor: string;
  };