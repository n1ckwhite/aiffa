import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useHeroColors = () => {
  const theme = useAppColors();
  const iconBgTone = useColorModeValue('50', '900');
  const iconColorTone = useColorModeValue('600', '200');
  return {
    bg: 'transparent',
    textColor: theme.descColor,
    titleColor: theme.titleColor,
    iconBgTone,
    iconColorTone,
  };
};



