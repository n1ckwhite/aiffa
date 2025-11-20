import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useLessonTasksColors = () => {
  const theme = useAppColors();
  const cardBg = 'transparent';
  const borderColor = theme.borderColor;
  const accent = theme.blue.accent;
  const descColor = useColorModeValue('gray.700', 'gray.300');
  const indexChipBg = theme.blue.indexBg;
  const headerGlow = '#60a5fa33';
  const linkColor = theme.blue.accent;
  const authorBorder = theme.borderColor;
  const faqBorder = useColorModeValue('blue.200','whiteAlpha.300');
  const faqTitleColor = useColorModeValue('blue.700','blue.200');
  const chipBgRed = useColorModeValue('red.100','red.700');
  const chipBgGreen = useColorModeValue('green.100','green.700');
  const chipBgYellow = useColorModeValue('yellow.100','yellow.600');
  const chipTextRed = useColorModeValue('red.700','white');
  const chipTextGreen = useColorModeValue('green.700','white');
  const chipTextYellow = useColorModeValue('yellow.800','black');
  const taskCardBg = theme.cardBg;
  const taskCardHoverBg = useColorModeValue('blue.50','whiteAlpha.100');
  const taskCardBorder = theme.borderColor;
  const editIconBg = useColorModeValue('blue.50','whiteAlpha.200');
  const backBtnHoverBg = useColorModeValue('blue.50','whiteAlpha.200');
  const backBtnActiveBg = useColorModeValue('blue.100','whiteAlpha.300');

  return {
    cardBg, borderColor, accent, descColor, indexChipBg, headerGlow, linkColor, authorBorder,
    faqBorder, faqTitleColor, chipBgRed, chipBgGreen, chipBgYellow, chipTextRed, chipTextGreen,
    chipTextYellow, taskCardBg, taskCardHoverBg, taskCardBorder, editIconBg, backBtnHoverBg, backBtnActiveBg,
  };
};


