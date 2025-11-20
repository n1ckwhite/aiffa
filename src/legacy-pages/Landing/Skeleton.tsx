import React from 'react';
import { Box, Container, VStack, Skeleton, SkeletonText } from '@chakra-ui/react';

const LandingSkeleton: React.FC = () => {
  return (
    <Box as="main" py={{ base: 8, md: 10 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <Box>
            <Skeleton height={{ base: '48px', md: '64px' }} mb={4} />
            <SkeletonText noOfLines={3} spacing="4" skeletonHeight="16px" />
          </Box>
          <Box>
            <Skeleton height="48px" borderRadius="full" mb={3} />
            <Skeleton height="48px" borderRadius="full" />
          </Box>
          <VStack spacing={6} align="stretch">
            <Skeleton height="220px" borderRadius="xl" />
            <Skeleton height="220px" borderRadius="xl" />
            <Skeleton height="220px" borderRadius="xl" />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingSkeleton;


