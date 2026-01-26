import { useColorModeValue } from "@chakra-ui/react";

export const useHomeBusinessColors = () => {
  const titleColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const badgeBg = useColorModeValue("blue.100", "blue.900");
  const badgeColor = useColorModeValue("blue.700", "blue.200");
  const linkColor = useColorModeValue("blue.600", "blue.200");
  const iconFallback = useColorModeValue("blue.600", "blue.300");
  const iconColors = ["#3B82F6", "#8B5CF6", "#F59E0B", "#22C55E", "#EF4444", "#06B6D4"];

  return { titleColor, textColor, badgeBg, badgeColor, linkColor, iconColors, iconFallback };
};
