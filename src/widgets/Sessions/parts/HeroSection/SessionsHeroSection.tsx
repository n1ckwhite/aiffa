"use client";

import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";

const SessionsHeroSection: React.FC = () => {
  const { mutedTextColor, sectionLabelColor } = useSessionsColors();

  return (
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
            Встречи, консультации, разборы проектов и AMA‑сессии, где можно задать вопросы,
            получить обратную связь и познакомиться с людьми из комьюнити AIFFA.
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default SessionsHeroSection;


