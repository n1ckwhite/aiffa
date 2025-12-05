"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";
import { iconIdleFloat, detailCardGlow } from "@/widgets/Sessions/animations";
import { EventDetailCardProps, EventDetailCardUiProps } from "./types";
import { useSessionsFirstSessionDetailsCards } from "./data";

const EventDetailCard: React.FC<EventDetailCardProps & EventDetailCardUiProps> = ({
  icon,
  title,
  description,
  mutedTextColor,
  eventBlockBg,
  eventBlockBorderColor,
  iconCircleBg,
  iconColor,
  highlightBorderColor,
}) => {
  return (
    <Box
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={eventBlockBorderColor}
      bg={eventBlockBg}
      p={{ base: 3, md: 4 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient:
          "linear-gradient(135deg, rgba(45, 212, 191, 0.16), rgba(56, 189, 248, 0.14))",
        backgroundSize: "180% 180%",
        opacity: 0.8,
        animation: `${detailCardGlow} 18s ease-in-out infinite`,
        pointerEvents: "none",
      }}
      boxShadow="sm"
      transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.2s ease"
      _hover={{
        borderColor: highlightBorderColor,
        boxShadow: "lg",
        transform: "translateY(-2px)",
      }}
    >
      <Stack spacing={2} position="relative" zIndex={1}>
        <HStack spacing={3} align="center">
          <Box
            borderRadius="full"
            boxSize={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={iconCircleBg}
            color={iconColor}
            aria-hidden="true"
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
        </HStack>
        <Text fontSize={{ base: "sm", md: "sm" }} color={mutedTextColor}>
          {description}
        </Text>
      </Stack>
    </Box>
  );
};

const SessionsFirstSessionDetailsSection: React.FC = () => {
  const {
    mutedTextColor,
    eventBlockBg,
    eventBlockBorderColor,
    iconCircleBg,
    iconColor,
    highlightCardBorder,
    sectionLabelColor,
  } = useSessionsColors();

  const cards = useSessionsFirstSessionDetailsCards();

  return (
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
        {cards.map((card) => (
          <EventDetailCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            mutedTextColor={mutedTextColor}
            eventBlockBg={eventBlockBg}
            eventBlockBorderColor={eventBlockBorderColor}
            iconCircleBg={iconCircleBg}
            iconColor={iconColor}
            highlightBorderColor={highlightCardBorder}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SessionsFirstSessionDetailsSection;


