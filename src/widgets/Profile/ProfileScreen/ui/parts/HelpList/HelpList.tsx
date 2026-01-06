import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import { AppLink } from "shared/ui/AppLink";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import type { HelpListProps } from "./types";

export const HelpList: React.FC<HelpListProps> = ({ items }) => {
  const { muted } = useProfileScreenUiColors();

  const rows: React.ReactNode[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const hasLink = Boolean(item.linkLabel);
    if (!hasLink) {
      rows.push(
        <Text key={i} fontSize="sm">
          {item.prefix}
          {item.suffix}
        </Text>,
      );
      continue;
    }

    rows.push(
      <Text key={i} fontSize="sm">
        {item.prefix}
        <AppLink to={item.linkTo} fontWeight="semibold" aria-label={item.linkAriaLabel}>
          {item.linkLabel}
        </AppLink>
        {item.suffix}
      </Text>,
    );
  }

  return (
    <VStack align="start" spacing={2} color={muted} mt={{ base: 3, md: 4 }}>
      {rows}
    </VStack>
  );
};


