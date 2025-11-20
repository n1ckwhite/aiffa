import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useCodeBlockColors = () => {
  const theme = useAppColors();
  const btnHoverBg = theme.cardHoverBg;
  const btnActiveBg = theme.cardHoverBg;
  const headerBg = useColorModeValue('blue.100', theme.blue.chipBg);
  const headerBorder = useColorModeValue('blue.200', theme.borderColor);
  const headerTextColor = useColorModeValue('blue.900', theme.titleColor);
  const iconBaseColor = theme.blue.accent;
  const inlineBg = theme.controlsBg;
  const inlineColor = theme.titleColor;
  const inlineBorderColor = theme.borderColor;
  const blockBg = useColorModeValue('#f6f8fa', '#0B1220');
  const codeTextColor = useColorModeValue('#0b1220', '#E6EDF3');
  const codeCommentColor = useColorModeValue('#374151', '#A8B3CF');
  const codeTitleColor = useColorModeValue('#1f2937', '#FFFFFF');
  const codeKeywordColor = useColorModeValue('#1d4ed8', '#80A4FF');
  const codeTagColor = useColorModeValue('#0f172a', '#BBD0FF');
  const codeAttrColor = useColorModeValue('#075985', '#F7C66A');
  const codeStringColor = useColorModeValue('#166534', '#7EE787');
  const codeNumberColor = useColorModeValue('#9a3412', '#FFA657');
  const codeBuiltInColor = useColorModeValue('#1d4ed8', '#79C0FF');
  const fallbackIsDark = useColorModeValue(false, true);

  return {
    btnHoverBg,
    btnActiveBg,
    headerBg,
    headerBorder,
    headerTextColor,
    iconBaseColor,
    inlineBg,
    inlineColor,
    inlineBorderColor,
    blockBg,
    codeTextColor,
    codeCommentColor,
    codeTitleColor,
    codeKeywordColor,
    codeTagColor,
    codeAttrColor,
    codeStringColor,
    codeNumberColor,
    codeBuiltInColor,
    fallbackIsDark,
  };
};


