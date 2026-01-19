"use client";

import React from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type { StatModePanelItem, StatModePanelPaginationConfig } from "../../helpers/types";
import { usePanelPagination } from "../usePanelPagination/usePanelPagination";
import { StatModePanelPaginationVm, StatModePanelVmItem } from "./types";

export const useStatModePanel = (args: {
  items: readonly StatModePanelItem[];
  pagination?: StatModePanelPaginationConfig;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
}): {
  vmItems: readonly StatModePanelVmItem[];
  hasItems: boolean;
  paginationVm: StatModePanelPaginationVm | null;
} => {
  const { items, pagination, pathname, searchParams } = args;
  const listDomId = React.useId();

  const { pageItems, totalPages, page, prevHref, nextHref, isPrevDisabled, isNextDisabled, ariaLabel } = usePanelPagination({
    items,
    pagination,
    pathname,
    searchParams,
  });

  const hasItems = pageItems.length > 0;

  const vmItems = React.useMemo(() => {
    const pageSize = pagination?.pageSize ?? items.length;
    return pageItems.map((it, idx) => {
      const absoluteIdx = (page - 1) * pageSize + idx;
      const titleDomId = `${listDomId}-item-${absoluteIdx}-title`;
      const itemTitle = "article" in it ? it.article.title : it.title;
      return {
        item: it,
        titleDomId,
        key: `${titleDomId}-${itemTitle}`,
        listIndex: absoluteIdx,
      };
    });
  }, [items.length, listDomId, page, pageItems, pagination?.pageSize]);

  const paginationVm: StatModePanelPaginationVm | null = React.useMemo(() => {
    if (!pagination) return null;
    if (totalPages <= 1) return null;
    return {
      ariaLabel: ariaLabel ?? "Пагинация",
      prevHref,
      nextHref,
      isPrevDisabled,
      isNextDisabled,
    };
  }, [ariaLabel, isNextDisabled, isPrevDisabled, nextHref, pagination, prevHref, totalPages]);

  return { vmItems, hasItems, paginationVm };
};

