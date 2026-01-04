import { useAppColors } from "@/shared/theme/colors";

export type ResultsEmptyStateVariant = "search" | "favoritesEmpty" | "favoritesSearch";

export type ResultsEmptyStateProps = {
  query?: string;
  variant?: ResultsEmptyStateVariant;
  allItemsLabel?: string;
  colors?: ReturnType<typeof useAppColors>;
};