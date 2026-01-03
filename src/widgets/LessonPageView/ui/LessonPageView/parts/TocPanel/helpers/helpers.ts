import type React from 'react';
import {
  TOC_ITEM_ROW_PX_DESKTOP,
  TOC_LIST_GAP_COMPENSATION_PX,
  TOC_PANEL_BOTTOM_SAFE_AREA_PX,
  TOC_PANEL_STICKY_TOP_PX,
  TOC_SCROLL_TO_OFFSET_PX,
} from '../constans';

export const getTocListMaxHeight = (maxVisibleItems: number) => {
  const listMaxHeightPx = maxVisibleItems * TOC_ITEM_ROW_PX_DESKTOP - TOC_LIST_GAP_COMPENSATION_PX;
  return `min(${listMaxHeightPx}px, calc(100vh - ${TOC_PANEL_STICKY_TOP_PX}px - ${TOC_PANEL_BOTTOM_SAFE_AREA_PX}px))`;
};

export const getTocScrollSx = () =>
  ({
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(120,120,120,0.45) transparent',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-thumb': { background: 'rgba(120,120,120,0.45)', borderRadius: '999px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
  }) as const;

export const scrollToTocItem = (id: string, setActiveTocId: (id: string) => void) => {
  if (typeof window === 'undefined') return;

  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - TOC_SCROLL_TO_OFFSET_PX;
  window.scrollTo({ top: y, behavior: 'smooth' });
  setActiveTocId(id);
  window.history.replaceState(null, '', `#${id}`);
};

export const handleTocLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
  setActiveTocId: (id: string) => void,
) => {
  e.preventDefault();
  scrollToTocItem(id, setActiveTocId);
};


