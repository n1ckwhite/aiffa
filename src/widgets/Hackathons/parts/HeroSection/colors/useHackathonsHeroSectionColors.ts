import { useColorModeValue } from "@chakra-ui/react";
import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsHeroSectionColors = () => {
  const { heroAsideBg, mutedTextColor, cardBorderColor } = useHackathonsColors();

  const heroBgGradient = useColorModeValue(
    "linear(to-br, blue.50, whiteAlpha.900)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );

  return {
    heroAsideBg,
    mutedTextColor,
    cardBorderColor,
    heroBgGradient,
  };
};


