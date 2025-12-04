import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaComments, FaUserFriends, FaQuestionCircle, FaMicrophoneAlt, FaProjectDiagram, FaHandshake, FaMapMarkerAlt } from "react-icons/fa";

const SessionsScreen: React.FC = () => {
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionLabelColor = useColorModeValue("blue.600", "blue.300");
  const cardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");
  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const iconCircleBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const iconColor = useColorModeValue("blue.600", "whiteAlpha.900");

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


