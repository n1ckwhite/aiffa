import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useLessonFeedbackColors = () => {
  const theme = useAppColors();
  const cardBg = theme.cardBg;
  const cardShadow = useColorModeValue('0 10px 30px rgba(0,0,0,0.08)', '0 10px 30px rgba(0,0,0,0.5)');
  const border = theme.borderColor;
  const textCol = theme.titleColor;

  // Чипы с пальцами: отдельные цвета под светлую / тёмную тему,
  // чтобы наведение было заметным.
  const chipBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
  const chipHover = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');

  const upColor = 'green.500';
  const downColor = 'red.500';
  const thumbIdleColor = theme.descColor;
  const thanksColor = 'green.600';

  return {
    cardBg,
    cardShadow,
    border,
    textCol,
    chipBg,
    chipHover,
    upColor,
    downColor,
    thumbIdleColor,
    thanksColor,
  };
};


