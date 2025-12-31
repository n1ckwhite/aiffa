import { useColorModeValue } from "@chakra-ui/react";

export const useProjectsAuthorsColors = () => {
  const subtitleColor = useColorModeValue("gray.700", "gray.300");
  const iconBorderColor = useColorModeValue("teal.400", "teal.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("teal.500", "teal.300");

  return { subtitleColor, iconBorderColor, iconBg, iconColor };
};


