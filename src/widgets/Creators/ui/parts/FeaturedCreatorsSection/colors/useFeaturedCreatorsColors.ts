import { useColorModeValue } from "@chakra-ui/react";

export const useFeaturedCreatorsColors = () => {
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const sectionBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const sectionBg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(15,23,42,0.94)");
  const sectionBgGradient = useColorModeValue(
    "linear(to-br, rgba(254,243,199,0.65), rgba(255,255,255,0.98))",
    "linear(to-br, rgba(15,23,42,0.98), rgba(251,146,60,0.20))",
  );
  const iconBorderColor = useColorModeValue("orange.400", "orange.300");
  const iconBg = useColorModeValue("orange.50", "whiteAlpha.100");
  const iconColor = useColorModeValue("orange.400", "orange.300");
  const monthTrackBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const monthFillBg = useColorModeValue("orange.400", "orange.300");
  const monthMetaColor = useColorModeValue("gray.700", "gray.200");
  const monthCalendarIconColor = useColorModeValue("orange.500", "orange.300");
  const monthClockIconColor = useColorModeValue("blue.400", "blue.300");
  const monthPulseDotColor = useColorModeValue("orange.400", "orange.300");
  const monthChipBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");
  const monthChipBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const monthMonthHighlight = useColorModeValue("orange.700", "orange.200");
  const monthTimeHighlight = useColorModeValue("blue.400", "blue.200");
  const thanksIconColor = useColorModeValue("pink.500", "pink.300");
  const thanksTextColor = useColorModeValue("gray.800", "gray.100");

  return {
    subtitleColor,
    sectionBorder,
    sectionBg,
    sectionBgGradient,
    iconBorderColor,
    iconBg,
    iconColor,
    monthTrackBg,
    monthFillBg,
    monthMetaColor,
    monthCalendarIconColor,
    monthClockIconColor,
    monthPulseDotColor,
    monthChipBg,
    monthChipBorder,
    monthMonthHighlight,
    monthTimeHighlight,
    thanksIconColor,
    thanksTextColor,
  };
};


