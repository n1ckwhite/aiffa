import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../../theme/colors';

export const useCodeExampleColors = (minimal?: boolean) => {
  const theme = useAppColors();
  const isDark = useColorModeValue(false, true);
  const headerBgBase = theme.blue.chipBg;
  const headerBorderBase = theme.borderColor;
  // Light theme should use a light code background to keep hljs colors high-contrast.
  // Dark theme uses a dark background.
  const codeBgBase = useColorModeValue('#f6f8fa', '#0f1720');
  const headerBg = minimal ? 'transparent' : headerBgBase;
  const headerBorder = minimal ? 'transparent' : headerBorderBase;
  const codeBg = minimal ? 'transparent' : codeBgBase;
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


