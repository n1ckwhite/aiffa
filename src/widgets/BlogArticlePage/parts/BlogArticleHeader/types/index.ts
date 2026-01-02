import { BlogArticleMeta } from "@/shared/articles/manifest/types";
import { BlogArticlePageClientColors } from "@/widgets/BlogArticlePage/colors/types";
import { BlogArticleInteractions } from "@/widgets/BlogArticlePage/hooks/useBlogArticleInteractions/types";

export type Theme = {
    titleColor: string;
    descColor: string;
    blue: { accent: string };
  };
  
export type BlogArticleHeaderProps = {
    article: BlogArticleMeta;
    formattedDate: string;
    theme: Theme;
    colors: BlogArticlePageClientColors;
    interactions: BlogArticleInteractions;
    commentsCount: number | null;
  };