import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSegmentColors } from '../../../colors/useSegmentColors';
import { useSegmentCtx } from '../../../model/context';
import { useIndicatorPosition } from '../../../hooks/useIndicatorPosition';

const Indicator: React.FC = () => {
  const { value, rootRef, orientation, size } = useSegmentCtx();
  const { indicatorBg } = useSegmentColors();
  const { style, ready, inset, borderFixY } = useIndicatorPosition({ value, rootRef, orientation, size });

  return (
    <Box
      position="absolute"
      top={`${style.top + borderFixY}px`}
      left={`${style.left}px`}
      h={orientation === 'vertical' ? `${style.height - borderFixY * 2}px` : `calc(100% - ${inset * 2 + borderFixY * 2}px)`}
      w={orientation === 'vertical' ? `calc(100% - ${inset * 2}px)` : `${style.width}px`}
      bg={indicatorBg}
      borderRadius="full"
      transition="left 180ms ease, width 180ms ease, top 180ms ease, height 180ms ease"
      zIndex={0}
      visibility={ready ? 'visible' : 'hidden'}
    />
  );
};

export default Indicator;


