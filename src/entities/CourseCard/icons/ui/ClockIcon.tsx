import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const ClockIcon: React.FC<BoxProps> = (props) => (
  <Box as="svg" w="16px" h="16px" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Box>
);


