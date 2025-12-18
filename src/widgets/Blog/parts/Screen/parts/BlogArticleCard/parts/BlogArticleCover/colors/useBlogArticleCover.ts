import { useColorModeValue } from "@chakra-ui/react";

export const useBlogArticleCoverColors = () => {
    const placeholderBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
    const placeholderBorder = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
    const placeholderText = useColorModeValue("gray.600", "whiteAlpha.700");
    const placeholderIconColor = useColorModeValue("gray.600", "whiteAlpha.700");

    return {
    placeholderBg,
    placeholderBorder,
    placeholderText,
  };
};