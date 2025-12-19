export type PaginationState = {
    pageSize: number;
    totalPages: number;
    page: number;
    start: number;
    end: number;
    canPrev: boolean;
    canNext: boolean;
    pageItems: Array<number | string>;
  };