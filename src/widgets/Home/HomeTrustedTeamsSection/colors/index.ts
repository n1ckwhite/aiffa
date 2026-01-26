import { useColorMode, useColorModeValue } from "@chakra-ui/react";

export const useHomeTrustedTeamsColors = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const borderHoverColor = useColorModeValue("gray.300", "whiteAlpha.300");
  const baseShadow = useColorModeValue("0 1px 0 rgba(16, 24, 40, 0.04)", "0 1px 0 rgba(0, 0, 0, 0.20)");
  const hoverShadow = useColorModeValue("0 16px 40px rgba(16, 24, 40, 0.12)", "0 20px 60px rgba(0, 0, 0, 0.45)");
  const storyLinkColor = isDark ? "blue.200" : "blue.700";
  const ctaBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.50");
  const labelColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const actionColor = isDark ? "blue.200" : "blue.700";
  const quoteMarkColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  return {
    isDark,
    titleColor,
    textColor,
    cardBg,
    borderColor,
    borderHoverColor,
    baseShadow,
    hoverShadow,
    storyLinkColor,
    ctaBg,
    labelColor,
    actionColor,
    quoteMarkColor,
  };
};
