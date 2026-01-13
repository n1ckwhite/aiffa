import { StatModePanelItem } from "../../../helpers/types";

export type UsePanelPaginationResult = {
  pageItems: readonly StatModePanelItem[];
  totalPages: number;
  page: number;
  prevHref: string;
  nextHref: string;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  ariaLabel?: string;
};