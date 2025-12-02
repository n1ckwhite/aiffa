import { useColorModeValue } from '@chakra-ui/react';

export const useDesktopActionsColors = () => {
  const fillIcon = useColorModeValue('blue.700', 'whiteAlpha.900');

    return {
        fillIcon: fillIcon,
    }
};



