import { useColorModeValue } from "@chakra-ui/react";

export const useTimeRangeColors = () => {
  const descColor = useColorModeValue("gray.600", "gray.200");
  return { descColor };
};


