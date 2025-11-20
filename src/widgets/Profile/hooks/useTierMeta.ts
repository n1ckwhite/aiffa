import { FaSeedling, FaMountain, FaCrown } from 'react-icons/fa6';

export type TierLabel = 'Начальный' | 'Средний' | 'Продвинутый';

export const useTierMeta = (xp: number) => {
  const tier: TierLabel = xp < 300 ? 'Начальный' : xp < 900 ? 'Средний' : 'Продвинутый';
  const nextTierLabel: 'Средний' | 'Продвинутый' | undefined = xp < 300 ? 'Средний' : xp < 900 ? 'Продвинутый' : undefined;
  const nextTierThreshold = nextTierLabel === 'Средний' ? 300 : nextTierLabel === 'Продвинутый' ? 900 : undefined;
  const currentTierBase = xp < 300 ? 0 : xp < 900 ? 300 : 900;
  const tierProgressPct = typeof nextTierThreshold === 'number'
    ? Math.max(0, Math.min(100, ((xp - currentTierBase) / (nextTierThreshold - currentTierBase)) * 100))
    : 100;
  const tierMeta = tier === 'Начальный'
    ? { label: 'Начальный', colorScheme: 'blue' as const, icon: FaSeedling }
    : tier === 'Средний'
      ? { label: 'Средний', colorScheme: 'purple' as const, icon: FaMountain }
      : { label: 'Продвинутый', colorScheme: 'yellow' as const, icon: FaCrown };
  const nextTierMeta = nextTierLabel
    ? (nextTierLabel === 'Средний'
        ? { label: 'Средний', colorScheme: 'purple' as const, icon: FaMountain }
        : { label: 'Продвинутый', colorScheme: 'yellow' as const, icon: FaCrown })
    : null;
  return { tier, tierMeta, nextTierMeta, tierProgressPct };
};


