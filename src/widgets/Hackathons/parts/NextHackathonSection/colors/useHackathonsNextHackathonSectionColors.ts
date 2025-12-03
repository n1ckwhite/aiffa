import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";
import { useColorModeValue } from "@chakra-ui/react";

export const useNextHackathonSectionColors = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();

  const cardBgGradient = useColorModeValue(
    "linear(to-br, blue.50, whiteAlpha.900)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );

  return {
    sectionCardBg,
    cardBorderColor,
    mutedTextColor,
    cardBgGradient,
  };
};


