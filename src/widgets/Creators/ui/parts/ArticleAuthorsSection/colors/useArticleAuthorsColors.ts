import { useColorModeValue } from "@chakra-ui/react";

export const useArticleAuthorsColors = () => {
  const subtitleColor = useColorModeValue("gray.600", "gray.300");
  const iconBorderColor = useColorModeValue("yellow.400", "yellow.300");
  const iconBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
  const iconColor = useColorModeValue("yellow.500", "yellow.300");

  return { subtitleColor, iconBorderColor, iconBg, iconColor };
};


