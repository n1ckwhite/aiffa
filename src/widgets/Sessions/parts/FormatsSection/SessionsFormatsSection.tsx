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
        minChildWidth={{ base: "100%", sm: "250px", md: "300px" }}
        spacing={{ base: 4, md: 6 }}
        listStyleType="none"
        pl={0}
        w="full"
        minW={0}
        maxW="1200px"
        mx="auto"
        boxSizing="border-box"
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


