import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const ModuleProjectSkeleton: React.FC = () => {
  return (
    <Box
      w="100%"
      maxW={{ base: '100%', md: '1100px' }}
      mx="auto"
      pb="32px"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 10 }}
    >
      {/* Хлебные крошки */}
      <HStack mb={4} align="stretch" gap={2} maxW="840px" mx="auto" px={{ base: 4, md: 6 }}>
        <Skeleton h="10px" w="80px" borderRadius="full" />
        <Skeleton h="10px" w="6px" borderRadius="full" />
        <Skeleton h="10px" w="140px" borderRadius="full" />
      </HStack>

      <VStack align="stretch" gap={5} maxW="840px" mx="auto">
        {/* Автор проекта */}
        <Box borderRadius="xl" p={{ base: 3, md: 4 }}>
          <HStack spacing={4} align="center">
            <SkeletonCircle boxSize={{ base: "40px", md: "44px" }} />
            <VStack align="flex-start" spacing={2} flex={1}>
              {/* Автор + имя */}
              <Skeleton h="12px" w="160px" borderRadius="md" />
              {/* Текст про вклад */}
              <Skeleton h="10px" w="220px" borderRadius="md" />
              {/* Метрики + кнопка "Спасибо автору" */}
              <HStack spacing={3} pt={1}>
                <Skeleton h="14px" w="40px" borderRadius="full" />
                <Skeleton h="14px" w="40px" borderRadius="full" />
                <Skeleton h="14px" w="40px" borderRadius="full" />
              </HStack>
            </VStack>
          </HStack>
        </Box>

        {/* Карточка заголовка проекта */}
        <Box borderRadius="xl" p={{ base: 4, md: 5 }}>
          <VStack align="flex-start" spacing={3}>
            <Skeleton h={{ base: "24px", md: "28px" }} w="70%" borderRadius="md" />
            <HStack spacing={2} flexWrap="wrap">
              <Skeleton h="20px" w="110px" borderRadius="full" />
              <Skeleton h="20px" w="80px" borderRadius="full" />
            </HStack>
            <Skeleton h="14px" w="90%" borderRadius="md" />
            <Skeleton h="14px" w="70%" borderRadius="md" />
            <HStack spacing={3} pt={2}>
              <Skeleton h="36px" w="150px" borderRadius="full" />
              <Skeleton h="36px" w="130px" borderRadius="full" />
            </HStack>
          </VStack>
        </Box>

        {/* Основной markdown проекта */}
        <VStack align="stretch" spacing={4}>
          {/* Вводный параграф */}
          <VStack align="stretch" spacing={2}>
            <Skeleton h="14px" w="96%" borderRadius="md" />
            <Skeleton h="14px" w="92%" borderRadius="md" />
            <Skeleton h="14px" w="80%" borderRadius="md" />
          </VStack>

          {/* Раздел "Что вы сделаете" */}
          <Skeleton h="18px" w="160px" borderRadius="md" />
          <VStack align="stretch" spacing={3}>
            {Array.from({ length: 4 }).map((_, i) => (
              <HStack key={i} align="flex-start" spacing={3}>
                <SkeletonCircle boxSize="10px" />
                <VStack align="stretch" spacing={1} flex={1}>
                  <Skeleton h="14px" w="90%" borderRadius="md" />
                  <Skeleton h="12px" w="75%" borderRadius="md" />
                </VStack>
              </HStack>
            ))}
          </VStack>

          {/* Блок с подсказкой/советом (зелёная карточка) */}
          <Box mt={4} borderRadius="xl" p={{ base: 4, md: 5 }}>
            <VStack align="stretch" spacing={2}>
              <Skeleton h="14px" w="220px" borderRadius="md" />
              <Skeleton h="12px" w="90%" borderRadius="md" />
              <Skeleton h="12px" w="80%" borderRadius="md" />
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ModuleProjectSkeleton;


