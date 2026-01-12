import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { PeopleListItem } from "../../../types";
import { PEOPLE_PAGE_SIZE } from "../../constants";
import { buildPageHref } from "../../helpers/query";
import { UsePeoplePaginationResult } from "./types";

const parsePage = (raw: string | null): number => {
  if (!raw) return 1;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return 1;
  if (parsed < 1) return 1;
  return parsed;
};

export const usePeoplePagination = (items: PeopleListItem[]): UsePeoplePaginationResult => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = React.useMemo(() => {
    const raw = Math.ceil(items.length / PEOPLE_PAGE_SIZE);
    if (!raw) return 1;
    return raw;
  }, [items.length]);

  let page = parsePage(searchParams.get("page"));
  if (page > totalPages) page = totalPages;

  const pageItems = React.useMemo(() => {
    const start = (page - 1) * PEOPLE_PAGE_SIZE;
    return items.slice(start, start + PEOPLE_PAGE_SIZE);
  }, [items, page]);

  const shouldShowPagination = totalPages > 1;
  const isPrevDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  const currentHref = buildPageHref({ pathname, searchParams, nextPage: page });
  const prevHrefRaw = buildPageHref({ pathname, searchParams, nextPage: page - 1 });
  const nextHrefRaw = buildPageHref({ pathname, searchParams, nextPage: page + 1 });

  const pageLinks = React.useMemo(() => {
    const links = Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      return {
        page: pageNumber,
        href: buildPageHref({ pathname, searchParams, nextPage: pageNumber }),
        isCurrent: pageNumber === page,
      };
    });
    return links;
  }, [page, pathname, searchParams, totalPages]);

  const prevHrefByDisabled: Record<number, string> = {
    0: prevHrefRaw,
    1: currentHref,
  };

  const nextHrefByDisabled: Record<number, string> = {
    0: nextHrefRaw,
    1: currentHref,
  };

  return {
    page,
    totalPages,
    pageItems,
    shouldShowPagination,
    isPrevDisabled,
    isNextDisabled,
    prevHref: prevHrefByDisabled[Number(isPrevDisabled)],
    nextHref: nextHrefByDisabled[Number(isNextDisabled)],
    pageLinks,
  };
};

