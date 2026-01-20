"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiAward, FiCompass, FiCpu, FiLayers, FiMap, FiTarget } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppBoxLink, AppButtonLink, AppLink } from "@/shared/ui/AppLink";

type MapCard = {
  id: string;
  title: string;
  desc: string;
  to: string;
  icon: React.ElementType;
  accent: "blue" | "purple" | "green" | "orange" | "gray" | "yellow";
};

const HomeEcosystemMapSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.65)");
  const cardHoverShadow = useColorModeValue("0 12px 30px rgba(15, 23, 42, 0.10)", "0 12px 30px rgba(0,0,0,0.40)");

  const cards: MapCard[] = [
    {
      id: "roadmap",
      title: "Роудмэп",
      desc: "Выбираешь направление и собираешь дорожку развития: что учить, где закреплять практикой.",
      to: "/learn#learn-roadmap-cta-title",
      icon: FiMap,
      accent: "blue",
    },
    {
      id: "weekly",
      title: "Weekly",
      desc: "Регулярные задачи, чтобы держать ритм и не терять прогресс.",
      to: "/weekly",
      icon: FiTarget,
      accent: "green",
    },
    {
      id: "projects",
      title: "Проекты",
      desc: "Собираешь результат внутри направления — от маленьких шагов к полноценному кейсу.",
      to: "/learn",
      icon: FiLayers,
      accent: "orange",
    },
    {
      id: "profile",
      title: "Профиль и достижения",
      desc: "XP, уровни и достижения растут вместе с тобой — прогресс видно по действиям.",
      to: "/profile?achievements",
      icon: FiAward,
      accent: "yellow",
    },
  ];

  return (
    <Box
      as="section"
      aria-labelledby="home-ecosystem-map-title"
      id="home-map"
      scrollMarginTop="120px"
      px={0}
      py={{ base: 12, md: 16 }}
    >
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
              "radial-gradient(520px 240px at 16% 20%, rgba(234,179,8,0.10), transparent 60%), radial-gradient(520px 240px at 84% 12%, rgba(59,130,246,0.12), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="860px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="blue" variant="outline" uppercase={false} icon={FiCompass}>
                  Карта экосистемы
                </PillBadge>
                <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
                  Понятный маршрут для новичка
                </PillBadge>
              </HStack>
              <Heading id="home-ecosystem-map-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Не “где тут что?” — а маршрут роста
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Главная идея AIFFA: всё связано. Выбираешь цель → учишься по теме → закрепляешь задачами → собираешь проекты →
                получаешь фидбек и рост в профиле.
              </Text>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {cards.map((c) => (
                <AppBoxLink
                  key={c.id}
                  to={c.to}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="2xl"
                  p={4}
                  bg={cardBg}
                  _hover={{ transform: "translateY(-1px)", boxShadow: cardHoverShadow }}
                  transition="all 0.18s ease"
                  aria-label={c.title}
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
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        {c.title}
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        {c.desc}
                      </Text>
                    </Box>
                  </HStack>
                </AppBoxLink>
              ))}
            </SimpleGrid>

            <HStack spacing={2} flexWrap="wrap" justify="center" color={textColor} fontSize="sm">
              <Text as="span">Также:</Text>
              <AppLink to="/learn" fontWeight="semibold" aria-label="Открыть материалы с задачами">
                материалы с задачами
              </AppLink>
              <Text as="span">•</Text>
              <AppLink to="/weekly" fontWeight="semibold" aria-label="Открыть weekly (попробовать AI на задаче)">
                AI‑инструменты
              </AppLink>
            </HStack>

            <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center" pt={1}>
              <AppButtonLink to="/learn" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                Построить роудмэп
              </AppButtonLink>
              <AppButtonLink to="/weekly" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Войти в ритм weekly
              </AppButtonLink>
              <AppButtonLink to="/profile?achievements" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Посмотреть достижения
              </AppButtonLink>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeEcosystemMapSection;

