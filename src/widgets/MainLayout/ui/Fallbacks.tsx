import React from 'react';
import { Box } from '@chakra-ui/react';

export const HeaderFallback: React.FC = () => (
  <Box as="header" h={{ base: '56px', md: '64px' }} />
);

export const MainFallback: React.FC = () => (
  <Box as="main" id="main-content" flex="1 0 auto" />
);

export const FooterFallback: React.FC = () => (
  <Box as="footer" h="160px" />
);



