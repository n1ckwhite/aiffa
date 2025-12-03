import { useColorModeValue } from "@chakra-ui/react";
import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsRulesSectionColors = () => {
  const { mutedTextColor, sectionCardBg, cardBorderColor, accentBorderColor } =
    useHackathonsColors();

  const deadlinesCircleBg = useColorModeValue("blue.500", "blue.400");
  const formatCircleBg = useColorModeValue("teal.500", "teal.400");
  const codeCircleBg = useColorModeValue("purple.500", "purple.400");
  const limitsCircleBg = useColorModeValue("orange.500", "orange.400");

  return {
    mutedTextColor,
    sectionCardBg,
    cardBorderColor,
    accentBorderColor,
    deadlinesCircleBg,
    formatCircleBg,
    codeCircleBg,
    limitsCircleBg,
  };
};


