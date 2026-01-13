import React from "react";
import { Icon, SimpleGrid } from "@chakra-ui/react";
import { AppButtonLink } from "shared/ui/AppLink";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import type { QuickActionsGridProps } from "./types";
import { actionStyleById, quickActionsByKind, quickActionsMinChildWidth } from "./model";

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({ kind }) => {
  const colors = useProfileScreenUiColors();
  const items = quickActionsByKind[kind];

  return (
    <SimpleGrid mt={{ base: 4, md: 5 }} minChildWidth={quickActionsMinChildWidth} spacing={{ base: 2.5, md: 3 }}>
      {items.map((item) => {
        const style = actionStyleById[item.id](colors);
        return (
          <AppButtonLink
            key={item.id}
            to={item.to}
            size="sm"
            borderRadius="full"
            fontWeight="semibold"
            bg={style.bg}
            color="white"
            borderWidth="1px"
            borderColor={style.border}
            leftIcon={<Icon as={item.icon} color="white" />}
            sx={{ "& .chakra-button__icon": { color: "white" } }}
            transition="background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease"
            _hover={{ bg: style.hoverBg, transform: "translateY(-1px)", boxShadow: "sm" }}
            _active={{ bg: style.activeBg, transform: "translateY(0px)", boxShadow: "xs" }}
            aria-label={item.ariaLabel}
          >
            {item.label}
          </AppButtonLink>
        );
      })}
    </SimpleGrid>
  );
};


