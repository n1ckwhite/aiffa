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
          fontSize={{ base: "md", md: "3xl" }}
        >
          Как проходит первая сессия
        </Heading>
        <Text
          mt={3}
          fontSize={{base: "md", md: "lg"}}
          color={mutedTextColor}
        >
          Коротко о том, что будет на знакомстве и как к нему подключиться.
        </Text>
      </Box>

      <SimpleGrid
        minChildWidth={{ base: "100%", md: "400px" }}
        spacing={{ base: 3, md: 4 }}
        w="full"
        minW={0}
        maxW="1200px"
        mx="auto"
        boxSizing="border-box"
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


