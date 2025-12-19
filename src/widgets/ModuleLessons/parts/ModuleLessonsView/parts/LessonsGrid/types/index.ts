export type LessonsGridProps = {
  mod: any;
  colors: any;
  solvedMap: Record<string, true>;
  currentPage?: number;
  getPageHref?: (page: number) => string;
};


