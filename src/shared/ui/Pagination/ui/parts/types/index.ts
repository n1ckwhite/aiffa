import type { PaginationColors } from "../../../types";

export type PaginationArrowButtonProps = {
  ariaLabel: string;
  direction: "prev" | "next";
  isDisabled: boolean;
  onClick: () => void;
  colors: PaginationColors;
  controlBoxSize: { base: number; md: number };
  iconBoxSize: { base: number; md: number };
  controlBorderRadius: { base: string; md: string };
};

export type PaginationPageButtonProps = {
  page: number;
  isActive: boolean;
  onSelect: (p: number) => void;
  colors: PaginationColors;
  controlBoxSize: { base: number; md: number };
  controlBorderRadius: { base: string; md: string };
};

export type PaginationDotsProps = {
  value: string;
  colors: PaginationColors;
};


