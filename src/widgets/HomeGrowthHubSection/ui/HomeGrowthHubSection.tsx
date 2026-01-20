"use client";

import React from "react";
import { Box, Button, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiCalendar, FiMessageCircle, FiSend, FiUsers, FiZap } from "react-icons/fi";
import SegmentGroup from "@/shared/ui/SegmentGroup";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { telegramHref } from "@/widgets/Footer/model/links";
import { useWeeklyResetCountdown } from "@/widgets/WeeklyTasks/parts/Countdown/hooks/useWeeklyResetCountdown";

type Mode = "weekly" | "hackathons" | "community";

const HomeGrowthHubSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.60)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");

  const [mode, setMode] = React.useState<Mode>("weekly");
  const countdown = useWeeklyResetCountdown();

  const tabItems = [
    { value: "weekly", label: "Weekly" },
    { value: "hackathons", label: "Хакатоны" },
    { value: "community", label: "Комьюнити" },
  ];

  return (
    <Box
      as="section"
      aria-labelledby="home-growth-hub-title"
      id="home-growth-hub"
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
              "radial-gradient(520px 240px at 14% 14%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(520px 240px at 86% 18%, rgba(249,115,22,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align={{ base: "stretch", md: "center" }} justify="space-between">
              <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} spacing={3} maxW="820px">
                <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                  <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                    События и рост
                  </PillBadge>
                  <PillBadge colorScheme="green" variant="outline" uppercase={false} icon={FiUsers}>
                    Регулярно и с людьми
                  </PillBadge>
                </HStack>
                <Heading id="home-growth-hub-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                  Ритм экосистемы: weekly → команда → фидбек
                </Heading>
                <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                  Главное в AIFFA — не разовый “рывок”, а стабильный рост. Для этого есть ритм weekly, командный опыт на хакатонах
                  и постоянная обратная связь в комьюнити и на сессиях.
                </Text>
              </VStack>

              <VStack align={{ base: "center", md: "flex-end" }} spacing={2}>
                <SegmentGroup.Root value={mode} onValueChange={(v) => setMode(v as Mode)} size="md">
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items items={tabItems} name="home-growth-hub" />
                </SegmentGroup.Root>
                <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", md: "flex-end" }}>
                  {mode !== "weekly" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      leftIcon={<Icon as={FiCalendar} />}
                      onClick={() => setMode("weekly")}
                      aria-label="Переключиться на вкладку Weekly"
                    >
                      Weekly
                    </Button>
                  ) : null}
                  {mode !== "hackathons" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      leftIcon={<Icon as={FiZap} />}
                      onClick={() => setMode("hackathons")}
                      aria-label="Переключиться на вкладку Хакатоны"
                    >
                      Хакатоны
                    </Button>
                  ) : null}
                  {mode !== "community" ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      leftIcon={<Icon as={FiUsers} />}
                      onClick={() => setMode("community")}
                      aria-label="Переключиться на вкладку Комьюнити"
                    >
                      Комьюнити
                    </Button>
                  ) : null}
                </HStack>
              </VStack>
            </Stack>

            {mode === "weekly" ? (
              <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box w="44px" h="44px" borderRadius="xl" bg="blue.50" color="blue.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <Icon as={FiCalendar} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        Weekly‑задачи
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        Маленькие практические шаги, которые держат ритм. Решил — получил XP — стал увереннее.
                      </Text>
                      <Text mt={2.5} fontSize="xs" color={textColor}>
                        До обновления:{" "}
                        <Box as="span" fontWeight="bold" color={titleColor}>
                          {countdown.days}д {countdown.hours}ч {countdown.minutes}м {countdown.seconds}с
                        </Box>
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Как получить максимум ценности
                  </Text>
                  <VStack as="ul" align="stretch" spacing={2} mt={3} pl={0} color={textColor} fontSize="sm">
                    {["Выбери задачу по силам", "Сделай решение в IDE на сайте", "Проверь, исправь, зафиксируй прогресс"].map((t) => (
                      <HStack as="li" key={t} spacing={2} align="flex-start">
                        <Box as="span" mt={1.5} boxSize={1.5} borderRadius="full" bg="blue.400" flexShrink={0} />
                        <Text>{t}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/weekly" colorScheme="blue" borderRadius="full">
                      Открыть weekly
                    </AppButtonLink>
                    <AppButtonLink to="/profile?achievements" variant="outline" borderRadius="full">
                      Достижения
                    </AppButtonLink>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Когда застрял — это нормально
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Лучший рост — когда есть фидбек. В комьюнити можно быстро спросить и не терять мотивацию.
                  </Text>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <Button as="a" href={telegramHref} target="_blank" rel="noopener noreferrer" borderRadius="full" colorScheme="blue" aria-label="Перейти в Telegram" leftIcon={<Icon as={FiSend} />}>
                      Telegram
                    </Button>
                    <AppButtonLink to="/sessions" variant="outline" borderRadius="full">
                      Сессии
                    </AppButtonLink>
                  </HStack>
                </Box>
              </SimpleGrid>
            ) : null}

            {mode === "hackathons" ? (
              <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box w="44px" h="44px" borderRadius="xl" bg="orange.50" color="orange.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <Icon as={FiZap} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        Командный опыт
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        Это тренировка “как на работе”: роли, коммуникация, ревью, дедлайны и результат.
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Почему помогает устроиться
                  </Text>
                  <VStack as="ul" align="stretch" spacing={2} mt={3} pl={0} color={textColor} fontSize="sm">
                    {["Появляется реальный кейс", "Есть командная история", "Профиль фиксирует вклад и участие"].map((t) => (
                      <HStack as="li" key={t} spacing={2} align="flex-start">
                        <Box as="span" mt={1.5} boxSize={1.5} borderRadius="full" bg="orange.400" flexShrink={0} />
                        <Text>{t}</Text>
                      </HStack>
                    ))}
                  </VStack>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/hackathons" colorScheme="blue" borderRadius="full">
                      Открыть хакатоны
                    </AppButtonLink>
                    <AppButtonLink to="/creators" variant="outline" borderRadius="full">
                      Победители
                    </AppButtonLink>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Награды и признание
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Призы, достижения и публичное признание комьюнити — это дополнительная мотивация и сильный сигнал.
                  </Text>
                </Box>
              </SimpleGrid>
            ) : null}

            {mode === "community" ? (
              <SimpleGrid minChildWidth={{ base: "100%", md: "320px" }} spacing={4} w="full">
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box w="44px" h="44px" borderRadius="xl" bg="green.50" color="green.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <Icon as={FiUsers} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        Люди, которые помогают
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        Вопросы, знакомства, команды, поддержка и разборы. Это ускоряет рост сильнее любой одиночной теории.
                      </Text>
                    </Box>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={3} align="flex-start">
                    <Box w="44px" h="44px" borderRadius="xl" bg="blue.50" color="blue.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                      <Icon as={FiMessageCircle} boxSize={5} aria-hidden="true" />
                    </Box>
                    <Box minW={0}>
                      <Text fontWeight="bold" color={titleColor}>
                        Постоянный фидбек
                      </Text>
                      <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                        Можно спросить, получить ответ и улучшить решение. А идеи по платформе превращаются в улучшения.
                      </Text>
                    </Box>
                  </HStack>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <Button as="a" href={telegramHref} target="_blank" rel="noopener noreferrer" borderRadius="full" colorScheme="blue" aria-label="Перейти в Telegram" leftIcon={<Icon as={FiSend} />}>
                      Telegram
                    </Button>
                    <AppButtonLink to="/sessions" variant="outline" borderRadius="full">
                      Сессии
                    </AppButtonLink>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <Text fontWeight="bold" color={titleColor}>
                    Хочешь попасть в топ — вкладывайся
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Вклад ценится: задачи, статьи, материалы, проекты, помощь новичкам. Это ведёт к признанию, наградам и “Создателям”.
                  </Text>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full">
                      Создатели
                    </AppButtonLink>
                    <AppButtonLink to="/profile?achievements" variant="outline" borderRadius="full">
                      Достижения
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

export default HomeGrowthHubSection;

