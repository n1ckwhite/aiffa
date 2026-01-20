"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiAward, FiCheckCircle, FiGitPullRequest, FiShield, FiTrendingUp } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { useHackathonsCommunityMetrics } from "@/widgets/Hackathons/parts/CommunityGrowthSection/data";

const HomeProgressTrustSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.65)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  const metrics = useHackathonsCommunityMetrics();
  const participants = metrics.find((m) => m.id === "participants");
  const weeklyTasks = metrics.find((m) => m.id === "weeklyTasks");

  return (
    <Box as="section" aria-labelledby="home-trust-title" px={0} py={{ base: 12, md: 16 }}>
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
              "radial-gradient(520px 240px at 18% 16%, rgba(249,115,22,0.10), transparent 60%), radial-gradient(520px 240px at 86% 12%, rgba(59,130,246,0.12), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="860px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="orange" variant="outline" uppercase={false} icon={FiShield}>
                  Доверие к прогрессу
                </PillBadge>
                <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
                  Серьёзная платформа
                </PillBadge>
              </HStack>
              <Heading id="home-trust-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Прогресс — не слова, а след действий
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                В AIFFA доверие строится на практике: решения, вклад, участие и достижения формируют понятную историю развития —
                как профиль в экосистеме, а не “галочка в резюме”.
              </Text>
              <HStack spacing={2} flexWrap="wrap" justify="center">
                {participants ? (
                  <PillBadge colorScheme="green" variant="solid" uppercase={false}>
                    {participants.valueLabel} {participants.description}
                  </PillBadge>
                ) : null}
                {weeklyTasks ? (
                  <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                    {weeklyTasks.valueLabel} {weeklyTasks.description}
                  </PillBadge>
                ) : null}
                <PillBadge colorScheme="orange" variant="solid" uppercase={false}>
                  XP и достижения растут вместе с тобой
                </PillBadge>
              </HStack>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {[
                {
                  id: "xp",
                  icon: FiTrendingUp,
                  title: "XP и уровни",
                  desc: "Накопление опыта за решения. Уровень растёт — задачи становятся сложнее и полезнее под твой прогресс.",
                },
                {
                  id: "achievements",
                  icon: FiAward,
                  title: "Достижения",
                  desc: "Награды за регулярность, вклад и результаты. Они мотивируют и делают путь развития видимым.",
                },
                {
                  id: "contrib",
                  icon: FiGitPullRequest,
                  title: "Вклад в экосистему",
                  desc: "Задачи, статьи, материалы, проекты, помощь другим — это ценится и отображается в истории активности.",
                },
                {
                  id: "checks",
                  icon: FiCheckCircle,
                  title: "Проверки и качество",
                  desc: "Решения проверяются, обсуждаются и улучшаются — чтобы прогресс был честным и полезным.",
                },
              ].map((c) => (
                <Box key={c.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg="orange.50"
                      color="orange.700"
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
                </Box>
              ))}
            </SimpleGrid>

            <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center" pt={1}>
              <AppButtonLink to="/profile?achievements" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                Открыть достижения
              </AppButtonLink>
              <AppButtonLink to="/weekly" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Решить задачу
              </AppButtonLink>
              <AppButtonLink to="/creators" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Посмотреть создателей
              </AppButtonLink>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeProgressTrustSection;

