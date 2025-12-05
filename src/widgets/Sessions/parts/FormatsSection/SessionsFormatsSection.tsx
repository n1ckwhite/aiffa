"use client";

import React from "react";
import {
  Box,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaComments,
  FaHandshake,
  FaMapMarkerAlt,
  FaMicrophoneAlt,
  FaProjectDiagram,
  FaQuestionCircle,
  FaUserFriends,
} from "react-icons/fa";
import { ForSessionsLottieIcon } from "@/shared/icons/components-icon";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";
import { detailCardGlow, iconIdleFloat } from "@/widgets/Sessions/animations";
import { SessionFormatCardProps } from "./types";

const SessionFormatCard: React.FC<
  SessionFormatCardProps & {
    mutedTextColor: string;
    cardBg: string;
    cardBorderColor: string;
    iconCircleBg: string;
    iconColor: string;
  }
> = ({
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

const SessionsFormatsSection: React.FC = () => {
  const {
    mutedTextColor,
    cardBg,
    cardBorderColor,
    iconCircleBg,
    iconColor,
  } = useSessionsColors();

  return (
    <Box as="section" aria-labelledby="sessions-formats-title">
      <ForSessionsLottieIcon />
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
          Регулярные форматы, в которых можно разбирать задачи, получать поддержку и
          расширять круг общения.
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
          icon={<Icon as={FaComments} />}
          title="Встречи"
          description="Онлайн‑встречи и созвоны по конкретным темам: от практических задач до обсуждения маршрута развития."
          mutedTextColor={mutedTextColor}
          cardBg={cardBg}
          cardBorderColor={cardBorderColor}
          iconCircleBg={iconCircleBg}
          iconColor={iconColor}
        />
        <SessionFormatCard
          icon={<Icon as={FaUserFriends} />}
          title="Консультации"
          description="Точечные консультации по коду, архитектуре, карьере или учебному маршруту, когда нужен детальный разбор."
          mutedTextColor={mutedTextColor}
          cardBg={cardBg}
          cardBorderColor={cardBorderColor}
          iconCircleBg={iconCircleBg}
          iconColor={iconColor}
        />
        <SessionFormatCard
          icon={<Icon as={FaQuestionCircle} />}
          title="Q&A"
          description="Сессии вопросов и ответов, где можно задать любые рабочие вопросы по задачам, технологиям и формату обучения."
          mutedTextColor={mutedTextColor}
          cardBg={cardBg}
          cardBorderColor={cardBorderColor}
          iconCircleBg={iconCircleBg}
          iconColor={iconColor}
        />
        <SessionFormatCard
          icon={<Icon as={FaMicrophoneAlt} />}
          title="AMA (Ask Me Anything)"
          description="Открытые AMA‑форматы с экспертами, где вы задаёте вопросы вживую и получаете честные ответы про путь и практику."
          mutedTextColor={mutedTextColor}
          cardBg={cardBg}
          cardBorderColor={cardBorderColor}
          iconCircleBg={iconCircleBg}
          iconColor={iconColor}
        />
        <SessionFormatCard
          icon={<Icon as={FaProjectDiagram} />}
          title="Разборы проектов"
          description="Показываем проекты участников и вместе разбираем архитектуру, код, UX и подход к решению задачи."
          mutedTextColor={mutedTextColor}
          cardBg={cardBg}
          cardBorderColor={cardBorderColor}
          iconCircleBg={iconCircleBg}
          iconColor={iconColor}
        />
        <SessionFormatCard
          icon={<Icon as={FaHandshake} />}
          title="Networking"
          description="Формат для знакомства с другими участниками, поиска команды, коллег и людей с похожими целями."
          mutedTextColor={mutedTextColor}
          cardBg={cardBg}
          cardBorderColor={cardBorderColor}
          iconCircleBg={iconCircleBg}
          iconColor={iconColor}
        />
        <SessionFormatCard
          icon={<Icon as={FaMapMarkerAlt} />}
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
  );
};

export default SessionsFormatsSection;


