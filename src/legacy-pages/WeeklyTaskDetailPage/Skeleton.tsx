import React from 'react';
import { Box, VStack, HStack, Heading, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

const WeeklyTaskDetailSkeleton: React.FC = () => {
  const theme = useAppColors();
  const bg = theme.controlsBg;
  const border = theme.borderColor;
  const faint = theme.cardHoverBg;
  return (
    <Box
      w="100%"
      maxW={{ base: '100%', md: '1100px', lg: '1280px' }}
      mx="auto"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
    >
      <Box borderWidth={0} borderColor={border} borderRadius="xl" p={{ base: 0, md: 0 }}>
        {/* Tag / status */}
        <HStack spacing={3} mb={2} align="center">
          <Skeleton h="20px" w="70px" borderRadius="full" />
          <Skeleton h="20px" w="90px" borderRadius="full" />
        </HStack>

        {/* Title */}
        <Heading size="lg" mb={3}>
          <Skeleton h="24px" w="60%" borderRadius="md" />
        </Heading>
        {/* Description */}
        <Skeleton h="12px" w="80%" mb={2} borderRadius="md" />

        {/* Back button under title */}
        <Skeleton h="36px" w="200px" borderRadius="full" mb={4} />

        {/* Author card + совет + метрики */}
        <Box
          role="note"
          aria-label="Совет автора"
          bg={faint}
          borderWidth="1px"
          borderColor={border}
          borderRadius="lg"
          p={3}
          mb={3}
        >
          <HStack spacing={3} align="flex-start">
            {/* Аватар */}
            <SkeletonCircle boxSize="32px" />
            <VStack align="stretch" spacing={2} flex={1}>
              {/* Автор: имя + спасибо за вклад */}
              <Skeleton h="12px" w="60%" borderRadius="md" />
              <Skeleton h="10px" w="70%" borderRadius="md" />
              {/* Совет автора */}
              <Skeleton h="10px" w="85%" borderRadius="md" />
              {/* Метрики + кнопка \"Спасибо автору\" */}
              <HStack spacing={3} mt={1}>
                <Skeleton h="10px" w="36px" borderRadius="md" />
                <Skeleton h="24px" w="120px" borderRadius="full" />
                <Skeleton h="10px" w="32px" borderRadius="md" />
                <Skeleton h="10px" w="40px" borderRadius="md" />
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* Example code block placeholder */}
        <Box
          borderWidth="1px"
          borderColor={border}
          borderRadius="md"
          bg={faint}
          mb={3}
        >
          <Skeleton h="120px" w="100%" borderRadius="md" />
        </Box>

        <VStack align="stretch" spacing={3}>
          <Skeleton h="14px" w="120px" borderRadius="md" />
          {/* macOS-like code editor window */}
          <Box borderWidth="1px" borderColor={border} borderRadius="lg" overflow="hidden" position="relative">
            <HStack spacing={2} p={2} borderBottomWidth="1px" borderColor={border} bg={faint}>
              <Box w="12px" h="12px" borderRadius="full" bg="#ff5f56" />
              <Box w="12px" h="12px" borderRadius="full" bg="#ffbd2e" />
              <Box w="12px" h="12px" borderRadius="full" bg="#27c93f" />
            </HStack>
            <Skeleton bg={bg} h={{ base: '200px', md: '280px' }} w="100%" />
            {/* Start button placeholder */}
            <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
              <Skeleton h="40px" w="160px" borderRadius="full" />
            </Box>
          </Box>
          {/* Buttons row */}
          <HStack spacing={3} flexWrap="wrap">
            <Skeleton h="36px" w="120px" borderRadius="md" />
            <Skeleton h="36px" w="140px" borderRadius="md" />
            <Skeleton h="36px" w="120px" borderRadius="md" />
          </HStack>
        </VStack>

      </Box>

      {/* Support block placeholder (как отдельный нижний блок) */}
      <Box
        mt={6}
        borderWidth="1px"
        borderColor={border}
        borderRadius="2xl"
        p={{ base: 4, md: 5 }}
        bg={faint}
      >
        <Skeleton h="16px" w="50%" borderRadius="md" mb={2} />
        <Skeleton h="10px" w="90%" borderRadius="md" mb={1} />
        <Skeleton h="10px" w="80%" borderRadius="md" mb={3} />
        <HStack spacing={3}>
          <Skeleton h="36px" w="180px" borderRadius="full" />
          <Skeleton h="36px" w="200px" borderRadius="full" />
          <Skeleton h="36px" w="140px" borderRadius="full" />
        </HStack>
      </Box>
    </Box>
  );
};

export default WeeklyTaskDetailSkeleton;


