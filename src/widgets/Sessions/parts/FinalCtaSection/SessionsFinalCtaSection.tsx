"use client";

import React from "react";
import { Box, Button, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { FaLightbulb } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";

const SessionsFinalCtaSection: React.FC = () => {
  const {
    mutedTextColor,
    ctaBgGradient,
    ctaBorderColor,
    partnerCtaBg,
    partnerCtaColor,
    partnerCtaBorder,
    partnerCtaHoverBg,
  } = useSessionsColors();

  return (
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
              href="https://t.me/nickwhite_web"
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
  );
};

export default SessionsFinalCtaSection;


