import React from 'react';
import { Box, VStack, HStack, Heading, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ModuleProjectsSkeleton: React.FC = () => {
  return (
    <Box>
      <Box px={0}>
        <VStack align="stretch" gap={7} maxW={{ base: '100%', md: '900px' }} mx="auto">
        <Box borderWidth="2px" borderRadius="xl" p={{ base: 4, md: 6 }}>
            <HStack align="center" spacing={{ base: 2, md: 3 }} mb={2}>
              <SkeletonCircle boxSize={{ base: '36px', md: '44px' }} />
              <Heading as="h1" size="lg">Проекты</Heading>
            </HStack>
            <HStack gap={3} align="center" flexWrap="wrap">
              <Skeleton h="20px" w="90px" borderRadius="full" />
              <Skeleton h="20px" w="110px" borderRadius="full" />
              <Skeleton h="12px" w="120px" borderRadius="md" />
            </HStack>
            <Skeleton mt={3} h="14px" w="80%" borderRadius="md" />
            <HStack spacing={{ base: 2.5, md: 3 }} pt={3} wrap="wrap">
              <Skeleton h="32px" w="140px" borderRadius="full" />
              <Skeleton h="32px" w="180px" borderRadius="full" />
            </HStack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} borderWidth="2px" borderRadius="xl" p={5} position="relative" overflow="hidden">
                <HStack spacing={3} align="flex-start">
                  <SkeletonCircle boxSize="28px" />
                  <VStack align="stretch" spacing={2} flex={1}>
                    <Skeleton h="16px" w="70%" borderRadius="md" />
                    <HStack spacing={2} flexWrap="wrap">
                      <Skeleton h="16px" w="90px" borderRadius="full" />
                      <Skeleton h="16px" w="110px" borderRadius="full" />
                    </HStack>
                    <HStack spacing={2} pt={1}>
                      <Skeleton h="24px" w="130px" borderRadius="full" />
                    </HStack>
                  </VStack>
                  <Skeleton h="20px" w="20px" borderRadius="md" />
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          <HStack justify="space-between" align="center" pt={2}>
            <Skeleton h="36px" w="36px" borderRadius="md" />
            <HStack>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} h="28px" w="36px" borderRadius="md" />
              ))}
            </HStack>
            <Skeleton h="36px" w="36px" borderRadius="md" />
          </HStack>

          <Box borderWidth="2px" borderRadius="2xl" p={{ base: 4, md: 5 }}>
            <HStack align="flex-start" spacing={3}>
              <Skeleton h="24px" w="24px" borderRadius="full" />
              <VStack align="stretch" spacing={2} flex={1}>
                <Skeleton h="18px" w="40%" borderRadius="md" />
                <Skeleton h="12px" w="80%" borderRadius="md" />
                <HStack spacing={3} pt={1} wrap="wrap">
                  <Skeleton h="32px" w="150px" borderRadius="full" />
                  <Skeleton h="32px" w="170px" borderRadius="full" />
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ModuleProjectsSkeleton;


