import type { HowItWorksStep } from "../../../types/steps";

export type StepCardProps = {
  step: HowItWorksStep;
  index: number;
  prefersReducedMotion: boolean;
  borderColor: string;
  borderHoverColor: string;
  cardBg: string;
  cardShadow: string;
  cardHoverShadow: string;
  overlineColor: string;
  titleColor: string;
  textColor: string;
  accentBg: string;
  accentColor: string;
};
