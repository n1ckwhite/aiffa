import { useMemo } from 'react';

export type WeeklyTierLabel = 'Начальный' | 'Средний' | 'Продвинутый';

export const useTierMeta = (xp: number) => {
  return useMemo(() => {
    const label: WeeklyTierLabel = xp < 300 ? 'Начальный' : xp < 900 ? 'Средний' : 'Продвинутый';
    return { label };
  }, [xp]);
};


