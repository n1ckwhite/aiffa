import React from 'react';
import { Box } from '@chakra-ui/react';

export const ThumbUp: React.FC<{ color?: string }> = ({ color }) => (
  <Box as="svg" viewBox="0 0 24 24" boxSize={5} fill="none" color={color || 'currentColor'}>
    <path d="M2 10.5a1.5 1.5 0 0 1 1.5-1.5H7v9H3.5A1.5 1.5 0 0 1 2 16.5v-6z" fill="currentColor" />
    <path d="M9 19h6.764c.716 0 1.36-.428 1.64-1.09l2.27-5.317A1.8 1.8 0 0 0 18 10h-5.5l.7-3.513c.135-.678-.306-1.336-.984-1.47-.429-.086-.87.08-1.134.436L9 8.5V19z" fill="currentColor" />
  </Box>
);


