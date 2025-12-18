import type { useAppColors } from "@/shared/theme/colors";
import type { PaginationColors } from "shared/ui/Pagination";
import type { BlogArticle } from "@/widgets/Blog/types";

export type BlogArticlesSectionProps = {
  theme: ReturnType<typeof useAppColors>;

  isLoading: boolean;
  isEmptyResults: boolean;
  query: string;

  pageSize: number;
  pageArticles: BlogArticle[];

  // card visuals
  categoryColor: string;
  cardRadius: string;
  cardPadding: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardShadow: string;
  cardHoverShadow: string;

  // pagination
  totalPages: number;
  page: number;
  canPrev: boolean;
  canNext: boolean;
  pageItems: Array<number | string>;
  onSetPage: (next: number | ((p: number) => number)) => void;
  paginationColors: PaginationColors;
};


