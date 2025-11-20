export type PaginationProps = {
  pageItems: (number | string)[];
  page: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (p: number) => void;
  colors: {
    controlsBg: string;
    controlsBorder: string;
    controlsHoverBg: string;
    controlsIcon: string;
    descColor: string;
  };
};


