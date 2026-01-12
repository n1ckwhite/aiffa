import { PeopleListItem } from "../../../../types";

export type PeoplePageLinkItem = {
  page: number;
  href: string;
  isCurrent: boolean;
};

export type UsePeoplePaginationResult = {
    page: number;
    totalPages: number;
    pageItems: PeopleListItem[];
    shouldShowPagination: boolean;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    prevHref: string;
    nextHref: string;
    pageLinks: PeoplePageLinkItem[];
  };