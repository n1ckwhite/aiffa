"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiAward, FiStar, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

const HomeRecognitionSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  return (
    <Box as="section" aria-labelledby="home-recognition-title" px={0} py={{ base: 12, md: 16 }}>
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
              "radial-gradient(520px 240px at 14% 18%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(520px 240px at 86% 14%, rgba(234,179,8,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={3} textAlign="center" maxW="860px" mx="auto">
              <HStack spacing={2} flexWrap="wrap" justify="center">
                <PillBadge colorScheme="purple" variant="outline" uppercase={false} icon={FiStar}>
                  Признание вклада
                </PillBadge>
                <PillBadge colorScheme="yellow" variant="outline" uppercase={false} icon={FiAward}>
                  Награды и топы
                </PillBadge>
              </HStack>
              <Heading id="home-recognition-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Здесь ценят вклад — и ты можешь попасть в топ
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                AIFFA — это экосистема, где вклад виден: решения, материалы, проекты, статьи, помощь другим. Регулярность и польза
                превращаются в XP, достижения, признание и награды.
              </Text>
            </VStack>

            <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
              {[
                {
                  id: "actions",
                  icon: FiTrendingUp,
                  title: "Действия → результат",
                  desc: "Решения и вклад фиксируются. Чем больше пользы — тем сильнее твой профиль и доверие к прогрессу.",
                },
                {
                  id: "top",
                  icon: FiTarget,
                  title: "Топы по направлениям",
                  desc: "Можно попасть в подборки по материалам, проектам, weekly и статьям — это мотивация и публичное признание.",
                },
                {
                  id: "awards",
                  icon: FiAward,
                  title: "Награды и достижения",
                  desc: "Достижения растут вместе с тобой: регулярность, вклад, результаты, участие в командных событиях.",
                },
                {
                  id: "community",
                  icon: FiUsers,
                  title: "Комьюнити замечает",
                  desc: "Звёзды и обратная связь помогают выделять полезное. Это честный сигнал, что ты реально помог людям.",
                },
              ].map((c) => (
                <Box key={c.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box
                      w="44px"
                      h="44px"
                      borderRadius="xl"
                      bg="purple.50"
                      color="purple.700"
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
              <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                Смотреть топ создателей
              </AppButtonLink>
              <AppButtonLink to="/profile?achievements" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Мои достижения
              </AppButtonLink>
              <AppButtonLink to="/weekly" variant="outline" borderRadius="full" px={{ base: 6, md: 7 }}>
                Начать с задачи
              </AppButtonLink>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeRecognitionSection;

