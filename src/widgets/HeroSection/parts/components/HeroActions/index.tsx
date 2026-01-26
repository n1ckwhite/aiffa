import React from "react";
import { HStack } from "@chakra-ui/react";
import { AppButtonLink } from "shared/ui/AppLink";
import type { HeroActionsProps } from "./types";

const HeroActions: React.FC<HeroActionsProps> = ({ actions }) => (
  <HStack spacing={{ base: 3, md: 4 }} flexWrap="wrap" justify="center" aria-label="Основные действия">
    {actions.map((action) =>
      action.kind === "primary" ? (
        <AppButtonLink
          key={action.id}
          to={action.to}
          colorScheme="blue"
          bg="blue.600"
          _hover={{ bg: "blue.700" }}
          _active={{ bg: "blue.800" }}
          color="white"
          borderRadius="full"
          w={{ base: "100%", sm: "240px" }}
          px={{ base: 6, md: 7 }}
          h={{ base: 12, md: 12 }}
          fontWeight="bold"
          boxShadow="0 10px 26px rgba(15, 23, 42, 0.10)"
          aria-label={action.ariaLabel}
        >
          {action.label}
        </AppButtonLink>
      ) : (
        <AppButtonLink
          key={action.id}
          to={action.to}
          variant="outline"
          borderRadius="full"
          w={{ base: "100%", sm: "240px" }}
          px={{ base: 6, md: 7 }}
          h={{ base: 12, md: 12 }}
          fontWeight="bold"
          aria-label={action.ariaLabel}
        >
          {action.label}
        </AppButtonLink>
      )
    )}
  </HStack>
);

export default HeroActions;
