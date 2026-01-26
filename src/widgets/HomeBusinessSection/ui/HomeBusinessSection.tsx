"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiBarChart2, FiBookOpen, FiLayers, FiMessageCircle, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import { PartnersLottieIcon } from "@/shared/icons/components-icon";
import { AppLink } from "@/shared/ui/AppLink";

const HomeBusinessSection: React.FC = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const badgeBg = useColorModeValue("blue.100", "blue.900");
  const badgeColor = useColorModeValue("blue.700", "blue.200");
  const iconColor = useColorModeValue("blue.600", "blue.300");
  const iconColors = ["#3B82F6", "#8B5CF6", "#F59E0B", "#22C55E", "#EF4444", "#06B6D4"];

  const highlights = [
    {
      title: "Тестовые задания под ваш стек",
      desc: "Weekly‑задачи и хакатоны на React/Next.js/ИИ — код пишется прямо на платформе, а не в вакууме.",
      icon: FiLayers,
    },
    {
      title: "Топ‑кандидаты по действиям",
      desc: "Сортировка по XP, решениям и ревью. Профили = резюме с живым кодом и историей роста.",
      icon: FiTrendingUp,
    },
    {
      title: "Аналитика команд",
      desc: "Отчёты: completion rate, retention, active users. Видно, кто растёт, а кто стоит.",
      icon: FiBarChart2,
    },
    {
      title: "Скорость подбора",
      desc: "Задачи закрываются за 2–3 дня — вы быстрее выходите на собеседования и офферы.",
      icon: FiZap,
    },
    {
      title: "Пул разработчиков",
      desc: "120+ активных участников и растущая база — можно запускать регулярные наборы.",
      icon: FiUsers,
    },
    {
      title: "Гибкие форматы",
      desc: "Пилоты, челленджи, хакатоны и спец‑проекты — собираем формат под вашу цель.",
      icon: FiMessageCircle,
    },
  ];

  const showcaseIcons = [FiLayers, FiMessageCircle, FiZap, FiUsers, FiBookOpen];

  return (
    <Box as="section" px={0} py={{ base: 12, md: 18 }}>
      <Container maxW="1200px">
        <Box
          borderWidth="0"
          borderRadius="0"
          bg="transparent"
          p={{ base: 0, md: 0 }}
          boxShadow="none"
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 6, md: 10 }}
              align={{ base: "flex-start", md: "center" }}
            >
              <Stack spacing={4} align="flex-start" flex={{ base: "none", md: 1.2 }}>
                <HStack spacing={2}>
                  <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.14em" color={badgeColor} bg={badgeBg} px={2.5} py={1} borderRadius="full">
                    Партнёрство для компаний
                  </Text>
                </HStack>
                <Heading as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                  AIFFA помогает нанимать быстрее и точнее
                </Heading>
                <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                  Подключите реальную практику и получите поток кандидатов с живым кодом и понятными метриками.
                  Видно, кто решает, как растёт и насколько стабилен — без догадок и долгих тестов.
                </Text>
                <AppLink
                  to="/partners"
                  color={useColorModeValue("blue.600", "blue.200")}
                  fontWeight="semibold"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  Стать партнёром
                  <Box as="span" aria-hidden>
                    →
                  </Box>
                </AppLink>
              </Stack>

              <Box
                w="full"
                maxW={{ base: "420px", md: "520px" }}
                ml={{ base: 0, md: "auto" }}
                flex={{ base: "none", md: 1 }}
              >
                <PartnersLottieIcon />
              </Box>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {highlights.map((item, idx) => (
                <Box key={item.title}>
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="lg"
                      color={iconColors[idx % iconColors.length] ?? iconColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={item.icon} boxSize={5} aria-hidden />
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color={titleColor} fontSize={{ base: "sm", md: "md" }}>
                        {item.title}
                      </Text>
                      <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.6" mt={1}>
                        {item.desc}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeBusinessSection;
