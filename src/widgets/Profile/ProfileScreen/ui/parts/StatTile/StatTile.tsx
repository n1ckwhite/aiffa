import React from "react";
import { Box, Icon, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { formatCount } from "shared/functions/formatCount";
import { useProfileScreenUiColors } from "../../../colors/useProfileScreenUiColors";
import type { StatTileProps } from "./types";
import { useStatTileColors } from "./colors/useStatTileColors";

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
  const valueFontSize = emphasis
    ? ({ base: "2xl", md: "3xl" } as const)
    : ({ base: "xl", md: "2xl" } as const);

  const tile = (
    <Box
      borderWidth="1px"
      borderColor={cardBorder}
      borderRadius={{ base: "14px", md: "16px" }}
      bg={cardBg}
      p={{ base: 3, md: 5 }}
      minW={0}
      minH={{ base: "112px", md: "124px" }}
      position="relative"
      overflow="hidden"
      display="grid"
      gridTemplateRows="auto 1fr auto"
      tabIndex={tooltip ? 0 : undefined}
      _focusVisible={tooltip ? { boxShadow: focusRing, outline: "none" } : undefined}
      transition="border-color 160ms ease, transform 160ms ease"
      _hover={{ borderColor: hoverBorder, transform: "translateY(-1px)" }}
      sx={{
        "& .stat-tile-watermark": {
          transition: "transform 180ms ease, opacity 180ms ease, color 180ms ease",
        },
        "&:hover .stat-tile-watermark": {
          transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
          opacity: 0.12,
          color: watermarkColor,
        },
        "&:focus-visible .stat-tile-watermark": {
          transform: "translate(6px, -4px) rotate(-10deg) scale(1.06)",
          opacity: 0.12,
          color: watermarkColor,
        },
      }}
    >
      {!!icon && (
        <Box
          aria-hidden="true"
          position="absolute"
          top={{ base: 2, md: 4 }}
          right={{ base: 2, md: 4 }}
          opacity={0.14}
          color={baseAccent}
          transform="rotate(-6deg)"
          pointerEvents="none"
          className="stat-tile-watermark"
        >
          <Icon as={icon} boxSize={{ base: "38px", md: "56px" }} />
        </Box>
      )}

      <Box pr={{ base: 8, md: 12 }}>
        <Text
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

      <Box display="flex" alignItems="center" pr={{ base: 8, md: 12 }}>
        <Text fontWeight="bold" fontSize={valueFontSize} lineHeight="1.1">
          {formattedValue}
        </Text>
      </Box>

      <Box pr={{ base: 8, md: 12 }} display="flex" alignItems="flex-end">
        {!!hint ? (
          <Text fontSize="sm" color={mutedColor}>
            {hint}
          </Text>
        ) : null}
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


