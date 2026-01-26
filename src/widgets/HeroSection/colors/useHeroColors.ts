import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useHeroColors = () => {
  const theme = useAppColors();
  const mutedColor = useColorModeValue('gray.600', 'whiteAlpha.700');

  return {
    bg: 'transparent',
    textColor: theme.descColor,
    titleColor: theme.titleColor,
    mutedColor,
  };
};



