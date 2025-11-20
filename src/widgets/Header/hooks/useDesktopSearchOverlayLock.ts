import { useEffect } from 'react';

export const useDesktopSearchOverlayLock = (searchOpen: boolean, isMobileMenuOpen: boolean) => {
  useEffect(() => {
    if (!searchOpen || isMobileMenuOpen) return;
    const { body } = document;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [searchOpen, isMobileMenuOpen]);
};



