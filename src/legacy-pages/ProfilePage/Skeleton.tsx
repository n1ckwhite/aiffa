import React from 'react';
import { Box, VStack, HStack, Heading, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ProfileSkeleton: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <Box maxW={{ base: '100%', md: '900px', lg: '1100px' }} mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <Heading size="lg" mb={6} textAlign="center">Профиль</Heading>
        <VStack align="center" spacing={4}>
          <SkeletonCircle boxSize={{ base: '72px', md: '80px' }} />
          <Skeleton h="16px" w="180px" borderRadius="md" />
          <Skeleton h="12px" w="60%" maxW="600px" borderRadius="md" />
          <HStack spacing={3}>
            <Skeleton h="36px" w="96px" borderRadius="md" />
            <Skeleton h="36px" w="96px" borderRadius="md" />
          </HStack>

          {/* GitHub connect block skeleton */}
          <Box w="100%" maxW="680px" mt={4} borderWidth="1px" borderRadius="xl" p={{ base: 4, md: 5 }}>
            <VStack align="stretch" spacing={3}>
              <HStack spacing={2}>
                <SkeletonCircle boxSize="18px" />
                <Skeleton h="12px" w="100px" borderRadius="md" />
              </HStack>
              <Skeleton h="10px" w={{ base: '90%', md: '80%' }} borderRadius="md" />
              <HStack spacing={3}>
                <Skeleton h="40px" flex={1} borderRadius="full" />
                <Skeleton h="40px" w="140px" borderRadius="full" />
              </HStack>
              {/* Connected preview */}
              <HStack spacing={3} pt={1}>
                <SkeletonCircle boxSize="24px" />
                <Skeleton h="10px" w="140px" borderRadius="md" />
                <Skeleton h="10px" w="110px" borderRadius="md" />
              </HStack>
            </VStack>
          </Box>

          <Box w="100%" maxW="900px" mt={4}>
            <Box display="grid" gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={{ base: 4, md: 5 }}>
              <Box borderRadius="2xl" p={{ base: 3, md: 4 }}>
                <VStack spacing={3} align="stretch">
                  <HStack justify="center"><Skeleton h="16px" w="100px" borderRadius="md" /></HStack>
                  <Skeleton h="14px" w="40%" mx="auto" borderRadius="md" />
                  <Skeleton h="12px" w="100%" borderRadius="full" />
                  <HStack justify="space-between">
                    <Skeleton h="20px" w="90px" borderRadius="full" />
                    <Skeleton h="20px" w="90px" borderRadius="full" />
                  </HStack>
                  <Box h="1px" w="100%" borderRadius="full" />
                  <VStack>
                    <Skeleton h="32px" w="160px" borderRadius="full" />
                  </VStack>
                </VStack>
              </Box>
              <Box borderRadius="2xl" p={{ base: 3, md: 4 }}>
                <VStack spacing={3} align="stretch">
                  <HStack justify="center"><Skeleton h="16px" w="100px" borderRadius="md" /></HStack>
                  <Box display="flex" alignItems="center" justifyContent="center" minH={{ base: '110px', md: '130px' }}>
                    <SkeletonCircle boxSize={{ base: '96px', md: '108px' }} />
                  </Box>
                  <Box h="1px" w="100%" borderRadius="full" />
                  <VStack>
                    <Skeleton h="32px" w="180px" borderRadius="full" />
                  </VStack>
                </VStack>
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>
      <Box maxW="900px" mx="auto" px={{ base: 4, md: 6 }} pb={{ base: 8, md: 12 }}>
        <Box>
          <Skeleton h="18px" w="160px" mx="auto" mb={3} borderRadius="md" />
          <Box display="grid" gridTemplateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)', lg: 'repeat(6, 1fr)' }} gap={{ base: '14px', sm: '16px', md: '18px' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Box key={i} display="flex" flexDirection="column" alignItems="center" justifyContent="start">
                <SkeletonCircle boxSize={{ base: '50px', sm: '54px' }} />
                <Skeleton mt={2} h="10px" w="70%" borderRadius="md" />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSkeleton;
