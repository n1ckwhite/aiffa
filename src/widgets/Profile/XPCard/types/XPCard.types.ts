export type XpBurst = { id: number; amount: number; leftPct: number };

export type XPCardProps = {
  xp: number;
  tier: 'Начальный' | 'Средний' | 'Продвинутый';
  tierBadge: { label: string; colorScheme: 'blue' | 'purple' | 'yellow'; icon: any };
  nextTierBadge: { label: string; colorScheme: 'blue' | 'purple' | 'yellow'; icon: any } | null;
  progressPct: number;
  xpBursts: XpBurst[];
  dividerColor: string;
  hintColor: string;
};


