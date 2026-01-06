import { useColorModeValue } from "@chakra-ui/react";

export const useStarRatingColors = () => {
    const active = useColorModeValue("yellow.500", "yellow.300");
    const inactive = useColorModeValue("gray.500", "gray.500");
    return { active, inactive };
  };