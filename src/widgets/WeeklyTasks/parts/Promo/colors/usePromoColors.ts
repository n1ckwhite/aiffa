import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const usePromoColors = () => {
  const theme = useAppColors();
  const addTaskBg = useColorModeValue('blue.700', 'blue.600');
  const addTaskHoverBg = useColorModeValue('blue.800', 'blue.700');
  return {
    promoBorderColor: theme.borderColor,
    promoBgGradient: useColorModeValue('linear(to-r, blue.50, purple.50)', 'linear(to-r, whiteAlpha.100, whiteAlpha.50)'),
    promoBoxShadow: 'md' as const,
    headingColor: theme.blue.accent,
    textColor: theme.descColor,
    statsTextColor: theme.descColor,
    addTaskBg: addTaskBg,
    addTaskHoverBg: addTaskHoverBg
  };
};


