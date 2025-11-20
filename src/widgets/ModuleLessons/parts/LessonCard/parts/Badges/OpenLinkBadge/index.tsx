import React from 'react';
import { Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import type { OpenLinkBadgeProps } from './types';
import { useOpenLinkBadgeColors } from './colors/useOpenLinkBadgeColor';

export const OpenLinkBadge: React.FC<OpenLinkBadgeProps> = ({ accentColor, chipBorder, arrowAnimation }) => {
  
  const {pillBg} = useOpenLinkBadgeColors();
  return (
    <Box
      as="span"
      fontSize="xs"
      color={accentColor}
      bg={pillBg}
      borderWidth="1px"
      borderColor={chipBorder}
      px={2.5}
      py={1}
      borderRadius="full"
      display="inline-flex"
      alignItems="center"
      gap={1}
    >
      Открыть материал
      <Box as={ChevronRightIcon} boxSize={3.5} ml={0.5} animation={arrowAnimation} />
    </Box>
  );
};


