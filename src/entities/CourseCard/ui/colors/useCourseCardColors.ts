import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useCourseCardColors = () => {
  const theme = useAppColors();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)');
  const hoverShadowColor = useColorModeValue('rgba(59, 130, 246, 0.15)', 'rgba(59, 130, 246, 0.25)');
  const focusRing = useColorModeValue('0 0 0 3px rgba(66, 153, 225, 0.45)', '0 0 0 3px rgba(66, 153, 225, 0.45)');
  const topGradientEnd = useColorModeValue('blue.300', 'blue.500');
  const arrowHoverColor = useColorModeValue('blue.600', 'blue.300');
  const badgeShadow = useColorModeValue('gray.200', 'gray.600');

  return {
    borderColor,
    shadowColor,
    hoverShadowColor,
    focusRing,
    topGradientEnd,
    arrowHoverColor,
    cardBg: theme.cardBg,
    cardHoverBg: theme.cardHoverBg,
    titleColor: theme.titleColor,
    descColor: theme.descColor,
    accentColor: theme.blue.accent,
    badgeShadow
  };
};


