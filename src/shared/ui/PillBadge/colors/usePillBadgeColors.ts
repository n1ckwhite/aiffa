import { useColorModeValue } from "@chakra-ui/react";
import type { PillBadgeColor, PillBadgePalette, PillBadgeVariant } from "../types";

const resolveScheme = (scheme?: PillBadgeColor): PillBadgeColor => {
  if (!scheme) return "blue";
  return scheme;
};

const buildLightPalette = (scheme: PillBadgeColor, variant: PillBadgeVariant): PillBadgePalette => {
  if (variant === "solid") {
    return {
      bg: `${scheme}.500`,
      border: `${scheme}.500`,
      color: "white",
    };
  }

  if (scheme === "gray") {
    return {
      bg: "gray.50",
      border: "gray.200",
      color: "gray.700",
    };
  }

  return {
    bg: `${scheme}.50`,
    border: `${scheme}.200`,
    color: `${scheme}.700`,
  };
};

const buildDarkPalette = (scheme: PillBadgeColor, variant: PillBadgeVariant): PillBadgePalette => {
  if (variant === "solid") {
    return {
      bg: `${scheme}.500`,
      border: `${scheme}.500`,
      color: "white",
    };
  }

  if (scheme === "gray") {
    return {
      bg: "whiteAlpha.100",
      border: "whiteAlpha.400",
      color: "whiteAlpha.900",
    };
  }

  return {
    bg: "whiteAlpha.100",
    border: `${scheme}.400`,
    color: `${scheme}.100`,
  };
};

export const usePillBadgeColors = (
  colorScheme?: PillBadgeColor,
  variant: PillBadgeVariant = "outline"
): PillBadgePalette => {
  const scheme = resolveScheme(colorScheme);

  const palette = useColorModeValue(
    buildLightPalette(scheme, variant),
    buildDarkPalette(scheme, variant)
  );

  return palette;
};


