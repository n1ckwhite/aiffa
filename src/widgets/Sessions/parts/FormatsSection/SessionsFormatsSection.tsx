"use client";

import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ForSessionsLottieIcon } from "@/shared/icons/components-icon";
import { useSessionsFormatCards } from "./data";
import { SessionFormatCard, SessionsFormatsHeader } from "./parts";
import { useSessionsColors } from "@/widgets/Sessions/colors/useSessionsColors";

const SessionsFormatsSection: React.FC = () => {
  const cards = useSessionsFormatCards();
  const { mutedTextColor } = useSessionsColors();
  return (
    <Box as="section" aria-labelledby="sessions-formats-title">
      <ForSessionsLottieIcon />
      <SessionsFormatsHeader mutedTextColor={mutedTextColor} />

      <SimpleGrid
        as="ul"
        role="list"
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 4, md: 6 }}
        listStyleType="none"
        pl={0}
      >
        {cards.map((card) => (
          <SessionFormatCard
            key={card.title}
            card={card}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SessionsFormatsSection;


