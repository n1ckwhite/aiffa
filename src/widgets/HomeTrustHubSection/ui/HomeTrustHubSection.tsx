"use client";

import React from "react";
import { Box, Button, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiAward, FiCheckCircle, FiShield, FiStar, FiTrendingUp } from "react-icons/fi";
import SegmentGroup from "@/shared/ui/SegmentGroup";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

type Mode = "trust" | "recognition" | "quality";

const HomeTrustHubSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  const [mode, setMode] = React.useState<Mode>("trust");
  const tabItems = [
    { value: "trust", label: "Доверие" },
    { value: "recognition", label: "Награды" },
    { value: "quality", label: "Качество" },
  ];

  return (
    <Box
      as="section"
      aria-labelledby="home-trust-hub-title"
      id="home-trust-hub"
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
              "radial-gradient(520px 240px at 14% 16%, rgba(234,179,8,0.10), transparent 60%), radial-gradient(520px 240px at 86% 12%, rgba(59,130,246,0.12), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align={{ base: "stretch", md: "center" }} justify="space-between">
              <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} spacing={3} maxW="820px">
                <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                  <PillBadge colorScheme="orange" variant="outline" uppercase={false} icon={FiShield}>
                    Серьёзная система
                  </PillBadge>
                  <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
                    Действия → прогресс → признание
                  </PillBadge>
                </HStack>
                <Heading id="home-trust-hub-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                  Доверие к прогрессу и ценность вклада
                </Heading>
                <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                  Чтобы платформа была серьёзной, всё должно быть прозрачно: что считается прогрессом, как он растёт и за что
                  дают признание.
                </Text>
              </VStack>

              <VStack align={{ base: "center", md: "flex-end" }} spacing={2}>
                <SegmentGroup.Root value={mode} onValueChange={(v) => setMode(v as Mode)} size="md">
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items items={tabItems} name="home-trust-hub" />
                </SegmentGroup.Root>
                <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", md: "flex-end" }}>
                  {mode !== "trust" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      leftIcon={<Icon as={FiShield} />}
                      onClick={() => setMode("trust")}
                      aria-label="Переключиться на вкладку Доверие"
                    >
                      Доверие
                    </Button>
                  ) : null}
                  {mode !== "recognition" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      leftIcon={<Icon as={FiAward} />}
                      onClick={() => setMode("recognition")}
                      aria-label="Переключиться на вкладку Награды"
                    >
                      Награды
                    </Button>
                  ) : null}
                  {mode !== "quality" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      leftIcon={<Icon as={FiCheckCircle} />}
                      onClick={() => setMode("quality")}
                      aria-label="Переключиться на вкладку Качество"
                    >
                      Качество
                    </Button>
                  ) : null}
                </HStack>
              </VStack>
            </Stack>

            {mode === "trust" ? (
              <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
                {[
                  {
                    id: "xp",
                    icon: FiTrendingUp,
                    title: "XP и уровни",
                    desc: "Опыт начисляется за решения. Уровень растёт — задачи становятся сложнее и полезнее.",
                  },
                  {
                    id: "ach",
                    icon: FiAward,
                    title: "Достижения",
                    desc: "Награды за регулярность, вклад и результаты. Они растут вместе с тобой.",
                  },
                  {
                    id: "checks",
                    icon: FiCheckCircle,
                    title: "Проверки и фидбек",
                    desc: "Цикл “решил → проверил → улучшил” делает прогресс честным и закреплённым.",
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
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Посмотри, как это выглядит
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Профиль фиксирует прогресс и достижения — это “история развития” в экосистеме.
                  </Text>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/profile?achievements" colorScheme="blue" borderRadius="full">
                      Достижения
                    </AppButtonLink>
                    <AppButtonLink to="/weekly" variant="outline" borderRadius="full">
                      Решить задачу
                    </AppButtonLink>
                  </HStack>
                </Box>
              </SimpleGrid>
            ) : null}

            {mode === "recognition" ? (
              <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
                {[
                  {
                    id: "stars",
                    icon: FiStar,
                    title: "Звёзды и отклик",
                    desc: "Комьюнити подсказывает, что полезно. Это простой и честный сигнал качества.",
                  },
                  {
                    id: "tops",
                    icon: FiAward,
                    title: "Топы и подборки",
                    desc: "Можно попасть в подборки по weekly, материалам, проектам и статьям — и получить публичное признание.",
                  },
                  {
                    id: "creator",
                    icon: FiTrendingUp,
                    title: "Растёшь как создатель",
                    desc: "Вклад превращается в репутацию: задачи, материалы, проекты и помощь другим становятся частью истории.",
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
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Хочешь в топ — начни с малого
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Реши weekly, улучши материал или добавь задачу. Дальше — регулярность и польза.
                  </Text>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full">
                      Создатели
                    </AppButtonLink>
                    <AppButtonLink to="/weekly" variant="outline" borderRadius="full">
                      Weekly
                    </AppButtonLink>
                  </HStack>
                </Box>
              </SimpleGrid>
            ) : null}

            {mode === "quality" ? (
              <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
                {[
                  {
                    id: "moderation",
                    icon: FiCheckCircle,
                    title: "Отбор и улучшение",
                    desc: "UGC проходит улучшение и отбор: формулировки, критерии, примеры и польза.",
                  },
                  {
                    id: "culture",
                    icon: FiShield,
                    title: "Безопасная среда",
                    desc: "Мы строим культуру без токсичности, чтобы новичкам было безопасно учиться и задавать вопросы.",
                  },
                  {
                    id: "clarity",
                    icon: FiTrendingUp,
                    title: "Прозрачные правила",
                    desc: "Понятно, за что дают XP/достижения и как попасть в топ. Это укрепляет доверие к системе.",
                  },
                ].map((c) => (
                  <Box key={c.id} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                    <HStack spacing={3} align="flex-start">
                      <Box
                        w="44px"
                        h="44px"
                        borderRadius="xl"
                        bg="green.50"
                        color="green.700"
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
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Хочешь помочь качеству — ты тоже создатель
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Улучшай материалы и задачи — это самый ценный вклад в экосистему.
                  </Text>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full">
                      Как стать создателем
                    </AppButtonLink>
                    <AppButtonLink to="/learn" variant="outline" borderRadius="full">
                      Материалы
                    </AppButtonLink>
                  </HStack>
                </Box>
              </SimpleGrid>
            ) : null}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTrustHubSection;

