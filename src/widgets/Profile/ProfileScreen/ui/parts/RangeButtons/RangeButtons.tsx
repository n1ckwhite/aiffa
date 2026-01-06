import React from "react";
import { Button, HStack, Icon } from "@chakra-ui/react";
import { rangeLabels } from "../../../model/constants";
import type { RangeButtonsProps } from "./types";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import { iconByRange, rangeOrder, variantByState } from "./model";

export const RangeButtons: React.FC<RangeButtonsProps> = ({
  value,
  onChange,
  justify = "flex-start",
}) => {
  const { headerNavIconColor } = useProfileScreenUiColors();
  const stateByIsActive = ["inactive", "active"] as const;

  return (
    <HStack spacing={2} flexWrap="wrap" justify={justify}>
      {rangeOrder.map((r) => {
        const isActive = value === r;
        const state = stateByIsActive[Number(isActive)];
        const variant = variantByState[state];
        const leftIcon = <Icon as={iconByRange[r]} color={headerNavIconColor} />;

        return (
          <Button
            key={r}
            size="sm"
            variant={variant}
            borderRadius="full"
            leftIcon={leftIcon}
            onClick={() => onChange(r)}
            aria-label={`Период: ${rangeLabels[r]}`}
          >
            {rangeLabels[r]}
          </Button>
        );
      })}
    </HStack>
  );
};


