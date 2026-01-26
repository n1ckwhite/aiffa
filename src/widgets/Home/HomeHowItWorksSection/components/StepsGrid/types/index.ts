import type { HowItWorksStep } from "../../../types/steps";

export type StepsGridProps = {
  steps: HowItWorksStep[];
  prefersReducedMotion: boolean;
  borderColor: string;
  borderHoverColor: string;
  cardBg: string;
  cardShadow: string;
  cardHoverShadow: string;
  overlineColor: string;
  titleColor: string;
  textColor: string;
  accents: Record<string, { bg: string; color: string }>;
};
