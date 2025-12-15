import { useColorModeValue } from "@chakra-ui/react";

export const useCreatorProfileCardColors = () => {
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const primaryText = useColorModeValue("gray.900", "white");
  const secondaryText = useColorModeValue("gray.600", "gray.300");
  const sectionTitle = useColorModeValue("gray.500", "gray.400");
  const primaryButtonBg = useColorModeValue("blue.600", "blue.400");
  const primaryButtonHover = useColorModeValue("blue.500", "blue.300");

  return { cardBg, cardBorder, primaryText, secondaryText, sectionTitle, primaryButtonBg, primaryButtonHover };
};


