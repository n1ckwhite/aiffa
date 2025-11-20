import React from 'react';
import { Box } from '@chakra-ui/react';
import type { HorizontalScrollProps } from './types';
import { useHorizontalScrollColors } from '../colors/useHorizontalScrollColors';
import { nudgeLeft, nudgeRight } from '../animations/nudge';
import { useHorizontalScrollState } from '../../model/useHorizontalScrollState';
import { ScrollHint } from '../parts/ScrollHint';

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children, height, mb }) => {
  const { ref, canLeft, canRight } = useHorizontalScrollState();
  const { btnBg, btnColor } = useHorizontalScrollColors();

  const leftAnimation = `${nudgeLeft} 1.2s ease-in-out infinite`;
  const rightAnimation = `${nudgeRight} 1.2s ease-in-out infinite`;

  return (
    <Box position="relative" mb={mb} h={height}>
      <Box
        ref={ref}
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
        sx={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {children}
      </Box>
      {canLeft && <ScrollHint side="left" color={btnColor} bg={btnBg} animation={leftAnimation} />}
      {canRight && <ScrollHint side="right" color={btnColor} bg={btnBg} animation={rightAnimation} />}
    </Box>
  );
};

export default HorizontalScroll;


