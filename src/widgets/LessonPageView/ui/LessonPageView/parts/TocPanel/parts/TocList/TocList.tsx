import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { TocListItem } from '../TocListItem/TocListItem';
import { TocListProps } from './types';

export const TocList: React.FC<TocListProps> = ({
  tocItems,
  activeTocId,
  setActiveTocId,
  maxH,
  scrollSx,
  tocItemGap,
  colors,
}) => {
  return (
    <Box maxH={maxH} pr={1} sx={scrollSx}>
      <VStack align="stretch" gap={tocItemGap}>
        {tocItems.map((item) => (
          <TocListItem
            key={item.id}
            item={item}
            isActive={activeTocId === item.id}
            setActiveTocId={setActiveTocId}
            colors={colors}
          />
        ))}
      </VStack>
    </Box>
  );
};


