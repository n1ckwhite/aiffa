import type { useModuleProjectsColors } from '../../../../../colors';

export type PaginationBarProps = {
  pageItems: (number | string)[];
  page: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (p: number) => void;
  colors: ReturnType<typeof useModuleProjectsColors>;
};


