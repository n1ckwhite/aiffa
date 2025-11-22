import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const LessonTasksSkeleton: React.FC = () => {
  return (
    <Box px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      {/* Header с иконкой, заголовком и прогресс‑бейджем */}
      <HStack
        spacing={3}
        mb={3}
        justify="space-between"
        align="center"
        flexWrap="wrap"
      >
        <HStack spacing={3} align="center">
          <Box
            w={{ base: "44px", md: "56px" }}
            h={{ base: "44px", md: "56px" }}
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SkeletonCircle boxSize={{ base: "28px", md: "32px" }} />
          </Box>
          <Skeleton h="20px" w="120px" borderRadius="md" />
          <Skeleton h="18px" w="72px" borderRadius="full" />
        </HStack>
        <HStack spacing={2}>
          <Skeleton h="28px" w="120px" borderRadius="full" />
        </HStack>
      </HStack>

      {/* Подзаголовок / фильтры */}
      <HStack spacing={2} mb={4} flexWrap="wrap">
        <Skeleton h="22px" w="140px" borderRadius="full" />
        <Skeleton h="22px" w="110px" borderRadius="full" />
      </HStack>

      {/* Карточки задач (структура одинаковая для разных типов задач) */}
      <VStack align="stretch" spacing={5}>
        {Array.from({ length: 2 }).map((_, i) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            borderRadius="2xl"
            p={{ base: 4, md: 5 }}
          >
            {/* Заголовок задачи с номером и текстом */}
            <HStack spacing={3} align="center" mb={3}>
              <SkeletonCircle boxSize="28px" />
              <VStack align="stretch" spacing={2} flex={1}>
                <Skeleton h="16px" w={{ base: "80%", md: "65%" }} borderRadius="md" />
                <Skeleton h="12px" w={{ base: "60%", md: "40%" }} borderRadius="md" />
              </VStack>
            </HStack>

            {/* Метаданные задачи: тип, сложность, время */}
            <HStack spacing={2} mb={3} flexWrap="wrap">
              <Skeleton h="20px" w="90px" borderRadius="full" />
              <Skeleton h="20px" w="80px" borderRadius="full" />
              <Skeleton h="20px" w="70px" borderRadius="full" />
            </HStack>

            {/* Подсказка / описание формата задачи */}
            <VStack align="stretch" spacing={2} mb={4}>
              <HStack spacing={3}>
                <SkeletonCircle boxSize="12px" />
                <Skeleton h="12px" w="82%" borderRadius="md" />
              </HStack>
              <HStack spacing={3}>
                <SkeletonCircle boxSize="12px" />
                <Skeleton h="12px" w="76%" borderRadius="md" />
              </HStack>
            </VStack>

            {/* Зона интерактивного блока задачи (код, поля ввода и т.п.) */}
            <Box
              borderRadius="xl"
              h={{ base: "140px", md: "160px" }}
              mb={4}
            >
              <Skeleton h="100%" w="100%" borderRadius="xl" />
            </Box>

            {/* Кнопки действий */}
            <HStack spacing={3}>
              <Skeleton h="40px" w="140px" borderRadius="full" />
              <Skeleton h="32px" w="110px" borderRadius="full" />
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Скелетон блока обратной связи "Эти задачи были полезны?" */}
      <Box
        mt={{ base: 6, md: 8 }}
        borderRadius="2xl"
        p={{ base: 4, md: 5 }}
      >
        <HStack spacing={3} mb={3}>
          <SkeletonCircle boxSize="18px" />
          <Skeleton h="16px" w="220px" borderRadius="md" />
        </HStack>
        <SkeletonText noOfLines={2} spacing="3" />
        <HStack spacing={3} mt={3}>
          <Skeleton h="36px" w="110px" borderRadius="full" />
          <Skeleton h="36px" w="110px" borderRadius="full" />
        </HStack>
      </Box>
    </Box>
  );
};

export default LessonTasksSkeleton;


