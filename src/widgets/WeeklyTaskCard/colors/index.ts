import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useWeeklyTaskCardColors = () => {
  const theme = useAppColors();
  const taskCardShadow = useColorModeValue('0 8px 24px rgba(0,0,0,0.06)', '0 10px 28px rgba(0,0,0,0.35)');
  const taskCardShadowHover = useColorModeValue('0 12px 32px rgba(0,0,0,0.10)', '0 14px 34px rgba(0,0,0,0.45)');
  return {
    cardBg: theme.cardBg,
    borderColor: theme.borderColor,
    descColor: theme.descColor,
    authorLink: theme.blue.accent,
    taskInnerCircleBg: theme.cardBg,
    taskInnerBorder: theme.borderColor,
    descriptionTask: theme.descColor,
    taskCardShadow,
    taskCardShadowHover,
    solvedIconColor: useColorModeValue('green.600', 'green.300'),
  };
};


