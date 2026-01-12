import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useAchievementsGridColors = () => {
  const theme = useAppColors();
  const achievedBg = useColorModeValue('blackAlpha.50','whiteAlpha.100');
  const isLight = useColorModeValue(true, false);
  const labelColor = isLight ? '#0f172a' : 'white';
  const mutedLabelColor = theme.descColor;
  const focusOutlineColor = useColorModeValue("blue.500", "blue.300");
  const cardBg = useColorModeValue("white", "whiteAlpha.50");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const activeBg = useColorModeValue("blackAlpha.100", "whiteAlpha.150");
  const ringInnerBg = useColorModeValue("white", achievedBg);
  return {
    achievedBg,
    labelColor,
    mutedLabelColor,
    descColor: theme.descColor,
    focusOutlineColor,
    cardBg,
    cardBorder,
    hoverBg,
    activeBg,
    ringInnerBg
  };
};


