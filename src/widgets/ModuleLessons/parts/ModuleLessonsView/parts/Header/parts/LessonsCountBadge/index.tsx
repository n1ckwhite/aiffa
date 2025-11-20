import React from 'react';
import { Badge } from '@chakra-ui/react';
import type { LessonsCountBadgeProps } from './types';
import { useLessonsLabel } from '../../model/useLessonsLabel';

export const LessonsCountBadge: React.FC<LessonsCountBadgeProps> = ({ count }) => {
  const label = useLessonsLabel(count);
  return (
    <Badge colorScheme="blue" borderRadius="full" px={3} py={1} fontWeight="semibold" fontSize="xs">
      {count} {label}
    </Badge>
  );
};


