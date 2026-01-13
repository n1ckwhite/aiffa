import React from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { StatModePanelItem, StatModePanelPaginationConfig } from "../../helpers/types";
import { buildPageHref } from "../../helpers/query";
import { UsePanelPaginationResult } from "./types";

export const usePanelPagination = (args: {
  items: readonly StatModePanelItem[];
  pagination?: StatModePanelPaginationConfig;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
}): UsePanelPaginationResult => {
  const { items, pagination, pathname, searchParams } = args;

  const pageSize = pagination?.pageSize ?? items.length;
  const totalPages = Math.max(1, Math.ceil(items.length / Math.max(1, pageSize)));

  const rawPage = searchParams.get("page") ?? "1";
  const parsedPage = Number.parseInt(rawPage, 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const pageItems = React.useMemo(() => items.slice(startIndex, endIndex), [endIndex, items, startIndex]);

  const prevHref = React.useMemo(() => {
    return buildPageHref({ pathname, searchParams, nextPage: safePage - 1 });
  }, [pathname, safePage, searchParams]);

  const nextHref = React.useMemo(() => {
    return buildPageHref({ pathname, searchParams, nextPage: safePage + 1 });
  }, [pathname, safePage, searchParams]);

  return {
    pageItems,
    totalPages,
    page: safePage,
    prevHref,
    nextHref,
    isPrevDisabled: safePage <= 1,
    isNextDisabled: safePage >= totalPages,
    ariaLabel: pagination?.ariaLabel,
  };
};

