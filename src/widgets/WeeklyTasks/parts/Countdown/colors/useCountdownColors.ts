import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useCountdownColors = () => {
  const theme = useAppColors();
  return {
    labelColor: theme.descColor,
    borderColor: theme.borderColor,
    textColor: useColorModeValue('gray.700','gray.200'),
  };
};


