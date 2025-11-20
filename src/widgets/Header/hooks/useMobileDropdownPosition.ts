import { useEffect } from 'react';

export const useMobileDropdownPosition = (
  isMobileMenuOpen: boolean,
  searchOpen: boolean,
  setMobileDropdownTop: (v: number | string) => void
) => {
  useEffect(() => {
    if (!(isMobileMenuOpen && searchOpen)) return;
    const updatePosition = () => {
      try {
        const el = document.querySelector('.mobile-menu .search-input') as HTMLElement | null;
        const rect = el?.getBoundingClientRect();
        if (rect) setMobileDropdownTop(`${Math.round(rect.bottom) + 8}px`);
      } catch {}
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('orientationchange', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('orientationchange', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isMobileMenuOpen, searchOpen, setMobileDropdownTop]);
};



