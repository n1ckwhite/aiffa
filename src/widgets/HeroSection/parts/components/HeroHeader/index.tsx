import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import type { HeroHeaderProps } from "./types";

const HeroHeader: React.FC<HeroHeaderProps> = ({ overline, titleLines, titleId, mutedColor, titleColor }) => (
  <VStack as="header" align="center" spacing={2}>
    <Text
      as="p"
      fontSize={{ base: "sm", md: "sm" }}
      fontWeight="semibold"
      color={mutedColor}
      letterSpacing="0.18em"
      textTransform="uppercase"
    >
      {overline}
    </Text>
    <Text
      as="h1"
      id={titleId}
      fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
      fontWeight="black"
      color={titleColor}
      lineHeight="1.05"
      letterSpacing="-0.03em"
    >
        <Box as="span" display="block">
        Материалы для собеседований.
        </Box>
    </Text>
  </VStack>
);

export default HeroHeader;
