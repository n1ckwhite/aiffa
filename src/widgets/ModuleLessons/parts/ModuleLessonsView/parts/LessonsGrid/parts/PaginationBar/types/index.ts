import { keyframes } from '@emotion/react';

export type PaginationBarProps = {
  page: number;
  setPage: (p: number | ((p: number) => number)) => void;
  canPrev: boolean;
  canNext: boolean;
  totalPages: number;
  pageItems: Array<number | string>;
  colors: any;
};


export const glowLine = keyframes`0% { transform: scaleX(0); } 100% { transform: scaleX(1); }`;
export const arrowLoop = keyframes`0% { transform: translateX(0); } 50% { transform: translateX(4px); } 100% { transform: translateX(0); }`;


