import type { useModuleProjectsColors } from '../../../../../colors';

export type PaginationBarProps = {
  pageItems: (number | string)[];
  page: number;
  canPrev: boolean;
  canNext: boolean;
  getPageHref?: (page: number) => string;
  colors: ReturnType<typeof useModuleProjectsColors>;
};


