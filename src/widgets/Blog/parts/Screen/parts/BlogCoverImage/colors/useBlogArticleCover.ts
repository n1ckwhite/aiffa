import { useColorModeValue } from "@chakra-ui/react";

export const useBlogArticleCoverColors = () => {
  const skeletonStartColor = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const skeletonEndColor = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const fallbackBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");

  return {
    skeletonStartColor,
    skeletonEndColor,
    fallbackBg,
  };
};


