import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useProfileScreenUiColors } from "../../../../../../../colors/useProfileScreenUiColors";
import type { PeopleEmptyStateProps } from "../types";

export const PeopleEmptyState: React.FC<PeopleEmptyStateProps> = ({ title, description, children }) => {
  const { muted, textStrong } = useProfileScreenUiColors();

  const footerByChildren: Record<"with" | "without", React.ReactNode> = {
    without: null,
    with: (
      <Box pt={2}>
        {children}
      </Box>
    ),
  };

  let childrenMode: "with" | "without" = "without";
  if (children) childrenMode = "with";

  return (
    <Box
      w="full"
      py={{ base: 6, md: 7 }}
      px={{ base: 2, md: 4 }}
    >
      <VStack align="center" spacing={3} textAlign="center">
        <Text fontWeight="semibold" color={textStrong}>
          {title}
        </Text>
        <Text color={muted} fontSize="sm" whiteSpace="normal" maxW="520px">
          {description}
        </Text>
        {footerByChildren[childrenMode]}
      </VStack>
    </Box>
  );
};


