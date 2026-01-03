import {
  TOC_ITEM_ROW_PX_DESKTOP,
  TOC_LIST_GAP_COMPENSATION_PX,
  TOC_PANEL_BOTTOM_SAFE_AREA_PX,
  TOC_PANEL_STICKY_TOP_PX,
} from '../constans';

export const getTocListMaxHeight = (maxVisibleItems: number) => {
  const listMaxHeightPx = maxVisibleItems * TOC_ITEM_ROW_PX_DESKTOP - TOC_LIST_GAP_COMPENSATION_PX;
  return `min(${listMaxHeightPx}px, calc(100vh - ${TOC_PANEL_STICKY_TOP_PX}px - ${TOC_PANEL_BOTTOM_SAFE_AREA_PX}px))`;
};


