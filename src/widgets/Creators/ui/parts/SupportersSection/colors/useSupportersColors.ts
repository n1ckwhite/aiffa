import { useColorModeValue } from "@chakra-ui/react";

export const useSupportersColors = () => {
  const subtitleColor = useColorModeValue("gray.700", "gray.300");
  const iconBorderColor = useColorModeValue("pink.400", "pink.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("pink.500", "pink.300");
  const avatarBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const avatarBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const avatarFallbackBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const avatarHoverBorder = useColorModeValue("blue.400", "blue.300");
  const avatarHoverShadow = useColorModeValue("md", "md");

  return {
    subtitleColor,
    iconBorderColor,
    iconBg,
    iconColor,
    avatarBorderColor,
    avatarBg,
    avatarFallbackBg,
    avatarHoverBorder,
    avatarHoverShadow,
  };
};


