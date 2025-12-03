import { useColorModeValue } from "@chakra-ui/react";
import { useHackathonsColors } from "@/widgets/Hackathons/colors/useHackathonsColors";

export const useHackathonsFinalCtaSectionColors = () => {
  const { mutedTextColor, accentBorderColor } = useHackathonsColors();

  const finalCtaBgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );

  const partnerBorderColor = useColorModeValue("whiteAlpha.800", "whiteAlpha.700");
  const partnerBg = useColorModeValue("whiteAlpha.900", "rgba(15,23,42,0.9)");
  const partnerHoverBg = useColorModeValue("white", "rgba(15,23,42,0.98)");

  return {
    mutedTextColor,
    accentBorderColor,
    finalCtaBgGradient,
    partnerBorderColor,
    partnerBg,
    partnerHoverBg,
  };
};


