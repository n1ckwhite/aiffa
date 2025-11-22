import React from 'react';
import type { LevelBadgeProps } from './types';
import PillBadge from 'shared/ui/PillBadge';

export const LevelBadge: React.FC<LevelBadgeProps> = ({ levelLabel, levelScheme }) => {
  return (
    <PillBadge colorScheme={levelScheme as any}>
      {levelLabel}
    </PillBadge>
  );
};


