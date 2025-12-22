import React from 'react';
import { Box } from '@chakra-ui/react';

const LearnLayoutSkeleton: React.FC = () => {
  return (
    <Box
      position="relative"
      w="100%"
      px={{ base: 4, md: 6 }}
      pt={{ base: 8, md: 10 }}
      sx={{
        minHeight: "100vh",
        "@supports (height: 100dvh)": {
          minHeight: "100dvh",
        },
      }}
    >
      <Box />
    </Box>
  );
};

export default LearnLayoutSkeleton;


