import { useColorModeValue } from "@chakra-ui/react";

export const useHeroColors = () => {
  const primaryTextColor = useColorModeValue("gray.800", "gray.100");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.300");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const pillBorderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const pillHoverBg = useColorModeValue("blue.50", "whiteAlpha.100");
  const cardBgGradient = useColorModeValue("linear(to-br, white, gray.50)", "linear(to-br, rgba(15,23,42,1), rgba(30,64,175,0.7))");
  const cardBorderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const leftGlowGradient = useColorModeValue(
    "radial(circle at 50% 50%, rgba(59,130,246,0.35), transparent 70%)",
    "radial(circle at 50% 50%, rgba(147,51,234,0.8), transparent 70%)",
  );
  const rightGlowGradient = useColorModeValue(
    "radial(circle at 50% 50%, rgba(129,140,248,0.35), transparent 70%)",
    "radial(circle at 50% 50%, rgba(236,72,153,0.75), transparent 70%)",
  );

  const bulletPalettes = [
    {
      iconBg: useColorModeValue("blue.50", "whiteAlpha.100"),
      iconColor: useColorModeValue("blue.500", "blue.300"),
      pillBg: useColorModeValue("whiteAlpha.900", "whiteAlpha.100"),
    },
    {
      iconBg: useColorModeValue("purple.50", "whiteAlpha.100"),
      iconColor: useColorModeValue("purple.500", "purple.300"),
      pillBg: useColorModeValue("whiteAlpha.900", "whiteAlpha.100"),
    },
    {
      iconBg: useColorModeValue("teal.50", "whiteAlpha.100"),
      iconColor: useColorModeValue("teal.500", "teal.300"),
      pillBg: useColorModeValue("whiteAlpha.900", "whiteAlpha.100"),
    },
  ];

  return {
    primaryTextColor,
    secondaryTextColor,
    accentColor,
    pillBorderColor,
    pillHoverBg,
    cardBgGradient,
    cardBorderColor,
    leftGlowGradient,
    rightGlowGradient,
    bulletPalettes,
  };
};


