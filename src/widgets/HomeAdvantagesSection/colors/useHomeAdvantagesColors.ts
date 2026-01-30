import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '@/shared/theme/colors';
import type { IconColorKey } from '../data/advantages';

export const useHomeAdvantagesColors = () => {
  const theme = useAppColors();
  const cardBg = useColorModeValue('white', 'whiteAlpha.100');
  const cardBorder = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const cardShadow = useColorModeValue('sm', '0 2px 8px rgba(0,0,0,0.15)');
  const cardHoverShadow = useColorModeValue('md', '0 4px 16px rgba(0,0,0,0.2)');

  const blueBg = useColorModeValue('blue.50', 'whiteAlpha.200');
  const blueColor = useColorModeValue('blue.600', 'blue.300');
  const purpleBg = useColorModeValue('purple.50', 'whiteAlpha.200');
  const purpleColor = useColorModeValue('purple.600', 'purple.300');
  const greenBg = useColorModeValue('green.50', 'whiteAlpha.200');
  const greenColor = useColorModeValue('green.600', 'green.300');
  const tealBg = useColorModeValue('teal.50', 'whiteAlpha.200');
  const tealColor = useColorModeValue('teal.600', 'teal.300');

  const iconColorsByKey: Record<IconColorKey, { bg: string; color: string }> = {
    blue: { bg: blueBg, color: blueColor },
    purple: { bg: purpleBg, color: purpleColor },
    green: { bg: greenBg, color: greenColor },
    teal: { bg: tealBg, color: tealColor },
  };

  return {
    titleColor: theme.titleColor,
    descColor: theme.descColor,
    cardBg,
    cardBorder,
    cardShadow,
    cardHoverShadow,
    iconColorsByKey,
  };
};
