import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const LessonTasksSkeleton: React.FC = () => {
  return (
    <VStack align="stretch" gap={6} pb="32px">
      {/* Main container: mirrors LessonTasksView */}
      <Box maxW="1280px" mx="auto" w="100%" px={0}>
        {/* StageBreadcrumb */}
        <HStack spacing={2} mb={4} align="center">
          <Skeleton h="28px" w="180px" borderRadius="full" />
          <Skeleton h="10px" w="6px" borderRadius="full" />
          <Skeleton h="10px" w="120px" borderRadius="full" />
          <Skeleton h="10px" w="6px" borderRadius="full" />
          <Skeleton h="10px" w="90px" borderRadius="full" />
        </HStack>

        {/* Card wrapper (same as LessonTasksView header/list container) */}
        <Box
          bg="transparent"
          borderWidth={0}
          borderRadius="xl"
          px={0}
          position="relative"
          boxShadow="none"
        >
          {/* Header (mirrors TasksHeader layout + responsive buttons) */}
          <HStack
            justify="space-between"
            align="center"
            spacing={{ base: 2, md: 3 }}
            mb={4}
            mt={4}
          >
            <HStack spacing={3} align="center">
              <Box
                w={{ base: '44px', md: '56px' }}
                h={{ base: '44px', md: '56px' }}
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <SkeletonCircle boxSize={{ base: '44px', md: '56px' }} />
              </Box>
              <Skeleton h="26px" w={{ base: '96px', md: '120px' }} borderRadius="md" />
              <Skeleton h="24px" w="64px" borderRadius="full" display={{ base: 'none', md: 'block' }} />
            </HStack>

            <Skeleton
              h="40px"
              w="150px"
              borderRadius="full"
              mt={2}
              mb={4}
              display={{ base: 'none', md: 'inline-flex' }}
            />
          </HStack>

          <Skeleton
            h="40px"
            w="170px"
            borderRadius="full"
            mt={2}
            mb={4}
            display={{ base: 'flex', md: 'none' }}
          />
          {/* Tasks list (mirrors spacing + card anatomy) */}
          <VStack align="stretch" spacing={{ base: 6, md: 8 }} mt={{ base: 2, md: 4 }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                position="relative"
                borderWidth="1px"
                borderColor="blackAlpha.200"
                borderRadius="2xl"
                py={{ base: 4, md: 5 }}
                px={{ base: 4, md: 5 }}
                bg="transparent"
                boxShadow="none"
              >
                {/* TaskHeader */}
                <HStack justify="space-between" align="center" mb={3}>
                  <HStack>
                    <SkeletonCircle boxSize="36px" />
                  </HStack>
                </HStack>

                {/* Description */}
                <SkeletonText noOfLines={2} spacing="3" mb={3} />

                {/* TaskMeta (single line) */}
                <Skeleton h="12px" w="180px" borderRadius="md" mb={2} />

                {/* TaskHint button */}
                <Skeleton h="24px" w="110px" borderRadius="full" mb={3} />

                {/* TaskRenderer (terminal-like block + button) */}
                <VStack align="stretch" spacing={{ base: 4, md: 3 }}>
                  <Box borderRadius="12px" overflow="hidden">
                    <Box px={3} pb={3}>
                      <HStack spacing={2}>
                        <SkeletonCircle boxSize="12px" />
                        <Skeleton h="16px" w="70%" borderRadius="md" />
                      </HStack>
                    </Box>
                  </Box>
                  <Skeleton
                    alignSelf="flex-start"
                    mt={{ base: 5, md: 3 }}
                    h="32px"
                    w="110px"
                    borderRadius="md"
                  />
                </VStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* FAQ block placeholder (mirrors ModulesFAQ + SupportBlock layout constraints) */}
      <Box px={0} id="tasks-faq-anchor">
        <VStack align="stretch" gap={{ base: 5, md: 7 }} maxW={{ base: '100%', md: '900px' }} mx="auto">
          {/* FAQ heading row */}
          <HStack mb={2} spacing={3} align="center">
            <SkeletonCircle boxSize={{ base: '18px', md: '20px' }} />
            <Skeleton h="22px" w={{ base: '220px', md: '280px' }} borderRadius="md" />
          </HStack>
          {/* FAQ accordion card */}
          <Box borderWidth="1px" borderColor="blackAlpha.200" borderRadius="2xl" p={{ base: 3, md: 4, lg: 5 }}>
            <VStack align="stretch" spacing={3}>
              {/* First item (expanded-like) */}
              <HStack justify="space-between" align="flex-start" py={{ base: 2.5, md: 3 }}>
                <Skeleton h="18px" w={{ base: '78%', md: '70%' }} borderRadius="md" />
                <SkeletonCircle boxSize="22px" />
              </HStack>
              <SkeletonText noOfLines={3} spacing="3" mb={1} />
              {/* Next items */}
              <HStack justify="space-between" align="flex-start" py={{ base: 2.5, md: 3 }}>
                <Skeleton h="18px" w={{ base: '74%', md: '68%' }} borderRadius="md" />
                <SkeletonCircle boxSize="22px" />
              </HStack>
              <HStack justify="space-between" align="flex-start" py={{ base: 2.5, md: 3 }}>
                <Skeleton h="18px" w={{ base: '70%', md: '62%' }} borderRadius="md" />
                <SkeletonCircle boxSize="22px" />
              </HStack>
            </VStack>
          </Box>
          {/* SupportBlock placeholder */}
          <Box borderWidth="1px" borderColor="blackAlpha.200" borderRadius="2xl" py={{ base: 3, md: 4, lg: 5 }} px={{ base: 3, md: 4, lg: 5 }}>
            <HStack spacing={5} align={{ base: 'stretch', md: 'flex-start' }} flexDirection={{ base: 'column', md: 'row' }}>
              <SkeletonCircle boxSize="48px" />
              <VStack align="stretch" spacing={3} flex={1}>
                <Skeleton h="20px" w="240px" borderRadius="md" />
                <SkeletonText noOfLines={3} spacing="3" />
                <HStack spacing={3} flexWrap="wrap">
                  <Skeleton h="40px" w={{ base: '100%', md: '190px' }} borderRadius="full" />
                  <Skeleton h="40px" w={{ base: '100%', md: '190px' }} borderRadius="full" />
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default LessonTasksSkeleton;


