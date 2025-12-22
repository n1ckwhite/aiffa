"use client";

import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaTelegramPlane } from "react-icons/fa";
import { SiGooglemeet } from "react-icons/si";
import { SessionsLottieIcon } from "@/shared/icons/components-icon";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";

const SessionsFirstSessionSection: React.FC = () => {
  const {
    sectionLabelColor,
    mutedTextColor,
    metaBadgeBg,
    metaBadgeBorderColor,
    metaBadgeTextColor,
    firstSessionBgGradient,
    firstSessionBorderColor,
    primaryCtaGradient,
    primaryCtaHoverGradient,
    secondaryCtaBg,
    secondaryCtaHoverBg,
    secondaryCtaColor,
    highlightCardBorder,
  } = useSessionsColors();

  return (
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
              mb={2}
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
              mt={3}
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

          <SessionsLottieIcon />

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
  );
};

export default SessionsFirstSessionSection;


