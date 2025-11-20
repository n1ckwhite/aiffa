import React from 'react';
import { Box } from '@chakra-ui/react';
import type { AchievementsSectionProps } from '../types/AchievementsSection.types';
import type { AchievementsGridProps } from 'widgets/AchievementsGrid/types';

const AchievementsGrid = React.lazy(() => import('widgets/AchievementsGrid')) as React.LazyExoticComponent<React.FC<AchievementsGridProps>>;

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ items, skeletonBg }) => {
  return (
    <Box>
      <React.Suspense
        fallback={(
          <Box>
            <Box h="18px" w="120px" mx="auto" mb={3} borderRadius="md" bg={skeletonBg} />
            <Box display="grid" gridTemplateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)', lg: 'repeat(6, 1fr)' }} gap={{ base: '14px', sm: '16px', md: '18px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <Box key={i} display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                  <Box w={{ base: '50px', sm: '54px' }} h={{ base: '50px', sm: '54px' }} borderRadius="full" bg={skeletonBg} />
                  <Box mt={2} h="10px" w="70%" borderRadius="md" bg={skeletonBg} />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      >
        <AchievementsGrid items={items as any} />
      </React.Suspense>
    </Box>
  );
};

export default AchievementsSection;


