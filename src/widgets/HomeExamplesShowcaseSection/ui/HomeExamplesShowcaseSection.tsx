"use client";

import React from "react";
import {
  Badge,
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiAward, FiCheckCircle, FiEye, FiStar, FiTarget } from "react-icons/fi";
import SegmentGroup from "@/shared/ui/SegmentGroup";
import PillBadge from "@/shared/ui/PillBadge";
import { AppButtonLink, AppLink } from "@/shared/ui/AppLink";
import { weeklyTasksMock } from "@/widgets/Profile/ProfileScreen/ui/data/weeklyTasksMock";
import { projectsPanel } from "@/widgets/Profile/ProfileScreen/ui/data/statModePanels/projects";
import { achievementDescriptions } from "@/widgets/AchievementsGrid/model/data";

type Mode = "weekly" | "projects" | "profile";

const HomeExamplesShowcaseSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const surfaceBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.45)");
  const cardBg = useColorModeValue("white", "rgba(2, 6, 23, 0.25)");
  const subCardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");
  const shadow = useColorModeValue("0 18px 48px rgba(15, 23, 42, 0.08)", "0 18px 48px rgba(0, 0, 0, 0.28)");

  const [mode, setMode] = React.useState<Mode>("weekly");
  const tabs = [
    { value: "weekly", label: "Weekly" },
    { value: "projects", label: "Проекты" },
    { value: "profile", label: "Профиль" },
  ];

  const weeklyCards = weeklyTasksMock.slice(0, 3);
  const featuredWeekly = weeklyCards[0] as any;
  const weeklyRest = weeklyCards.slice(1) as any[];

  const projectCards = (projectsPanel.items ?? []).slice(0, 3);
  const featuredProject = (projectCards[0] ?? null) as any;
  const projectRest = projectCards.slice(1) as any[];
  const achievements = [
    { id: "first-weekly", label: "Первая задача" },
    { id: "five-tasks", label: "5 задач" },
    { id: "streak-7", label: "Серия 7 дней" },
    { id: "reader", label: "1 материал" },
    { id: "feedback", label: "Отзыв" },
  ] as const;

  const mockProfile = {
    xp: 1240,
    tierLabel: "Средний",
    nextTierLabel: "Продвинутый",
    progressPct: 62,
    lastActions: ["Решил 2 задачи weekly", "Добавил правку в материал", "Участвовал в разборе на сессии"],
  } as const;

  return (
    <Box
      as="section"
      aria-labelledby="home-examples-title"
      id="home-examples"
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
          boxShadow={shadow}
          p={{ base: 5, md: 7 }}
          position="relative"
          overflow="hidden"
        >
          <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 6, lg: 10 }} align={{ base: "stretch", lg: "flex-start" }}>
            <VStack align={{ base: "center", lg: "flex-start" }} textAlign={{ base: "center", lg: "left" }} spacing={4} flex={1}>
              <HStack spacing={2} flexWrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                  Примеры
                </PillBadge>
                <PillBadge colorScheme="gray" variant="outline" uppercase={false}>
                  Конкретика вместо обещаний
                </PillBadge>
              </HStack>

              <Heading id="home-examples-title" as="h2" size={{ base: "md", md: "lg" }} letterSpacing="-0.02em" color={titleColor}>
                Вот что реально есть внутри платформы
              </Heading>
              <Text color={textColor} fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                Не нужно верить на слово. Посмотри примеры задач, проектов, достижений и того, что получает бизнес на выходе.
              </Text>

              <Box display="flex" justifyContent={{ base: "center", lg: "flex-start" }} w="full" pt={1}>
                <SegmentGroup.Root value={mode} onValueChange={(v) => setMode(v as Mode)} size="md">
                  <SegmentGroup.Indicator />
                  <SegmentGroup.Items items={tabs} name="home-examples" />
                </SegmentGroup.Root>
              </Box>

              <VStack align={{ base: "stretch", lg: "flex-start" }} spacing={2} w="full" pt={2}>
                {mode === "weekly" ? (
                  <>
                    <Text fontSize="sm" color={mutedColor}>
                      Пример карточек weekly (с наградой, обсуждением и статистикой решений).
                    </Text>
                    <AppButtonLink to="/weekly" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                      Открыть weekly
                    </AppButtonLink>
                  </>
                ) : null}
                {mode === "projects" ? (
                  <>
                    <Text fontSize="sm" color={mutedColor}>
                      Пример проектов внутри направлений (с просмотрами, звёздами и вкладом автора).
                    </Text>
                    <AppButtonLink to="/learn" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                      Открыть проекты
                    </AppButtonLink>
                  </>
                ) : null}
                {mode === "profile" ? (
                  <>
                    <Text fontSize="sm" color={mutedColor}>
                      Пример достижений и “следа действий”, который растёт вместе с тобой.
                    </Text>
                    <AppButtonLink to="/profile?achievements" colorScheme="blue" borderRadius="full" px={{ base: 6, md: 7 }}>
                      Открыть достижения
                    </AppButtonLink>
                  </>
                ) : null}
                <Text fontSize="sm" color={mutedColor}>
                  Для бизнеса — отдельный блок ниже (метрики, процесс, отчёт).
                </Text>
                <AppLink to="/partners" fontWeight="semibold" aria-label="Открыть страницу партнёрства для компаний">
                  Открыть “Для бизнеса”
                </AppLink>
              </VStack>
            </VStack>

            <Box flex={1} minW={0}>
              {mode === "weekly" ? (
                <VStack spacing={4} align="stretch">
                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                    <HStack justify="space-between" align="flex-start" spacing={4}>
                      <Box minW={0}>
                        <HStack spacing={2} flexWrap="wrap">
                          <Badge colorScheme="blue" borderRadius="full" px={2}>
                            Featured Weekly
                          </Badge>
                          <Badge colorScheme="gray" borderRadius="full" px={2}>
                            {String(featuredWeekly?.tag ?? "Task")}
                          </Badge>
                          <Badge colorScheme="green" borderRadius="full" px={2}>
                            Награда: 50 XP
                          </Badge>
                        </HStack>
                        <Text mt={2.5} fontWeight="bold" color={titleColor} fontSize={{ base: "lg", md: "xl" }} noOfLines={2}>
                          {featuredWeekly?.title ?? "Weekly‑задача"}
                        </Text>
                        <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                          {featuredWeekly?.description ?? "Практическая задача: решаешь — получаешь опыт — растёшь."}
                        </Text>
                        <SimpleGrid minChildWidth={{ base: "100%", md: "240px" }} spacing={3} mt={4}>
                          <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                            <Text fontWeight="bold" color={titleColor} fontSize="sm">
                              Что прокачаешь
                            </Text>
                            <Text mt={1} fontSize="xs" color={mutedColor}>
                              Практика без “воды”: навык делать, проверять и улучшать.
                            </Text>
                          </Box>
                          <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                            <Text fontWeight="bold" color={titleColor} fontSize="sm">
                              Как выглядит результат
                            </Text>
                            <Text mt={1} fontSize="xs" color={mutedColor}>
                              Решение + обсуждение + статистика — фиксируется в профиле.
                            </Text>
                          </Box>
                        </SimpleGrid>
                      </Box>
                      <AppButtonLink to={featuredWeekly?.to ?? "/weekly"} colorScheme="blue" borderRadius="full" px={5} flexShrink={0}>
                        Открыть
                      </AppButtonLink>
                    </HStack>
                    <Divider my={4} borderColor={borderColor} />
                    <HStack spacing={4} flexWrap="wrap" color={mutedColor} fontSize="sm">
                      <HStack spacing={1.5}>
                        <Icon as={FiStar} />
                        <Text as="span">{featuredWeekly?.starsCount ?? 0}</Text>
                      </HStack>
                      <HStack spacing={1.5}>
                        <Icon as={FiCheckCircle} />
                        <Text as="span">{featuredWeekly?.solvedCount ?? 0} решили</Text>
                      </HStack>
                      <Text as="span">{featuredWeekly?.dateLabel ?? ""}</Text>
                    </HStack>
                  </Box>

                  {weeklyRest.map((it) => (
                    <Box key={it.title} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                      <HStack justify="space-between" align="flex-start" spacing={4}>
                        <Box minW={0}>
                          <HStack spacing={2} flexWrap="wrap">
                            <Badge colorScheme="blue" borderRadius="full" px={2}>
                              Weekly
                            </Badge>
                            <Badge colorScheme="gray" borderRadius="full" px={2}>
                              {String(it.tag ?? "Task")}
                            </Badge>
                          </HStack>
                          <Text mt={2} fontWeight="bold" color={titleColor} noOfLines={2}>
                            {it.title}
                          </Text>
                          <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6" noOfLines={2}>
                            {it.description ?? ""}
                          </Text>
                        </Box>
                        <AppButtonLink to={it.to ?? "/weekly"} variant="outline" borderRadius="full" px={4} flexShrink={0}>
                          Открыть
                        </AppButtonLink>
                      </HStack>
                      <Divider my={3} borderColor={borderColor} />
                      <HStack spacing={4} flexWrap="wrap" color={mutedColor} fontSize="sm">
                        <HStack spacing={1.5}>
                          <Icon as={FiStar} />
                          <Text as="span">{it.starsCount ?? 0}</Text>
                        </HStack>
                        <HStack spacing={1.5}>
                          <Icon as={FiCheckCircle} />
                          <Text as="span">{it.solvedCount ?? 0} решили</Text>
                        </HStack>
                        <Text as="span">{it.dateLabel ?? ""}</Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : null}

              {mode === "projects" ? (
                <VStack spacing={4} align="stretch">
                  {featuredProject ? (
                    <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={{ base: 4, md: 5 }} bg={cardBg}>
                      <HStack justify="space-between" align="flex-start" spacing={4}>
                        <Box minW={0}>
                          <HStack spacing={2} flexWrap="wrap">
                            <Badge colorScheme="purple" borderRadius="full" px={2}>
                              Featured Проект
                            </Badge>
                            <Badge colorScheme="gray" borderRadius="full" px={2}>
                              {featuredProject.authorName ?? "AIFFA"}
                            </Badge>
                            <Badge colorScheme="blue" borderRadius="full" px={2}>
                              Портфолио‑кейс
                            </Badge>
                          </HStack>
                          <Text mt={2.5} fontWeight="bold" color={titleColor} fontSize={{ base: "lg", md: "xl" }} noOfLines={2}>
                            {featuredProject.title}
                          </Text>
                          <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.7">
                            Мини‑проект внутри направления: делаешь результат, который можно показывать и улучшать.
                          </Text>
                          <SimpleGrid minChildWidth={{ base: "100%", md: "240px" }} spacing={3} mt={4}>
                            <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                              <Text fontWeight="bold" color={titleColor} fontSize="sm">
                                Что получится
                              </Text>
                              <Text mt={1} fontSize="xs" color={mutedColor}>
                                Кейс + история улучшений + сигнал “умею доводить до результата”.
                              </Text>
                            </Box>
                            <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                              <Text fontWeight="bold" color={titleColor} fontSize="sm">
                                Как оценивается
                              </Text>
                              <Text mt={1} fontSize="xs" color={mutedColor}>
                                Просмотры, звёзды, обсуждение и вклад автора.
                              </Text>
                            </Box>
                          </SimpleGrid>
                        </Box>
                        <AppButtonLink to={featuredProject.to} colorScheme="blue" borderRadius="full" px={5} flexShrink={0}>
                          Открыть
                        </AppButtonLink>
                      </HStack>
                      <Divider my={4} borderColor={borderColor} />
                      <HStack spacing={4} flexWrap="wrap" color={mutedColor} fontSize="sm">
                        <HStack spacing={1.5}>
                          <Icon as={FiStar} />
                          <Text as="span">{featuredProject.starsCount ?? 0}</Text>
                        </HStack>
                        <HStack spacing={1.5}>
                          <Icon as={FiEye} />
                          <Text as="span">{featuredProject.viewsCount ?? 0} просмотров</Text>
                        </HStack>
                        <Text as="span">{String(featuredProject.dateIso ?? "").slice(0, 10)}</Text>
                      </HStack>
                    </Box>
                  ) : null}

                  {projectRest.map((p: any) => (
                    <Box key={p.to} borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                      <HStack justify="space-between" align="flex-start" spacing={4}>
                        <Box minW={0}>
                          <HStack spacing={2} flexWrap="wrap">
                            <Badge colorScheme="purple" borderRadius="full" px={2}>
                              Проект
                            </Badge>
                            <Badge colorScheme="gray" borderRadius="full" px={2}>
                              {p.authorName ?? "AIFFA"}
                            </Badge>
                          </HStack>
                          <Text mt={2} fontWeight="bold" color={titleColor} noOfLines={2}>
                            {p.title}
                          </Text>
                          <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                            Практический мини‑проект: закрепляешь навык и добавляешь в портфолио.
                          </Text>
                        </Box>
                        <AppButtonLink to={p.to} variant="outline" borderRadius="full" px={4} flexShrink={0}>
                          Открыть
                        </AppButtonLink>
                      </HStack>
                      <Divider my={3} borderColor={borderColor} />
                      <HStack spacing={4} flexWrap="wrap" color={mutedColor} fontSize="sm">
                        <HStack spacing={1.5}>
                          <Icon as={FiStar} />
                          <Text as="span">{p.starsCount ?? 0}</Text>
                        </HStack>
                        <HStack spacing={1.5}>
                          <Icon as={FiEye} />
                          <Text as="span">{p.viewsCount ?? 0} просмотров</Text>
                        </HStack>
                        <Text as="span">{String(p.dateIso ?? "").slice(0, 10)}</Text>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : null}

              {mode === "profile" ? (
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="2xl" p={4} bg={cardBg}>
                  <HStack spacing={2} flexWrap="wrap">
                    <Badge colorScheme="orange" borderRadius="full" px={2}>
                      XP
                    </Badge>
                    <Badge colorScheme="yellow" borderRadius="full" px={2}>
                      Достижения
                    </Badge>
                    <Badge colorScheme="gray" borderRadius="full" px={2}>
                      История активности
                    </Badge>
                  </HStack>

                  <Text mt={2} fontWeight="bold" color={titleColor}>
                    Примеры достижений
                  </Text>
                  <Text mt={1.5} fontSize="sm" color={textColor} lineHeight="1.6">
                    Достижения — это подсказки пути: они мотивируют регулярность и показывают рост по действиям.
                  </Text>

                  <Box borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={4} bg={subCardBg} mt={4}>
                    <HStack justify="space-between" align="flex-start" spacing={4}>
                      <Box>
                        <Text fontWeight="bold" color={titleColor}>
                          {mockProfile.xp.toLocaleString("ru-RU")} XP
                        </Text>
                        <Text fontSize="sm" color={mutedColor}>
                          Уровень: <Box as="span" fontWeight="bold">{mockProfile.tierLabel}</Box> → следующий:{" "}
                          <Box as="span" fontWeight="bold">{mockProfile.nextTierLabel}</Box>
                        </Text>
                      </Box>
                      <Badge colorScheme="orange" borderRadius="full" px={3}>
                        Progress
                      </Badge>
                    </HStack>
                    <Box mt={3}>
                      <Progress value={mockProfile.progressPct} size="sm" borderRadius="full" colorScheme="orange" />
                      <Text mt={2} fontSize="xs" color={mutedColor}>
                        {mockProfile.progressPct}% до следующего уровня
                      </Text>
                    </Box>
                    <Divider my={3} borderColor={borderColor} />
                    <Text fontWeight="bold" color={titleColor} fontSize="sm">
                      Последние действия (мок)
                    </Text>
                    <VStack as="ul" align="stretch" spacing={1.5} mt={2} pl={0} color={textColor} fontSize="sm">
                      {mockProfile.lastActions.map((t) => (
                        <HStack as="li" key={t} spacing={2} align="flex-start">
                          <Box as="span" mt={1.5} boxSize={1.5} borderRadius="full" bg="orange.400" flexShrink={0} />
                          <Text>{t}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>

                  <SimpleGrid minChildWidth={{ base: "100%", md: "240px" }} spacing={3} mt={4}>
                    {achievements.map((a) => (
                      <Box key={a.id} borderWidth="1px" borderColor={borderColor} borderRadius="xl" p={3} bg={subCardBg}>
                        <HStack spacing={2} align="flex-start">
                          <Box
                            w="36px"
                            h="36px"
                            borderRadius="lg"
                            bg="yellow.50"
                            color="yellow.700"
                            _dark={{ bg: "whiteAlpha.200", color: "whiteAlpha.900" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                          >
                            <Icon as={FiAward} boxSize={4} aria-hidden="true" />
                          </Box>
                          <Box minW={0}>
                            <Text fontWeight="bold" color={titleColor} fontSize="sm">
                              {a.label}
                            </Text>
                            <Text mt={0.5} fontSize="xs" color={mutedColor} lineHeight="1.5">
                              {achievementDescriptions[a.id] ?? "Откройте за активность на платформе"}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </SimpleGrid>

                  <Divider my={4} borderColor={borderColor} />
                  <HStack spacing={3} flexWrap="wrap" justify="space-between">
                    <HStack spacing={2} color={mutedColor} fontSize="sm">
                      <Icon as={FiTarget} />
                      <Text as="span">Подсказка: решай weekly регулярно — быстрее растут XP и достижения</Text>
                    </HStack>
                    <AppButtonLink to="/profile?achievements" variant="outline" borderRadius="full" px={4}>
                      Открыть профиль
                    </AppButtonLink>
                  </HStack>
                </Box>
              ) : null}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeExamplesShowcaseSection;

