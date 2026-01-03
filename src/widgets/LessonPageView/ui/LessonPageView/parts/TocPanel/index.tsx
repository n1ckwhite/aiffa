import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import type { TocPanelProps } from './types';
import { useLessonNavPending } from 'shared/hooks/useLessonNavPending';
import {
  TOC_MAX_VISIBLE_ITEMS,
  TOC_PANEL_DESKTOP_DISPLAY_MEDIA_QUERY,
  TOC_PANEL_STICKY_TOP_PX,
  TOC_PANEL_WIDTH_PX,
} from './constans';
import { TocTitle } from './parts/TocTitle';
import { TocSkeletonList } from './parts/TocSkeletonList/TocSkeletonList';
import { TocList } from './parts/TocList/TocList';
import { getTocListMaxHeight, getTocScrollSx } from './helpers';

export const TocPanel: React.FC<TocPanelProps> = ({ tocItems, activeTocId, setActiveTocId, isReady, colors }) => {
  const isNavigating = useLessonNavPending();
  const tocListMaxHeight = getTocListMaxHeight(TOC_MAX_VISIBLE_ITEMS);
  const tocScrollSx = getTocScrollSx();

  if (isNavigating) {
    return (
      <Box
        w={{ base: '0', lg: `${TOC_PANEL_WIDTH_PX}px` }}
        display="none"
        position="sticky"
        top={`${TOC_PANEL_STICKY_TOP_PX}px`}
        sx={{ [TOC_PANEL_DESKTOP_DISPLAY_MEDIA_QUERY]: { display: 'block' } }}
      >
        <Box>
          <Skeleton h="10px" w="140px" borderRadius="md" mb={3} />
          <TocSkeletonList maxH={tocListMaxHeight} scrollSx={tocScrollSx} itemsCount={TOC_MAX_VISIBLE_ITEMS} />
        </Box>
      </Box>
    );
  }

  if (!isReady) {
    return (
      <Box
        w={{ base: '0', lg: `${TOC_PANEL_WIDTH_PX}px` }}
        display="none"
        position="sticky"
        top={`${TOC_PANEL_STICKY_TOP_PX}px`}
        sx={{ [TOC_PANEL_DESKTOP_DISPLAY_MEDIA_QUERY]: { display: 'block' } }}
      >
        <Box>
          <Skeleton h="10px" w="140px" borderRadius="md" mb={3} />
          <TocSkeletonList maxH={tocListMaxHeight} scrollSx={tocScrollSx} itemsCount={TOC_MAX_VISIBLE_ITEMS} />
        </Box>
      </Box>
    );
  }

  if (!tocItems.length) return null;
  const { tocTitleColor, tocItemGap } = colors;
  return (
    <Box
      w={{ base: '0', lg: `${TOC_PANEL_WIDTH_PX}px` }}
      display="none"
      position="sticky"
      top={`${TOC_PANEL_STICKY_TOP_PX}px`}
      sx={{ [TOC_PANEL_DESKTOP_DISPLAY_MEDIA_QUERY]: { display: 'block' } }}
    >
      <Box>
        <TocTitle color={tocTitleColor} />
        <TocList
          tocItems={tocItems}
          activeTocId={activeTocId}
          setActiveTocId={setActiveTocId}
          maxH={tocListMaxHeight}
          scrollSx={tocScrollSx}
          tocItemGap={tocItemGap}
          colors={colors}
        />
      </Box>
    </Box>
  );
};