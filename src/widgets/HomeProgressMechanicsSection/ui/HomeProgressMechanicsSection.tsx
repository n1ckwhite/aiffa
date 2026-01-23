"use client";

import React from "react";
import {
  Box,
  Container,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { FiAward, FiTrendingUp, FiUser } from "react-icons/fi";
import { FaBookOpen, FaCalendarCheck, FaCircleCheck, FaListCheck, FaMessage } from "react-icons/fa6";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { RewardsLottieIcon } from "@/shared/icons/components-icon";
import { CompactAchievement } from "@/widgets/Profile/ProfileScreen/ui/parts/CompactAchievement/CompactAchievement";

type ProgressItem = {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  accent: {
    bgLight: string;
    bgDark: string;
    fgLight: string;
    fgDark: string;
  };
};

const progressItems: ProgressItem[] = [
  {
    id: "profile",
    title: "Профиль прогресса",
    desc: "Видно, что ты реально сделал: решения, вклад, участие и ритм. Это история действий, а не слова.",
    icon: FiUser,
    accent: {
      bgLight: "blue.50",
      bgDark: "rgba(59, 130, 246, 0.14)",
      fgLight: "blue.700",
      fgDark: "blue.200",
    },
  },
  {
    id: "xp",
    title: "XP и уровни",
    desc: "Опыт начисляется за практику и вклад. Чем больше действий — тем выше уровень и сложнее задачи.",
    icon: FiTrendingUp,
    accent: {
      bgLight: "green.50",
      bgDark: "rgba(16, 185, 129, 0.14)",
      fgLight: "green.700",
      fgDark: "green.200",
    },
  },
  {
    id: "achievements",
    title: "Достижения",
    desc: "Награды за регулярность, качество и помощь другим. Они делают рост заметным и честным.",
    icon: FiAward,
    accent: {
      bgLight: "purple.50",
      bgDark: "rgba(168, 85, 247, 0.14)",
      fgLight: "purple.700",
      fgDark: "purple.200",
    },
  },
];

const achievements = [
  {
    id: "first-task",
    label: "Первая задача",
    icon: FaCircleCheck,
    from: "#93c5fd",
    to: "#3b82f6",
    color: "#60a5fa",
  },
  {
    id: "five-tasks",
    label: "5 задач",
    icon: FaListCheck,
    from: "#c4b5fd",
    to: "#8b5cf6",
    color: "#a78bfa",
  },
  {
    id: "streak-7",
    label: "Серия 7 дней",
    icon: FaCalendarCheck,
    from: "#a3e635",
    to: "#84cc16",
    color: "#84cc16",
  },
  {
    id: "reader",
    label: "1 материал",
    icon: FaBookOpen,
    from: "#7dd3fc",
    to: "#38bdf8",
    color: "#38bdf8",
  },
  {
    id: "feedback",
    label: "Отзыв",
    icon: FaMessage,
    from: "#fda4af",
    to: "#fb7185",
    color: "#fb7185",
  },
] as const;

const HomeProgressMechanicsSection: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const prefersReducedMotion = usePrefersReducedMotion();

  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const borderHoverColor = useColorModeValue("gray.300", "whiteAlpha.300");

  const baseShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const hoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");
  const accentLabel = useColorModeValue("gray.500", "whiteAlpha.700");

  return (
    <Box as="section" px={0} py={{ base: 12, md: 16 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 4, md: 8 }} align="stretch" justify="space-between">
            <VStack spacing={2} align="flex-start" maxW={{ base: "100%", md: "760px" }}>
              <Text fontSize={{ base: "sm", md: "sm" }} fontWeight="bold" color={accentLabel} letterSpacing="0.16em" textTransform="uppercase">
                Механика прогресса
              </Text>
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
                Рост фиксируется в действиях
              </Text>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Профиль, XP и достижения показывают не “что ты знаешь”, а что ты реально сделал и как стабильно растёшь.
              </Text>
            </VStack>

            <Box aria-hidden="true" alignSelf={{ base: "flex-start", md: "center" }} w={{ base: "180px", md: "240px" }}>
              <RewardsLottieIcon />
            </Box>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
            <Stack spacing={5}>
              {progressItems.map((item) => (
                <HStack key={item.id} spacing={4} align="flex-start">
                  <Box
                    w="44px"
                    h="44px"
                    borderRadius="xl"
                    bg={isDark ? item.accent.bgDark : item.accent.bgLight}
                    color={isDark ? item.accent.fgDark : item.accent.fgLight}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={item.icon} boxSize={5} aria-hidden="true" />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" color={titleColor}>
                      {item.title}
                    </Text>
                    <Text fontSize="sm" color={textColor} lineHeight="1.7">
                      {item.desc}
                    </Text>
                  </Box>
                </HStack>
              ))}

              <Box>
                <Text fontSize="sm" fontWeight="bold" color={accentLabel} letterSpacing="0.14em" textTransform="uppercase" mb={2}>
                  Примеры достижений
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {achievements.map((item) => (
                    <CompactAchievement key={item.id} item={item} />
                  ))}
                </HStack>
              </Box>
            </Stack>

            <Stack spacing={3}>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor}>
                Почему это работает
              </Text>
              <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                Ты видишь прогресс по действиям, понимаешь, что делать дальше, и получаешь подтверждение роста через достижения.
              </Text>
              <Stack spacing={2} pt={1}>
                <Text fontSize="sm" color={textColor}>
                  • Профиль показывает историю активности и вклад.
                </Text>
                <Text fontSize="sm" color={textColor}>
                  • XP растёт за практику и вклад в экосистему.
                </Text>
                <Text fontSize="sm" color={textColor}>
                  • Достижения фиксируют регулярность и качество.
                </Text>
              </Stack>
              <HStack pt={2} spacing={3} flexWrap="wrap">
                <AppButtonLink to="/profile" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                  Открыть профиль
                </AppButtonLink>
                <AppButtonLink to="/weekly" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                  Решить задачу
                </AppButtonLink>
              </HStack>
            </Stack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeProgressMechanicsSection;

