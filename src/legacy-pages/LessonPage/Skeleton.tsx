import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const LessonPageSkeleton: React.FC = () => {
  return (
    <Box maxW={{ base: '100%', md: '900px' }} mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <HStack spacing={3} mb={3}>
        <SkeletonCircle boxSize="22px" />
        <Box as="h1" fontSize="xl" fontWeight="semibold">Материал</Box>
      </HStack>
      <Skeleton h="14px" w="90%" borderRadius="md" mb={3} />
      <Skeleton h="14px" w="60%" borderRadius="md" mb={6} />
      <Box h="240px" borderWidth="1px" borderRadius="lg" mb={6} />
      <VStack align="stretch" spacing={3}>
        {Array.from({ length: 3 }).map((_, i) => (
          <HStack key={i} spacing={3}>
            <SkeletonCircle boxSize="16px" />
            <Skeleton h="14px" w="80%" borderRadius="md" />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default LessonPageSkeleton;


