import React from 'react';
import type { XpBurst } from '../XPCard/types/XPCard.types';

export const useXpBursts = (xp: number, progressPct: number) => {
  const [xpBursts, setXpBursts] = React.useState<XpBurst[]>([]);
  const prevXpRef = React.useRef<number>(0);
  const idRef = React.useRef<number>(0);
  const mountedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      prevXpRef.current = xp;
      return;
    }
    const prev = prevXpRef.current;
    if (xp > prev) {
      const delta = xp - prev;
      const id = ++idRef.current;
      const leftPct = progressPct;
      setXpBursts((arr) => [...arr, { id, amount: delta, leftPct }]);
      window.setTimeout(() => {
        setXpBursts((arr) => arr.filter((b) => b.id !== id));
      }, 1200);
    }
    prevXpRef.current = xp;
  }, [xp, progressPct]);

  return xpBursts;
};


