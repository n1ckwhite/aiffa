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
import {
  FaBookOpen,
  FaBriefcase,
  FaChartLine,
  FaClipboardList,
  FaCode,
  FaComments,
  FaFeatherAlt,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa";
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
  accent: {
    bgLight: string;
    bgDark: string;
    fgLight: string;
    fgDark: string;
    borderLight: string;
    borderDark: string;
  };
};

const miniCases: MiniCase[] = [
  {
    id: "materials",
    label: "Материалы",
    icon: FaBookOpen,
    title: "Маршрут и практика",
    desc: "Понятный путь по темам и навыкам — внутри шагов есть практика и задания.",
    to: "/learn",
    accent: {
      bgLight: "blue.50",
      bgDark: "rgba(59, 130, 246, 0.14)",
      fgLight: "blue.700",
      fgDark: "blue.200",
      borderLight: "blue.200",
      borderDark: "rgba(96, 165, 250, 0.35)",
    },
  },
  {
    id: "blog",
    label: "Блог",
    icon: FaFeatherAlt,
    title: "Статьи сообщества",
    desc: "Пиши статьи, делись находками, получай отклик и расти вместе с экосистемой.",
    to: "/blog",
    accent: {
      bgLight: "purple.50",
      bgDark: "rgba(168, 85, 247, 0.14)",
      fgLight: "purple.700",
      fgDark: "purple.200",
      borderLight: "purple.200",
      borderDark: "rgba(216, 180, 254, 0.30)",
    },
  },
  {
    id: "weekly",
    label: "Задачи недели",
    icon: FaClipboardList,
    title: "Weekly‑задачи",
    desc: "Быстрый старт и ритм: сделал → получил фидбек → зафиксировал прогресс.",
    to: "/weekly",
    accent: {
      bgLight: "green.50",
      bgDark: "rgba(16, 185, 129, 0.14)",
      fgLight: "green.700",
      fgDark: "green.200",
      borderLight: "green.200",
      borderDark: "rgba(52, 211, 153, 0.32)",
    },
  },
  {
    id: "sessions",
    label: "Сессии",
    icon: FaComments,
    title: "Разборы и помощь",
    desc: "Когда застрял — приходишь на разбор и снимаешь блокер. Дальше продолжаешь движение.",
    to: "/sessions",
    accent: {
      bgLight: "orange.50",
      bgDark: "rgba(249, 115, 22, 0.14)",
      fgLight: "orange.700",
      fgDark: "orange.200",
      borderLight: "orange.200",
      borderDark: "rgba(253, 186, 116, 0.30)",
    },
  },
  {
    id: "projects",
    label: "Проекты",
    icon: FaBriefcase,
    title: "Проекты в модулях",
    desc: "Кейсы для портфолио внутри обучения: задачи → решение → оформление результата.",
    to: "/learn/bazovye-komandy/projects",
    accent: {
      bgLight: "cyan.50",
      bgDark: "rgba(34, 211, 238, 0.10)",
      fgLight: "cyan.700",
      fgDark: "cyan.200",
      borderLight: "cyan.200",
      borderDark: "rgba(103, 232, 249, 0.24)",
    },
  },
  {
    id: "hackathons",
    label: "Хакатоны",
    icon: FaCode,
    title: "Командная практика",
    desc: "Дедлайны, роли и результат. Быстрый способ прокачать командную работу и получить фидбек.",
    to: "/hackathons",
    accent: {
      bgLight: "teal.50",
      bgDark: "rgba(20, 184, 166, 0.12)",
      fgLight: "teal.700",
      fgDark: "teal.200",
      borderLight: "teal.200",
      borderDark: "rgba(94, 234, 212, 0.24)",
    },
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

  const baseShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const hoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");

  const storyLinkColor = isDark ? "blue.200" : "blue.700";
  const ctaBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.50");
  const labelColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const actionColor = isDark ? "blue.200" : "blue.700";
  const quoteMarkColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  return (
    <Box as="section" px={0} aria-labelledby="home-trusted-title" aria-describedby="home-trusted-desc" pt={{ base: 10, md: 14 }}>
      <Container maxW="1200px">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <VStack
            spacing={3}
            align={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
            maxW="980px"
            as="header"
          >
            <Heading id="home-trusted-title" as="h2" fontSize={{ base: "3xl", md: "5xl" }} letterSpacing="-0.03em" color={titleColor} lineHeight="1.05">
              Что внутри AIFFA.
            </Heading>
            <Text id="home-trusted-desc" color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7" maxW="820px">
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
            <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 5, md: 7 }} align="stretch">
              <Stack spacing={0} flex="1 1 0" minW={0} h="full" justify="space-between" align="stretch">
                <Stack spacing={4} w="full">
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor}>
                    Всё в одном месте
                  </Text>
                  <Text
                    as="blockquote"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="semibold"
                    color={titleColor}
                    lineHeight="1.35"
                    letterSpacing="-0.02em"
                    position="relative"
                    pl={{ base: 7, md: 8 }}
                    _before={{
                      content: '"“"',
                      position: "absolute",
                      left: 0,
                      top: { base: -3, md: -4 },
                      fontSize: { base: "52px", md: "72px" },
                      lineHeight: "1",
                      color: quoteMarkColor,
                      pointerEvents: "none",
                    }}
                    maxW="none"
                  >
                    Практика → фидбек → следующий шаг. Прогресс виден по действиям, а рост ускоряется, когда помогаешь другим.
                  </Text>
                </Stack>

                <Box pt={{ base: 5, md: 6 }} w="full">
                  <Stack spacing={2}>
                    <HStack spacing={2} align="flex-start">
                      <Icon as={FaLayerGroup} boxSize={4} aria-hidden="true" color={labelColor} mt="2px" />
                      <Text fontSize="sm" color={textColor} lineHeight="1.6">
                        6 разделов в одном месте: материалы, блог, weekly, сессии, проекты, хакатоны.
                      </Text>
                    </HStack>
                    <HStack spacing={2} align="flex-start">
                      <Icon as={FaChartLine} boxSize={4} aria-hidden="true" color={labelColor} mt="2px" />
                      <Text fontSize="sm" color={textColor} lineHeight="1.6">
                        Рост фиксируется в профиле: решения, фидбек, вклад и достижения.
                      </Text>
                    </HStack>
                    <HStack spacing={2} align="flex-start">
                      <Icon as={FaUsers} boxSize={4} aria-hidden="true" color={labelColor} mt="2px" />
                      <Text fontSize="sm" color={textColor} lineHeight="1.6">
                        Командная практика ускоряет развитие: разборы, совместные проекты и хакатоны.
                      </Text>
                    </HStack>
                  </Stack>
                </Box>
              </Stack>

              <Box
                flex="0 0 auto"
                w={{ base: "100%", lg: "420px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                aria-hidden="true"
                pointerEvents="none"
              >
                <Box
                  w="full"
                  maxW={{ base: "320px", md: "420px" }}
                  mx="auto"
                  sx={{
                    "& svg, & canvas": {
                      width: "100% !important",
                      height: "auto !important",
                    },
                  }}
                >
                  <BusinessAnatyticsIcon />
                </Box>
              </Box>
            </Stack>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 5 }}>
            {miniCases.map((c) => (
              // derived colors must not use hooks here; use isDark flag
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
                minH={{ base: "auto", md: "220px" }}
                position="relative"
                overflow="hidden"
                transition={prefersReducedMotion ? undefined : "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease"}
                _hover={{
                  textDecoration: "none",
                  borderColor: borderHoverColor,
                  boxShadow: hoverShadow,
                  transform: prefersReducedMotion ? undefined : "translateY(-2px)",
                }}
              >
                <Box
                  aria-hidden="true"
                  position="absolute"
                  inset="-1px"
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={isDark ? c.accent.borderDark : c.accent.borderLight}
                  opacity={0.45}
                  pointerEvents="none"
                />

                <Stack spacing={3} position="relative" zIndex={1} h="full">
                  <HStack spacing={3} align="center">
                    <Box
                      w="40px"
                      h="40px"
                      borderRadius="xl"
                      bg={isDark ? c.accent.bgDark : c.accent.bgLight}
                      color={isDark ? c.accent.fgDark : c.accent.fgLight}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      transition={prefersReducedMotion ? undefined : "transform 180ms ease"}
                      _groupHover={{ transform: prefersReducedMotion ? undefined : "scale(1.04)" }}
                    >
                      <Icon as={c.icon} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Text fontSize="sm" fontWeight="bold" letterSpacing="0.06em" textTransform="uppercase" color={labelColor}>
                      {c.label}
                    </Text>
                  </HStack>

                  <Text
                    color={titleColor}
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    letterSpacing="-0.02em"
                    lineHeight="1.25"
                  >
                    {c.title}
                  </Text>

                  <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                    {c.desc}
                  </Text>

                  <Box pt={1} mt="auto">
                    <Text fontWeight="semibold" color={actionColor}>
                      Открыть →
                    </Text>
                  </Box>
                </Stack>
              </AppBoxLink>
            ))}
          </SimpleGrid>

          <Box
            borderRadius="2xl"
            bg={ctaBg}
            px={{ base: 5, md: 7 }}
            py={{ base: 5, md: 6 }}
            position="relative"
            overflow="hidden"
          >
            <Box
              aria-hidden="true"
              position="absolute"
              inset={0}
              bgImage={useColorModeValue(
                "radial-gradient(420px 180px at 10% 0%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(420px 180px at 90% 20%, rgba(168,85,247,0.10), transparent 60%)",
                "radial-gradient(420px 180px at 10% 0%, rgba(96,165,250,0.14), transparent 60%), radial-gradient(420px 180px at 90% 20%, rgba(216,180,254,0.14), transparent 60%)"
              )}
              pointerEvents="none"
            />
            <Stack spacing={3} position="relative" zIndex={1}>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" color={textColor}>
                Рост через вклад
              </Text>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={titleColor} letterSpacing="-0.02em">
                Попади в топ и закрепи результат
              </Text>
              <Text color={textColor} fontSize={{ base: "sm", md: "md" }} lineHeight="1.7">
                Делай шаги — и тебя будут видеть: практика, статьи, участие в разборах и командных форматах превращаются в сильный профиль и
                выводят в топ.
              </Text>
              <HStack pt={1}>
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
              
            </Stack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomeTrustedTeamsSection;

