import type { useAppColors } from "@/shared/theme/colors";
import type { BlogArticle } from "@/widgets/Blog/types";

export type BlogArticleCardProps = {
  article: BlogArticle;
  index: number;
  theme: ReturnType<typeof useAppColors>;
  cardBorder: string;
  cardHoverBorder: string;
  cardRadius: string;
  cardPadding: string;
  cardShadow: string;
  cardHoverShadow: string;
  categoryColor: string;
};


