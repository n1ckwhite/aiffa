import React from 'react';
import { Box } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import type { OpenProjectsBadgeProps } from './types';
import { PROJECT_LINK_TEXTS } from '../../data';
import { useOpenProjectsBadgeColors } from './colors/useOpenProjectsBadgeColors';

export const OpenProjectsBadge: React.FC<OpenProjectsBadgeProps> = ({ colors, arrowAnimationCss }) => {
  const {pillBg} = useOpenProjectsBadgeColors();
  return (
    <Box
      as="span"
      fontSize="xs"
      color={colors.blue.accent}
      bg={pillBg}
      borderWidth="1px"
      borderColor={colors.blue.chipBorder}
      px={2.5}
      py={1}
      borderRadius="full"
      display="inline-flex"
      alignItems="center"
      gap={1}
    >
      {PROJECT_LINK_TEXTS.open}
      <Box as={ChevronRightIcon} boxSize={3.5} ml={0.5} animation={arrowAnimationCss} />
    </Box>
  );
};


