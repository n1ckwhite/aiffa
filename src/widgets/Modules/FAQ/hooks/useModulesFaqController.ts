import React from 'react';

type UseModulesFaqControllerParams = {
  variantKey: string;
  itemsCount: number;
};

type UseModulesFaqControllerResult = {
  openIdx: number | null;
  toggleIdx: (idx: number) => void;
  registerBodyRef: (idx: number, el: HTMLDivElement | null) => void;
  getMeasuredHeight: (idx: number) => number | undefined;
};

export const useModulesFaqController = ({
  variantKey,
  itemsCount,
}: UseModulesFaqControllerParams): UseModulesFaqControllerResult => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(itemsCount > 0 ? 0 : null);
  const bodyRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const [bodyHeights, setBodyHeights] = React.useState<Record<number, number>>({});

  React.useEffect(() => {
    // When variant changes, keep behavior consistent: first item opened by default.
    setOpenIdx(itemsCount > 0 ? 0 : null);
    setBodyHeights({});
    bodyRefs.current = {};
  }, [variantKey, itemsCount]);

  const registerBodyRef = React.useCallback((idx: number, el: HTMLDivElement | null) => {
    bodyRefs.current[idx] = el;
  }, []);

  const getMeasuredHeight = React.useCallback((idx: number) => bodyHeights[idx], [bodyHeights]);

  React.useLayoutEffect(() => {
    if (openIdx == null) return;
    const el = bodyRefs.current[openIdx];
    if (!el) return;

    let raf1: number | null = null;
    let raf2: number | null = null;
    let ro: ResizeObserver | null = null;

    const measure = () => {
      const nextHeight = el.scrollHeight || 0;
      if (nextHeight <= 0) return;
      setBodyHeights((prev) => (prev[openIdx] === nextHeight ? prev : { ...prev, [openIdx]: nextHeight }));
    };

    // Measure after layout; double-RAF helps with late layout (fonts, etc.)
    measure();
    raf1 = window.requestAnimationFrame(() => {
      measure();
      raf2 = window.requestAnimationFrame(measure);
    });

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure());
      ro.observe(el);
    } else {
      window.addEventListener('resize', measure);
    }

    return () => {
      if (raf1 != null) window.cancelAnimationFrame(raf1);
      if (raf2 != null) window.cancelAnimationFrame(raf2);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [openIdx, variantKey]);

  const toggleIdx = React.useCallback((idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }, []);

  return { openIdx, toggleIdx, registerBodyRef, getMeasuredHeight };
};

