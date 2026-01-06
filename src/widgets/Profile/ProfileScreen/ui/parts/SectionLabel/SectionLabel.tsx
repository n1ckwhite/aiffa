import React from "react";
import { Text } from "@chakra-ui/react";
import type { SectionLabelProps } from "./types";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, pt = 2 }) => {
  const { sectionLabelColor } = useProfileScreenUiColors();
  return (
    <Text
      fontSize="xs"
      letterSpacing="0.08em"
      textTransform="uppercase"
      fontWeight="bold"
      color={sectionLabelColor}
      pt={pt}
    >
      {children}
    </Text>
  );
};


