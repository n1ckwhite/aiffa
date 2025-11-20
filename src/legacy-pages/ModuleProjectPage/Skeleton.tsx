import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ModuleProjectSkeleton: React.FC = () => {
  return (
    <Box w="100%" maxW={{ base: '100%', md: '1100px' }} mx="auto" px={0} py={0}>
      <VStack align="stretch" gap={4} maxW="840px" mx="auto">
        <HStack spacing={3} mb={2}>
          <SkeletonCircle boxSize="22px" />
          <Skeleton h="18px" w="40%" borderRadius="md" />
        </HStack>

        <Box borderWidth="1px" borderRadius="xl" p={4}>
          <HStack spacing={3} mb={3} align="center">
            <SkeletonCircle boxSize="36px" />
            <VStack align="stretch" spacing={2} flex={1}>
              <Skeleton h="16px" w="60%" borderRadius="md" />
              <Skeleton h="14px" w="40%" borderRadius="md" />
            </VStack>
          </HStack>
          <Skeleton h="14px" w="80%" borderRadius="md" mb={2} />
          <Skeleton h="14px" w="60%" borderRadius="md" mb={2} />
        </Box>

        <Skeleton h="260px" borderRadius="xl" />
      </VStack>
    </Box>
  );
};

export default ModuleProjectSkeleton;


