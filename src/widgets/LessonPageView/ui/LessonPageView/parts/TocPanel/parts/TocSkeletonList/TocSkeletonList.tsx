import React from 'react';
import { Box, Skeleton, VStack } from '@chakra-ui/react';
import { TocSkeletonListProps } from './types';

export const TocSkeletonList: React.FC<TocSkeletonListProps> = ({ maxH, scrollSx, itemsCount }) => {
  return (
    <Box maxH={maxH} pr={1} sx={scrollSx}>
      <VStack align="stretch" spacing={2}>
        {Array.from({ length: itemsCount }).map((_, i) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            h="14px"
            w={i % 3 === 0 ? '96%' : i % 3 === 1 ? '84%' : '72%'}
            borderRadius="md"
          />
        ))}
      </VStack>
    </Box>
  );
};


