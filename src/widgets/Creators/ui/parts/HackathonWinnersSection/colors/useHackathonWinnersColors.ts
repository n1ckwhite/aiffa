import { useColorModeValue } from "@chakra-ui/react";

export const useHackathonWinnersColors = () => {
  const subtitleColor = useColorModeValue("gray.700", "gray.300");
  const iconBorderColor = useColorModeValue("blue.400", "blue.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  return { subtitleColor, iconBorderColor, iconBg, iconColor };
};


