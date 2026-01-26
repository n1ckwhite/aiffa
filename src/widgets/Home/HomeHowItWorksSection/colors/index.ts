import { useColorModeValue } from "@chakra-ui/react";
import type { StepAccentKey } from "../types/steps";

export const useHowItWorksColors = () => {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const borderHoverColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const cardShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const cardHoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");
  const overlineColor = useColorModeValue("gray.700", "whiteAlpha.900");

  const accents: Record<StepAccentKey, { bg: string; color: string }> = {
    blue: {
      bg: useColorModeValue("blue.50", "whiteAlpha.200"),
      color: useColorModeValue("blue.700", "blue.200"),
    },
    green: {
      bg: useColorModeValue("green.50", "whiteAlpha.200"),
      color: useColorModeValue("green.700", "green.200"),
    },
    purple: {
      bg: useColorModeValue("purple.50", "whiteAlpha.200"),
      color: useColorModeValue("purple.700", "purple.200"),
    },
    orange: {
      bg: useColorModeValue("orange.50", "whiteAlpha.200"),
      color: useColorModeValue("orange.700", "orange.200"),
    },
    teal: {
      bg: useColorModeValue("teal.50", "whiteAlpha.200"),
      color: useColorModeValue("teal.700", "teal.200"),
    },
  };

  return {
    borderColor,
    borderHoverColor,
    titleColor,
    textColor,
    cardBg,
    cardShadow,
    cardHoverShadow,
    overlineColor,
    accents,
  };
};
