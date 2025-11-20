import React from 'react';
import { Box } from '@chakra-ui/react';
import type { IconBadgeProps } from './types';

export const IconBadge: React.FC<IconBadgeProps> = ({ levelScheme, borderColor, children }) => {
  return (
    <Box
      p={3}
      borderRadius="full"
      bg={`${levelScheme}.50`}
      color={`${levelScheme}.600`}
      w="48px"
      h="48px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      borderWidth="1px"
      borderColor={borderColor}
      alignSelf={{ base: 'flex-start', md: 'auto' }}
    >
      {children}
    </Box>
  );
};


