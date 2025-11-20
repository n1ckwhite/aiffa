import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../theme/colors';

export const useSegmentColors = () => {
  const theme = useAppColors();
  const indicatorBg = useColorModeValue('blue.600', 'blue.600');
  return {
    containerBg: theme.cardBg,
    borderColor: theme.borderColor,
    indicatorBg,
    itemInactiveColor: theme.descColor,
  };
};

export type SegmentColors = ReturnType<typeof useSegmentColors>;


