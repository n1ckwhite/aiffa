"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiBarChart2, FiBookOpen, FiLayers, FiMessageCircle, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import { PartnersLottieIcon } from "@/shared/icons/components-icon";
import { AppLink } from "@/shared/ui/AppLink";

const HomeBusinessSection: React.FC = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const surfaceBg = useColorModeValue("white", "gray.900");
  const surfaceShadow = useColorModeValue("0 1px 0 rgba(15, 23, 42, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.35)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const badgeBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const badgeColor = useColorModeValue("gray.700", "gray.200");
  const iconBg = useColorModeValue("gray.50", "whiteAlpha.200");
  const iconColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const cardShadow = useColorModeValue("0 1px 0 rgba(15, 23, 42, 0.06)", "0 1px 0 rgba(0, 0, 0, 0.25)");

  const highlights = [
    {
      title: "Тестовые задания под ваш стек",
      desc: "Weekly‑задачи и хакатоны на React/Next.js/ИИ — код пишется прямо на платформе.",
      icon: FiLayers,
    },
    {
      title: "Топ‑кандидаты по действиям",
      desc: "Сортировка по XP, решениям, ревью. Профили = резюме с живым кодом.",
      icon: FiTrendingUp,
    },
    {
      title: "Аналитика команд",
      desc: "Отчёты: completion rate, retention, active users. Видно, кто растёт, а кто стоит.",
      icon: FiBarChart2,
    },
    {
      title: "120+ активных разработчиков",
      desc: "Уже используют платформу — ваши задачи решают за 2–3 дня.",
      icon: FiUsers,
    },
  ];

  const showcaseIcons = [FiLayers, FiMessageCircle, FiZap, FiUsers, FiBookOpen];

  return (
    <Box as="section" px={0} py={{ base: 12, md: 18 }}>
      <Container maxW="1200px">
        <Box
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="28px"
          bg={surfaceBg}
          p={{ base: 6, md: 10 }}
          boxShadow={surfaceShadow}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} alignItems="center">
              <Stack spacing={4} align="flex-start">
                <HStack spacing={2}>
                  <Box w={2} h={2} borderRadius="full" bg={badgeColor} />
                  <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.14em" color={badgeColor} bg={badgeBg} px={2.5} py={1} borderRadius="full">
                    Партнёрство для компаний
                  </Text>
                </HStack>
                <Heading as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                  AIFFA помогает нанимать быстрее и точнее
                </Heading>
                <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                  Мы превращаем практику в прозрачные метрики: видно, кто решает, как растёт и
                  насколько стабилен. Вы получаете кандидатов с живым кодом, а не с обещаниями.
                </Text>
                <AppLink
                  to="/partners"
                  color={useColorModeValue("blue.600", "blue.200")}
                  fontWeight="semibold"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  Перейти в раздел "Партнёрство"
                  <Box as="span" aria-hidden>
                    →
                  </Box>
                </AppLink>
              </Stack>

              <Box w="full" maxW={{ base: "420px", md: "520px" }} ml={{ base: 0, md: "auto" }}>
                <PartnersLottieIcon />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth={{ base: "260px", md: "280px" }} spacing={4} w="full">
              {highlights.map((item) => (
                <Box
                  key={item.title}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="xl"
                  bg={cardBg}
                  p={{ base: 4, md: 5 }}
                  boxShadow={cardShadow}
                >
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="36px"
                      h="36px"
                      borderRadius="lg"
                      bg={iconBg}
                      color={iconColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      borderWidth="1px"
                      borderColor={borderColor}
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
