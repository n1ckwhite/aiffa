import { useColorModeValue } from "@chakra-ui/react";

export const useSessionsColors = () => {
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const sectionLabelColor = useColorModeValue("blue.600", "blue.300");

  const cardBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.98)");
  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  const iconCircleBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const iconColor = useColorModeValue("blue.600", "whiteAlpha.900");
  const highlightCardBorder = useColorModeValue("blue.100", "blue.500");

  const metaTextColor = useColorModeValue("gray.700", "gray.300");

  const eventBlockBg = useColorModeValue("white", "rgba(15, 23, 42, 0.96)");
  const eventBlockBorderColor = useColorModeValue("teal.100", "teal.500");

  const firstSessionBgGradient = useColorModeValue(
    "linear(to-br, teal.50, blue.50)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(15, 118, 110, 0.9))"
  );
  const firstSessionBorderColor = useColorModeValue("teal.100", "teal.600");

  const primaryCtaGradient = useColorModeValue(
    "linear(to-r, blue.600, blue.700)",
    "linear(to-r, blue.400, blue.500)"
  );
  const primaryCtaHoverGradient = useColorModeValue(
    "linear(to-r, blue.700, blue.800)",
    "linear(to-r, blue.500, blue.600)"
  );

  const secondaryCtaBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.200");
  const secondaryCtaHoverBg = useColorModeValue("gray.100", "whiteAlpha.300");
  const secondaryCtaColor = useColorModeValue("blue.700", "blue.50");

  const metaBadgeBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const metaBadgeBorderColor = useColorModeValue("blue.100", "whiteAlpha.300");
  const metaBadgeTextColor = useColorModeValue("gray.900", "gray.50");

  const ctaBgGradient = useColorModeValue(
    "linear(to-br, whiteAlpha.900, blue.50)",
    "linear-gradient(to bottom right, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.9))"
  );
  const ctaBorderColor = useColorModeValue("blue.200", "blue.600");

  const partnerCtaBg = useColorModeValue("whiteAlpha.900", "rgba(15, 23, 42, 0.95)");
  const partnerCtaColor = useColorModeValue("blue.700", "whiteAlpha.900");
  const partnerCtaBorder = useColorModeValue("blue.200", "whiteAlpha.700");
  const partnerCtaHoverBg = useColorModeValue("white", "rgba(15, 23, 42, 0.98)");

  const forWhomBgGradient = useColorModeValue(
    "linear(to-br, blue.50, blue.100)",
    "linear(to-br, rgba(15, 23, 42, 1), rgba(30, 64, 175, 0.95))"
  );
  const forWhomBorderColor = useColorModeValue("blue.100", "whiteAlpha.200");
  const forWhomTitleColor = useColorModeValue("blue.900", "whiteAlpha.900");
  const forWhomDescriptionColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const forWhomItemColor = useColorModeValue("whiteAlpha.900", "whiteAlpha.900");
  const forWhomCardBg = useColorModeValue("white", "rgba(15, 23, 42, 0.88)");
  const forWhomCardBorderColor = useColorModeValue("blue.100", "whiteAlpha.400");
  const forWhomCardTitleColor = useColorModeValue("gray.900", "white");
  const forWhomCardTextColor = useColorModeValue("gray.700", "whiteAlpha.900");

  const scheduleMarkerColor = useColorModeValue("blue.500", "teal.300");
  const scheduleChipBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const scheduleChipColor = useColorModeValue("blue.700", "blue.100");

  return {
    mutedTextColor,
    sectionLabelColor,
    cardBg,
    cardBorderColor,
    iconCircleBg,
    iconColor,
    highlightCardBorder,
    metaTextColor,
    eventBlockBg,
    eventBlockBorderColor,
    firstSessionBgGradient,
    firstSessionBorderColor,
    primaryCtaGradient,
    primaryCtaHoverGradient,
    secondaryCtaBg,
    secondaryCtaHoverBg,
    secondaryCtaColor,
    metaBadgeBg,
    metaBadgeBorderColor,
    metaBadgeTextColor,
    ctaBgGradient,
    ctaBorderColor,
    partnerCtaBg,
    partnerCtaColor,
    partnerCtaBorder,
    partnerCtaHoverBg,
    forWhomBgGradient,
    forWhomBorderColor,
    forWhomTitleColor,
    forWhomDescriptionColor,
    forWhomItemColor,
    forWhomCardBg,
    forWhomCardBorderColor,
    forWhomCardTitleColor,
    forWhomCardTextColor,
    scheduleMarkerColor,
    scheduleChipBg,
    scheduleChipColor,
  };
};


