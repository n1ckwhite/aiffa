import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import type { BlogArticlePageClientColors } from "@/widgets/BlogArticlePage/colors/types";
import type { BlogArticleInteractions } from "@/widgets/BlogArticlePage/hooks/useBlogArticleInteractions/types";

export type AuthorActionsTheme = {
  titleColor: string;
  blue: { accent: string };
};

export type AuthorActionsRowProps = {
  article: BlogArticleMeta;
  theme: AuthorActionsTheme;
  colors: Pick<
    BlogArticlePageClientColors,
    | "metaRowColor"
    | "actionIconColor"
    | "copiedIconColor"
    | "ghostHoverBg"
    | "ghostActiveBg"
    | "ghostFocusShadow"
    | "starIconActiveColor"
    | "savedIconActiveColor"
  >;
  interactions: BlogArticleInteractions;
};


