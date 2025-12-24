"use client";

import React from "react";
import { Box, Button, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import {
  CalendarIcon,
  StarIcon,
  QuestionOutlineIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { telegramHref } from "../../../Footer/model/links";
import { RewardsLottieIcon } from "@/shared/icons/components-icon";
import { useNextHackathonCountdown } from "./hooks";
import { useNextHackathonSectionColors } from "./colors/useHackathonsNextHackathonSectionColors";

const HackathonsNextHackathonSection: React.FC = () => {
  const { cardBorderColor, mutedTextColor, cardBgGradient } = useNextHackathonSectionColors();
  const countdown = useNextHackathonCountdown();

  return (
    <Box
      as="section"
      aria-labelledby="hackathons-next-section-title"
    >
      <Stack
        mb={{ base: 4, md: 6 }}
        spacing={0}
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
            id="hackathons-next-section-title"
            fontSize={{ base: "2xl", md: "4xl" }}
            letterSpacing="-0.03em"
            textAlign="center"
          >
            Хакатоны с понятным стартом и таймлайном
          </Heading>
        </Stack>
        <Text
          mt={3}
          fontSize="md"
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
      >
        <Stack
          // Don't squeeze text on borderline Safari widths: switch to row only when there's enough space.
          direction={{ base: "column", xl: "row" }}
          spacing={{ base: 4, xl: 8 }}
          align={{ base: "center", xl: "center" }}
          justify={{ base: "center", xl: "space-between" }}
          position="relative"
          zIndex={2}
          w="full"
        >
          <Stack
            spacing={{ base: 3, md: 5 }}
            align={{ base: "center", xl: "flex-start" }}
            flex="1"
            minW={0}
          >
            <Box>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                textTransform="uppercase"
                letterSpacing="0.08em"
                color={mutedTextColor}
                mb={1}
                textAlign={{ base: "center", xl: "left" }}
              >
                Ближайший хакатон
              </Text>
              <Heading
                id="hackathons-next-title"
                as="h3"
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                textAlign={{ base: "center", xl: "left" }}
              >
                AIFFA Hackathon #1 — Задача старта
              </Heading>
            </Box>

            <Stack
              as="ul"
              role="list"
              spacing={2}
              fontSize={{ base: "xs", md: "sm" }}
              color={mutedTextColor}
              alignSelf={{ base: "center", xl: "flex-start" }}
              textAlign={{ base: "center", xl: "left" }}
              align={{ base: "center", xl: "flex-start" }}
            >
              <Stack as="li" role="listitem" direction="row" align="center" spacing={2} justify={{ base: "center", xl: "flex-start" }}>
                <Box as={CalendarIcon} color="blue.400" boxSize={{ base: 3, md: 4 }} />
                <Text
                  as="time"
                  dateTime="2025-05"
                  fontStyle="italic"
                  fontWeight="semibold"
                  color={useColorModeValue("blue.700", "blue.200")}
                >
                  Май 2025
                </Text>
              </Stack>
              <Stack as="li" role="listitem" direction="row" align="center" spacing={2} justify={{ base: "center", xl: "flex-start" }}>
                <Box as={StarIcon} color="yellow.400" boxSize={{ base: 3, md: 4 }} />
                <Text as="span" fontStyle="italic" fontWeight="semibold" color={useColorModeValue("yellow.700", "yellow.200")}>
                  Призовой фонд: 100&nbsp;000&nbsp;₽
                </Text>
              </Stack>
              <Stack as="li" role="listitem" direction="row" align="center" spacing={2} justify={{ base: "center", xl: "flex-start" }}>
                <Box as={QuestionOutlineIcon} color="purple.300" boxSize={{ base: 3, md: 4 }} />
                <Text as="span" fontStyle="italic" fontWeight="semibold" color={useColorModeValue("purple.600", "purple.200")}>
                  Тема: будет объявлена позже
                </Text>
              </Stack>
            </Stack>

            <Box
              mt={{ base: 2, md: 4 }}
              role="status"
              aria-live="polite"
              id="hackathons-next-countdown"
              textAlign={{ base: "center", xl: "left" }}
            >
              {countdown.isStarted ? (
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color={useColorModeValue("blue.800", "blue.100")}
                  fontWeight="semibold"
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
              justifyContent={{ base: "center", xl: "flex-start" }}
              mt={{ base: 3, xl: 5 }}
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
                  size="md"
                  fontSize={{ base: "sm", sm: "md" }}
                  fontWeight="semibold"
                  px={{ base: 4, sm: 6, md: 7 }}
                  py={{ base: 2.5, sm: 3 }}
                  rightIcon={<ArrowForwardIcon />}
                  position="relative"
                  zIndex={1}
                  bgGradient="linear(to-r, blue.600, blue.700)"
                  color="white"
                  borderRadius="full"
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
                  aria-describedby="hackathons-next-countdown"
                >
                  Участвовать в хакатоне
                </Button>
              </Box>
            </Box>
          </Stack>

          <Box
            flexShrink={0}
            w={{ base: "100%", xl: "260px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
          >
            {/* <RewardsLottieIcon /> */}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default HackathonsNextHackathonSection;


