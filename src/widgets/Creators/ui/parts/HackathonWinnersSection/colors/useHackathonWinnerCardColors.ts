import { useColorModeValue } from "@chakra-ui/react";

export const useHackathonWinnerCardColors = () => {
  const cardBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const pillBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const pillHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  const goldBorder = useColorModeValue("yellow.400", "yellow.300");
  const goldColor = useColorModeValue("yellow.700", "yellow.200");
  const purplerBorder = useColorModeValue("purple.400", "purple.300");
  const purpleColor = useColorModeValue("purple.600", "purple.200");
  const bronzeBorder = useColorModeValue("orange.400", "orange.300");
  const bronzeColor = useColorModeValue("orange.700", "orange.200");
  const defaultBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const defaultColor = useColorModeValue("gray.600", "gray.300");

  const rankBg = useColorModeValue("whiteAlpha.700", "whiteAlpha.100");
  const metaColor = useColorModeValue("gray.700", "gray.300");
  const titleColor = useColorModeValue("gray.800", "gray.100");
  const bgIconColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const avatarBorder = useColorModeValue("white", "transparent");

  return {
    cardBg,
    pillBorderColor,
    pillHoverBg,
    accentColor,
    goldBorder,
    goldColor,
    purplerBorder,
    purpleColor,
    bronzeBorder,
    bronzeColor,
    defaultBorder,
    defaultColor,
    rankBg,
    metaColor,
    titleColor,
    bgIconColor,
    avatarBorder,
  };
};


