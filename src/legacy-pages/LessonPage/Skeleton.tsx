import React from 'react';
import { Box, VStack, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const LessonPageSkeleton: React.FC = () => {
  return (
    <Box as="main" pb="32px">
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 8 }}>
        <HStack align="flex-start" spacing={{ base: 0, xl: 8 }}>
          {/* Основная колонка с материалом */}
          <Box flex="1 1 auto" minW={0}>
            <Box w="100%" maxW="840px" mx="auto">
              {/* Хлебные крошки */}
              <HStack spacing={2} mb={4} align="center">
                <Skeleton h="10px" w="80px" borderRadius="full" />
                <Skeleton h="10px" w="6px" borderRadius="full" />
                <Skeleton h="10px" w="120px" borderRadius="full" />
              </HStack>

              {/* Заголовок урока */}
              <Skeleton h={{ base: "28px", md: "34px" }} w={{ base: "82%", md: "70%" }} borderRadius="md" mb={4} />

              {/* Автор карточка */}
              <Box borderRadius="xl" p={{ base: 3, md: 4 }} mb={8}>
                <HStack spacing={4} align="center">
                  <SkeletonCircle boxSize={{ base: "40px", md: "44px" }} />
                  <VStack align="flex-start" spacing={2} flex="1">
                    {/* Автор + имя */}
                    <Skeleton h="12px" w="160px" borderRadius="md" />
                    {/* Текст про вклад */}
                    <Skeleton h="10px" w="220px" borderRadius="md" />
                    {/* Метрики + кнопка "Спасибо автору" */}
                    <HStack spacing={3} pt={1} flexWrap="wrap">
                      <Skeleton h="14px" w="46px" borderRadius="full" />
                      <Skeleton h="14px" w="46px" borderRadius="full" />
                      <Skeleton h="14px" w="46px" borderRadius="full" />
                    </HStack>
                  </VStack>
                </HStack>
              </Box>

              {/* Вводный блок / TLDR без явной таблицы */}
              <Skeleton h="18px" w="110px" borderRadius="md" mb={3} />
              <VStack align="stretch" spacing={2} mb={6}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    h="14px"
                    w={i % 2 === 0 ? "92%" : "80%"}
                    borderRadius="md"
                  />
                ))}
              </VStack>

              {/* Основной текст урока */}
              <VStack align="stretch" spacing={3} mb={8}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    h="14px"
                    w={i % 3 === 0 ? "96%" : i % 3 === 1 ? "88%" : "76%"}
                    borderRadius="md"
                  />
                ))}
              </VStack>

              {/* Блок с вопросом "страница была полезна?" */}
              <Box
                mt={4}
                borderRadius="xl"
                px={4}
                py={4}
              >
                <Skeleton h="12px" w="220px" borderRadius="md" mb={3} />
                <HStack spacing={3}>
                  <Skeleton h="32px" w="90px" borderRadius="full" />
                  <Skeleton h="32px" w="90px" borderRadius="full" />
                </HStack>
              </Box>
            </Box>
          </Box>

          {/* Скелетон панели содержания (ToC) для широких экранов */}
          <Box
            w={{ base: '0', lg: '260px' }}
            display="none"
            position="sticky"
            top="88px"
            sx={{ '@media (min-width: 1440px)': { display: 'block' } }}
          >
            <Box>
              <Skeleton h="10px" w="120px" borderRadius="md" mb={3} />
              <VStack align="stretch" spacing={2}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    h="14px"
                    w={i % 2 === 0 ? "92%" : "80%"}
                    borderRadius="md"
                  />
                ))}
              </VStack>
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default LessonPageSkeleton;


