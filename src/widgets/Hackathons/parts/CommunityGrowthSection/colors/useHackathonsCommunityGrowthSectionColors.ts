import { useColorModeValue } from "@chakra-ui/react";
import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsCommunityGrowthSectionColors = () => {
  const { sectionCardBg, cardBorderColor, mutedTextColor } = useHackathonsColors();

  const communityBgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.95))"
  );

  return {
    sectionCardBg,
    cardBorderColor,
    mutedTextColor,
    communityBgGradient,
  };
};


