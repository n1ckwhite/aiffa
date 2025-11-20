import React from 'react';
import { Box } from '@chakra-ui/react';

const HeaderSpacer: React.FC = () => {
  return <Box h={{ base: 'calc(56px + var(--header-offset, 0px))', md: '64px' }} />;
};

export default HeaderSpacer;



