import type { BusinessHighlight } from "../../../types/highlight";

export type HighlightsListProps = {
  items: BusinessHighlight[];
  titleColor: string;
  textColor: string;
  iconColors: string[];
  iconFallback: string;
};
