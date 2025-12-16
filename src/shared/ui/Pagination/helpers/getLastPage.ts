import type { PaginationProps } from "../types";

export const getLastPage = (pageItems: PaginationProps["pageItems"], page: number): number => {
  const numbers = pageItems.filter((it): it is number => typeof it === "number");
  const computed = numbers.length > 0 ? Math.max(...numbers) : page;
  if (!Number.isFinite(computed) || computed <= 0) return page;
  return computed;
};


