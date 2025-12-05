"use client";
import React from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";
import { useSessionsFirstSessionDetailsCards } from "./data";
import { EventDetailCard } from "./parts";

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


