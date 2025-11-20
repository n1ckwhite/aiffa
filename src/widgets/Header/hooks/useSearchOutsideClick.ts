import { useEffect } from 'react';

export const useSearchOutsideClick = (searchOpen: boolean, setSearchOpen: (v: boolean) => void) => {
  useEffect(() => {
    if (!searchOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const inside = target.closest('.search-area');
      if (!inside) setSearchOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [searchOpen, setSearchOpen]);
};



