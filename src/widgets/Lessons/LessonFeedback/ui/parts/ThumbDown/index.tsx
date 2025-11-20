import React from 'react';
import { Box } from '@chakra-ui/react';

export const ThumbDown: React.FC<{ color?: string }> = ({ color }) => (
  <Box as="svg" viewBox="0 0 24 24" boxSize={5} fill="none" color={color || 'currentColor'}>
    <path d="M22 13.5a1.5 1.5 0 0 1-1.5 1.5H17v-9h3.5A1.5 1.5 0 0 1 22 7.5v6z" fill="currentColor"/>
    <path d="M15 5H8.236c-.716 0-1.36.428-1.64 1.09L4.327 11.41A1.8 1.8 0 0 0 6 15h5.5l-.7 3.513a1.25 1.25 0 0 0 2.118 1.034L15 15.5V5z" fill="currentColor"/>
  </Box>
);


