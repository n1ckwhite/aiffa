'use client';

import React from "react";
import { Box, Button, Heading, HStack, Link, Stack, Text, VStack, SimpleGrid, useColorModeValue, Icon } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { TelegramIcon } from "@/widgets/Footer/icons/Telegram";
import { MailIcon } from "@/widgets/Footer/icons/Mail";
import { FaHandshake } from "react-icons/fa6";
import {
  FaUsers,
  FaCode,
  FaGraduationCap,
  FaStar,
  FaHeart,
  FaPuzzlePiece,
  FaRocket,
  FaInfinity,
  FaCalendarAlt,
  FaBookOpen,
  FaNewspaper,
  FaHandsHelping,
} from "react-icons/fa";
import { BusinessAnalystIcon, PartnersLottieIcon, BusinessWorkshopIcon } from "@/shared/icons/components-icon";

const PartnersPage = () => {
  const formatShadow = useColorModeValue(
    "0 18px 45px rgba(15, 23, 42, 0.12)",
    "0 18px 45px rgba(15, 23, 42, 0.7)"
  );
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");

  const heroAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.85)");

  const overviewAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.9)");
  const surfaceCardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");

  const partnershipBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const partnershipBgGradient = useColorModeValue(
    "linear(to-r, blue.50, purple.50)",
    "linear(to-r, whiteAlpha.100, whiteAlpha.50)"
  );
  const partnershipBoxShadow = "md";
  const partnershipIconColor = useColorModeValue("blue.300", "whiteAlpha.500");

  const hackathonBg = useColorModeValue(
    "linear(to-b, rgba(34,197,94,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(34,197,94,0.18), rgba(15, 23, 42, 1))"
  );
  const weeklyBg = useColorModeValue(
    "linear(to-b, rgba(59,130,246,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(59,130,246,0.18), rgba(15, 23, 42, 1))"
  );
  const materialsBg = useColorModeValue(
    "linear(to-b, rgba(168,85,247,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(168,85,247,0.16), rgba(15, 23, 42, 1))"
  );
  const articlesBg = useColorModeValue(
    "linear(to-b, rgba(249,115,22,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(249,115,22,0.16), rgba(15, 23, 42, 1))"
  );
  const grantsBg = useColorModeValue(
    "linear(to-b, rgba(236,72,153,0.03), whiteAlpha.900)",
    "linear(to-b, rgba(236,72,153,0.16), rgba(15, 23, 42, 1))"
  );

  const hackathonBorder = useColorModeValue("green.200", "green.500");
  const weeklyBorder = useColorModeValue("blue.200", "blue.500");
  const materialsBorder = useColorModeValue("purple.200", "purple.500");
  const articlesBorder = useColorModeValue("orange.200", "orange.500");
  const grantsBorder = useColorModeValue("pink.200", "pink.500");
  const cardOverlayOpacity = useColorModeValue(0.6, 0.4);
  const hackathonBulletColor = useColorModeValue("green.400", "green.300");
  const weeklyBulletColor = useColorModeValue("blue.400", "blue.300");
  const materialsBulletColor = useColorModeValue("purple.400", "purple.300");
  const articlesBulletColor = useColorModeValue("orange.400", "orange.300");
  const grantsBulletColor = useColorModeValue("pink.400", "pink.300");
  const stepLineColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const stepNumberBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const stepNumberColor = useColorModeValue("blue.600", "blue.300");
  const stepCardBg = useColorModeValue("whiteAlpha.50", "whiteAlpha.200");
  const stepCardBorder = useColorModeValue("whiteAlpha.200", "whiteAlpha.300");
  const socialProofBadgeBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const socialProofBadgeBorder = useColorModeValue("gray.200", "whiteAlpha.300");

  return (
    <Box
      as="main"
      role="main"
      aria-label="Партнёрство и спонсорство AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
      transition="none"
    >
      <Box maxW="1200px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          {/* Hero-блок */}
          <Box as="section" transition="none" aria-labelledby="partners-hero-title">
            <VStack
              align="center"
              spacing={{ base: 4, md: 5 }}
              textAlign="center"
              maxW={{ base: "100%", md: "720px", lg: "820px" }}
              mx="auto"
            >
              <Stack
                as="header"
                direction={{ base: "column", sm: "row" }}
                justify="center"
                align="center"
                spacing={{ base: 2, sm: 3 }}
              >
                <Icon
                  as={FaHandshake}
                  aria-hidden="true"
                  boxSize={{ base: 7, md: 8 }}
                  color={useColorModeValue("blue.500", "blue.300")}
                />
              <Heading
                as="h1"
                id="partners-hero-title"
                fontSize={{ base: "2xl", md: "4xl" }}
                letterSpacing="-0.03em"
                textAlign="center"
              >
                Стать партнёром AIFFA
              </Heading>
              </Stack>
              <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                Партнёрство для компаний
              </PillBadge>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="semibold"
                color={mutedTextColor}
                lineHeight="1.5"
              >
                Помогаем компаниям работать с IT‑аудиторией через практику, а не пассивное обучение:
                от хакатонов до Weekly‑челленджей.
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
                lineHeight="1.6"
              >
                Если вам нужны бренд, найм или продвижение технологий среди разработчиков — здесь вы
                получаете понятные результаты, а мы берём на себя весь продакшн.
              </Text>
              <BusinessAnalystIcon />
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Button
                  as={Link}
                  href="https://t.me/iamceob1tch"
                  isExternal
                  colorScheme="blue"
                  borderRadius="full"
                  px={{ base: 6, md: 7 }}
                  fontWeight="semibold"
                  w={{ base: "100%", sm: "auto", md: "260px" }}
                  justifyContent="center"
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
                  w={{ base: "100%", sm: "auto", md: "260px" }}
                  justifyContent="center"
                  leftIcon={<MailIcon />}
                >
                  Написать на email
                </Button>
              </HStack>
              <VStack spacing={2} pt={3}>
                <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                  Платформа подходит для компаний уровня:
                </Text>
                <HStack spacing={2} flexWrap="wrap" justify="center">
                  {["Яндекс", "VK", "Avito", "Tinkoff", "Skyeng", "JetBrains"].map((company) => (
                    <Box
                      key={company}
                      as="span"
                      borderRadius="full"
                      px={3}
                      py={1}
                      bg={socialProofBadgeBg}
                      borderWidth="1px"
                      borderColor={socialProofBadgeBorder}
                      boxShadow="sm"
                    >
                      <Text fontSize="xs" fontWeight="medium">
                        {company}
                      </Text>
                    </Box>
                  ))}
                </HStack>
                <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                  Работаем и с крупными компаниями, и с небольшими командами, стартапами и личными брендами.
                </Text>
                <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                  Важно не сколько у вас людей, а какая у вас задача: найм, бренд или продвижение продукта.
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Партнёрство для компаний — обзор преимуществ в одном блоке */}
          <Box>
            <Box
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={partnershipBorderColor}
              p={{ base: 5, md: 6 }}
              w="100%"
              mx="auto"
              bg={heroAsideBg}
              bgGradient={partnershipBgGradient}
              boxShadow={partnershipBoxShadow}
              position="relative"
              overflow="hidden"
            >
              <Box
                as="span"
                aria-hidden="true"
                position="absolute"
                right={{ base: "auto", md: -2 }}
                left={{ base: "50%", md: "auto" }}
                top={{ base: "50%", md: -5 }}
                transform={{ base: "translate(-50%, -50%)", md: "none" }}
                boxSize={{ base: 56, md: 40 }}
                opacity={{ base: 0.05, md: 0.26 }}
                zIndex={0}
              >
                <Icon
                  as={FaHandshake}
                  boxSize="100%"
                  color={partnershipIconColor}
                />
              </Box>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 4, md: 8 }}
                align={{ base: "flex-start", md: "flex-end" }}
                position="relative"
                zIndex={1}
              >
                <VStack
                  align={{ base: "center", md: "flex-start" }}
                  spacing={4}
                  flex={{ base: "none", md: 2 }}
                  textAlign={{ base: "center", md: "left" }}
                  maxW={{ base: "100%", md: "420px" }}
                >
                  <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                    Партнёрство для компаний
                  </PillBadge>
                  <Heading
                    as="h2"
                    size="md"
                    letterSpacing="-0.02em"
                    color={useColorModeValue("gray.900", "white")}
                  >
                    Платформа для практики и роста разработчиков
                  </Heading>
                  <Text fontSize="sm" color={mutedTextColor} lineHeight="1.6">
                    Помогаем компаниям работать с IT-аудиторией через практику, а не пассивное обучение.
                  </Text>
                </VStack>

                <VStack
                  as="ul"
                  align="flex-start"
                  spacing={3}
                  flex={{ base: "none", md: 3 }}
                  fontSize="sm"
                  color={mutedTextColor}
                >
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="green.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaRocket} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>Weekly-задачи, проекты и хакатоны.</Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="blue.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaCode} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>Редактор кода в браузере с VSCode-опытом.</Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="orange.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaUsers} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>Мероприятия: консультации, знакомства, встречи и Q&amp;A-сессии.</Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="purple.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaStar} boxSize={3.5} aria-hidden="true" />
                    </Box>
                  <Text>Честные реакции: звёзды без дизлайков и токсичности.</Text>
                  </HStack>
                </VStack>
              </Stack>

              <HStack
                mt={{ base: 4, md: 5 }}
                spacing={3}
                justify={{ base: "center", md: "space-between" }}
                flexWrap="wrap"
              >
                <Text fontSize="xs" color={mutedTextColor} textAlign={{ base: "center", md: "left" }}>
                  Открыты к пилотам и спецформатам — подберём формат под HR-задачи, бренд и продуктовые кейсы.
                </Text>
                <HStack spacing={2}>
                  <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                    HR-задачи
                  </PillBadge>
                  <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                    Бренд
                  </PillBadge>
                  <PillBadge colorScheme="yellow" variant="outline" uppercase={false}>
                    Продукт
                  </PillBadge>
                </HStack>
              </HStack>
            </Box>
          </Box>

          {/* Кому и зачем подходит спонсорство */}
          <Box
            position="relative"
            overflow="hidden"
            transition="none"
            borderRadius={{ base: "2xl", md: "0" }}
            bg={{ base: surfaceCardBg, md: "transparent" }}
            boxShadow={{ base: formatShadow, md: "none" }}
            p={{ base: 5, md: 0 }}
          >
            <Stack
              direction={{ base: "column", md: "row" }}
              align={{ base: "stretch", md: "flex-start" }}
              spacing={{ base: 4, md: 8 }}
            >
              <VStack
                align="flex-start"
                spacing={3}
                flex={3}
                w="full"
                textAlign="left"
              >
                <Box w="full" textAlign={{ base: "center", md: "left" }}>
                  <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                    Задачи бренда
                  </PillBadge>
                  <Heading
                    as="h2"
                    size="md"
                    letterSpacing="-0.02em"
                    mt={2}
                  >
                    Кому и зачем подходит спонсорство?
                  </Heading>
                </Box>
                <Text fontSize="sm" color={mutedTextColor}>
                  Спонсорство AIFFA подходит компаниям, которые хотят:
                </Text>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacingX={{ base: 0, md: 8 }}
                  spacingY={3}
                  as="ul"
                  fontSize="sm"
                  color={mutedTextColor}
                  listStyleType="none"
                  pl={0}
                >
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="cyan.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaUsers} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>
                      привлекать разработчиков и работать с IT-аудиторией;
                    </Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="purple.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaCode} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>
                      продвигать свои инструменты, технологии и platform-инфраструктуру;
                    </Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="teal.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaGraduationCap} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>
                      находить талантливых разработчиков через реальные задачи;
                    </Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="pink.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaStar} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>
                      повышать узнаваемость бренда в профессиональной среде;
                    </Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="orange.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaHeart} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text>
                      строить долгосрочное отношение через комьюнити и формат практики.
                    </Text>
                  </HStack>
                </SimpleGrid>
              </VStack>

              <VStack
                display={{ base: "none", md: "flex" }}
                align="flex-start"
                spacing={4}
                flex={2}
                borderRadius="2xl"
                bg={overviewAsideBg}
                p={{ base: 4, md: 5 }}
                boxShadow="none"
                maxW={{ base: "100%", md: "460px" }}
              >
                <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                  Какие эффекты даёт партнёрство
                </PillBadge>
                <Text fontSize="sm" color={mutedTextColor} lineHeight="1.6">
                  Что получает бренд, когда партнёрится с AIFFA на уровне задач и хакатонов.
                </Text>
                <SimpleGrid
                  as="ul"
                  columns={{ base: 1, md: 1 }}
                  spacing={3}
                  fontSize="sm"
                  color={mutedTextColor}
                  w="full"
                >
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="cyan.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaPuzzlePiece} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text lineHeight="1.5">
                      Бренд присутствует в практических задачах и решениях.
                    </Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="green.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaRocket} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text lineHeight="1.5">
                      Разработчики знакомятся с технологиями на реальных сценариях.
                    </Text>
                  </HStack>
                  <HStack as="li" align="flex-start" spacing={3}>
                    <Box
                      as="span"
                      mt={0.5}
                      boxSize={6}
                      borderRadius="full"
                      bg="red.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      color="white"
                    >
                      <Icon as={FaInfinity} boxSize={3.5} aria-hidden="true" />
                    </Box>
                    <Text lineHeight="1.5">
                      Формируется долгосрочная ассоциация бренда с ростом и обучением.
                    </Text>
                  </HStack>
                </SimpleGrid>
              </VStack>
            </Stack>
          </Box>

          {/* Форматы партнёрства */}
          <VStack align="center" spacing={4}>
            <PartnersLottieIcon />
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
                  borderWidth="1px"
                  borderColor={hackathonBorder}
                  bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
                  p={{ base: 5, md: 6 }}
                  boxShadow={formatShadow}
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(34,197,94,0.12)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="green.400"
                      >
                        <Icon as={FaRocket} boxSize={5} aria-hidden="true" />
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Спонсорство хакатонов
                        </Heading>
                        <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                          Хакатоны и интенсивы
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Команды за ограниченное время решают вашу реальную задачу и знакомятся с
                      продуктом в боевых условиях.
                    </Text>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Вы получаете решения, фидбек и внимание сильных разработчиков к вашему стеку.
                    </Text>
                  </VStack>
                </Box>

                {/* Совместные челленджи / Weekly */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={weeklyBorder}
                  bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
                  p={{ base: 5, md: 6 }}
                  boxShadow={formatShadow}
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(59,130,246,0.12)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="blue.400"
                      >
                        <Icon as={FaCalendarAlt} boxSize={5} aria-hidden="true" />
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Совместные челленджи и Weekly‑задачи
                        </Heading>
                        <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                          Weekly и челленджи
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Регулярные задачи недели с вашим брендингом: продукт появляется в реальных
                      решениях участников, а не в баннерах.
                    </Text>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Формат подходит, когда важно постоянное присутствие и вовлечение, а не один
                      большой ивент.
                    </Text>
                  </VStack>
                </Box>

                {/* Интеграции в материалы */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={materialsBorder}
                  bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
                  p={{ base: 5, md: 6 }}
                  boxShadow={formatShadow}
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(168,85,247,0.12)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="purple.300"
                      >
                        <Icon as={FaBookOpen} boxSize={5} aria-hidden="true" />
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Интеграции в материалы
                        </Heading>
                        <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                          Уроки и гайды
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Уроки, гайды и практические материалы, где продукт встроен в код и примеры, а
                      не стоит отдельным рекламным блоком.
                    </Text>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Подходит для библиотек, сервисов и dev‑tools, которым важно показать «как это
                      работает» на реальном сценарии.
                    </Text>
                  </VStack>
                </Box>

                {/* Партнёрские статьи и блог */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={articlesBorder}
                  bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
                  p={{ base: 5, md: 6 }}
                  boxShadow={formatShadow}
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(249,115,22,0.12)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="orange.300"
                      >
                        <Icon as={FaNewspaper} boxSize={5} aria-hidden="true" />
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Партнёрские статьи и блог
                        </Heading>
                        <PillBadge colorScheme="yellow" variant="outline" uppercase={false}>
                          Медиа и контент
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Статья или обзор технологий на AIFFA с вашим брендингом, примерами и живыми
                      реакциями от сообщества.
                    </Text>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Подходит, когда важно объяснить продукт словами, показать экспертизу и собрать
                      социальное доказательство.
                    </Text>
                  </VStack>
                </Box>

                {/* Поддержка авторов и гранты */}
                <Box
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={grantsBorder}
                  bg={useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)")}
                  p={{ base: 5, md: 6 }}
                  boxShadow={formatShadow}
                >
                  <VStack align="flex-start" spacing={3}>
                    <HStack spacing={3} align="center">
                      <Box
                        as="span"
                        boxSize={9}
                        borderRadius="full"
                        bg="rgba(236,72,153,0.12)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="pink.300"
                      >
                        <Icon as={FaHandsHelping} boxSize={5} aria-hidden="true" />
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Heading as="h3" size="sm">
                          Поддержка авторов и гранты
                        </Heading>
                        <PillBadge colorScheme="red" variant="outline" uppercase={false}>
                          Гранты и авторы
                        </PillBadge>
                      </VStack>
                    </HStack>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Формат, в котором вы поддерживаете авторов, образовательные серии и задачи,
                      помогая развивать экосистему вокруг продукта.
                    </Text>
                    <Text fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Можно финансировать выпуски, выделять гранты и подключать менторов со своей
                      стороны.
                    </Text>
                  </VStack>
                </Box>
              </SimpleGrid>

              {/* Пакеты по уровню вовлечения */}
              <Box
                w="full"
                zIndex={100}
                textAlign="center"
              >
                <BusinessWorkshopIcon />
                <Heading as="h3" size="sm" letterSpacing="-0.02em">
                  Пакеты по уровню вовлечения
                </Heading>
                <Text fontSize="xs" color={mutedTextColor} mt={1}>
                  Примеры форматов: финальный scope и стоимость обсуждаем индивидуально под вашу задачу.
                </Text>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 4 }} mt={3}>
                  <Box
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={useColorModeValue("blue.200", "blue.500")}
                    bg={surfaceCardBg}
                    p={{ base: 3, md: 4 }}
                    boxShadow={{ base: "sm", md: "md" }}
                    h="100%"
                  >
                    <PillBadge colorScheme="blue" variant="outline" uppercase={false}>
                      Lite — задачи недели
                    </PillBadge>
                    <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Серия Weekly‑задач с вашим логотипом и продуктом в контексте практики. Хорошо
                      подходит для пилота и проверки гипотезы.
                    </Text>
                  </Box>

                  <Box
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={useColorModeValue("green.200", "green.500")}
                    bg={surfaceCardBg}
                    p={{ base: 3, md: 4 }}
                    boxShadow={{ base: "sm", md: "md" }}
                    h="100%"
                  >
                    <PillBadge colorScheme="green" variant="outline" uppercase={false}>
                      Pro — хакатон
                    </PillBadge>
                    <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Онлайн‑ или офлайн‑хакатон под вашу задачу: команды собирают решения,
                      а вы получаете прототипы, фидбек и пул кандидатов.
                    </Text>
                  </Box>

                  <Box
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor={useColorModeValue("purple.200", "purple.500")}
                    bg={surfaceCardBg}
                    p={{ base: 3, md: 4 }}
                    boxShadow={{ base: "sm", md: "md" }}
                    h="100%"
                  >
                    <PillBadge colorScheme="purple" variant="outline" uppercase={false}>
                      Full — проект + менторы + пиар
                    </PillBadge>
                    <Text mt={2} fontSize="sm" color={mutedTextColor} lineHeight={1.6}>
                      Долгий формат: проект или серия задач с вашими менторами, интеграцией в
                      материалы и освещением в комьюнити и соцсетях.
                    </Text>
                  </Box>
                </SimpleGrid>
                <Text fontSize="xs" color={mutedTextColor} mt={{ base: 3, md: 4 }}>
                  Цены формируются индивидуально и зависят от масштаба, формата и задач партнёрства.
                </Text>
              </Box>
            </VStack>
          </VStack>

          {/* Как проходит партнёрство */}
          <Box as="section" aria-label="Как проходит партнёрство" zIndex={100}>
            <VStack align="center" spacing={{ base: 4, md: 5 }}>
              <Heading as="h2" size="md" letterSpacing="-0.02em">
                Как проходит партнёрство
              </Heading>
              <Text align="center" fontSize="sm" color={mutedTextColor} maxW={{ base: "100%", md: "720px" }}>
                Делаем процесс прозрачным: на старте вы формулируете задачу, на финише — получаете
                отчёт с результатами и следующими шагами.
              </Text>

              {/* Desktop / tablet steps (горизонтально) */}
              <HStack
                spacing={6}
                align="stretch"
                w="full"
                display={{ base: "none", md: "flex" }}
              >
                {[
                  "Вы рассказываете задачу и продукт",
                  "Мы собираем формат под ваши цели",
                  "Запускаем хакатон / Weekly / интеграцию",
                  "Вы получаете отчёт, решения и метрики",
                ].map((title, index) => (
                  <VStack
                    key={title}
                    align="center"
                    spacing={3}
                    flex={1}
                  >
                    <Box
                      boxSize={9}
                      borderRadius="full"
                      bg={stepNumberBg}
                      borderWidth="1px"
                      borderColor={stepLineColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color={stepNumberColor}
                      fontWeight="semibold"
                      fontSize="sm"
                      flexShrink={0}
                    >
                      {index + 1}
                    </Box>
                    <Box
                      w="full"
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={stepCardBorder}
                      bg={stepCardBg}
                      px={3}
                      py={2}
                    >
                      <Text fontWeight="semibold" fontSize="sm" textAlign="center">
                        {title}
                      </Text>
                    </Box>
                  </VStack>
                ))}
              </HStack>

              {/* Mobile steps (вертикально) */}
              <VStack
                align="flex-start"
                spacing={3}
                w="full"
                display={{ base: "flex", md: "none" }}
              >
                {[
                  "Вы рассказываете задачу и продукт",
                  "Мы собираем формат под ваши цели",
                  "Запускаем хакатон / Weekly / интеграцию",
                  "Вы получаете отчёт, решения и метрики",
                ].map((title, index) => (
                  <HStack key={title} align="flex-start" spacing={3} w="full">
                    <VStack spacing={1} align="center">
                      <Box
                        boxSize={8}
                        borderRadius="full"
                        bg={stepNumberBg}
                        borderWidth="1px"
                        borderColor={stepLineColor}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={stepNumberColor}
                        fontWeight="semibold"
                        fontSize="xs"
                        flexShrink={0}
                      >
                        {index + 1}
                      </Box>
                      {index < 3 && (
                        <Box
                          w="2px"
                          flex={1}
                          bg={stepLineColor}
                        />
                      )}
                    </VStack>
                    <Text fontSize="sm" color={mutedTextColor}>
                      {title}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Box>

        </VStack>
      </Box>
    </Box>
  );
};

export default PartnersPage;
