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
} from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import { SessionsLottieIcon } from "@/shared/icons/components-icon";

const sessionHighlightGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.35);
    transform: translateY(0);
  }
  60% {
    box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
    transform: translateY(-1px);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    transform: translateY(0);
  }
`;

const SessionsScreen: React.FC = () => {
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionLabelColor = useColorModeValue("blue.600", "blue.300");
  const cardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");
  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const iconCircleBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const iconColor = useColorModeValue("blue.600", "whiteAlpha.900");
  const highlightCardBg = useColorModeValue("blue.50", "rgba(15, 23, 42, 0.95)");
  const highlightCardBorder = useColorModeValue("blue.100", "blue.500");
  const metaTextColor = useColorModeValue("gray.700", "gray.300");
  const eventBlockBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");
  const eventBlockBorderColor = useColorModeValue("blue.100", "whiteAlpha.300");
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
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  color={sectionLabelColor}
                  fontWeight="semibold"
                >
                  Сессии AIFFA
                </Text>
                <Heading
                  id="sessions-hero-title"
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                >
                  Живые форматы для роста, общения и поддержки
                </Heading>
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
              borderRadius="3xl"
              borderWidth="1px"
              borderColor={highlightCardBorder}
              bg={highlightCardBg}
              p={{ base: 4, md: 6 }}
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
                  <HStack
                    mt={3}
                    spacing={4}
                    flexWrap="wrap"
                    justify="center"
                    fontSize={{ base: "xs", md: "sm" }}
                    color={metaTextColor}
                  >
                    <HStack spacing={2}>
                      <Text as="time" dateTime="2025-02-01">
                        1 февраля, 19:00 по Москве
                      </Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon
                        as={SiGooglemeet}
                        boxSize={4}
                        color="#0F9D58"
                        aria-hidden="true"
                      />
                      <Text>Онлайн: Google Meet</Text>
                    </HStack>
                  </HStack>
                </Box>
                <SessionsLottieIcon/>

                <Stack
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
                title="О мероприятии"
                description="Это мягкое знакомство с комьюнити AIFFA: расскажем, как устроен проект, какие форматы есть сейчас и как из них собрать маршрут под себя. Участники коротко представятся и смогут обозначить свои цели на ближайшие месяцы."
                mutedTextColor={mutedTextColor}
                eventBlockBg={eventBlockBg}
                eventBlockBorderColor={eventBlockBorderColor}
              />
              <EventDetailCard
                title="Как присоединиться"
                description="Регистрации не нужно: просто заходите в Telegram‑сообщество AIFFA, следите за анонсом и подключайтесь по ссылке на Google Meet в указанное время. Если не успели на первую встречу — сможете присоединиться к следующим сессиям."
                mutedTextColor={mutedTextColor}
                eventBlockBg={eventBlockBg}
                eventBlockBorderColor={eventBlockBorderColor}
              />
            </SimpleGrid>
          </Box>

          <Box as="section" aria-labelledby="sessions-formats-title">
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
        </VStack>
      </Box>
    </Box>
  );
};

type EventDetailCardProps = {
  title: string;
  description: string;
  mutedTextColor: string;
  eventBlockBg: string;
  eventBlockBorderColor: string;
};

const EventDetailCard: React.FC<EventDetailCardProps> = ({
  title,
  description,
  mutedTextColor,
  eventBlockBg,
  eventBlockBorderColor,
}) => {
  return (
    <Box
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={eventBlockBorderColor}
      bg={eventBlockBg}
      p={{ base: 3, md: 4 }}
    >
      <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={1}>
        {title}
      </Heading>
      <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor}>
        {description}
      </Text>
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
    >
      <Stack spacing={3}>
        <Box
          borderRadius="full"
          boxSize={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={iconCircleBg}
          color={iconColor}
          aria-hidden="true"
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


