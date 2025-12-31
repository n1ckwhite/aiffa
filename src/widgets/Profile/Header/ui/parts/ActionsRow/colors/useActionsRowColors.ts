import { useColorModeValue } from '@chakra-ui/react';

export const useActionsRowColors = () => {
    const editBg = useColorModeValue("blue.700", "blue.600");
    const editHoverBg = useColorModeValue("blue.800", "blue.700");
    const editActiveBg = useColorModeValue("blue.900", "blue.800");

  return {
    editBg,
    editHoverBg,
    editActiveBg,
  };
};


