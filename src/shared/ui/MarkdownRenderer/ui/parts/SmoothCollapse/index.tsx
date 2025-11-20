import React from 'react';
import { Box } from '@chakra-ui/react';
import type { SmoothCollapseProps } from './types';

export const SmoothCollapse: React.FC<SmoothCollapseProps> = ({ open, children }) => {
  return <Box display={open ? 'block' : 'none'}>{children}</Box>;
};


