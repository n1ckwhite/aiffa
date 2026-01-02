import { BlogArticleMeta } from "@/shared/articles/manifest/types";

export type BlogArticlePageClientProps = {
    article: BlogArticleMeta;
    markdown: string;
    formattedDate: string;
  };