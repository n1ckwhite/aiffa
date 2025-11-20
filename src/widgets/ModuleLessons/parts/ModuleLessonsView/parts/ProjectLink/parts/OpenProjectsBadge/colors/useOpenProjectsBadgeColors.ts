import { useColorModeValue } from "@chakra-ui/react";

export const useOpenProjectsBadgeColors = () => {
  const pillBg = useColorModeValue('blue.50', 'whiteAlpha.100');
    return {
        pillBg,
    }
}