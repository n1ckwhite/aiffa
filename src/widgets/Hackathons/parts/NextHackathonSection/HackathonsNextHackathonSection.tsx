"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import { telegramHref } from "../../../Footer/model/links";

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  isStarted: boolean;
};

const HACKATHON_START = new Date("2025-05-15T18:00:00+03:00");

const getCountdownState = (): CountdownState => {
  const now = new Date().getTime();
  const diff = HACKATHON_START.getTime() - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      isStarted: true,
    };
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    days,
    hours,
    minutes,
    isStarted: false,
  };
};

const HackathonsNextHackathonSection: React.FC = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();
  const [countdown, setCountdown] = useState<CountdownState>(() => getCountdownState());
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const handleTick = () => {
      setCountdown(getCountdownState());
    };

    handleTick();

    const intervalId = window.setInterval(handleTick, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-next-title"
    >
      <Box
        bg={sectionCardBg}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 5, md: 8 }}
        py={{ base: 6, md: 8 }}
      >
        <Stack
          spacing={{ base: 4, md: 5 }}
          align="flex-start"
        >
          <Box>
            <Text
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.08em"
              color={mutedTextColor}
              mb={1}
            >
              Ближайший хакатон
            </Text>
            <Heading
              id="hackathons-next-title"
              as="h2"
              size={isMobile ? "md" : "lg"}
            >
              AIFFA Hackathon #1 — Задача старта
            </Heading>
          </Box>

          <Stack
            spacing={1}
            fontSize={{ base: "sm", md: "md" }}
            color={mutedTextColor}
          >
            <Text>
              📅 <Text as="span" fontStyle="italic">Май 2025</Text>
            </Text>
            <Text>
              💰 <Text as="span" fontStyle="italic">Призовой фонд: 100&nbsp;000&nbsp;₽</Text>
            </Text>
            <Text>
              🎯 <Text as="span" fontStyle="italic">Тема: будет объявлена позже</Text>
            </Text>
          </Stack>

          <Box mt={{ base: 3, md: 4 }}>
            {countdown.isStarted ? (
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                Хакатон уже стартовал — присоединяйтесь к сообществу, чтобы не пропустить
                следующий анонс.
              </Text>
            ) : (
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={mutedTextColor}
              >
                До старта осталось:{" "}
                <Text as="span" fontWeight="semibold">
                  {countdown.days} д {countdown.hours} ч {countdown.minutes} мин
                </Text>
                .
              </Text>
            )}
          </Box>

          <Button
            as="a"
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="blue"
            size="lg"
            mt={{ base: 4, md: 5 }}
          >
            Участвовать
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsNextHackathonSection;


