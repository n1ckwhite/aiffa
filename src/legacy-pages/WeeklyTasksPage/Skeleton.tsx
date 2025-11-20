import React from 'react';
import { Box, VStack, HStack, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const WeeklyTasksSkeleton: React.FC = () => {
  return (
    <Box position="relative">
      <Box w="100%" maxW="1440px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <VStack spacing={2} mb={3}>
          <HStack justify="center" align="center" spacing={3} w="100%">
            <SkeletonCircle boxSize="20px" />
            <Box as="h1" fontSize="lg" fontWeight="semibold" textAlign="center">
              Задачи недели
            </Box>
          </HStack>
          <Skeleton h="12px" w={{ base: '90%', md: '70%' }} borderRadius="md" />
        </VStack>
        <VStack spacing={3} mb={6}>
          <Box borderRadius="2xl" p={{ base: 5, md: 6 }} maxW="980px" w="100%" mx="auto">
            <VStack spacing={{ base: 4, md: 5 }}>
              <Skeleton h="16px" w="160px" borderRadius="full" />
              <Skeleton h="12px" w={{ base: '90%', md: '80%' }} borderRadius="md" />
              <Skeleton h="12px" w={{ base: '75%', md: '60%' }} borderRadius="md" />
              <HStack spacing={3} justify="center">
                <HStack spacing={-3}>
                  <SkeletonCircle boxSize={{ base: '34px', md: '40px' }} />
                  <SkeletonCircle boxSize={{ base: '34px', md: '40px' }} />
                  <SkeletonCircle boxSize={{ base: '34px', md: '40px' }} />
                  <SkeletonCircle boxSize={{ base: '34px', md: '40px' }} />
                </HStack>
                <Skeleton h="12px" w={{ base: '60%', md: '260px' }} borderRadius="md" />
              </HStack>
              <HStack spacing={{ base: 3, md: 4 }} justify="center" wrap="wrap" pt={{ base: 1, md: 2 }} w="100%">
                <Skeleton h="44px" w={{ base: '100%', sm: '280px' }} borderRadius="full" />
                <Skeleton h="44px" w={{ base: '100%', sm: '280px' }} borderRadius="full" />
              </HStack>
            </VStack>
          </Box>
        </VStack>
        <VStack spacing={3} mb={6}>
          <HStack spacing={4} wrap="wrap" justify="center">
            <Skeleton h="32px" w="160px" borderRadius="full" />
          </HStack>
          <HStack spacing={3} wrap="wrap" justify="center">
            <Skeleton h="14px" w={{ base: '260px', md: '340px' }} borderRadius="md" />
            <HStack borderWidth="1px"  borderRadius="full" px={3} py={1}>
              <Skeleton h="14px" w="28px" borderRadius="sm" />
              <Box as="span" w="6px" />
              <Skeleton h="14px" w="28px" borderRadius="sm" />
              <Box as="span" w="6px" />
              <Skeleton h="14px" w="28px" borderRadius="sm" />
              <Box as="span" w="6px" />
              <Skeleton h="14px" w="28px" borderRadius="sm" />
            </HStack>
          </HStack>
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 5, md: 7, lg: 8 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Box key={i} position="relative" borderWidth="1px" borderRadius="xl" p={4} overflow="hidden">
              <HStack mb={3} spacing={3}>
                <Skeleton h="20px" w="64px" borderRadius="full" />
              </HStack>
              <Skeleton h="18px" w="80%" mb={2} borderRadius="md" />
              <Skeleton h="12px" w="95%" mb={1.5} borderRadius="md" />
              <Skeleton h="12px" w="70%" mb={4} borderRadius="md" />
              <HStack justify="space-between" align="center">
                <Skeleton h="28px" w="120px" borderRadius="full" />
                <Skeleton h="24px" w="72px" borderRadius="md" />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
        <VStack spacing={{ base: 6, md: 7 }} mt={{ base: 6, md: 8 }} align="stretch">
          <VStack align="stretch" spacing={3}>
            <Skeleton h="18px" w="260px" borderRadius="md" />
            <Box borderWidth="1px" borderRadius="2xl" p={{ base: 3, md: 4 }}>
              <VStack align="stretch" spacing={2}>
                <Skeleton h="14px" w="80%" borderRadius="md" />
                <Skeleton h="14px" w="82%" borderRadius="md" />
                <Skeleton h="14px" w="70%" borderRadius="md" />
              </VStack>
            </Box>
          </VStack>

          <Box borderWidth="1px" borderRadius="2xl" p={{ base: 4, md: 5 }} boxShadow="sm">
            <HStack spacing={4} align="flex-start">
              <SkeletonCircle boxSize={10} />
              <VStack align="stretch" spacing={3} w="100%">
                <Skeleton h="18px" w="220px" borderRadius="md" />
                <Skeleton h="14px" w="95%" borderRadius="md" />
                <Skeleton h="14px" w="85%" borderRadius="md" />
                <Skeleton h="14px" w="70%" borderRadius="md" />
                <HStack spacing={{ base: 3, md: 4 }} wrap="wrap" pt={1}>
                  <Skeleton h="40px" w={{ base: '100%', sm: '220px' }} borderRadius="full" />
                  <Skeleton h="40px" w={{ base: '100%', sm: '220px' }} borderRadius="full" />
                  <Skeleton h="40px" w={{ base: '100%', sm: '200px' }} borderRadius="full" />
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default WeeklyTasksSkeleton;
