import { useColorModeValue } from "@chakra-ui/react";

export const useAuthorsBadgeColors = (accentColor: string) => {
  const extraBg = useColorModeValue("gray.50", "gray.700");
  const extraColor = useColorModeValue(accentColor, accentColor);

  return {
    extraBg,
    extraColor,
  };
};


