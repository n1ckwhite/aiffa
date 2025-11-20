import React from 'react';

const getDynamicScrollOffset = () => {
  try {
    const headerEl = document.querySelector('header') as HTMLElement | null;
    const headerHeight = headerEl?.offsetHeight ?? 0;
    const padding = 24;
    return headerHeight + padding;
  } catch {
    return 68;
  }
};

export const useHeaderAlign = (
  anchorRef: React.RefObject<HTMLDivElement | null>,
  deps: React.DependencyList
) => {
  React.useEffect(() => {
    const alignToHeader = () => {
      const el = anchorRef.current;
      if (!el) return;
      try {
        const y = el.getBoundingClientRect().top + window.pageYOffset - getDynamicScrollOffset();
        window.scrollTo({ top: y, left: 0, behavior: 'auto' });
      } catch {}
    };
    alignToHeader();
    requestAnimationFrame(alignToHeader);
    const t1 = window.setTimeout(alignToHeader, 120);
    const t2 = window.setTimeout(alignToHeader, 280);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};


