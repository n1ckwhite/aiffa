import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../../theme/colors';

export const useCodeExampleColors = (minimal?: boolean) => {
  const theme = useAppColors();
  const isDark = useColorModeValue(false, true);
  const headerBgBase = theme.blue.chipBg;
  const headerBorderBase = theme.borderColor;
  const darkCodeBg = useColorModeValue('#262a34', '#0f1720');
  const headerBg = minimal ? 'transparent' : headerBgBase;
  const headerBorder = minimal ? 'transparent' : headerBorderBase;
  const codeBg = minimal ? 'transparent' : darkCodeBg;
  const defaultCodeTextColor = theme.titleColor;
  const langTextColor = theme.blue.accent;
  const copyIconColor = theme.descColor;
  const checkIconColor = 'green.400';
  const copyHoverBg = theme.cardHoverBg;
  const copyActiveBg = theme.cardHoverBg;

  return {
    isDark,
    headerBg,
    headerBorder,
    codeBg,
    defaultCodeTextColor,
    langTextColor,
    copyIconColor,
    checkIconColor,
    copyHoverBg,
    copyActiveBg,
  };
};


