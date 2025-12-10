import React from 'react';
import { Box, SimpleGrid, Skeleton, SkeletonCircle, VStack, HStack } from '@chakra-ui/react';
import { useWeeklyTaskCardColors } from '@/widgets/WeeklyTaskCard/colors';

const TasksGridSkeleton: React.FC = () => {
  const colors = useWeeklyTaskCardColors();
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 5, md: 7, lg: 8 }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          key={index}
          borderRadius="20px"
          p={5}
          minH="280px"
          position="relative"
          overflow="hidden"
          bg={colors.cardBg}
          boxShadow="sm"
          borderWidth="1px"
          borderColor={colors.borderColor}
        >
          <VStack spacing={3} align="stretch" h="100%">
            {/* Иконка и тег */}
            <VStack spacing={2} align="center">
              <SkeletonCircle boxSize="48px" />
              <Skeleton h="18px" w="64px" borderRadius="full" />
            </VStack>

            {/* Заголовок, описание, автор */}
            <VStack spacing={2} align="center" flex={1} justify="center">
              <Skeleton h="20px" w="85%" borderRadius="md" />
              <Skeleton h="14px" w="90%" borderRadius="md" />
              <Skeleton h="14px" w="75%" borderRadius="md" />

              <HStack spacing={2} mt={2}>
                <SkeletonCircle boxSize="24px" />
                <Skeleton h="14px" w="80px" borderRadius="md" />
              </HStack>

              {/* Метрики: звезды / комментарии / решившие */}
              <HStack spacing={3} mt={2}>
                <Skeleton h="12px" w="28px" borderRadius="sm" />
                <Skeleton h="12px" w="28px" borderRadius="sm" />
                <Skeleton h="12px" w="36px" borderRadius="sm" />
              </HStack>
            </VStack>

            {/* Награда */}
            <Skeleton h="40px" w="100%" borderRadius="lg" />
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default TasksGridSkeleton;


