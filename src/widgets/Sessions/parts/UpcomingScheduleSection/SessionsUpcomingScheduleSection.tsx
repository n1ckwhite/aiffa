"use client";

import React from "react";
import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaComments, FaHandshake, FaMicrophoneAlt, FaProjectDiagram } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import PillBadge from "@/shared/ui/PillBadge";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";
import { iconIdleFloat } from "@/widgets/Sessions/animations";
import { UpcomingSession } from "./types";

const upcomingSessions: UpcomingSession[] = [
  {
    id: "2025-05-01-intro",
    dateLabel: "1 мая — знакомство",
    dateTime: "2025-05-01T19:00:00+03:00",
    description:
      "Онлайн‑знакомство с форматом и людьми, мягкий вход в комьюнити: рассказываем, как всё устроено, знакомимся и обозначаем цели на ближайшие месяцы.",
    icon: <Icon as={FaComments} />,
  },
  {
    id: "2025-05-08-ama",
    dateLabel: "8 мая — AMA",
    dateTime: "2025-05-08T19:00:00+03:00",
    description:
      "AMA‑сессия: можно задать любые вопросы про обучение, карьеру и проекты, узнать, как другие решают похожие задачи и куда двигаться дальше.",
    icon: <Icon as={FaMicrophoneAlt} />,
  },
  {
    id: "2025-05-15-project-review",
    dateLabel: "15 мая — разбор проектов",
    dateTime: "2025-05-15T19:00:00+03:00",
    description:
      "Показываем pet‑проекты участников: вместе смотрим код, архитектуру и UX, обсуждаем улучшения и следующие шаги по развитию проекта.",
    icon: <Icon as={FaProjectDiagram} />,
  },
  {
    id: "2025-05-22-networking",
    dateLabel: "22 мая — networking",
    dateTime: "2025-05-22T19:00:00+03:00",
    description:
      "Неформальное общение: знакомимся, ищем команду под хакатоны и долгие проекты, находим людей с похожими целями и интересами.",
    icon: <Icon as={FaHandshake} />,
  },
];

const SessionsUpcomingScheduleSection: React.FC = () => {
  const {
    mutedTextColor,
    cardBg,
    cardBorderColor,
    scheduleMarkerColor,
    scheduleChipBg,
    scheduleChipColor,
  } = useSessionsColors();

  return (
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
          <PillBadge colorScheme="blue" variant="outline">
            Май 2025 · онлайн‑сессии AIFFA
          </PillBadge>
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
                  bg={scheduleChipBg}
                  color={scheduleMarkerColor}
                  aria-hidden="true"
                  boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
                  animation={`${iconIdleFloat} 5s ease-in-out infinite`}
                  transition="transform 0.18s ease, box-shadow 0.18s ease"
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
                color={mutedTextColor}
              >
                {session.description}
              </Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SessionsUpcomingScheduleSection;


