import React from "react";
import { HStack, Icon } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { rangeLabels } from "../../../model/constants";
import type { RangeButtonsProps } from "./types";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import { buildHrefForRange, getRangeButtonStyle, iconByRange, rangeOrder } from "./model";
import { AppButtonLink } from "shared/ui/AppLink";

export const RangeButtons: React.FC<RangeButtonsProps> = ({
  paramKey,
  value,
  defaultValue = "week",
  justify = "flex-start",
}) => {
  const { headerNavIconColor } = useProfileScreenUiColors();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <HStack spacing={2} flexWrap="wrap" justify={justify}>
      {rangeOrder.map((r) => {
        const style = getRangeButtonStyle({ value, current: r, headerNavIconColor });
        const leftIcon = <Icon as={iconByRange[r]} color={style.iconColor} />;
        const href = buildHrefForRange({ pathname, searchParams, paramKey, defaultValue, next: r });

        return (
          <AppButtonLink
            key={r}
            to={href}
            prefetch={false}
            scroll={false}
            replace
            size="sm"
            variant={style.variant}
            colorScheme={style.colorScheme as any}
            color={style.color}
            borderRadius="full"
            leftIcon={leftIcon}
            aria-label={`Период: ${rangeLabels[r]}`}
            _hover={style.hoverBg ? { bg: style.hoverBg } : undefined}
            _active={style.activeBg ? { bg: style.activeBg } : undefined}
          >
            {rangeLabels[r]}
          </AppButtonLink>
        );
      })}
    </HStack>
  );
};


