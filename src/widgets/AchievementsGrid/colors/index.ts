import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useAchievementsGridColors = () => {
  const theme = useAppColors();
  const achievedBg = useColorModeValue('blackAlpha.50','whiteAlpha.100');
  const isLight = useColorModeValue(true, false);
  const labelColor = isLight ? '#0f172a' : 'white';
  const mutedLabelColor = theme.descColor;
  return {
    achievedBg,
    labelColor,
    mutedLabelColor,
    descColor: theme.descColor,
  };
};


