import React from 'react';
import { Box, VStack, HStack, Heading, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ModuleLessonsSkeleton: React.FC = () => {
  return (
    <Box>
      <Box px={0}>
        <VStack align="stretch" gap={7} maxW={{ base: '100%', md: '900px' }} mx="auto">
          {/* Header card */}
          <Box borderRadius="xl" p={{ base: 4, md: 6 }}>
            <HStack align="center" spacing={{ base: 2, md: 3 }} mb={2}>
              <SkeletonCircle boxSize={{ base: '36px', md: '44px' }} />
              <Skeleton h="18" w="170px" borderRadius="full" />
            </HStack>
            <HStack gap={3} align="center" flexWrap="wrap" mb={3}>
              <Skeleton h="20px" w="90px" borderRadius="full" />
              <Skeleton h="20px" w="110px" borderRadius="full" />
              <Skeleton h="12px" w="160px" borderRadius="md" />
            </HStack>
            <Skeleton mt={2} h="14px" w="88%" borderRadius="md" />
            <Skeleton mt={2} h="14px" w="70%" borderRadius="md" />
            <HStack spacing={{ base: 2.5, md: 3 }} pt={3} wrap="wrap">
              <Skeleton h="32px" w="140px" borderRadius="full" />
              <Skeleton h="32px" w="180px" borderRadius="full" />
            </HStack>
          </Box>

          {/* Project link card skeleton */}
          <Box borderRadius="xl" p={{ base: 4, md: 5 }} position="relative" overflow="hidden">
            <HStack spacing={3} align="flex-start">
              <SkeletonCircle boxSize={8} />
              <VStack align="stretch" spacing={2} flex={1}>
                <Skeleton h="16px" w="75%" borderRadius="md" />
                <HStack spacing={2} flexWrap="wrap">
                  <Skeleton h="18px" w="120px" borderRadius="full" />
                  <Skeleton h="18px" w="130px" borderRadius="full" />
                </HStack>
              </VStack>
              <Skeleton h="20px" w="20px" borderRadius="md" />
            </HStack>
          </Box>

          {/* Lessons grid skeleton */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Box key={i} borderRadius="xl" p={5} position="relative" overflow="hidden">
                <HStack spacing={3} align="flex-start">
                  <SkeletonCircle boxSize="28px" />
                  <VStack align="stretch" spacing={2} flex={1}>
                    {/* Заголовок урока */}
                    <Skeleton h="16px" w="80%" borderRadius="md" />
                    {/* Мета‑информация: звёзды, просмотры, комментарии */}
                    <HStack spacing={3} flexWrap="wrap">
                      <Skeleton h="14px" w="46px" borderRadius="full" />
                      <Skeleton h="14px" w="46px" borderRadius="full" />
                      <Skeleton h="14px" w="46px" borderRadius="full" />
                    </HStack>
                    {/* Бейджи: задачи, автор, «Открыть материал» */}
                    <HStack spacing={2} flexWrap="wrap" pt={1}>
                      <Skeleton h="20px" w="90px" borderRadius="full" />
                      <Skeleton h="20px" w="110px" borderRadius="full" />
                    </HStack>
                  </VStack>
                  <Skeleton h="20px" w="20px" borderRadius="md" />
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Contribution invite skeleton */}
          <Box borderRadius="2xl" p={{ base: 4, md: 5 }}>
            <HStack align="flex-start" spacing={3}>
              <SkeletonCircle boxSize={8} />
              <VStack align="stretch" spacing={2} flex={1}>
                <Skeleton h="18px" w="60%" borderRadius="md" />
                <Skeleton h="12px" w="85%" borderRadius="md" />
                <Skeleton h="12px" w="72%" borderRadius="md" />
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

export default ModuleLessonsSkeleton;