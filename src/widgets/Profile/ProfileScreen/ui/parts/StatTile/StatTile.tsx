import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";
import { formatCount } from "shared/functions/formatCount";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import type { StatTileProps } from "./types";
import { useStatTileColors } from "./colors/useStatTileColors";
import { WatermarkIcon } from "./parts";
import {
  buildWatermarkSx,
  buildFocusVisibleByHasTooltip,
  tabIndexByHasTooltip,
  tileBorderRadius,
  tileContentPr,
  tileMinHeight,
  tilePadding,
  valueFontSizeByEmphasis,
} from "./model";

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  hint,
  icon,
  tooltip,
  accentColor,
  emphasis,
}) => {
  const { watermarkColor, hoverBorder, focusRing, baseColor } = useStatTileColors();
  const { cardBg, cardBorder, muted: mutedColor } = useProfileScreenUiColors();
  const baseAccent = accentColor ?? baseColor;
  const formattedValue = typeof value === "number" ? formatCount(value) : value;
  const valueFontSize = valueFontSizeByEmphasis[Number(!!emphasis)];
  const hasTooltip = Boolean(tooltip);
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
      tabIndex={tabIndexByHasTooltip[Number(hasTooltip)]}
      _focusVisible={focusVisibleByHasTooltip[Number(hasTooltip)]}
      transition="border-color 160ms ease, transform 160ms ease"
      _hover={{ borderColor: hoverBorder, transform: "translateY(-1px)" }}
      sx={buildWatermarkSx(watermarkColor)}
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

  if (!tooltip) return tile;

  return (
    <Tooltip hasArrow openDelay={240} placement="top" label={tooltip} shouldWrapChildren>
      {tile}
    </Tooltip>
  );
};


