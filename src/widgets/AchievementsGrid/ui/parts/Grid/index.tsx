import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { AchievementBadge } from '../AchievementBadge';
import type { AchievementsGridListProps } from './types';

export const AchievementsGridList: React.FC<AchievementsGridListProps> = ({ items }) => {
  return (
    <SimpleGrid
      columns={{ base: 3, sm: 4, md: 5, lg: 6 }}
      columnGap={{ base: '12px', sm: '16px', md: '18px' }}
      rowGap={{ base: '14px', sm: '16px', md: '18px' }}
      justifyItems="center"
      alignItems="start"
      position="relative"
      zIndex={1}
    >
      {items.map((item, index) => (
        <AchievementBadge key={item.id} item={item} index={index} />
      ))}
    </SimpleGrid>
  );
};


