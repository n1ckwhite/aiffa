import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useInteractiveColors = () => {
  const theme = useAppColors();
  const spotlightAlpha = useColorModeValue(0.10, 0.18);
  return {
    cardBg: theme.cardBg,
    textColor: theme.descColor,
    titleColor: theme.titleColor,
    spotlightAlpha,
  };
};



