import { useColorModeValue } from "@chakra-ui/react";

export const useHackathonsColors = () => {
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");

  const heroAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.9)");
  const sectionCardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");

  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const accentBorderColor = useColorModeValue("blue.200", "blue.500");

  const stepLineColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const stepNumberBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const stepNumberColor = useColorModeValue("blue.600", "blue.300");
  const stepCardBg = useColorModeValue("whiteAlpha.50", "whiteAlpha.200");

  const prizeBgGradient = useColorModeValue(
    "linear(to-br, purple.50, pink.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(76, 29, 149, 0.9))"
  );

  return {
    mutedTextColor,
    heroAsideBg,
    sectionCardBg,
    cardBorderColor,
    accentBorderColor,
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    prizeBgGradient,
  };
};


