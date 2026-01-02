"use client";

import React from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import type { TitleAndDescriptionProps } from "./types";

export const TitleAndDescription: React.FC<TitleAndDescriptionProps> = ({ title, description, theme }) => {
  return (
    <>
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "4xl" }}
        lineHeight={1.12}
        color={theme.titleColor}
        whiteSpace="pre-wrap"
      >
        {title}
      </Heading>

      <VStack align="stretch" spacing={0.5}>
        <Text color={theme.descColor} lineHeight={1.65} noOfLines={2}>
          {description}
        </Text>
      </VStack>
    </>
  );
};


