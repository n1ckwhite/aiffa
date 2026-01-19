"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MaterialCardHeaderProps } from "./types";

export const MaterialCardHeader: React.FC<MaterialCardHeaderProps> = ({ title, titleId }) => {
  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={3} minW={0}>
      <Text
        as="h3"
        id={titleId}
        fontWeight="semibold"
        noOfLines={2}
        wordBreak="break-word"
        overflowWrap="anywhere"
        whiteSpace="normal"
        style={{ hyphens: "auto" }}
        flex={1}
        minW={0}
        m={0}
      >
        {title}
      </Text>
    </Box>
  );
};
