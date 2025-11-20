import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import type { MonacoPlaceholderProps } from './types';

export const MonacoPlaceholder: FC<MonacoPlaceholderProps> = ({ placeholder, color }) => {
  return (
    <Box
      position="absolute"
      top="12px"
      left="14px"
      color={color}
      pointerEvents="none"
      fontFamily="mono"
      fontSize="sm"
      fontStyle="italic"
      opacity={0.9}
    >
      {placeholder}
    </Box>
  );
};


