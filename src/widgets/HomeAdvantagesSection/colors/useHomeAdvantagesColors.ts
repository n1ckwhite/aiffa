import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '@/shared/theme/colors';

export const useHomeAdvantagesColors = () => {
  const theme = useAppColors();
  const cardBg = useColorModeValue('white', 'whiteAlpha.50');
  const cardBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const iconBg = useColorModeValue('blue.50', 'whiteAlpha.200');
  const iconColor = useColorModeValue('blue.600', 'blue.300');

  return {
    titleColor: theme.titleColor,
    descColor: theme.descColor,
    cardBg,
    cardBorder,
    iconBg,
    iconColor,
  };
};
