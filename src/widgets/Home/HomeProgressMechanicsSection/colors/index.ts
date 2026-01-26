import { useColorModeValue } from "@chakra-ui/react";
import type { ToneKey } from "../types";

export const useHomeProgressMechanicsColors = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const accentLabel = useColorModeValue("gray.700", "whiteAlpha.900");

  const tone: Record<ToneKey, { bg: string; fg: string }> = {
    blue: {
      bg: useColorModeValue("blue.50", "rgba(59,130,246,0.18)"),
      fg: useColorModeValue("blue.700", "blue.200"),
    },
    green: {
      bg: useColorModeValue("green.50", "rgba(16,185,129,0.18)"),
      fg: useColorModeValue("green.700", "green.200"),
    },
    purple: {
      bg: useColorModeValue("purple.50", "rgba(168,85,247,0.18)"),
      fg: useColorModeValue("purple.700", "purple.200"),
    },
    orange: {
      bg: useColorModeValue("orange.50", "rgba(249,115,22,0.18)"),
      fg: useColorModeValue("orange.700", "orange.200"),
    },
  };

  return { titleColor, textColor, accentLabel, tone };
};
