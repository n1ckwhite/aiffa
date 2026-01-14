import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { formatCount } from "shared/functions/formatCount";
import { useProfileScreenUiColors } from "../../../../../colors/useProfileScreenUiColors";
import type { StatTileProps } from "./types";
import { useStatTileColors } from "../../colors/useStatTileColors";
import { WatermarkIcon } from "..";
import { AppBoxLink } from "shared/ui/AppLink";
import {
  buildFocusVisibleByHasTooltip,
  tabIndexByHasTooltip,
  tileBorderRadius,
  tileContentPr,
  tileMinHeight,
  tilePadding,
  valueFontSizeByEmphasis,
} from "../../model";

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  hint,
  icon,
  tooltip,
  accentColor,
  emphasis,
  to,
}) => {
  const { hoverBorder, focusRing, baseColor } = useStatTileColors();
  const { cardBg, cardBorder, muted: mutedColor } = useProfileScreenUiColors();
  const baseAccent = accentColor ?? baseColor;
  const formattedValue = typeof value === "number" ? formatCount(value) : value;
  const valueFontSize = valueFontSizeByEmphasis[Number(!!emphasis)];
  const hasTooltip = Boolean(tooltip);
  const isClickable = Boolean(to);
  const focusVisibleByHasTooltip = buildFocusVisibleByHasTooltip(focusRing);
  const hintNode = [
    null,
    <Text key="hint" as="dd" m={0} fontSize="sm" color={mutedColor}>
      {hint}
    </Text>,
  ][Number(Boolean(hint))];

  const tile = (
    <Box
      as="dl"
      data-stat-tile
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius={tileBorderRadius}
      bg={cardBg}
      p={tilePadding}
      minW={0}
      minH={tileMinHeight}
      position="relative"
      overflow="hidden"
      display="grid"
      gridTemplateRows="auto 1fr auto"
      tabIndex={isClickable ? -1 : tabIndexByHasTooltip[Number(hasTooltip)]}
      _focusVisible={isClickable ? undefined : focusVisibleByHasTooltip[Number(hasTooltip)]}
      transition="border-color 160ms ease, transform 160ms ease"
      _hover={isClickable ? undefined : { borderColor: hoverBorder, transform: "translateY(-1px)" }}
      _groupHover={isClickable ? { borderColor: hoverBorder, transform: "translateY(-1px)" } : undefined}
      _groupActive={isClickable ? { transform: "translateY(0px)" } : undefined}
      _groupFocusVisible={isClickable ? { boxShadow: focusRing } : undefined}
    >
      <WatermarkIcon icon={icon} color={baseAccent} />

      <Box pr={tileContentPr}>
        <Text
          as="dt"
          fontSize="sm"
          color={mutedColor}
          lineHeight="1.25"
          whiteSpace="normal"
          overflowWrap="anywhere"
          wordBreak="break-word"
        >
          {label}
        </Text>
      </Box>

      <Box display="flex" alignItems="center" pr={tileContentPr}>
        <Text as="dd" fontWeight="bold" fontSize={valueFontSize} lineHeight="1.1" m={0}>
          {formattedValue}
        </Text>
      </Box>

      <Box pr={tileContentPr} display="flex" alignItems="flex-end">
        {hintNode}
      </Box>
    </Box>
  );

  const wrapWithTooltip = (node: React.ReactNode) => {
    if (!tooltip) return node;
    return (
      <Tooltip hasArrow openDelay={240} placement="top" label={tooltip} shouldWrapChildren>
        {node}
      </Tooltip>
    );
  };

  if (!to) return wrapWithTooltip(tile);

  const link = (
    <AppBoxLink
      to={to}
      aria-label={label}
      role="group"
      display="block"
      prefetch={false}
      _focusVisible={{ boxShadow: "none" }}
    >
      {tile}
    </AppBoxLink>
  );

  return wrapWithTooltip(link);
};


