import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const LessonTasksSkeleton: React.FC = () => {
  return (
    <Box as="main" pb="32px">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        {/* Хлебные крошки (StageBreadcrumb) */}
        <HStack spacing={2} mb={4} align="center">
          <Skeleton h="35px" w="188px" borderRadius="full" />
          <Skeleton h="10px" w="6px" borderRadius="full" />
          <Skeleton h="10px" w="120px" borderRadius="full" />
          <Skeleton h="10px" w="6px" borderRadius="full" />
          <Skeleton h="10px" w="90px" borderRadius="full" />
        </HStack>

        {/* Карточка с заголовком, задачами и прогрессом */}
        <Box>
          {/* Header с иконкой, заголовком и прогресс‑бейджем + кнопка "К материалу" */}
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
                <SkeletonCircle boxSize={{ base: "44px", md: "44px" }} />
              </Box>
              <Skeleton h="30px" w="104px" borderRadius="md" />
            </HStack>
            <HStack spacing={2}>
              <Skeleton h="32px" w="160px" borderRadius="full" />
            </HStack>
          </HStack>

          {/* Карточки задач (структура одинаковая для разных типов задач) */}
          <VStack align="stretch" spacing={5}>
            {Array.from({ length: 2 }).map((_, i) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                borderRadius="2xl"
                 borderWidth="1px" borderColor="whiteAlpha.200"
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
        </Box>

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
    </Box>
  );
};

export default LessonTasksSkeleton;


