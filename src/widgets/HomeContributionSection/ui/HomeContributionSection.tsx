"use client";

import React from "react";
import { Box, Container, HStack, SimpleGrid, Stack, Text, VStack, useColorMode, useColorModeValue, usePrefersReducedMotion } from "@chakra-ui/react";
import { AppButtonLink } from "@/shared/ui/AppLink";

type ContributionCard = {
  id: string;
  title: string;
  desc: string;
  accent: {
    barLight: string;
    barDark: string;
  };
};

const cards: ContributionCard[] = [
  {
    id: "feedback",
    title: "Даёшь фидбек и ревью",
    desc: "Помогаешь другим закрывать затыки — и сам быстрее растёшь: начинаешь видеть решения и паттерны шире.",
    accent: { barLight: "blue.600", barDark: "blue.300" },
  },
  {
    id: "creators",
    title: "Поднимаешь качество экосистемы",
    desc: "Материалы, задачи, статьи, улучшения — вклад виден и ценится. Это прокачивает навыки объяснять и договариваться.",
    accent: { barLight: "green.600", barDark: "green.300" },
  },
  {
    id: "team",
    title: "Легче работать в команде",
    desc: "Вместе с другими ты учишься планировать, делить задачи и доводить до результата — как в реальной работе.",
    accent: { barLight: "purple.600", barDark: "purple.300" },
  },
];

const HomeContributionSection: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const borderHoverColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const hoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");
  const focusShadow = useColorModeValue("0 0 0 3px rgba(66,153,225,0.35)", "0 0 0 3px rgba(144,205,244,0.35)");
  const factBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

  return (
    <Box as="section" px={0} py={{ base: 10, md: 12 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 5, md: 7 }} align="stretch">
          <VStack spacing={2} textAlign="center">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
              Становишься выше, помогая другим
            </Text>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="860px" mx="auto">
              Рост — это не только “решил задачу”. Когда ты объясняешь, даёшь фидбек и делаешь вклад — ты учишься работать в команде и быстрее
              прокачиваешься.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }}>
            {cards.map((c) => {
              const accentBar = isDark ? c.accent.barDark : c.accent.barLight;

              return (
                <Box
                  key={c.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="2xl"
                  bg={cardBg}
                  boxShadow={baseShadow}
                  p={{ base: 5, md: 6 }}
                  position="relative"
                  overflow="hidden"
                  transition={
                    prefersReducedMotion ? undefined : "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease"
                  }
                  _hover={{
                    borderColor: borderHoverColor,
                    boxShadow: hoverShadow,
                    transform: prefersReducedMotion ? undefined : "translateY(-2px)",
                  }}
                  _focusWithin={{ boxShadow: focusShadow }}
                >
                  <Box
                    aria-hidden="true"
                    position="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    width="3px"
                    bg={accentBar}
                    opacity={0.9}
                  />

                  <Stack spacing={2} position="relative">
                    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
                      {c.title}
                    </Text>
                    <Text fontSize={{ base: "sm", md: "md" }} color={textColor} lineHeight="1.7">
                      {c.desc}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </SimpleGrid>

          <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="2xl"
            bg={factBg}
            px={{ base: 4, md: 6 }}
            py={{ base: 4, md: 5 }}
          >
            <HStack justify="space-between" align={{ base: "flex-start", md: "center" }} spacing={4} flexWrap="wrap">
              <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                Вклад фиксируется в профиле: материалы, задачи, статьи, проекты и помощь другим — всё это формирует твою репутацию.
              </Text>
              <HStack spacing={3} flexWrap="wrap">
                <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                  Стать создателем
                </AppButtonLink>
                <AppButtonLink to="/profile" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                  Открыть профиль
                </AppButtonLink>
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeContributionSection;

