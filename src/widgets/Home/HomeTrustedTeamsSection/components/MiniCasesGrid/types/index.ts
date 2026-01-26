import type { MiniCase } from "../../../types/miniCase";

export type MiniCasesGridProps = {
  items: MiniCase[];
  isDark: boolean;
  borderColor: string;
  borderHoverColor: string;
  cardBg: string;
  baseShadow: string;
  hoverShadow: string;
  labelColor: string;
  titleColor: string;
  textColor: string;
  actionColor: string;
  prefersReducedMotion: boolean;
};
