export type BlogArticleStatsRowProps = {
    descColor: string;
    accentBlue: string;
    views?: number;
    stars?: number;
    isStarred?: boolean;
    comments?: number;
    readingTime?: string;
    formatCount: (value?: number) => string;
  };