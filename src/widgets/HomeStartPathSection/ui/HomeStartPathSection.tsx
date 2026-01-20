"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiBriefcase, FiMap, FiTarget, FiUsers, FiZap } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

type PathCard = {
  id: string;
  title: string;
  desc: string;
  bullets: readonly string[];
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
  icon: React.ElementType;
  accent: "blue" | "green" | "purple" | "orange";
};

const HomeStartPathSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  const cards: readonly PathCard[] = [
    {
      id: "newbie",
      title: "Я новичок / хочу в IT",
      desc: "Понятный маршрут и практика без перегруза: шаг за шагом, с закреплением и ростом уверенности.",
      bullets: ["Построить роудмэп", "Разобрать тему + задачи", "Решить weekly и получить XP"],
      primary: { label: "Начать с weekly", to: "/weekly" },
      secondary: { label: "Построить роудмэп", to: "/learn#learn-roadmap-cta-title" },
      icon: FiMap,
      accent: "blue",
    },
    {
      id: "dev",
      title: "Я уже разработчик",
      desc: "Быстрый рост через вклад и команду: проекты, хакатоны, разборы, признание в экосистеме.",
      bullets: ["Вклад в материалы/задачи", "Проекты и хакатоны", "Создатели и достижения"],
      primary: { label: "Стать создателем", to: "/creators" },
      secondary: { label: "Открыть хакатоны", to: "/hackathons" },
      icon: FiUsers,
      accent: "purple",
    },
    {
      id: "business",
      title: "Я компания / HR",
      desc: "Серьёзные форматы, где навык видно по решениям: найм, бренд и продукт через практику.",
      bullets: ["Практические форматы", "Прозрачный процесс", "Отчёт и метрики"],
      primary: { label: "Партнёрство для компаний", to: "/partners" },
      secondary: { label: "Смотреть как работает", to: "/partners#partners-overview-heading" },
      icon: FiBriefcase,
      accent: "green",
    },
  ] as const;

  return (
    <Box as="section" aria-labelledby="home-start-path-title" px={0} py={{ base: 10, md: 14 }}>
      <Container maxW="1200px">
        <Box
          borderRadius="3xl"
          borderWidth="1px"
          borderColor={borderColor}
          bg={surfaceBg}
          p={{ base: 5, md: 7 }}
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            bgImage:
              "radial-gradient(520px 240px at 14% 14%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(520px 240px at 86% 18%, rgba(34,197,94,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="860px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="blue" variant="outline" uppercase={false} icon={FiTarget}>
                  Быстрый старт
                </PillBadge>
                <PillBadge colorScheme="gray" variant="outline" uppercase={false} icon={FiZap}>
                  Максимум ценности за первые 10 минут
                </PillBadge>
              </HStack>
              <Heading id="home-start-path-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Выбери свой путь — и мы поведём дальше
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Чтобы платформа давала ценность сразу, мы собрали три понятных сценария. Выбирай свой — и переходи к действию.
              </Text>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {cards.map((c) => (
                <Box
                  key={c.id}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="2xl"
                  p={{ base: 4, md: 5 }}
                  bg={cardBg}
                >
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg={`${c.accent}.50`}
                      color={`${c.accent}.700`}
                      _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <Icon as={c.icon} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0} flex={1}>
                      <Text fontWeight="bold" color={titleColor}>
                        {c.title}
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        {c.desc}
                      </Text>
                      <VStack as="ul" align="stretch" spacing={2} mt={3} pl={0} color={textColor} fontSize="sm">
                        {c.bullets.map((b) => (
                          <HStack as="li" key={b} spacing={2} align="flex-start">
                            <Box as="span" mt={1.5} boxSize={1.5} borderRadius="full" bg={`${c.accent}.400`} flexShrink={0} />
                            <Text>{b}</Text>
                          </HStack>
                        ))}
                      </VStack>
                      <HStack spacing={2} flexWrap="wrap" mt={4}>
                        <AppButtonLink to={c.primary.to} colorScheme="blue" borderRadius="full" w={{ base: "100%", sm: "auto" }}>
                          {c.primary.label}
                        </AppButtonLink>
                        <AppButtonLink to={c.secondary.to} variant="outline" borderRadius="full" w={{ base: "100%", sm: "auto" }}>
                          {c.secondary.label}
                        </AppButtonLink>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeStartPathSection;

