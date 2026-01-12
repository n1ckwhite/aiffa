import { PeopleListItem } from "../../../../types";

export type UsePeoplePaginationResult = {
    page: number;
    totalPages: number;
    pageItems: PeopleListItem[];
    shouldShowPagination: boolean;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    prevHref: string;
    nextHref: string;
  };