import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useProfileScreenColors = () => {
  const theme = useAppColors();
  return {
    resetHoverBg: theme.cardHoverBg,
    resetActiveBg: theme.cardHoverBg,
    resetColor: theme.titleColor,
    ringTrack: theme.borderColor,
    ringColor: 'green.400' as const,
    dividerColor: theme.borderColor,
    hintColor: theme.descColor,
    skeletonBg: theme.controlsBg,
    skeletonRingBorder: theme.borderColor,
    skeletonRingTop: useColorModeValue('blackAlpha.300','whiteAlpha.400'),
  };
};


