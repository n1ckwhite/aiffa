import { useColorModeValue } from "@chakra-ui/react";
import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsOverviewSectionColors = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor, accentBorderColor } =
    useHackathonsColors();

  const iconCircleBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.200");

  return {
    sectionCardBg,
    cardBorderColor,
    mutedTextColor,
    accentBorderColor,
    iconCircleBg,
  };
};


