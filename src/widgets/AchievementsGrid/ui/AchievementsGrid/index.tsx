import React from 'react';
import { Box } from '@chakra-ui/react';
import { AchievementsHeader } from '../parts/Header';
import { AchievementsGridList } from '../parts/Grid';
import type { AchievementsGridProps } from '../../types';

const AchievementsGrid: React.FC<AchievementsGridProps> = ({ items, showHeader = true, showBackground = true }) => {
  return (
    <Box position="relative" overflow="visible" w="full" minW={0}>
      {showBackground ? (
        <>
          <Box aria-hidden="true" position="absolute" top={-8} left={-10} w={{ base: '180px', md: '240px' }} h={{ base: '180px', md: '240px' }} borderRadius="full" filter="blur(48px)" opacity={0.55} pointerEvents="none" />
          <Box aria-hidden="true" position="absolute" bottom={-10} right={-10} w={{ base: '200px', md: '260px' }} h={{ base: '200px', md: '260px' }} borderRadius="full" filter="blur(60px)" opacity={0.45} pointerEvents="none" />
        </>
      ) : null}
      {showHeader ? <AchievementsHeader /> : null}
      <AchievementsGridList items={items} />
    </Box>
  );
};

export default AchievementsGrid;


