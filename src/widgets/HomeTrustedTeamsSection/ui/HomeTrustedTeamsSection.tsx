"use client";

import React from "react";
import {
  Box,
  Container,
  Heading,
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
import { FiBookOpen, FiBriefcase, FiCode, FiFeather, FiMessageCircle, FiTarget } from "react-icons/fi";
import { AppLink } from "@/shared/ui/AppLink";
import { AppBoxLink } from "@/shared/ui/AppLink";
import { BusinessAnatyticsIcon } from "@/shared/icons/components-icon";

type MiniCase = {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  to: string;
};

const miniCases: MiniCase[] = [
  {
    id: "materials",
    label: "Материалы",
    icon: FiBookOpen,
    title: "Маршрут и практика",
    desc: "Понятный путь по темам и навыкам — внутри шагов есть практика и задания.",
    to: "/learn",
  },
  {
    id: "blog",
    label: "Блог",
    icon: FiFeather,
    title: "Статьи сообщества",
    desc: "Пиши статьи, делись находками, получай отклик и расти вместе с экосистемой.",
    to: "/blog",
  },
  {
    id: "weekly",
    label: "Задачи недели",
    icon: FiTarget,
    title: "Weekly‑задачи",
    desc: "Быстрый старт и ритм: сделал → получил фидбек → зафиксировал прогресс.",
    to: "/weekly",
  },
  {
    id: "sessions",
    label: "Сессии",
    icon: FiMessageCircle,
    title: "Разборы и помощь",
    desc: "Когда застрял — приходишь на разбор и снимаешь блокер. Дальше продолжаешь движение.",
    to: "/sessions",
  },
  {
    id: "projects",
    label: "Проекты",
    icon: FiBriefcase,
    title: "Проекты в модулях",
    desc: "Кейсы для портфолио внутри обучения: задачи → решение → оформление результата.",
    to: "/learn/bazovye-komandy/projects",
  },
  {
    id: "hackathons",
    label: "Хакатоны",
    icon: FiCode,
    title: "Командная практика",
    desc: "Дедлайны, роли и результат. Быстрый способ прокачать командную работу и получить фидбек.",
    to: "/hackathons",
  },
];

const HomeTrustedTeamsSection: React.FC = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const prefersReducedMotion = usePrefersReducedMotion();

  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const borderHoverColor = useColorModeValue("gray.300", "whiteAlpha.300");

  const sectionBg = useColorModeValue("blackAlpha.50", "rgba(255, 255, 255, 0.04)");
  const baseShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const hoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");

  const storyLinkColor = isDark ? "blue.200" : "blue.700";
  const ctaBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.50");
  const smallIconColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");

  return (
    <Box as="section" px={0} py={{ base: 12, md: 16 }} bg={sectionBg}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <VStack spacing={3} align="flex-start" maxW="980px">
            <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-0.03em" color={titleColor} lineHeight="1.05">
              Что внутри AIFFA.
            </Heading>
            <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="820px">
              Это экосистема роста через действие: практика, путь развития, фидбек и вклад. Всё собрано так, чтобы было понятно “что делать
              дальше” — и чтобы прогресс был видимым.
            </Text>
          </VStack>

          <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="3xl"
            bg={cardBg}
            boxShadow={baseShadow}
            overflow="hidden"
            p={{ base: 5, md: 7 }}
          >
            <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 5, md: 7 }} align="stretch">
              <Stack spacing={4} flex="1 1 0" minW={0}>
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor}>
                  Всё в одном месте
                </Text>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="semibold"
                  color={titleColor}
                  lineHeight="1.25"
                  letterSpacing="-0.02em"
                >
                  “Практика → фидбек → следующий шаг. Прогресс виден по действиям, а рост ускоряется, когда помогаешь другим.”
                </Text>
                <HStack>
                  <AppLink
                    to="/weekly"
                    aria-label="Открыть weekly-задачу"
                    fontWeight="semibold"
                    color={storyLinkColor}
                    _hover={{ textDecoration: "none", opacity: 0.9 }}
                  >
                    Открыть weekly‑задачу →
                  </AppLink>
                </HStack>
              </Stack>

              <Box
                flex="0 0 auto"
                w={{ base: "100%", md: "420px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                aria-hidden="true"
                pointerEvents="none"
              >
                <BusinessAnatyticsIcon />
              </Box>
            </Stack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }}>
            {miniCases.map((c) => (
              <AppBoxLink
                key={c.id}
                to={c.to}
                aria-label={`${c.title} — открыть`}
                role="group"
                display="block"
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="2xl"
                bg={cardBg}
                boxShadow={baseShadow}
                p={{ base: 5, md: 6 }}
                transition={prefersReducedMotion ? undefined : "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease"}
                _hover={{
                  textDecoration: "none",
                  borderColor: borderHoverColor,
                  boxShadow: hoverShadow,
                  transform: prefersReducedMotion ? undefined : "translateY(-2px)",
                }}
              >
                <Stack spacing={2}>
                  <HStack spacing={2}>
                    <Icon as={c.icon} boxSize={4} aria-hidden="true" color={smallIconColor} />
                    <Text fontSize="sm" fontWeight="bold" letterSpacing="0.06em" textTransform="uppercase" color={textColor}>
                      {c.label}
                    </Text>
                  </HStack>
                  <Text color={titleColor} fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" letterSpacing="-0.02em" lineHeight="1.25">
                    {c.title}
                  </Text>
                  <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                    {c.desc}
                  </Text>
                  <Text pt={1} fontWeight="semibold" color={storyLinkColor}>
                    Открыть →
                  </Text>
                </Stack>
              </AppBoxLink>
            ))}
          </SimpleGrid>

          <Box
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="2xl"
            bg={ctaBg}
            px={{ base: 4, md: 6 }}
            py={{ base: 4, md: 5 }}
          >
            <HStack justify="space-between" align={{ base: "flex-start", md: "center" }} spacing={4} flexWrap="wrap">
              <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                Хочешь усиливать экосистему? Добавляй материалы, задачи и статьи — вклад виден и ценится.
              </Text>
              <HStack spacing={3} flexWrap="wrap">
                <AppLink
                  to="/creators"
                  aria-label="Открыть создателей"
                  fontWeight="semibold"
                  color={storyLinkColor}
                  _hover={{ textDecoration: "none", opacity: 0.9 }}
                >
                  Открыть создателей →
                </AppLink>
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeTrustedTeamsSection;

