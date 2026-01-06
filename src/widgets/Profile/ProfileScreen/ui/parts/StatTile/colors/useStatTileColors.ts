import { useColorModeValue } from "@chakra-ui/react";

export const useStatTileColors = () => {
    const watermarkColor = useColorModeValue("blackAlpha.150", "whiteAlpha.120");
    const hoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
    const focusRing = useColorModeValue(
      "0 0 0 3px rgba(66,153,225,0.45)",
      "0 0 0 3px rgba(66,153,225,0.45)",
    );
    const baseColor = useColorModeValue("blue.600", "blue.300");
  return {
    watermarkColor,
    hoverBorder,
    focusRing,
    baseColor,
  };
};