import { useAppColors } from "@/shared/theme/colors";

export type BlogArticlesEmptyStateProps = {
    theme: ReturnType<typeof useAppColors>;
    query: string;
    variant: "search" | "favoritesEmpty" | "favoritesSearch";
  };