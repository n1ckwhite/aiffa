export type PaginationColors = {
  controlsBg: string;
  controlsBorder: string;
  controlsHoverBg: string;
  controlsIcon: string;
  descColor: string;
};

export type PaginationProps = {
  pageItems: Array<number | string>;
  page: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (p: number) => void;
  getPageHref?: (page: number) => string;
  colors: PaginationColors;
};


