export const useValidateScroll = () => {
  return () => {
    try {
      const isMobile = typeof window !== 'undefined' && (
        (window.matchMedia && window.matchMedia('(max-width: 540px)').matches) ||
        window.innerWidth <= 540
      );
      if (!isMobile) return;
    } catch { return; }
  };
};


