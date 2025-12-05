import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { keyframes } from "@emotion/react";
import {
  FaComments,
  FaUserFriends,
  FaQuestionCircle,
  FaMicrophoneAlt,
  FaProjectDiagram,
  FaHandshake,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaLightbulb,
  FaCalendarAlt,
} from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import { SessionsLottieIcon, ForSessionsLottieIcon, PeopleLottieIcon } from "@/shared/icons/components-icon";
import FAQ from "widgets/Modules/FAQ/FAQ";
import PillBadge from "@/shared/ui/PillBadge";

const sessionHighlightGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.35);
    transform: translateY(0);
  }
  60% {
    box-shadow: 0 0 0 18px rgba(56, 189, 248, 0);
    transform: translateY(-1px);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0);
    transform: translateY(0);
  }
`;

const detailCardGlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const iconIdleFloat = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0);
  }
`;

type UpcomingSession = {
  id: string;
  dateLabel: string;
  dateTime: string;
  description: string;
  icon: React.ReactNode;
};

const SessionsScreen: React.FC = () => {
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionLabelColor = useColorModeValue("blue.600", "blue.300");
  const cardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");
  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const iconCircleBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const iconColor = useColorModeValue("blue.600", "whiteAlpha.900");
  const highlightCardBorder = useColorModeValue("blue.100", "blue.500");
  const metaTextColor = useColorModeValue("gray.700", "gray.300");
  const eventBlockBg = useColorModeValue("white", "rgba(15, 23, 42, 0.96)");
  const eventBlockBorderColor = useColorModeValue("teal.100", "teal.500");
  const firstSessionBgGradient = useColorModeValue(
    "linear(to-br, teal.50, blue.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(15, 118, 110, 0.9))"
  );
  const firstSessionBorderColor = useColorModeValue("teal.100", "teal.600");
  const primaryCtaGradient = useColorModeValue(
    "linear(to-r, blue.600, blue.700)",
    "linear(to-r, blue.400, blue.500)"
  );
  const primaryCtaHoverGradient = useColorModeValue(
    "linear(to-r, blue.700, blue.800)",
    "linear(to-r, blue.500, blue.600)"
  );
  const secondaryCtaBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.200");
  const secondaryCtaHoverBg = useColorModeValue("gray.100", "whiteAlpha.300");
  const secondaryCtaColor = useColorModeValue("blue.700", "blue.50");
  const metaBadgeBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const metaBadgeBorderColor = useColorModeValue("blue.100", "whiteAlpha.300");
  const metaBadgeTextColor = useColorModeValue("gray.900", "gray.50");
  const ctaBgGradient = useColorModeValue(
    "linear(to-br, whiteAlpha.900, blue.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.96))"
  );
  const ctaBorderColor = useColorModeValue("blue.200", "blue.600");
  const partnerCtaBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.95)");
  const partnerCtaColor = useColorModeValue("blue.700", "whiteAlpha.900");
  const partnerCtaBorder = useColorModeValue("blue.200", "whiteAlpha.700");
  const partnerCtaHoverBg = useColorModeValue("white", "rgba(15, 23, 42, 0.98)");
  const forWhomBgGradient = useColorModeValue(
    "linear(to-br, blue.50, blue.100)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.95))"
  );
  const forWhomBorderColor = useColorModeValue("blue.100", "whiteAlpha.200");
  const forWhomTitleColor = useColorModeValue("blue.900", "whiteAlpha.900");
  const forWhomDescriptionColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const forWhomItemColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");
  const forWhomCardBg = useColorModeValue("white", "rgba(15, 23, 42, 0.88)");
  const forWhomCardBorderColor = useColorModeValue("blue.100", "whiteAlpha.400");
  const forWhomCardTitleColor = useColorModeValue("gray.900", "white");
  const forWhomCardTextColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const scheduleMarkerColor = useColorModeValue("blue.500", "teal.300");
  const scheduleChipBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const scheduleChipColor = useColorModeValue("blue.700", "blue.100");

  const upcomingSessions: UpcomingSession[] = [
    {
      id: "2025-05-01-intro",
      dateLabel: "1 мая — знакомство",
      dateTime: "2025-05-01T19:00:00+03:00",
      description:
        "Онлайн‑знакомство с форматом и людьми, мягкий вход в комьюнити: рассказываем, как всё устроено, знакомимся и обозначаем цели на ближайшие месяцы.",
      icon: <FaComments />,
    },
    {
      id: "2025-05-08-ama",
      dateLabel: "8 мая — AMA",
      dateTime: "2025-05-08T19:00:00+03:00",
      description:
        "AMA‑сессия: можно задать любые вопросы про обучение, карьеру и проекты, узнать, как другие решают похожие задачи и куда двигаться дальше.",
      icon: <FaMicrophoneAlt />,
    },
    {
      id: "2025-05-15-project-review",
      dateLabel: "15 мая — разбор проектов",
      dateTime: "2025-05-15T19:00:00+03:00",
      description:
        "Показываем pet‑проекты участников: вместе смотрим код, архитектуру и UX, обсуждаем улучшения и следующие шаги по развитию проекта.",
      icon: <FaProjectDiagram />,
    },
    {
      id: "2025-05-22-networking",
      dateLabel: "22 мая — networking",
      dateTime: "2025-05-22T19:00:00+03:00",
      description:
        "Неформальное общение: знакомимся, ищем команду под хакатоны и долгие проекты, находим людей с похожими целями и интересами.",
      icon: <FaHandshake />,
    },
  ];

  return (
    <Box
      as="main"
      role="main"
      aria-label="Сессии AIFFA"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      <Box maxW="1200px" mx="auto">
        <VStack align="stretch" spacing={{ base: 10, md: 14 }}>
          <Box as="section" aria-labelledby="sessions-hero-title">
            <Stack spacing={{ base: 4, md: 5 }} align="center" transition="none">
              <Box
                as="header"
                textAlign="center"
                maxW={{ base: "full", md: "720px" }}
                transition="none"
              >
                <Heading
                  id="sessions-hero-title"
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                >
                  Живые форматы для роста, общения и поддержки
                </Heading>
                <Text
                  mt={3}
                  fontSize={{ base: "xs", md: "sm" }}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  color={sectionLabelColor}
                  fontWeight="semibold"
                >
                  Сессии AIFFA
                </Text>
                <Text
                  id="sessions-hero-description"
                  mt={3}
                  fontSize={{ base: "sm", md: "md" }}
                  color={mutedTextColor}
                >
                  Встречи, консультации, разборы проектов и AMA‑сессии, где можно задать вопросы, получить обратную связь и познакомиться с людьми из комьюнити AIFFA.
                </Text>
              </Box>
            </Stack>
          </Box>

          <Box as="section" aria-labelledby="sessions-first-event-title">
            <Box
              position="relative"
              overflow="hidden"
              borderRadius="3xl"
              borderWidth="1px"
              borderColor={firstSessionBorderColor}
              bgGradient={firstSessionBgGradient}
              px={{ base: 4, md: 6 }}
              pt={{ base: 4, md: 6 }}
              pb={{ base: 5, md: 7 }}
              animation={`${sessionHighlightGlow} 12s ease-out infinite`}
            >
              <Stack spacing={{ base: 4, md: 5 }} align="center">
                <Box
                  as="header"
                  textAlign="center"
                  maxW={{ base: "full", md: "720px" }}
                >
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    textTransform="uppercase"
                    letterSpacing="0.12em"
                    color={sectionLabelColor}
                    fontWeight="semibold"
                    mb={1}
                  >
                    Ближайшая сессия
                  </Text>
                  <Heading
                    id="sessions-first-event-title"
                    as="h2"
                    fontSize={{ base: "xl", md: "2xl" }}
                  >
                    Знакомство с AIFFA: первая живая сессия
                  </Heading>
                  <Text
                    mt={2}
                    fontSize={{ base: "sm", md: "md" }}
                    color={mutedTextColor}
                  >
                    Это встреча про экосистему и людей: расскажем, как устроено комьюнити AIFFA,
                    какие форматы и возможности есть внутри, как мы помогаем друг другу расти.
                    Это не просто проект, а живое сообщество, в котором все развиваются вместе.
                  </Text>
                  <HStack
                    mt={3}
                    spacing={4}
                    flexWrap="wrap"
                    justify="center"
                  >
                    <Box
                      display="inline-flex"
                      alignItems="center"
                      px={{ base: 3, md: 4 }}
                      py={{ base: 1.5, md: 2 }}
                      borderRadius="full"
                      borderWidth="1px"
                      borderColor={metaBadgeBorderColor}
                      bg={metaBadgeBg}
                      color={metaBadgeTextColor}
                      fontSize={{ base: "xs", md: "sm" }}
                      fontWeight="medium"
                      gap={{ base: 3, md: 4 }}
                    >
                      <Box as="time" dateTime="2025-05-01" fontWeight="semibold">
                        1 мая, 19:00 по Москве
                      </Box>
                      <Box
                        w="1px"
                        h={{ base: "14px", md: "16px" }}
                        bg="whiteAlpha.400"
                        aria-hidden="true"
                      />
                      <HStack spacing={1.5}>
                        <Icon
                          as={SiGooglemeet}
                          boxSize={4}
                          color="#0F9D58"
                          aria-hidden="true"
                        />
                        <Text>Онлайн: Google Meet</Text>
                      </HStack>
                    </Box>
                  </HStack>
                </Box>
                <SessionsLottieIcon/>

                <Stack
                  w="full"
                  direction={{ base: "column", sm: "row" }}
                  spacing={3}
                  justify="center"
                  align={{ base: "stretch", sm: "center" }}
                >
                  <Button
                    as="a"
                    href="https://t.me/nickwhite_web"
                    target="_blank"
                    rel="noopener noreferrer"
                    fontSize={{ base: "sm", md: "sm" }}
                    fontWeight="semibold"
                    px={{ base: 4, md: 5 }}
                    py={{ base: 2.5, md: 3 }}
                    borderRadius="full"
                    bgGradient={primaryCtaGradient}
                    color="white"
                    transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                    _hover={{
                      bgGradient: primaryCtaHoverGradient,
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      boxShadow: "sm",
                    }}
                    leftIcon={<Icon as={FaTelegramPlane} boxSize={4} aria-hidden="true" />}
                  >
                    Перейти в Telegram
                  </Button>

                  <Button
                    as="a"
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    fontSize={{ base: "sm", md: "sm" }}
                    fontWeight="semibold"
                    px={{ base: 4, md: 5 }}
                    py={{ base: 2.5, md: 3 }}
                    borderRadius="full"
                    bg={secondaryCtaBg}
                    color={secondaryCtaColor}
                    borderWidth="1px"
                    borderColor={highlightCardBorder}
                    transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                    _hover={{
                      bg: secondaryCtaHoverBg,
                      transform: "translateY(-1px)",
                      boxShadow: "md",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      boxShadow: "sm",
                    }}
                    leftIcon={
                      <Icon as={SiGooglemeet} boxSize={4} aria-hidden="true" />
                    }
                  >
                    Открыть Google Meet
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box as="section" aria-labelledby="sessions-first-event-details-title">
            <Box
              as="header"
              mb={{ base: 4, md: 5 }}
              textAlign="center"
              maxW={{ base: "full", md: "720px" }}
              mx="auto"
            >
              <Heading
                id="sessions-first-event-details-title"
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                Как проходит первая сессия
              </Heading>
              <Text
                mt={2}
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                Коротко о том, что будет на знакомстве и как к нему подключиться.
              </Text>
            </Box>
            
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 3, md: 4 }}
            >
              <EventDetailCard
              icon={<FaQuestionCircle />}
                title="О мероприятии"
                description="Это мягкое знакомство с комьюнити AIFFA: расскажем, как устроен проект, какие форматы есть сейчас и как из них собрать маршрут под себя. Участники коротко представятся и смогут обозначить свои цели на ближайшие месяцы."
                mutedTextColor={mutedTextColor}
                eventBlockBg={eventBlockBg}
                eventBlockBorderColor={eventBlockBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
                highlightBorderColor={highlightCardBorder}
              />
              <EventDetailCard
              icon={<SiGooglemeet />}
                title="Как присоединиться"
                description="Регистрации не нужно: просто заходите в Telegram‑сообщество AIFFA, следите за анонсом и подключайтесь по ссылке на Google Meet в указанное время. Если не успели на первую встречу — сможете присоединиться к следующим сессиям."
                mutedTextColor={mutedTextColor}
                eventBlockBg={eventBlockBg}
                eventBlockBorderColor={eventBlockBorderColor}
              iconCircleBg={iconCircleBg}
              iconColor={iconColor}
              highlightBorderColor={highlightCardBorder}
              />
            </SimpleGrid>
          </Box>
          <Box as="section" aria-labelledby="sessions-audience-title">
            <Box
              position="relative"
              overflow="hidden"
              bgGradient={forWhomBgGradient}
              borderRadius="3xl"
              borderWidth="1px"
              borderColor={forWhomBorderColor}
              px={{ base: 4, md: 6, lg: 8 }}
              py={{ base: 5, md: 7, lg: 8 }}
            >
              <Box
                position="absolute"
                inset="-40px"
                opacity={0.45}
                filter="blur(42px)"
                pointerEvents="none"
                aria-hidden="true"
              >
                <Box
                  position="absolute"
                  top="-12%"
                  left="-18%"
                  w={{ base: "220px", md: "260px" }}
                  h={{ base: "220px", md: "260px" }}
                  bgGradient="radial(circle at 20% 20%, rgba(59,130,246,0.85), transparent)"
                />
                <Box
                  position="absolute"
                  bottom="-22%"
                  right="-10%"
                  w={{ base: "260px", md: "320px" }}
                  h={{ base: "260px", md: "320px" }}
                  bgGradient="radial(circle at 80% 80%, rgba(45,212,191,0.45), transparent)"
                />
              </Box>

              <Stack
                direction="column"
                spacing={4}
                align="center"
                justify="center"
                position="relative"
                zIndex={1}
              >
                <Stack
                  spacing={{ base: 4, md: 5 }}
                  maxW="full"
                >
                  <Box textAlign="center">
                    <Text
                      fontSize="xs"
                      textTransform="uppercase"
                      letterSpacing="0.18em"
                      color={sectionLabelColor}
                      fontWeight="semibold"
                      mb={1}
                    >
                      Кому подойдут сессии
                    </Text>
                    <Heading
                      id="sessions-audience-title"
                      as="h2"
                      fontSize={{ base: "xl", md: "2xl" }}
                      color={forWhomTitleColor}
                    >
                      Если не хочется учиться в одиночку
                    </Heading>
                    <Text
                      mt={3}
                      fontSize={{ base: "sm", md: "md" }}
                      color={forWhomDescriptionColor}
                    >
                      Сессии — это живые созвоны, где можно задать вопросы, показать свой
                      код и услышать опыт других. Подходят, если хочется поддержки и
                      понятного следующего шага.
                    </Text>
                  </Box>

                  <Box
                    w="100%"
                  >
                    <PeopleLottieIcon />
                  </Box>
                </Stack>

                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={{ base: 3, md: 4 }}
                  flex="1"
                >
                  <Box
                    as="article"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor={forWhomCardBorderColor}
                    bg={forWhomCardBg}
                    p={{ base: 3, md: 4 }}
                  >
                    <HStack spacing={2} mb={2} align="center">
                      <Box
                        borderRadius="full"
                        boxSize={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={iconCircleBg}
                        color={iconColor}
                        aria-hidden="true"
                        animation={`${iconIdleFloat} 6s ease-in-out infinite`}
                      >
                        <Icon as={FaComments} boxSize={3} />
                      </Box>
                      <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color={forWhomCardTextColor}>
                        Старт в IT
                      </Text>
                    </HStack>
                    <Heading as="h3" fontSize="sm" mb={1} color={forWhomCardTitleColor}>
                      Понять, с чего начать и куда идти
                    </Heading>
                    <Text fontSize="xs" color={forWhomCardTextColor}>
                      Разбираем роли, стеки и реальные задачи, чтобы собрать для тебя
                      понятный маршрут: от первых шагов до уверенного джуна.
                    </Text>
                  </Box>

                  <Box
                    as="article"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor={forWhomCardBorderColor}
                    bg={forWhomCardBg}
                    p={{ base: 3, md: 4 }}
                  >
                    <HStack spacing={2} mb={2} align="center">
                      <Box
                        borderRadius="full"
                        boxSize={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={iconCircleBg}
                        color={iconColor}
                        aria-hidden="true"
                        animation={`${iconIdleFloat} 6s ease-in-out infinite`}
                      >
                        <Icon as={FaProjectDiagram} boxSize={3} />
                      </Box>
                      <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color={forWhomCardTextColor}>
                        Свой проект
                      </Text>
                    </HStack>
                    <Heading as="h3" fontSize="sm" mb={1} color={forWhomCardTitleColor}>
                      Показать проект и получить разбор
                    </Heading>
                    <Text fontSize="xs" color={forWhomCardTextColor}>
                      Приходишь со своим pet‑проектом или рабочей задачей — вместе
                      смотрим код, архитектуру и обсуждаем, что улучшить и как двигаться
                      дальше.
                    </Text>
                  </Box>

                  <Box
                    as="article"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor={forWhomCardBorderColor}
                    bg={forWhomCardBg}
                    p={{ base: 3, md: 4 }}
                  >
                    <HStack spacing={2} mb={2} align="center">
                      <Box
                        borderRadius="full"
                        boxSize={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={iconCircleBg}
                        color={iconColor}
                        aria-hidden="true"
                        animation={`${iconIdleFloat} 6s ease-in-out infinite`}
                      >
                        <Icon as={FaUserFriends} boxSize={3} />
                      </Box>
                      <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.12em" color={forWhomCardTextColor}>
                        Люди и команды
                      </Text>
                    </HStack>
                    <Heading as="h3" fontSize="sm" mb={1} color={forWhomCardTitleColor}>
                      Найти своих и видеть, как решают задачи другие
                    </Heading>
                    <Text fontSize="xs" color={forWhomCardTextColor}>
                      Знакомишься с ребятами, смотришь чужие решения, собираешь команду
                      под хакатон или долгий проект и не варишься в одиночестве.
                    </Text>
                  </Box>
                </SimpleGrid>
              </Stack>
            </Box>
          </Box>
          <Box as="section" aria-labelledby="sessions-upcoming-title">
            <Box
              as="header"
              mb={{ base: 4, md: 5 }}
              textAlign="center"
              maxW={{ base: "full", md: "720px" }}
              mx="auto"
            >
              <Heading
                id="sessions-upcoming-title"
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                Расписание ближайших 4 встреч
              </Heading>
              <Text
                mt={2}
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                Все встречи проходят онлайн, по московскому времени.
              </Text>
              <HStack
                mt={3}
                spacing={2}
                align="center"
                justify="center"
              >
                <PillBadge colorScheme="blue" variant="outline">Май 2025 · онлайн‑сессии AIFFA</PillBadge>
              </HStack>
               </Box>

            <SimpleGrid
              as="ul"
              role="list"
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={{ base: 4, md: 5, lg: 6 }}
              listStyleType="none"
              pl={0}
            >
              {upcomingSessions.map((session) => (
                <Box
                  as="li"
                  key={session.id}
                  role="listitem"
                  borderRadius="2xl"
                  borderWidth="1px"
                  borderColor={cardBorderColor}
                  bg={cardBg}
                  p={{ base: 4, md: 5 }}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    bg: "transparent",
                    bgImage: "none",
                    pointerEvents: "none",
                  }}
                  boxShadow="sm"
                  transition="transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
                  _hover={{
                    transform: "translateY(-3px)",
                    boxShadow: "lg",
                    borderColor: scheduleMarkerColor,
                  }}
                >
                  <Stack spacing={3} position="relative" zIndex={1}>
                    <HStack spacing={3} align="flex-start">
                      <Box
                        borderRadius="full"
                        boxSize={8}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={iconCircleBg}
                        color={iconColor}
                        aria-hidden="true"
                        boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
                        animation={`${iconIdleFloat} 5s ease-in-out infinite`}
                        transition="transform 0.18s ease, box-shadow 0.18s ease"
                        _hover={{
                          transform: "translateY(-1px) scale(1.05)",
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.45)",
                        }}
                      >
                        {session.icon}
                      </Box>
                      <VStack align="flex-start" spacing={1}>
                        <Box
                          as="time"
                          dateTime={session.dateTime}
                          fontSize={{ base: "sm", md: "sm" }}
                          fontWeight="semibold"
                        >
                          {session.dateLabel}
                        </Box>
                        <HStack spacing={2}>
                          <Box
                            as="span"
                            px={2.5}
                            py={1}
                            borderRadius="full"
                            bg={scheduleChipBg}
                            color={scheduleChipColor}
                            fontSize="xs"
                            display="inline-flex"
                            alignItems="center"
                            gap={1}
                          >
                            <Icon
                              as={SiGooglemeet}
                              boxSize={3}
                              aria-hidden="true"
                            />
                            <Text as="span">Онлайн · 19:00 МСК</Text>
                          </Box>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text
                      fontSize={{ base: "sm", md: "sm" }}
                      color={metaTextColor}
                    >
                      {session.description}
                    </Text>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          <Box as="section" aria-labelledby="sessions-formats-title">
              <ForSessionsLottieIcon/>
            <Box
              as="header"
              mb={{ base: 4, md: 6 }}
              textAlign="center"
              maxW={{ base: "full", md: "720px" }}
              mx="auto"
            >
              <Heading
                id="sessions-formats-title"
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                Форматы сессий
              </Heading>
              <Text
                mt={2}
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                Регулярные форматы, в которых можно разбирать задачи, получать поддержку и расширять круг общения.
              </Text>
            </Box>

            <SimpleGrid
              as="ul"
              role="list"
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 4, md: 6 }}
              listStyleType="none"
              pl={0}
            >
              <SessionFormatCard
                icon={<FaComments />}
                title="Встречи"
                description="Онлайн‑встречи и созвоны по конкретным темам: от практических задач до обсуждения маршрута развития."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
              <SessionFormatCard
                icon={<FaUserFriends />}
                title="Консультации"
                description="Точечные консультации по коду, архитектуре, карьере или учебному маршруту, когда нужен детальный разбор."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
              <SessionFormatCard
                icon={<FaQuestionCircle />}
                title="Q&A"
                description="Сессии вопросов и ответов, где можно задать любые рабочие вопросы по задачам, технологиям и формату обучения."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
              <SessionFormatCard
                icon={<FaMicrophoneAlt />}
                title="AMA (Ask Me Anything)"
                description="Открытые AMA‑форматы с экспертами, где вы задаёте вопросы вживую и получаете честные ответы про путь и практику."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
              <SessionFormatCard
                icon={<FaProjectDiagram />}
                title="Разборы проектов"
                description="Показываем проекты участников и вместе разбираем архитектуру, код, UX и подход к решению задачи."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
              <SessionFormatCard
                icon={<FaHandshake />}
                title="Networking"
                description="Формат для знакомства с другими участниками, поиска команды, коллег и людей с похожими целями."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
              <SessionFormatCard
                icon={<FaMapMarkerAlt />}
                title="Offline Meetups"
                description="Встречи офлайн, когда это возможно: живое общение, мини‑доклады и обсуждения вокруг практики и проектов."
                mutedTextColor={mutedTextColor}
                cardBg={cardBg}
                cardBorderColor={cardBorderColor}
                iconCircleBg={iconCircleBg}
                iconColor={iconColor}
              />
            </SimpleGrid>
          </Box>
          <Box
            as="section"
            aria-labelledby="sessions-cta-title"
            display="flex"
            justifyContent="center"
          >
            <Box
              position="relative"
              overflow="hidden"
              bgGradient={ctaBgGradient}
              borderRadius="3xl"
              borderWidth="1px"
              borderColor={ctaBorderColor}
              px={{ base: 3, sm: 4, md: 8 }}
              py={{ base: 5, md: 8 }}
              maxW="1200px"
              mx="auto"
            >
              <Box
                position="absolute"
                inset="-40px"
                opacity={0.35}
                filter="blur(42px)"
                pointerEvents="none"
                aria-hidden="true"
              >
                <Box
                  position="absolute"
                  top="-10%"
                  left="-12%"
                  w={{ base: "240px", md: "280px" }}
                  h={{ base: "240px", md: "280px" }}
                  bgGradient="radial(circle at 30% 30%, rgba(59,130,246,0.6), transparent)"
                />
                <Box
                  position="absolute"
                  bottom="-18%"
                  right="-8%"
                  w={{ base: "260px", md: "320px" }}
                  h={{ base: "260px", md: "320px" }}
                  bgGradient="radial(circle at 70% 70%, rgba(244,114,182,0.5), transparent)"
                />
              </Box>

              <Stack
                direction="column"
                spacing={{ base: 5, md: 6 }}
                align="center"
                justify="center"
                position="relative"
                zIndex={1}
              >
                <Box
                  as="header"
                  textAlign={{ base: "center", md: "center" }}
                  mx={{ base: "auto", md: 0 }}
                >
                  <Heading
                    id="sessions-cta-title"
                    as="h2"
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  >
                    Присоединяйтесь к сессиям AIFFA
                  </Heading>
                  <Text
                    mt={3}
                    fontSize={{ base: "sm", md: "md" }}
                    color={mutedTextColor}
                  >
                    Не упустите возможность пообщаться с экспертами и коллегами:
                    присоединяйтесь к открытым форматам или предложите свою
                    консультацию и мероприятие как партнёр AIFFA.
                  </Text>
                </Box>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={4}
                  w="full"
                  justify="center"
                  align="stretch"
                  mx="auto"
                >
                  <Button
                    as="a"
                    href="https://t.me/nickwhite_web"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    fontWeight="semibold"
                    px={{ base: 6, md: 8 }}
                    py={{ base: 3, md: 3.5 }}
                    w="100%"
                    bgGradient="linear(to-r, blue.600, blue.700)"
                    color="white"
                    transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
                    _hover={{
                      bgGradient: "linear(to-r, blue.700, blue.800)",
                      transform: { base: "none", md: "translateY(-1px)" },
                      boxShadow: "lg",
                    }}
                    _active={{
                      bgGradient: "linear(to-r, blue.800, blue.900)",
                      transform: { base: "none", md: "translateY(0)" },
                      boxShadow: "md",
                    }}
                    borderRadius="full"
                  >
                    Написать в Telegram
                  </Button>
                  <Button
                    as="a"
                    href="https://t.me/nickwhite_web?text=Хочу%20предложить%20тему%20для%20сессии%20AIFFA"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    fontWeight="semibold"
                    px={{ base: 6, md: 8 }}
                    py={{ base: 3, md: 3.5 }}
                    w="100%"
                    borderColor={ctaBorderColor}
                    borderWidth="1px"
                    bg={partnerCtaBg}
                    color={partnerCtaColor}
                    leftIcon={<Icon as={FaLightbulb} boxSize={4} aria-hidden="true" />}
                    transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease"
                    _hover={{
                      bg: partnerCtaHoverBg,
                      borderColor: ctaBorderColor,
                      transform: { base: "none", md: "translateY(-1px)" },
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: { base: "none", md: "translateY(0)" },
                      boxShadow: "md",
                    }}
                    borderRadius="full"
                  >
                    Предложить тему
                  </Button>
                  <Button
                    as={RouterLink as any}
                    to="/partners"
                    size="lg"
                    fontWeight="semibold"
                    px={{ base: 6, md: 8 }}
                    py={{ base: 3, md: 3.5 }}
                    w="100%"
                    borderColor={partnerCtaBorder}
                    borderWidth="1px"
                    bg={partnerCtaBg}
                    color={partnerCtaColor}
                    transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease"
                    _hover={{
                      bg: partnerCtaHoverBg,
                      borderColor: ctaBorderColor,
                      transform: { base: "none", md: "translateY(-1px)" },
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: { base: "none", md: "translateY(0)" },
                      boxShadow: "md",
                    }}
                    borderRadius="full"
                  >
                    Стать партнёром
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Box
            as="section"
            aria-label="Частые вопросы о сессиях и мероприятиях"
            pt={{ base: 4, md: 6 }}
            zIndex={100}
          >
            <FAQ
              title="Частые вопросы о сессиях и мероприятиях"
              variant="sessions"
              showSupportBlock={false}
            />
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

type EventDetailCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  mutedTextColor: string;
  eventBlockBg: string;
  eventBlockBorderColor: string;
  iconCircleBg: string;
  iconColor: string;
  highlightBorderColor: string;
};

const EventDetailCard: React.FC<EventDetailCardProps> = ({
  icon,
  title,
  description,
  mutedTextColor,
  eventBlockBg,
  eventBlockBorderColor,
  iconCircleBg,
  iconColor,
  highlightBorderColor,
}) => {
  return (
    <Box
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={eventBlockBorderColor}
      bg={eventBlockBg}
      p={{ base: 3, md: 4 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "transparent",
        pointerEvents: "none",
      }}
      boxShadow="sm"
      transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      _hover={{
        borderColor: highlightBorderColor,
        boxShadow: "lg",
        transform: "translateY(-2px)",
      }}
    >
      <Stack spacing={2} position="relative" zIndex={1}>
        <HStack spacing={3} align="center">
          <Box
            borderRadius="full"
            boxSize={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={iconCircleBg}
            color={iconColor}
            aria-hidden="true"
            animation={`${iconIdleFloat} 5s ease-in-out infinite`}
            transition="transform 0.18s ease, box-shadow 0.18s ease"
            _hover={{
              transform: "translateY(-1px) scale(1.05)",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.45)",
            }}
          >
            {icon}
          </Box>
          <Heading as="h3" fontSize={{ base: "md", md: "lg" }}>
            {title}
          </Heading>
        </HStack>
        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

type SessionFormatCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  mutedTextColor: string;
  cardBg: string;
  cardBorderColor: string;
  iconCircleBg: string;
  iconColor: string;
};

const SessionFormatCard: React.FC<SessionFormatCardProps> = ({
  icon,
  title,
  description,
  mutedTextColor,
  cardBg,
  cardBorderColor,
  iconCircleBg,
  iconColor,
}) => {
  return (
    <Box
      as="li"
      role="listitem"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={cardBorderColor}
      bg={cardBg}
      p={{ base: 4, md: 5 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.10), rgba(37, 99, 235, 0.06))",
        backgroundSize: "200% 200%",
        opacity: 0.9,
        animation: `${detailCardGlow} 22s ease-in-out infinite`,
        pointerEvents: "none",
      }}
      transition="transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      boxShadow="sm"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        borderColor: "blue.400",
      }}
    >
      <Stack spacing={3} position="relative" zIndex={1}>
        <Box
          borderRadius="full"
          boxSize={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={iconCircleBg}
          color={iconColor}
          aria-hidden="true"
          boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
          animation={`${iconIdleFloat} 5s ease-in-out infinite`}
          transition="transform 0.18s ease, box-shadow 0.18s ease"
          _hover={{
            transform: "translateY(-1px) scale(1.05)",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.45)",
          }}
        >
          {icon}
        </Box>
        <Heading as="h3" fontSize={{ base: "md", md: "lg" }}>
          {title}
        </Heading>
        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

export default SessionsScreen;


