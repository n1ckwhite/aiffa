import React from 'react';
import type { SegmentOrientation, SegmentSize } from '../types';

export type IndicatorMetrics = {
  left: number;
  width: number;
  top: number;
  height: number;
};

export type UseIndicatorPositionResult = {
  style: IndicatorMetrics;
  ready: boolean;
  inset: number;
  borderFixY: number;
};

export const useIndicatorPosition = ({
  value,
  rootRef,
  orientation,
  size,
}: {
  value: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  orientation: SegmentOrientation;
  size: SegmentSize;
}): UseIndicatorPositionResult => {
  const [style, setStyle] = React.useState<IndicatorMetrics>({ left: 0, width: 0, top: 0, height: 0 });
  const [ready, setReady] = React.useState(false);
  const inset = size === 'xs' ? 2 : 4;
  const borderFixY = 1;

  const recalc = React.useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLButtonElement>(`[data-seg-item="true"][data-value="${value}"]`);
    if (!el) return;
    const rootRect = root.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    if (orientation === 'vertical') {
      setStyle({ left: inset, width: rect.width, top: rect.top - rootRect.top, height: rect.height });
    } else {
      setStyle({ left: rect.left - rootRect.left, width: rect.width, top: inset, height: rect.height });
    }
  }, [rootRef, value, orientation, inset]);

  React.useLayoutEffect(() => {
    recalc();
    const id = requestAnimationFrame(() => {
      recalc();
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [recalc]);

  React.useEffect(() => {
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);

    const root = rootRef.current;
    const ro = root ? new ResizeObserver(() => recalc()) : undefined;
    ro?.observe(root as Element);
    const mo = root ? new MutationObserver(() => recalc()) : undefined;
    mo?.observe(root as Element, { subtree: true, childList: true, characterData: true, attributes: true });
    try {
      (document as any).fonts?.ready?.then(() => recalc());
    } catch {}

    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      mo?.disconnect();
    };
  }, [recalc, rootRef]);

  return { style, ready, inset, borderFixY };
};


