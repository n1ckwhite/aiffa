import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import type { BlogArticlePageClientColors } from "@/widgets/BlogArticlePage/colors/types";

export type TagsAndMetaRowProps = {
  article: BlogArticleMeta;
  formattedDate: string;
  commentsCount: number | null;
  colors: Pick<BlogArticlePageClientColors, "metaRowColor" | "calendarMetaColor" | "clockMetaColor" | "commentsMetaColor">;
};


