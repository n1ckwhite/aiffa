import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useXpColors = () => {
  const theme = useAppColors();
  return {
    xpTrack: useColorModeValue('rgba(59,130,246,0.14)', 'rgba(96,165,250,0.18)'),
    xpFillColor: theme.blue.accent,
    titleColor: useColorModeValue('gray.800','gray.100'),
  };
};


