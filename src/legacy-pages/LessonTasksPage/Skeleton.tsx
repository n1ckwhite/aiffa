import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const LessonTasksSkeleton: React.FC = () => {
  return (
    <Box px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <HStack spacing={3} mb={3} justify="space-between" align="center" flexWrap="wrap">
        <HStack spacing={3}>
          <SkeletonCircle boxSize="20px" />
          <Box as="h1" fontSize="lg" fontWeight="semibold">Задачи</Box>
        </HStack>
        <HStack spacing={2}>
          <Skeleton h="22px" w="56px" borderRadius="full" />
        </HStack>
      </HStack>
      <HStack spacing={2} mb={4} flexWrap="wrap">
        <Skeleton h="20px" w="140px" borderRadius="full" />
        <Skeleton h="20px" w="100px" borderRadius="full" />
      </HStack>

      <VStack align="stretch" spacing={5}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Box key={i} borderRadius="2xl" p={{ base: 4, md: 5 }}>
            <HStack spacing={3} align="center" mb={2}>
              <SkeletonCircle boxSize="28px" />
              <VStack align="stretch" spacing={2} flex={1}>
                <Skeleton h="16px" w={{ base: '80%', md: '60%' }} borderRadius="md" />
                <Skeleton h="12px" w={{ base: '60%', md: '40%' }} borderRadius="md" />
              </VStack>
            </HStack>
            <HStack spacing={2} mb={3} flexWrap="wrap">
              <Skeleton h="20px" w="90px" borderRadius="full" />
              <Skeleton h="12px" w="120px" borderRadius="md" />
            </HStack>
            <VStack align="stretch" spacing={2} mb={4}>
              <HStack spacing={3}>
                <SkeletonCircle boxSize="12px" />
                <Skeleton h="12px" w="70%" borderRadius="md" />
              </HStack>
              <HStack spacing={3}>
                <SkeletonCircle boxSize="12px" />
                <Skeleton h="12px" w="65%" borderRadius="md" />
              </HStack>
              <HStack spacing={3}>
                <SkeletonCircle boxSize="12px" />
                <Skeleton h="12px" w="60%" borderRadius="md" />
              </HStack>
            </VStack>
            <HStack spacing={3}>
              <Skeleton h="36px" w="120px" borderRadius="full" />
              <Skeleton h="20px" w="80px" borderRadius="full" />
            </HStack>
          </Box>
        ))}
      </VStack>

      <Box mt={{ base: 5, md: 8 }} borderRadius="2xl" p={{ base: 4, md: 5 }}>
        <HStack spacing={3} mb={2}>
          <SkeletonCircle boxSize="18px" />
          <Skeleton h="14px" w="200px" borderRadius="md" />
        </HStack>
        <SkeletonText noOfLines={2} spacing="3" />
      </Box>
    </Box>
  );
};

export default LessonTasksSkeleton;


