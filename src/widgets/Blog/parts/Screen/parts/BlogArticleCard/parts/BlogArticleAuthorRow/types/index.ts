import { getAuthorBadge } from "@/widgets/Blog/parts/Screen/lib/authorBadge/authorBadge";

export type BlogArticleAuthorRowProps = {
    themeTitleColor: string;
    themeDescColor: string;
    accentColor: string;
  
    authorName?: string;
    authorGithub?: string;
    authorHref?: string;
  
    authorBadge: ReturnType<typeof getAuthorBadge>;
    dateIso: string;
  };