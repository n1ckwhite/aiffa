import { useEffect } from 'react';

export const useBroadcastMobileMenu = (isMobileMenuOpen: boolean) => {
  useEffect(() => {
    try {
      window.dispatchEvent(new CustomEvent('ui:mobile-menu', { detail: { open: isMobileMenuOpen } }));
    } catch {}
  }, [isMobileMenuOpen]);
};



