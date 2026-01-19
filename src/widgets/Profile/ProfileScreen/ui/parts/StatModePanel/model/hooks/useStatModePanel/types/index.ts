import { StatModePanelItem } from "../../../helpers/types";

export type StatModePanelVmItem = {
    item: StatModePanelItem;
    key: string;
    titleDomId: string;
    listIndex: number;
  };
  
  export type StatModePanelPaginationVm = {
    ariaLabel: string;
    prevHref: string;
    nextHref: string;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
  };