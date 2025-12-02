"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import {
  CalendarIcon,
  StarIcon,
  QuestionOutlineIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { keyframes } from "@emotion/react";
import { useHackathonsColors } from "../../colors/useHackathonsColors";
import { telegramHref } from "../../../Footer/model/links";
import { SuccessStoriesLottieIcon } from "@/shared/icons/components-icon";

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  isStarted: boolean;
};

const HACKATHON_START = new Date("2025-05-15T18:00:00+03:00");

const cardGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.55);
  }
  70% {
    box-shadow: 0 0 0 18px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-40%);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(140%);
    opacity: 0;
  }
`;

const floatBlobA = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(12px, -18px, 0) scale(1.05);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

const floatBlobB = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-16px, 12px, 0) scale(1.08);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

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

  const cardBgGradient = useColorModeValue(
    "linear(to-br, blue.50, whiteAlpha.900)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );

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
      <Stack
        mb={{ base: 4, md: 6 }}
        spacing={2}
        align="center"
      >
        <Stack
          as="header"
          direction={{ base: "column", sm: "row" }}
          justify="center"
          align="center"
          spacing={{ base: 1, sm: 2 }}
        >
          <Heading
            as="h2"
            fontSize={{ base: "lg", md: "xl" }}
          >
            Хакатоны с понятным стартом и таймлайном
          </Heading>
        </Stack>
        <Text
          mt={2}
          fontSize={{ base: "sm", md: "md" }}
          color={mutedTextColor}
          textAlign="center"
          maxW={{ base: "full", md: "720px" }}
        >
          В течение весны мы запускаем серию хакатонов AIFFA. Первый старт — в мае 2025:
          анонс, регистрация, формирование команд и старт задач происходят по чёткому,
          прозрачному таймлайну, чтобы вы заранее понимали, когда подключаться.
        </Text>
      </Stack>

      <Box
        position="relative"
        overflow="hidden"
        bgGradient={cardBgGradient}
        borderRadius="3xl"
        borderWidth="1px"
        borderColor={cardBorderColor}
        px={{ base: 6, md: 8 }}
        py={{ base: 5, md: 8 }}
        animation={`${cardGlow} 4s ease-out infinite`}
      >
        <Box
          position="absolute"
          inset="-40px"
          opacity={0.65}
          filter="blur(48px)"
          pointerEvents="none"
          zIndex={0}
        >
          <Box
            position="absolute"
            top={{ base: "45%", md: "20%" }}
            left="-5%"
            w={{ base: "220px", md: "260px" }}
            h={{ base: "220px", md: "260px" }}
            bgGradient="radial(blue.400, transparent)"
            animation={`${floatBlobA} 18s ease-in-out infinite`}
          />
          <Box
            position="absolute"
            bottom="-10%"
            right="-5%"
            w={{ base: "260px", md: "320px" }}
            h={{ base: "260px", md: "320px" }}
            bgGradient="radial(purple.400, transparent)"
            animation={`${floatBlobB} 22s ease-in-out infinite`}
          />
        </Box>

        <Box
          position="absolute"
          top="0"
          left="-40%"
          h="3px"
          w="40%"
          bgGradient="linear(to-r, transparent, whiteAlpha.800, transparent)"
          opacity={0.8}
          animation={`${shimmer} 6s ease-in-out infinite`}
          zIndex={1}
        />
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 4, md: 8 }}
          align={{ base: "flex-start", md: "center" }}
          position="relative"
          zIndex={2}
        >
          <Stack
            spacing={{ base: 3, md: 5 }}
            align="flex-start"
            flex="1"
          >
            <Box>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
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
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
              >
                AIFFA Hackathon #1 — Задача старта
              </Heading>
            </Box>

            <Stack
              spacing={2}
              fontSize={{ base: "xs", md: "sm" }}
              color={mutedTextColor}
            >
              <Stack direction="row" align="center" spacing={2}>
                <Box as={CalendarIcon} color="blue.400" boxSize={{ base: 3, md: 4 }} />
                <Text as="span" fontStyle="italic">
                  Май 2025
                </Text>
              </Stack>
              <Stack direction="row" align="center" spacing={2}>
                <Box as={StarIcon} color="yellow.400" boxSize={{ base: 3, md: 4 }} />
                <Text as="span" fontStyle="italic">
                  Призовой фонд: 100&nbsp;000&nbsp;₽
                </Text>
              </Stack>
              <Stack direction="row" align="center" spacing={2}>
                <Box as={QuestionOutlineIcon} color="purple.300" boxSize={{ base: 3, md: 4 }} />
                <Text as="span" fontStyle="italic">
                  Тема: будет объявлена позже
                </Text>
              </Stack>
            </Stack>

            <Box mt={{ base: 2, md: 4 }}>
              {countdown.isStarted ? (
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={mutedTextColor}
                >
                  Хакатон стартует в мае — присоединяйтесь к сообществу, чтобы не пропустить
                  анонс и вовремя попасть в команду.
                </Text>
              ) : (
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
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

            <Box
              w="full"
              display="flex"
              justifyContent={{ base: "center", md: "flex-start" }}
              mt={{ base: 3, md: 5 }}
            >
              <Box position="relative" display="inline-flex">
                <Box
                  position="absolute"
                  insetX={-4}
                  top="50%"
                  transform="translateY(-50%)"
                  h="56px"
                  bgGradient={useColorModeValue(
                    "radial(circle at 50% 50%, rgba(59,130,246,0.25), transparent 65%)",
                    "radial(circle at 50% 50%, rgba(59,130,246,0.65), transparent 65%)"
                  )}
                  filter="blur(16px)"
                  opacity={0.9}
                  pointerEvents="none"
                />
                <Button
                  as="a"
                  href={telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="brand"
                  size="md"
                  fontSize={{ base: "sm", sm: "md" }}
                  px={{ base: 4, sm: 6, md: 7 }}
                  py={{ base: 2.5, sm: 3 }}
                  rightIcon={<ArrowForwardIcon />}
                  position="relative"
                  zIndex={1}
                  color={useColorModeValue("gray.900", "white")}
                >
                  Участвовать в хакатоне
                </Button>
              </Box>
            </Box>
          </Stack>

          <Box
            flexShrink={0}
            w={{ base: "100%", sm: "75%", md: "260px" }}
            display="flex"
            justifyContent={{ base: "center", md: "flex-end" }}
            mx={{ base: "auto", md: 0 }}
          >
            <SuccessStoriesLottieIcon />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsNextHackathonSection;


