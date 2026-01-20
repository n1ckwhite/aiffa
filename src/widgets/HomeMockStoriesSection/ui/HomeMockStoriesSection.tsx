"use client";

import React from "react";
import { Box, Container, Heading, HStack, Icon, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FiAward, FiBarChart2, FiBriefcase, FiCheckCircle, FiMap, FiTarget, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import SegmentGroup from "@/shared/ui/SegmentGroup";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink } from "@/shared/ui/AppLink";

type Mode = "junior" | "team" | "business";

const HomeMockStoriesSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.55)");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const subCardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");

  const [mode, setMode] = React.useState<Mode>("junior");
  const tabs = [
    { value: "junior", label: "Новичок" },
    { value: "team", label: "Команда" },
    { value: "business", label: "Бизнес" },
  ];

  return (
    <Box
      as="section"
      aria-labelledby="home-stories-title"
      id="home-stories"
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
              "radial-gradient(520px 240px at 14% 14%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(520px 240px at 86% 18%, rgba(34,197,94,0.10), transparent 62%)",
            pointerEvents: "none",
          }}
        >
          <VStack spacing={{ base: 5, md: 7 }} align="stretch" position="relative" zIndex={1}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} align={{ base: "stretch", md: "center" }} justify="space-between">
              <VStack align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} spacing={3} maxW="820px">
                <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                  <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                    Кейсы (мок)
                  </PillBadge>
                  <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
                    До → После
                  </PillBadge>
                </HStack>
                <Heading id="home-stories-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                  Как выглядит рост в AIFFA
                </Heading>
                <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                  Это моки, чтобы показать идею. Когда появится бэк — здесь будут реальные истории, профили и результаты.
                </Text>
              </VStack>

              <Box display="flex" justifyContent={{ base: "center", md: "flex-end" }}>
                <SegmentGroup.Root value={mode} onValueChange={(v) => setMode(v as Mode)} size="md">
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items items={tabs} name="home-stories" />
                </SegmentGroup.Root>
              </Box>
            </Stack>

            {mode === "junior" ? (
              <Stack direction={{ base: "column", lg: "row" }} spacing={4} align="stretch">
                <Box flex={2} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                  <HStack spacing={2} flexWrap="wrap">
                    <PillBadge colorScheme="blue" variant="solid" uppercase={false} icon={FiMap}>
                      Новичок
                    </PillBadge>
                    <PillBadge colorScheme="green" variant="solid" uppercase={false} icon={FiTrendingUp}>
                      +250 XP за 2 недели (мок)
                    </PillBadge>
                    <PillBadge colorScheme="yellow" variant="solid" uppercase={false} icon={FiAward}>
                      2 достижения (мок)
                    </PillBadge>
                  </HStack>
                  <Text mt={3} fontWeight="bold" color={titleColor} fontSize={{ base: "lg", md: "xl" }}>
                    “Пришёл без опыта → собрал первый мини‑проект”
                  </Text>
                  <Text mt={2} fontSize="sm" color={textColor} lineHeight="1.7">
                    Featured‑маршрут: weekly → вопрос в TG → роудмэп → задачи в материале → мини‑проект → первое достижение.
                  </Text>
                  <SimpleGrid minChildWidth={{ base: "100%", md: "240px" }} spacing={3} mt={4}>
                    {[
                      { icon: FiTarget, title: "Результат", desc: "1 мини‑проект + 6 решённых задач weekly (мок)" },
                      { icon: FiAward, title: "Достижения", desc: "first‑weekly, five‑tasks (мок)" },
                      { icon: FiUsers, title: "Команда/связи", desc: "нашёл 1–2 контакта в TG (мок)" },
                      { icon: FiCheckCircle, title: "Уверенность", desc: "понимает, что делать дальше (роудмэп)" },
                    ].map((c) => (
                      <Box key={c.title} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                        <HStack spacing={2} align="flex-start">
                          <Box w="34px" h="34px" borderRadius="lg" bg="blue.50" color="blue.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                            <Icon as={c.icon} boxSize={4} aria-hidden="true" />
                          </Box>
                          <Box minW={0}>
                            <Text fontWeight="bold" color={titleColor} fontSize="sm">
                              {c.title}
                            </Text>
                            <Text mt={0.5} fontSize="xs" color={mutedColor} lineHeight="1.5">
                              {c.desc}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/weekly" colorScheme="blue" borderRadius="full">
                      Начать с weekly
                    </AppButtonLink>
                    <AppButtonLink to="/learn" variant="outline" borderRadius="full">
                      Построить роудмэп
                    </AppButtonLink>
                  </HStack>
                </Box>

                <VStack flex={1} spacing={4} align="stretch">
                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <Text fontWeight="bold" color={titleColor}>
                      Компактный кейс #2 (мок)
                    </Text>
                    <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                      “Застрял на задаче → спросил в TG → понял ошибку → сделал и закрепил в профиле”
                    </Text>
                    <HStack spacing={2} flexWrap="wrap" mt={3}>
                      <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                        фидбек за 10–15 мин
                      </PillBadge>
                      <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                        +50 XP (мок)
                      </PillBadge>
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap" mt={4}>
                      <AppButtonLink to="/weekly" colorScheme="blue" borderRadius="full">
                        Начать weekly
                      </AppButtonLink>
                      <AppButtonLink to="/sessions" variant="outline" borderRadius="full">
                        Сессии
                      </AppButtonLink>
                    </HStack>
                  </Box>

                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <Text fontWeight="bold" color={titleColor}>
                      Компактный кейс #3 (мок)
                    </Text>
                    <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                      “Собрал роудмэп → прошёл 1 материал → сделал задачи по теме → начал мини‑проект”
                    </Text>
                    <HStack spacing={2} flexWrap="wrap" mt={3}>
                      <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                        1 материал
                      </PillBadge>
                      <PillBadge colorScheme="yellow" variant="outline" uppercase={false}>
                        1 проект в процессе
                      </PillBadge>
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap" mt={4}>
                      <AppButtonLink to="/learn" colorScheme="blue" borderRadius="full">
                        Роудмэп
                      </AppButtonLink>
                      <AppButtonLink to="/learn" variant="outline" borderRadius="full">
                        Материалы
                      </AppButtonLink>
                    </HStack>
                  </Box>
                </VStack>
              </Stack>
            ) : null}

            {mode === "team" ? (
              <Stack direction={{ base: "column", lg: "row" }} spacing={4} align="stretch">
                <Box flex={2} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                  <HStack spacing={2} flexWrap="wrap">
                    <PillBadge colorScheme="orange" variant="solid" uppercase={false} icon={FiZap}>
                      Хакатон
                    </PillBadge>
                    <PillBadge colorScheme="yellow" variant="solid" uppercase={false} icon={FiAward}>
                      Призовое место (мок)
                    </PillBadge>
                    <PillBadge colorScheme="blue" variant="solid" uppercase={false} icon={FiBriefcase}>
                      кейс в портфолио (мок)
                    </PillBadge>
                  </HStack>
                  <Text mt={3} fontWeight="bold" color={titleColor} fontSize={{ base: "lg", md: "xl" }}>
                    “Собрали команду → сделали прототип → получили кейс для резюме”
                  </Text>
                  <Text mt={2} fontSize="sm" color={textColor} lineHeight="1.7">
                    Тренировка как на работе: роли, коммуникация, ревью, дедлайны и защита решения.
                  </Text>
                  <SimpleGrid minChildWidth={{ base: "100%", md: "240px" }} spacing={3} mt={4}>
                    {[
                      { icon: FiUsers, title: "Команда", desc: "3 человека, роли и план (мок)" },
                      { icon: FiCheckCircle, title: "Процессы", desc: "таски, ревью, дедлайны (мок)" },
                      { icon: FiBriefcase, title: "Кейс", desc: "проект, который можно показать (мок)" },
                      { icon: FiAward, title: "Признание", desc: "упоминание/награда в экосистеме (мок)" },
                    ].map((c) => (
                      <Box key={c.title} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                        <HStack spacing={2} align="flex-start">
                          <Box w="34px" h="34px" borderRadius="lg" bg="orange.50" color="orange.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                            <Icon as={c.icon} boxSize={4} aria-hidden="true" />
                          </Box>
                          <Box minW={0}>
                            <Text fontWeight="bold" color={titleColor} fontSize="sm">
                              {c.title}
                            </Text>
                            <Text mt={0.5} fontSize="xs" color={mutedColor} lineHeight="1.5">
                              {c.desc}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/hackathons" colorScheme="blue" borderRadius="full">
                      Открыть хакатоны
                    </AppButtonLink>
                    <AppButtonLink to="/creators" variant="outline" borderRadius="full">
                      Победители
                    </AppButtonLink>
                  </HStack>
                </Box>

                <VStack flex={1} spacing={4} align="stretch">
                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <Text fontWeight="bold" color={titleColor}>
                      Компактный кейс #2 (мок)
                    </Text>
                    <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                      “Пришли по одному → собрали команду → распределили роли → довели до результата”
                    </Text>
                    <HStack spacing={2} flexWrap="wrap" mt={3}>
                      <PillBadge colorScheme="orange" variant="outline" uppercase={false}>
                        роли и план
                      </PillBadge>
                      <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                        дедлайн и защита
                      </PillBadge>
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap" mt={4}>
                      <AppButtonLink to="/hackathons" colorScheme="blue" borderRadius="full">
                        Хакатоны
                      </AppButtonLink>
                      <AppButtonLink to="/sessions" variant="outline" borderRadius="full">
                        Разборы
                      </AppButtonLink>
                    </HStack>
                  </Box>

                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <Text fontWeight="bold" color={titleColor}>
                      Компактный кейс #3 (мок)
                    </Text>
                    <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                      “После хакатона → доработали проект → добавили в портфолио → стало легче на собеседованиях”
                    </Text>
                    <VStack as="ul" align="stretch" spacing={2} mt={3} pl={0} color={textColor} fontSize="sm">
                      {[
                        "коммуникация и ревью",
                        "ответственность за результат",
                        "презентация и защита",
                      ].map((t) => (
                        <HStack as="li" key={t} spacing={2} align="flex-start">
                          <Box as="span" mt={1.5} boxSize={1.5} borderRadius="full" bg="orange.400" flexShrink={0} />
                          <Text>{t}</Text>
                        </HStack>
                      ))}
                    </VStack>
                    <HStack spacing={2} flexWrap="wrap" mt={4}>
                      <AppButtonLink to="/creators" colorScheme="blue" borderRadius="full">
                        Победители
                      </AppButtonLink>
                      <AppButtonLink to="/weekly" variant="outline" borderRadius="full">
                        Weekly
                      </AppButtonLink>
                    </HStack>
                  </Box>
                </VStack>
              </Stack>
            ) : null}

            {mode === "business" ? (
              <Stack direction={{ base: "column", lg: "row" }} spacing={4} align="stretch">
                <Box flex={2} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                  <HStack spacing={2} flexWrap="wrap">
                    <PillBadge colorScheme="green" variant="solid" uppercase={false} icon={FiBriefcase}>
                      Компания
                    </PillBadge>
                    <PillBadge colorScheme="blue" variant="solid" uppercase={false} icon={FiBarChart2}>
                      Отчёт и метрики (мок)
                    </PillBadge>
                    <PillBadge colorScheme="purple" variant="solid" uppercase={false} icon={FiUsers}>
                      топ участников (мок)
                    </PillBadge>
                  </HStack>
                  <Text mt={3} fontWeight="bold" color={titleColor} fontSize={{ base: "lg", md: "xl" }}>
                    “Запустили формат → получили отчёт → нашли сильных участников”
                  </Text>
                  <Text mt={2} fontSize="sm" color={textColor} lineHeight="1.7">
                    Прозрачный процесс: бриф → запуск → модерация → отчёт с метриками и лучшими решениями.
                  </Text>
                  <SimpleGrid minChildWidth={{ base: "100%", md: "240px" }} spacing={3} mt={4}>
                    {[
                      { icon: FiTarget, title: "KPI", desc: "найм / бренд / продуктовый фидбек (мок)" },
                      { icon: FiBarChart2, title: "Метрики", desc: "вовлечённость, решения, охваты (мок)" },
                      { icon: FiUsers, title: "Топ", desc: "лучшие участники/команды (мок)" },
                      { icon: FiCheckCircle, title: "Доверие", desc: "прогресс участников виден по действиям" },
                    ].map((c) => (
                      <Box key={c.title} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                        <HStack spacing={2} align="flex-start">
                          <Box w="34px" h="34px" borderRadius="lg" bg="green.50" color="green.700" _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
                            <Icon as={c.icon} boxSize={4} aria-hidden="true" />
                          </Box>
                          <Box minW={0}>
                            <Text fontWeight="bold" color={titleColor} fontSize="sm">
                              {c.title}
                            </Text>
                            <Text mt={0.5} fontSize="xs" color={mutedColor} lineHeight="1.5">
                              {c.desc}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>
                  <HStack spacing={2} flexWrap="wrap" mt={4}>
                    <AppButtonLink to="/partners" colorScheme="blue" borderRadius="full">
                      Партнёрство
                    </AppButtonLink>
                    <AppButtonLink to="/partners" variant="outline" borderRadius="full">
                      Как проходит
                    </AppButtonLink>
                  </HStack>
                </Box>

                <VStack flex={1} spacing={4} align="stretch">
                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <Text fontWeight="bold" color={titleColor}>
                      Компактный кейс #2 (мок)
                    </Text>
                    <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                      “Пилот на 3 недели → задачи + модерация → разборы → отчёт с метриками и инсайтами”
                    </Text>
                    <HStack spacing={2} flexWrap="wrap" mt={3}>
                      <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                        KPI и таймлайн
                      </PillBadge>
                      <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                        измеримый результат
                      </PillBadge>
                    </HStack>
                    <HStack spacing={2} flexWrap="wrap" mt={4}>
                      <AppButtonLink to="/partners" colorScheme="blue" borderRadius="full">
                        Партнёрство
                      </AppButtonLink>
                      <AppButtonLink to="/partners" variant="outline" borderRadius="full">
                        Форматы
                      </AppButtonLink>
                    </HStack>
                  </Box>

                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <Text fontWeight="bold" color={titleColor}>
                      Компактный кейс #3 (мок)
                    </Text>
                    <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                      “Найм → участники решают задачи → видно прогресс по действиям → контакт с сильными”
                    </Text>
                    <VStack as="ul" align="stretch" spacing={2.5} mt={3} pl={0} color={textColor} fontSize="sm">
                      {[
                        "метрики и вовлечённость",
                        "подборка лучших решений",
                        "качественный фидбек",
                        "рекомендации по следующим шагам",
                      ].map((t) => (
                        <HStack as="li" key={t} spacing={2} align="flex-start">
                          <Box as="span" mt={1.5} boxSize={1.5} borderRadius="full" bg="green.400" flexShrink={0} />
                          <Text>{t}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </Stack>
            ) : null}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeMockStoriesSection;

