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
} from "@chakra-ui/react";
import { FiBriefcase, FiCheckCircle, FiEdit3, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { FaBookOpen, FaCalendarCheck, FaCircleCheck, FaListCheck, FaMessage } from "react-icons/fa6";
import { BusinessTeamLottieIcon } from "@/shared/icons/components-icon";
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
    id: "practice",
    title: "Практика и опыт",
    desc: "Регулярные задачи и разборы дают реальный опыт — не “учёба”, а практика как в работе.",
    icon: FiTarget,
    accent: {
      bgLight: "blue.50",
      bgDark: "rgba(59, 130, 246, 0.14)",
      fgLight: "blue.700",
      fgDark: "blue.200",
    },
  },
  {
    id: "hackathons",
    title: "Хакатоны и первые проекты бизнеса",
    desc: "Участие в хакатонах — это первые проекты от бизнеса и опыт работы в команде.",
    icon: FiBriefcase,
    accent: {
      bgLight: "green.50",
      bgDark: "rgba(16, 185, 129, 0.14)",
      fgLight: "green.700",
      fgDark: "green.200",
    },
  },
  {
    id: "teamwork",
    title: "Командная работа",
    desc: "Планирование, роли, ответственность и дедлайны — формируются привычки взрослой разработки.",
    icon: FiUsers,
    accent: {
      bgLight: "teal.50",
      bgDark: "rgba(20, 184, 166, 0.12)",
      fgLight: "teal.700",
      fgDark: "teal.200",
    },
  },
  {
    id: "content",
    title: "Статьи и вклад",
    desc: "Пишешь статьи, улучшаешь материалы и задачи — это видно и усиливает профиль.",
    icon: FiEdit3,
    accent: {
      bgLight: "purple.50",
      bgDark: "rgba(168, 85, 247, 0.14)",
      fgLight: "purple.700",
      fgDark: "purple.200",
    },
  },
  {
    id: "achievements",
    title: "XP и достижения",
    desc: "Награды и рост XP показывают стабильность и качество действий.",
    icon: FiTrendingUp,
    accent: {
      bgLight: "orange.50",
      bgDark: "rgba(249, 115, 22, 0.14)",
      fgLight: "orange.700",
      fgDark: "orange.200",
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

  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const accentLabel = useColorModeValue("gray.700", "whiteAlpha.900");
  const tone = {
    blue: {
      bg: useColorModeValue("blue.50", "rgba(59,130,246,0.18)"),
      fg: useColorModeValue("blue.700", "blue.200"),
    },
    green: {
      bg: useColorModeValue("green.50", "rgba(16,185,129,0.18)"),
      fg: useColorModeValue("green.700", "green.200"),
    },
    purple: {
      bg: useColorModeValue("purple.50", "rgba(168,85,247,0.18)"),
      fg: useColorModeValue("purple.700", "purple.200"),
    },
    orange: {
      bg: useColorModeValue("orange.50", "rgba(249,115,22,0.18)"),
      fg: useColorModeValue("orange.700", "orange.200"),
    },
  } as const;
  type ToneKey = keyof typeof tone;

  return (
    <Box
      as="section"
      px={0}
      pt={{ base: 10, md: 14 }}
      aria-labelledby="home-progress-title"
      aria-describedby="home-progress-desc"
    >
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 4, md: 8 }} align="center" justify="space-between">
            <VStack
              spacing={2}
              align={{ base: "center", lg: "flex-start" }}
              textAlign={{ base: "center", lg: "left" }}
              w="full"
              flex="1 1 auto"
              as="header"
            >
              <Text fontSize={{ base: "sm", md: "sm" }} fontWeight="bold" color={accentLabel} letterSpacing="0.16em" textTransform="uppercase">
                Механика прогресса
              </Text>
              <Text id="home-progress-title" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
                Рост фиксируется в действиях
              </Text>
              <Text id="home-progress-desc" color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Профиль, XP и достижения показывают не “что ты знаешь”, а что ты реально сделал и как стабильно растёшь.
              </Text>
            </VStack>

            <Box
              aria-hidden="true"
              w="350px"
              flexShrink={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                "& svg, & canvas": {
                  width: "100% !important",
                  height: "100% !important",
                },
              }}
            >
              <BusinessTeamLottieIcon />
            </Box>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }} alignItems="stretch">
            <Stack spacing={4} h="full" align="flex-start">
              <Stack as="ul" m={0} p={0} listStyleType="none" spacing={4} w="full">
                {progressItems.map((item) => (
                  <HStack key={item.id} spacing={4} align="flex-start" as="li">
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
              </Stack>

              <Box textAlign={{ base: "center", md: "left" }} margin={{ base: "0 auto", md: "0" }} w="full">
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  color={accentLabel}
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  mb={2}
                  w="full"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Примеры достижений
                </Text>
                <HStack
                  as="ul"
                  spacing={2}
                  flexWrap="wrap"
                  m={0}
                  p={0}
                  listStyleType="none"
                  justify={{ base: "center", md: "flex-start" }}
                >
                  {achievements.map((item) => (
                    <Box as="li" key={item.id}>
                      <CompactAchievement item={item} />
                    </Box>
                  ))}
                </HStack>
              </Box>
            </Stack>

            <Stack spacing={4} h="full" justify="space-between" mt={{ base: 6, md: 0 }}>
              <Stack spacing={3}>
                <Text fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" color={accentLabel}>
                  Прогресс в профиле
                </Text>
                <Text color={titleColor} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" lineHeight="1.35">
                  Прогресс → профиль → работодатели
                </Text>
                <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                  Когда рост стабилен и подтверждён действиями — это видно и становится сильным аргументом при найме.
                </Text>

                <Stack spacing={2.5} pt={1} as="ul" m={0} p={0} listStyleType="none">
                  {[
                    {
                      id: "progress",
                      title: "Прогресс",
                      text: "Практика и результаты фиксируются автоматически.",
                      tone: "blue" as ToneKey,
                    },
                    {
                      id: "profile",
                      title: "Профиль",
                      text: "История действий превращается в понятное резюме.",
                      tone: "purple" as ToneKey,
                    },
                    {
                      id: "employer",
                      title: "Работодатели",
                      text: "Сильные кейсы повышают шанс быстрого оффера.",
                      tone: "green" as ToneKey,
                    },
                  ].map((item) => (
                    <HStack key={item.id} spacing={2} align="flex-start" as="li">
                      <Box
                        w="20px"
                        h="20px"
                        borderRadius="full"
                        bg={tone[item.tone].bg}
                        color={tone[item.tone].fg}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        mt="2px"
                      >
                        <Icon as={FiCheckCircle} boxSize={3.5} aria-hidden="true" />
                      </Box>
                      <Text fontSize="sm" color={textColor}>
                        <Box as="span" fontWeight="semibold" color={titleColor}>
                          {item.title}
                        </Box>{" "}
                        — {item.text}
                      </Text>
                    </HStack>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeProgressMechanicsSection;

