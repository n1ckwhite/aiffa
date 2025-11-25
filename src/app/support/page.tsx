'use client';

import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
  Badge,
  SimpleGrid
} from "@chakra-ui/react";

const SupportPage = () => {
  return (
    <Box
      as="section"
      aria-label="Партнёрство и спонсорство Universe"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 0 }}
    >
      <Box maxW={{ base: "100%", md: "960px" }} mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          {/* Hero-блок */}
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.subtle"
            bgGradient={{
              base: "linear(to-b, surface.elevated, rgba(59,130,246,0.08))",
              md: "linear(to-r, surface.elevated, rgba(59,130,246,0.08))"
            }}
            p={{ base: 5, md: 7 }}
            boxShadow="0 22px 60px rgba(15, 23, 42, 0.5)"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 6, md: 10 }}
              align={{ base: "flex-start", md: "center" }}
            >
              <VStack align="flex-start" spacing={4} flex={3}>
                <Badge
                  colorScheme="blue"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  textTransform="none"
                >
                  Партнёрство для компаний
                </Badge>
                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  letterSpacing="-0.03em"
                >
                  Стать партнёром Universe
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }} color="text.muted">
                  Universe — открытая практическая платформа для разработчиков: Weekly-задачи,
                  хакатоны, живое комьюнити и современные материалы.
                </Text>
                <Text fontSize="sm" color="text.muted">
                  Эффективные активности с IT-аудиторией: хакатоны, челленджи, интеграции в
                  материалы и совместные проекты под задачи бренда.
                </Text>
                <HStack spacing={4} flexWrap="wrap">
                  <Button
                    as={Link}
                    href="https://t.me/iamceob1tch"
                    isExternal
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    Обсудить партнёрство в Telegram
                  </Button>
                  <Button
                    as={Link}
                    href="mailto:bbycinka@yandex.ru?subject=Запрос медиакита Universe"
                    variant="outline"
                    borderRadius="full"
                  >
                    Запросить медиакит по email
                  </Button>
                </HStack>
              </VStack>

              <VStack
                align="flex-start"
                spacing={3}
                flex={2}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="rgba(148, 163, 184, 0.4)"
                bg="rgba(15, 23, 42, 0.85)"
                p={4}
              >
                <Text fontSize="xs" textTransform="uppercase" color="blue.300">
                  Кратко о Universe
                </Text>
                <VStack align="flex-start" spacing={2} fontSize="sm" color="text.muted">
                  <HStack spacing={2}>
                    <Box
                      as="span"
                      boxSize={1.5}
                      borderRadius="full"
                      bg="green.400"
                    />
                    <Text>Практика: Weekly-задачи, проекты и хакатоны.</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Box
                      as="span"
                      boxSize={1.5}
                      borderRadius="full"
                      bg="blue.400"
                    />
                    <Text>VSCode-подобный редактор прямо в браузере.</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Box
                      as="span"
                      boxSize={1.5}
                      borderRadius="full"
                      bg="purple.400"
                    />
                    <Text>Честные реакции: звёзды без дизлайков и токсичности.</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Stack>
          </Box>

          {/* Кому и зачем подходит спонсорство */}
          <Box
            position="relative"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="rgba(148, 163, 184, 0.7)"
            bgGradient="linear(to-r, rgba(37, 99, 235, 0.18), surface.elevated)"
            p={{ base: 5, md: 6 }}
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              insetY: 4,
              left: 0,
              width: "3px",
              borderRadius: "full",
              bgGradient: "linear(to-b, teal.300, blue.400)"
            }}
          >
            <HStack align="flex-start" spacing={{ base: 4, md: 8 }}>
              <VStack align="flex-start" spacing={4} flex={3}>
                <HStack spacing={3}>
                  <Badge
                    colorScheme="blue"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    textTransform="none"
                  >
                    Задачи бренда
                  </Badge>
                  <Text fontSize="xs" color="text.muted">
                    Кому подойдёт партнёрство с Universe
                  </Text>
                </HStack>
                <Heading as="h2" size="md" letterSpacing="-0.02em">
                  Кому и зачем подходит спонсорство
                </Heading>
                <Text fontSize="sm" color="text.muted">
                  Спонсорство Universe подходит компаниям, которые хотят:
                </Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacingX={{ base: 0, md: 8 }}
                  spacingY={2}
                  as="ul"
                  fontSize="sm"
                  color="text.muted"
                >
                  <HStack as="li" spacing={2} align="flex-start">
                    <Box as="span" mt={1} boxSize={1.5} borderRadius="full" bg="blue.300" />
                    <Text>привлекать разработчиков и работать с IT-аудиторией;</Text>
                  </HStack>
                  <HStack as="li" spacing={2} align="flex-start">
                    <Box as="span" mt={1} boxSize={1.5} borderRadius="full" bg="blue.300" />
                    <Text>продвигать свои инструменты, технологии и platform-инфраструктуру;</Text>
                  </HStack>
                  <HStack as="li" spacing={2} align="flex-start">
                    <Box as="span" mt={1} boxSize={1.5} borderRadius="full" bg="blue.300" />
                    <Text>находить талантливых разработчиков через реальные задачи;</Text>
                  </HStack>
                  <HStack as="li" spacing={2} align="flex-start">
                    <Box as="span" mt={1} boxSize={1.5} borderRadius="full" bg="blue.300" />
                    <Text>повышать узнаваемость бренда в профессиональной среде;</Text>
                  </HStack>
                  <HStack as="li" spacing={2} align="flex-start">
                    <Box as="span" mt={1} boxSize={1.5} borderRadius="full" bg="blue.300" />
                    <Text>строить долгосрочное отношение через комьюнити и формат практики.</Text>
                  </HStack>
                </SimpleGrid>
              </VStack>

              <VStack
                display={{ base: "none", md: "flex" }}
                align="flex-start"
                spacing={3}
                flex={2}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="rgba(148, 163, 184, 0.45)"
                bg="rgba(15, 23, 42, 0.9)"
                p={4}
              >
                <Text fontSize="xs" textTransform="uppercase" color="blue.200">
                  Какие эффекты даёт партнёрство
                </Text>
                <VStack align="flex-start" spacing={2} fontSize="sm" color="text.muted">
                  <Text>Бренд присутствует в практических задачах и решениях.</Text>
                  <Text>Разработчики знакомятся с технологиями на реальных сценариях.</Text>
                  <Text>Формируется долгосрочная ассоциация бренда с ростом и обучением.</Text>
                </VStack>
              </VStack>
            </HStack>
          </Box>

          {/* Форматы партнёрства */}
          <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Форматы партнёрства
            </Heading>
            <Text fontSize="sm" color="text.muted">
              Мы подбираем формат под задачи компании: от HR и бренда до продвижения
              технологий и инструментов.
            </Text>

            <VStack spacing={4} align="stretch">
              {/* Спонсорство хакатонов */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
                {/* Спонсорство хакатонов */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="surface.elevated"
                  p={{ base: 4, md: 5 }}
                  _hover={{
                    borderColor: "blue.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.6)"
                  }}
                  transition="all 0.2s ease-out"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={2}>
                      <Text fontSize="lg">🧩</Text>
                      <Heading as="h3" size="sm">
                        Спонсорство хакатонов
                      </Heading>
                    </HStack>
                    <Text fontSize="sm" color="text.muted">
                      Формат для глубокого вовлечения разработчиков и работы с реальными
                      задачами от компании.
                    </Text>
                    <Text fontWeight="semibold" fontSize="sm">
                      Входит:
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">брендирование хакатона;</Text>
                      <Text as="li">задача от компании;</Text>
                      <Text as="li">обзор решений и публичные разборы;</Text>
                      <Text as="li">логотип и ссылки на всех ключевых материалах;</Text>
                      <Text as="li">прямое взаимодействие с участниками.</Text>
                    </VStack>
                    <Text fontWeight="semibold" fontSize="sm">
                      Подходит для:
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">HR-задач и найма;</Text>
                      <Text as="li">пиара и укрепления бренда;</Text>
                      <Text as="li">продвижения технологий и инструментов.</Text>
                    </VStack>
                  </VStack>
                </Box>

                {/* Совместные челленджи / Weekly */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="surface.elevated"
                  p={{ base: 4, md: 5 }}
                  _hover={{
                    borderColor: "blue.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.6)"
                  }}
                  transition="all 0.2s ease-out"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={2}>
                      <Text fontSize="lg">🧪</Text>
                      <Heading as="h3" size="sm">
                        Совместные челленджи и Weekly-задачи
                      </Heading>
                    </HStack>
                    <Text fontSize="sm" color="text.muted">
                      Формат регулярных задач недели с брендингом компании и ссылками на
                      продукт.
                    </Text>
                    <Text fontWeight="semibold" fontSize="sm">
                      Входит:
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">задача недели с логотипом компании;</Text>
                      <Text as="li">упоминание в Weekly-диджесте;</Text>
                      <Text as="li">ссылка на продукт;</Text>
                      <Text as="li">обзор решений и лучшие разборы.</Text>
                    </VStack>
                  </VStack>
                </Box>

                {/* Интеграции в материалы */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="surface.elevated"
                  p={{ base: 4, md: 5 }}
                  _hover={{
                    borderColor: "blue.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.6)"
                  }}
                  transition="all 0.2s ease-out"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={2}>
                      <Text fontSize="lg">📘</Text>
                      <Heading as="h3" size="sm">
                        Интеграции в материалы
                      </Heading>
                    </HStack>
                    <Text fontSize="sm" color="text.muted">
                      Нативные интеграции в уроки, гайды и практические материалы.
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">блок «Материал совместно с …»;</Text>
                      <Text as="li">добавление ссылки на продукт;</Text>
                      <Text as="li">демонстрация продукта в примерах и гайдах.</Text>
                    </VStack>
                    <Text fontWeight="semibold" fontSize="sm">
                      Эффективно для:
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">библиотек;</Text>
                      <Text as="li">сервисов;</Text>
                      <Text as="li">dev-tools и инфраструктурных инструментов.</Text>
                    </VStack>
                  </VStack>
                </Box>

                {/* Партнёрские статьи и блог */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="surface.elevated"
                  p={{ base: 4, md: 5 }}
                  _hover={{
                    borderColor: "blue.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.6)"
                  }}
                  transition="all 0.2s ease-out"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={2}>
                      <Text fontSize="lg">📰</Text>
                      <Heading as="h3" size="sm">
                        Партнёрские статьи и блог
                      </Heading>
                    </HStack>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">публикация статьи и обзор технологий;</Text>
                      <Text as="li">брендирование поста;</Text>
                      <Text as="li">реакции и звёздочки от комьюнити;</Text>
                      <Text as="li">кросс-постинг в соцсетях.</Text>
                    </VStack>
                  </VStack>
                </Box>

                {/* Поддержка авторов и гранты */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="surface.elevated"
                  p={{ base: 4, md: 5 }}
                  _hover={{
                    borderColor: "blue.500",
                    transform: "translateY(-2px)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.6)"
                  }}
                  transition="all 0.2s ease-out"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={2}>
                      <Text fontSize="lg">🧑‍🎓</Text>
                      <Heading as="h3" size="sm">
                        Поддержка авторов и гранты
                      </Heading>
                    </HStack>
                    <Text fontSize="sm" color="text.muted">
                      Формат для поддержки авторов, задач и образовательных серий.
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color="text.muted"
                    >
                      <Text as="li">спонсировать выпуск серии материалов;</Text>
                      <Text as="li">выделить грант авторам или участникам;</Text>
                      <Text as="li">выступить ментором серии задач или челленджа.</Text>
                    </VStack>
                  </VStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </VStack>

          {/* Преимущества платформы */}
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.subtle"
            bg="surface.elevated"
            p={{ base: 4, md: 6 }}
          >
            <VStack align="flex-start" spacing={4}>
              <Heading as="h2" size="md" letterSpacing="-0.02em">
                Почему Universe
              </Heading>
              <VStack
                as="ul"
                align="flex-start"
                spacing={2}
                fontSize="sm"
                color="text.muted"
              >
                <Text as="li">активная аудитория разработчиков с фокусом на практику;</Text>
                <Text as="li">
                  честный и прозрачный формат: реакции в виде звёзд, без токсичных дизлайков;
                </Text>
                <Text as="li">открытые материалы и живое комьюнити;</Text>
                <Text as="li">уникальный формат Weekly-задач и практических челленджей;</Text>
                <Text as="li">
                  встроенный редактор кода / VSCode-опыт прямо в браузере;
                </Text>
                <Text as="li">современный tech-стек и удобная инфраструктура для партнёров.</Text>
              </VStack>
            </VStack>
          </Box>

          {/* Статистика / ранний запуск */}
          <Box
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.subtle"
            bg="surface.elevated"
            p={{ base: 4, md: 5 }}
          >
            <VStack align="flex-start" spacing={3}>
              <Badge
                colorScheme="purple"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                textTransform="none"
              >
                Ранний запуск
              </Badge>
              <Text fontSize="sm" color="text.muted">
                Платформа находится в стадии раннего запуска. Идёт набор первых партнёров,
                которые готовы расти вместе с проектом. Для первых участников — индивидуальные
                условия и гибкий формат интеграций.
              </Text>
            </VStack>
          </Box>

          {/* Как начать сотрудничество / контакты */}
          <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Как начать сотрудничество
            </Heading>
            <Text fontSize="sm" color="text.muted">
              Напишите нам — обсудим формат, предложим идеи задач и подготовим медиакит под
              ваши цели.
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 4, md: 6 }}
              align={{ base: "stretch", md: "flex-start" }}
            >
              <Box
                flex={1}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="border.subtle"
                bg="surface.elevated"
                p={{ base: 4, md: 5 }}
              >
                <VStack align="flex-start" spacing={3}>
                  <HStack spacing={2}>
                    <Text fontSize="lg">📩</Text>
                    <Text fontWeight="semibold">Email</Text>
                  </HStack>
                  <Text fontSize="sm" color="text.muted">
                    Для подробных запросов, медиакита и описания возможных форматов
                    сотрудничества.
                  </Text>
                  <Link
                    href="mailto:bbycinka@yandex.ru"
                    fontWeight="semibold"
                    color="blue.500"
                  >
                    bbycinka@yandex.ru
                  </Link>
                </VStack>
              </Box>

              <Box
                flex={1}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="border.subtle"
                bg="surface.elevated"
                p={{ base: 4, md: 5 }}
              >
                <VStack align="flex-start" spacing={3}>
                  <HStack spacing={2}>
                    <Text fontSize="lg">🟦</Text>
                    <Text fontWeight="semibold">Telegram</Text>
                  </HStack>
                  <Text fontSize="sm" color="text.muted">
                    Быстрый канал для обсуждения идей, форматов партнёрства и оперативных
                    вопросов.
                  </Text>
                  <Button
                    as={Link}
                    href="https://t.me/iamceob1tch"
                    isExternal
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    Написать в Telegram
                  </Button>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default SupportPage;
