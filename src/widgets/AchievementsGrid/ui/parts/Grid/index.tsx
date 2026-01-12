import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { AchievementBadge } from '../AchievementBadge';
import type { AchievementsGridListProps } from './types';

export const AchievementsGridList: React.FC<AchievementsGridListProps> = ({ items }) => {
  return (
    <SimpleGrid
      as="ul"
      m={0}
      p={0}
      listStyleType="none"
      minChildWidth={{ base: "100%", sm: "320px", md: "360px" }}
      columnGap={{ base: '14px', sm: '18px', md: '20px' }}
      rowGap={{ base: '18px', sm: '20px', md: '22px' }}
      justifyItems="stretch"
      alignItems="start"
      position="relative"
      zIndex={1}
      w="full"
      minW={0}
    >
      {items.map((item, index) => (
        <AchievementBadge key={item.id} item={item} index={index} />
      ))}
    </SimpleGrid>
  );
};


