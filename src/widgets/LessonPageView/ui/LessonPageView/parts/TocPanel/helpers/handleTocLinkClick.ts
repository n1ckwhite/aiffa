import type React from 'react';
import { scrollToTocItem } from './scrollToTocItem';

export const handleTocLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
  setActiveTocId: (id: string) => void,
) => {
  e.preventDefault();
  scrollToTocItem(id, setActiveTocId);
};
