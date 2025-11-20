import React from 'react';
import { Box } from '@chakra-ui/react';
import type { IndexChipProps } from './types';

export const IndexChip: React.FC<IndexChipProps> = ({ done, indexBg, accentColor, children }) => {
  return (
    <Box minW="28px" h="28px" borderRadius="full" bg={done ? 'green.400' : indexBg} color={done ? 'white' : accentColor} display="flex" alignItems="center" justifyContent="center" fontSize="sm" fontWeight="bold">
      {children}
    </Box>
  );
};


