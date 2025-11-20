import React from 'react';

export const useAutoHideOnScroll = (inline: boolean) => {
  const [isHidden, setIsHidden] = React.useState(false);
  const lastScrollYRef = React.useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  React.useEffect(() => {
    if (inline) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const lastY = lastScrollYRef.current;
        const delta = currentY - lastY;
        const nearTop = currentY < 80;
        const nearBottom = (window.innerHeight + currentY) > (document.body.scrollHeight - 160);
        if (nearTop || nearBottom) {
          setIsHidden(false);
        } else if (delta > 8) {
          setIsHidden(true);
        } else if (delta < -8) {
          setIsHidden(false);
        }
        lastScrollYRef.current = currentY;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as any);
  }, [inline]);
  return isHidden;
};


