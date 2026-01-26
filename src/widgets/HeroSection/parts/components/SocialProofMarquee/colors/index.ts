import { useColorModeValue } from "@chakra-ui/react";

export type SocialProofMarqueeColors = {
  text: string;
  strong: string;
  dot: string;
};

export const useSocialProofMarqueeColors = () => {
  const text = useColorModeValue("gray.600", "whiteAlpha.700");
  const strong =  useColorModeValue("gray.900", "whiteAlpha.900");
  const dot = useColorModeValue("blackAlpha.400", "whiteAlpha.500");

  return {
    text,
    strong,
    dot,
  };
};
