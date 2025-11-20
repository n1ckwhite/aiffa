import React from 'react';
import { Badge } from '@chakra-ui/react';
import type { LevelBadgeProps } from './types';

export const LevelBadge: React.FC<LevelBadgeProps> = ({ levelLabel, levelScheme }) => {
  return (
    <Badge colorScheme={levelScheme as any} borderRadius="full" px={3} py={1} fontWeight="semibold" fontSize="xs">
      {levelLabel}
    </Badge>
  );
};


