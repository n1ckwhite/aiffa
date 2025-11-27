'use client';

import React from "react";
import { Box, Button, Heading, HStack, Link, Stack, Text, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { TelegramIcon } from "@/widgets/Footer/icons/Telegram";
import { MailIcon } from "@/widgets/Footer/icons/Mail";

const PartnersPage = () => {
  const formatShadow = useColorModeValue(
    "0 18px 45px rgba(15, 23, 42, 0.12)",
    "0 18px 45px rgba(15, 23, 42, 0.7)"
  );
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const asideLabelColor = useColorModeValue("blue.700", "blue.200");

  const heroAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.85)");

  const overviewAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.9)");
  const surfaceCardBg = useColorModeValue("whiteAlpha.900", "surface.elevated");

  const hackathonBg = useColorModeValue(
    "linear(to-b, rgba(34,197,94,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(34,197,94,0.18), surface.elevated)"
  );
  const weeklyBg = useColorModeValue(
    "linear(to-b, rgba(59,130,246,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(59,130,246,0.18), surface.elevated)"
  );
  const materialsBg = useColorModeValue(
    "linear(to-b, rgba(168,85,247,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(168,85,247,0.16), surface.elevated)"
  );
  const articlesBg = useColorModeValue(
    "linear(to-b, rgba(249,115,22,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(249,115,22,0.16), surface.elevated)"
  );
  const grantsBg = useColorModeValue(
    "linear(to-b, rgba(236,72,153,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(236,72,153,0.16), surface.elevated)"
  );

  return (
    <Box
      as="section"
      aria-label="Партнёрство и спонсорство AIFFA"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 0 }}
      transition="none"
    >
      <Box maxW={{ base: "100%", md: "1100px" }} mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          {/* Hero-блок */}
          <Box transition="none">
            <VStack
              align={{ base: "flex-start", md: "center" }}
              spacing={4}
              textAlign={{ base: "left", md: "center" }}
            >
                <Heading as="h2"  fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-0.03em">
                  Стать партнёром AIFFA
                </Heading>
                <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                  Партнёрство для компаний
                </PillBadge>

                <Text fontSize={{ base: "md", md: "lg" }} color={mutedTextColor}>
                  Подбираем формат под ваши цели: найм, бренд, продвижение продукта или технологий.
                </Text>
                <Text fontSize="sm" color={mutedTextColor}>
                  AIFFA берёт на себя продакшн: упаковку задач, проведение хакатонов, челленджей
                  и интеграций в материалы — вы получаете понятные результаты по IT-аудитории.
                </Text>
                <HStack spacing={4} flexWrap="wrap">
                  <Button
                    as={Link}
                    href="https://t.me/iamceob1tch"
                    isExternal
                    colorScheme="blue"
                    borderRadius="full"
                    px={{ base: 6, md: 7 }}
                    fontWeight="semibold"
                    leftIcon={<TelegramIcon />}
                  >
                    Написать в Telegram
                  </Button>
                  <Button
                    as={Link}
                    href="mailto:bbycinka@yandex.ru?subject=Запрос медиакита AIFFA"
                    variant="outline"
                    borderRadius="full"
                    px={{ base: 6, md: 7 }}
                    fontWeight="semibold"
                    leftIcon={<MailIcon />}
                  >
                    Написать на email
                  </Button>
                </HStack>
            </VStack>
          </Box>

          {/* Кратко об AIFFA — компактный обзор в одном блоке */}
          <Box mt={{ base: 8, md: 10 }}>
            <VStack
              align="stretch"
              spacing={4}
              borderRadius="2xl"
              bg={heroAsideBg}
              p={{ base: 4, md: 6 }}
            >
            <PillBadge variant="solid" uppercase={false}>
                  Партнёрство для компаний
            </PillBadge>
              <Text fontSize="sm" color={mutedTextColor}>
                Платформа для практики и роста разработчиков: задачи недели, хакатоны и живое
                сообщество вместо пассивного обучения.
              </Text>
              <SimpleGrid
                columns={{ base: 1, sm: 3 }}
                spacing={{ base: 3, md: 6 }}
                fontSize="sm"
                color={mutedTextColor}
              >
                <HStack align="flex-start" spacing={3}>
                  <Box as="span" boxSize={2} borderRadius="full" bg="green.400" mt={1} />
                  <Text>Практика: Weekly-задачи, проекты и хакатоны.</Text>
                </HStack>
                <HStack align="flex-start" spacing={3}>
                  <Box as="span" boxSize={2} borderRadius="full" bg="blue.400" mt={1} />
                  <Text>Редактор кода в браузере с VSCode-опытом.</Text>
                </HStack>
                <HStack align="flex-start" spacing={3}>
                  <Box as="span" boxSize={2} borderRadius="full" bg="purple.400" mt={1} />
                  <Text>Честные реакции: звёзды без дизлайков и токсичности.</Text>
                </HStack>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Кому и зачем подходит спонсорство */}
          <Box
            position="relative"
            overflow="hidden"
            transition="none"
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              align="flex-start"
              spacing={{ base: 4, md: 8 }}
            >
              <VStack align="flex-start" spacing={4} flex={3}>
                <HStack spacing={3}>
                  <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                    Задачи бренда
                  </PillBadge>
                  <Text fontSize="xs" color={mutedTextColor}>
                    Кому подойдёт партнёрство с AIFFA
                  </Text>
                </HStack>
                <Heading as="h2" size="md" letterSpacing="-0.02em">
                  Кому и зачем подходит спонсорство
                </Heading>
                <Text fontSize="sm" color={mutedTextColor}>
                  Спонсорство AIFFA подходит компаниям, которые хотят:
                </Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacingX={{ base: 0, md: 8 }}
                  spacingY={2}
                  as="ul"
                  fontSize="sm"
                  color={mutedTextColor}
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
                bg={overviewAsideBg}
                p={4}
              >
                <Text fontSize="xs" textTransform="uppercase" color={asideLabelColor}>
                  Какие эффекты даёт партнёрство
                </Text>
                <VStack align="flex-start" spacing={2} fontSize="sm" color={mutedTextColor}>
                  <Text>Бренд присутствует в практических задачах и решениях.</Text>
                  <Text>Разработчики знакомятся с технологиями на реальных сценариях.</Text>
                  <Text>Формируется долгосрочная ассоциация бренда с ростом и обучением.</Text>
                </VStack>
              </VStack>
            </Stack>
          </Box>

          {/* Форматы партнёрства */}
          <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="md" letterSpacing="-0.02em">
              Форматы партнёрства
            </Heading>
            <Text fontSize="sm" color={mutedTextColor}>
              Мы подбираем формат под задачи компании: от HR и бренда до продвижения
              технологий и инструментов.
            </Text>

            <VStack spacing={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
                {/* Спонсорство хакатонов */}
                <Box
                  borderRadius="2xl"
                  bgGradient={hackathonBg}
                  p={{ base: 4, md: 5 }}
                  boxShadow={formatShadow}
                  transition="none"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(34,197,94,0.16)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="green.300"
                      >
                        <Box
                          as="svg"
                          viewBox="0 0 24 24"
                          boxSize={5}
                          aria-hidden="true"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M9 9h2.5a1.5 1.5 0 0 1 0 3H11v1h1.5a1.5 1.5 0 0 1 0 3H9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 9h2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </Box>
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Спонсорство хакатонов
                        </Heading>
                        <PillBadge colorScheme="green" variant="solid" uppercase={false}>
                          Хакатоны и интенсивы
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor}>
                      Глубокий формат, в котором команды решают реальную задачу от компании и
                      знакомятся с вашими технологиями.
                    </Text>
                    <Text fontWeight="semibold" fontSize="sm">
                      Входит:
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color={mutedTextColor}
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
                      color={mutedTextColor}
                    >
                      <Text as="li">HR-задач и найма;</Text>
                      <Text as="li">пиара и укрепления бренда;</Text>
                      <Text as="li">продвижения технологий и инструментов.</Text>
                    </VStack>
                    <HStack spacing={2} pt={2}>
                      <PillBadge colorScheme="green" variant="solid" uppercase={false}>
                        HR
                      </PillBadge>
                      <PillBadge colorScheme="green" variant="solid" uppercase={false}>
                        Brand
                      </PillBadge>
                      <PillBadge colorScheme="green" variant="solid" uppercase={false}>
                        Tech
                      </PillBadge>
                    </HStack>
                  </VStack>
                </Box>

                {/* Совместные челленджи / Weekly */}
                <Box
                  borderRadius="2xl"
                  bgGradient={weeklyBg}
                  p={{ base: 4, md: 5 }}
                  boxShadow={formatShadow}
                  transition="none"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(59,130,246,0.16)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="blue.300"
                      >
                        <Box
                          as="svg"
                          viewBox="0 0 24 24"
                          boxSize={5}
                          aria-hidden="true"
                        >
                          <rect
                            x="4"
                            y="3"
                            width="16"
                            height="18"
                            rx="4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M10 7h4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 11c1 .5 2 .5 3 .5s2 0 3-.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 14.5c1 .5 2 .5 3 .5s2 0 3-.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </Box>
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Совместные челленджи и Weekly-задачи
                        </Heading>
                        <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                          Weekly и челленджи
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor}>
                      Регулярные задачи недели с вашим брендингом: продукт появляется в
                      контексте практики и решений участников.
                    </Text>
                    <Text fontWeight="semibold" fontSize="sm">
                      Входит:
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color={mutedTextColor}
                    >
                      <Text as="li">задача недели с логотипом компании;</Text>
                      <Text as="li">упоминание в Weekly-диджесте;</Text>
                      <Text as="li">ссылка на продукт;</Text>
                      <Text as="li">обзор решений и лучшие разборы.</Text>
                    </VStack>
                    <HStack spacing={2} pt={2}>
                      <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                        Engagement
                      </PillBadge>
                      <PillBadge colorScheme="blue" variant="solid" uppercase={false}>
                        Product
                      </PillBadge>
                    </HStack>
                  </VStack>
                </Box>

                {/* Интеграции в материалы */}
                <Box
                  borderRadius="2xl"
                  bgGradient={materialsBg}
                  p={{ base: 4, md: 5 }}
                  boxShadow={formatShadow}
                  transition="none"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(168,85,247,0.18)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="purple.300"
                      >
                        <Box
                          as="svg"
                          viewBox="0 0 24 24"
                          boxSize={5}
                          aria-hidden="true"
                        >
                          <rect
                            x="5"
                            y="4"
                            width="14"
                            height="16"
                            rx="2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M9 8h6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 11h6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 14h3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </Box>
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Интеграции в материалы
                        </Heading>
                        <PillBadge colorScheme="purple" variant="solid" uppercase={false}>
                          Уроки и гайды
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor}>
                      Нативные интеграции в уроки, гайды и практические материалы: продукт
                      становится частью примеров и решений.
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color={mutedTextColor}
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
                      color={mutedTextColor}
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
                  bgGradient={articlesBg}
                  p={{ base: 4, md: 5 }}
                  boxShadow={formatShadow}
                  transition="none"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(249,115,22,0.18)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="orange.300"
                      >
                        <Box
                          as="svg"
                          viewBox="0 0 24 24"
                          boxSize={5}
                          aria-hidden="true"
                        >
                          <rect
                            x="4"
                            y="5"
                            width="16"
                            height="14"
                            rx="2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 9h8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 12h8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M8 15h4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </Box>
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Партнёрские статьи и блог
                        </Heading>
                      <PillBadge colorScheme="yellow" variant="solid" uppercase={false}>
                          Медиа и контент
                        </PillBadge>
                      </VStack>
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
                  bgGradient={grantsBg}
                  p={{ base: 4, md: 5 }}
                  boxShadow={formatShadow}
                  transition="none"
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(236,72,153,0.2)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="pink.300"
                      >
                        <Box
                          as="svg"
                          viewBox="0 0 24 24"
                          boxSize={5}
                          aria-hidden="true"
                        >
                          <path
                            d="M4 9l8-4 8 4-8 4-8-4Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 11v4c2 1.5 4 2.25 6 2.25s4-.75 6-2.25v-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18 13.5V17"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </Box>
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Поддержка авторов и гранты
                        </Heading>
                      <PillBadge colorScheme="red" variant="solid" uppercase={false}>
                          Гранты и авторы
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor}>
                      Формат для поддержки авторов, задач и образовательных серий.
                    </Text>
                    <VStack
                      as="ul"
                      align="flex-start"
                      spacing={1}
                      fontSize="sm"
                      color={mutedTextColor}
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
          <Box borderRadius="2xl" bg={surfaceCardBg} p={{ base: 4, md: 6 }}>
            <VStack align="flex-start" spacing={4}>
              <Heading as="h2" size="md" letterSpacing="-0.02em">
                Почему AIFFA
              </Heading>
              <VStack
                as="ul"
                align="flex-start"
                spacing={2}
                fontSize="sm"
                color={mutedTextColor}
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
          <Box borderRadius="2xl" bg={surfaceCardBg} p={{ base: 4, md: 5 }}>
            <VStack align="flex-start" spacing={3}>
              <PillBadge colorScheme="purple" variant="solid" uppercase={false}>
                Ранний запуск
              </PillBadge>
              <Text fontSize="sm" color={mutedTextColor}>
                Платформа находится в стадии раннего запуска. Идёт набор первых партнёров,
                которые готовы расти вместе с проектом. Для первых участников — индивидуальные
                условия и гибкий формат интеграций.
              </Text>
            </VStack>
          </Box>

        </VStack>
      </Box>
    </Box>
  );
};

export default PartnersPage;
