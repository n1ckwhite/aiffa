import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import type { ScrollHintProps } from './types';

export const ScrollHint: FC<ScrollHintProps> = ({ side, color, bg, animation }) => {
  const isLeft = side === 'left';
  const Icon = isLeft ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <Box aria-hidden="true" pointerEvents="none" color={color} bg={bg} position="absolute" {...(isLeft ? { left: 0 } : { right: 0 })} top="50%" transform="translateY(-50%)">
      <Box as={Icon} boxSize={5} animation={animation} />
    </Box>
  );
};


