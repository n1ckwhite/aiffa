import { useColorModeValue } from "@chakra-ui/react";

export const useAuthorCardColors = (isStarred: boolean) => {
  const badgeBg = useColorModeValue(
    isStarred ? "rgba(59,130,246,0.08)" : "transparent",
    isStarred ? "rgba(129,140,248,0.32)" : "whiteAlpha.100"
  );

  const badgeBorder = useColorModeValue(isStarred ? "blue.300" : "blue.200", isStarred ? "blue.300" : "whiteAlpha.300");

  const badgeTextColor = useColorModeValue(isStarred ? "blue.700" : "blue.600", isStarred ? "blue.100" : "blue.200");

  const hoverBg = useColorModeValue("rgba(59,130,246,0.12)", "rgba(129,140,248,0.42)");
  const activeBg = useColorModeValue("rgba(59,130,246,0.16)", "rgba(129,140,248,0.5)");

  const tooltipBg = useColorModeValue("gray.800", "blue.400");
  const tooltipTextColor = useColorModeValue("white", "white");

  const bgBlock = useColorModeValue("transparent", "whiteAlpha.100");

  return {
    badgeBg,
    badgeBorder,
    badgeTextColor,
    hoverBg,
    activeBg,
    tooltipBg,
    tooltipTextColor,
    bgBlock,
  };
};


