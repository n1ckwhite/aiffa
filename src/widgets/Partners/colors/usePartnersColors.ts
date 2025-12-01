import { useColorModeValue } from "@chakra-ui/react";

export const usePartnersColors = () => {
  const formatShadow = useColorModeValue(
    "0 18px 45px rgba(15, 23, 42, 0.12)",
    "0 18px 45px rgba(15, 23, 42, 0.7)"
  );
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");

  const heroAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.85)");
  const overviewAsideBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.9)");
  const surfaceCardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");

  const partnershipBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const partnershipBgGradient = useColorModeValue(
    "linear(to-r, blue.50, purple.50)",
    "linear(to-r, whiteAlpha.100, whiteAlpha.50)"
  );
  const partnershipIconColor = useColorModeValue("blue.300", "whiteAlpha.500");

  const hackathonBorder = useColorModeValue("green.200", "green.500");
  const weeklyBorder = useColorModeValue("blue.200", "blue.500");
  const materialsBorder = useColorModeValue("purple.200", "purple.500");
  const articlesBorder = useColorModeValue("orange.200", "orange.500");
  const grantsBorder = useColorModeValue("pink.200", "pink.500");

  const stepLineColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const stepNumberBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const stepNumberColor = useColorModeValue("blue.600", "blue.300");
  const stepCardBg = useColorModeValue("whiteAlpha.50", "whiteAlpha.200");
  const stepCardBorder = useColorModeValue("whiteAlpha.200", "whiteAlpha.300");

  const socialProofBadgeBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const socialProofBadgeBorder = useColorModeValue("gray.200", "whiteAlpha.300");

  return {
    formatShadow,
    mutedTextColor,
    heroAsideBg,
    overviewAsideBg,
    surfaceCardBg,
    partnershipBorderColor,
    partnershipBgGradient,
    partnershipIconColor,
    hackathonBorder,
    weeklyBorder,
    materialsBorder,
    articlesBorder,
    grantsBorder,
    stepLineColor,
    stepNumberBg,
    stepNumberColor,
    stepCardBg,
    stepCardBorder,
    socialProofBadgeBg,
    socialProofBadgeBorder,
  };
};


