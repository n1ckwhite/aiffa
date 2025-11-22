import React from 'react';
import type { LessonsCountBadgeProps } from './types';
import { useLessonsLabel } from '../../model/useLessonsLabel';
import PillBadge from 'shared/ui/PillBadge';

export const LessonsCountBadge: React.FC<LessonsCountBadgeProps> = ({ count }) => {
  const label = useLessonsLabel(count);
  return (
    <PillBadge colorScheme="blue">
      {count} {label}
    </PillBadge>
  );
};


