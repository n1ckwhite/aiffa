import { useColorModeValue } from "@chakra-ui/react";

export const useWeeklyAuthorsColors = () => {
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const sectionBgGradient = useColorModeValue(
    "linear(to-br, rgba(224,242,254,0.9), rgba(219,234,254,0.95))",
    "linear(to-br, rgba(15,23,42,0.98), rgba(56,189,248,0.32))",
  );
  const sectionBorder = useColorModeValue("blue.100", "whiteAlpha.200");
  const iconBorderColor = useColorModeValue("cyan.400", "cyan.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("cyan.500", "cyan.300");
  const weekTrackBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const weekFillBg = useColorModeValue("cyan.400", "cyan.300");
  const weekMetaColor = useColorModeValue("gray.700", "gray.200");
  const weekCalendarIconColor = useColorModeValue("cyan.500", "cyan.300");
  const weekClockIconColor = useColorModeValue("blue.400", "blue.300");
  const weekChipBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.100");
  const weekChipBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const weekLabelColor = useColorModeValue("cyan.700", "cyan.200");
  const weekTimeHighlight = useColorModeValue("blue.500", "blue.200");

  return {
    subtitleColor,
    sectionBgGradient,
    sectionBorder,
    iconBorderColor,
    iconBg,
    iconColor,
    weekTrackBg,
    weekFillBg,
    weekMetaColor,
    weekCalendarIconColor,
    weekClockIconColor,
    weekChipBg,
    weekChipBorder,
    weekLabelColor,
    weekTimeHighlight,
  };
};


