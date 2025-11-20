import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { spinCss, spinAnimation } from '../../animations/spin';
import { IconRingProps } from './types';



export const IconRing: React.FC<IconRingProps> = ({ ring, taskInnerCircleBg, taskInnerBorder, icon }) => {
  const TagIcon = icon as React.ElementType;
  return (
    <Box position="relative" w="66px" h="66px">
      <Box position="absolute" inset={0} borderRadius="full" bg={`conic-gradient(${ring.from} 0 50%, ${ring.to} 50% 100%)`} opacity={0.9} filter="blur(0.5px)" sx={{ animation: spinAnimation }} />
      <style>{spinCss}</style>
      <Box position="absolute" inset="5px" borderRadius="full" bg={taskInnerCircleBg} borderWidth="1px" borderColor={taskInnerBorder} />
      <Box position="relative" inset="0" w="66px" h="66px" display="flex" alignItems="center" justifyContent="center">
        <Box w="32px" h="32px" borderRadius="full" bgGradient={`linear(to-br, ${ring.from}, ${ring.to})`} color="white" display="flex" alignItems="center" justifyContent="center">
          <Icon as={TagIcon} />
        </Box>
      </Box>
    </Box>
  );
};


