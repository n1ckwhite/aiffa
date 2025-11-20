import React from 'react';
import { Box } from '@chakra-ui/react';

const LearnLayoutSkeleton: React.FC = () => {
  return (
    <Box minH={{ base: '100svh', md: '100vh' }} position="relative" w="100%" px={{ base: 4, md: 6 }} pt={{ base: 8, md: 10 }}>
      <Box />
    </Box>
  );
};

export default LearnLayoutSkeleton;


