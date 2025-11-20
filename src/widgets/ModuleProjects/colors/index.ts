import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useModuleProjectsColors = () => {
  const theme = useAppColors();
  return {
    cardBg: theme.cardBg,
    cardHoverBg: useColorModeValue('purple.50', 'whiteAlpha.200'),
    borderColor: theme.borderColor,
    titleColor: theme.titleColor,
    descColor: theme.descColor,
    chipBg: theme.purple.chipBg,
    chipBorder: theme.purple.chipBorder,
    accent: theme.purple.accent,
    indexBg: theme.purple.indexBg,
    iconBg: useColorModeValue('blue.50', 'blue.900'),
    iconGradientEnd: useColorModeValue('blue.100', 'blue.800'),
    headerAccent: useColorModeValue('purple.600', 'purple.300'),
    heroBorder: useColorModeValue('purple.300', 'purple.500'),
    heroBg: useColorModeValue('linear-gradient(180deg, rgba(168,85,247,0.08), rgba(255,255,255,0.8))','linear-gradient(180deg, rgba(139,92,246,0.14), rgba(26,32,44,0.75))'),
    indexTextColor: useColorModeValue('purple.700','white'),
    controlsBg: useColorModeValue('white', 'gray.800'),
    controlsBorder: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    controlsHoverBg: useColorModeValue('blackAlpha.50', 'whiteAlpha.200'),
    controlsIcon: useColorModeValue('gray.700', 'gray.200'),
  };
};


