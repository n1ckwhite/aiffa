import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../../theme/colors';

export const useCodeEditorColors = () => {
  const theme = useAppColors();
  const isDark = useColorModeValue(false, true);
  const placeholderColor = theme.blue.linkMuted;

  return {
    isDark,
    placeholderColor,
  };
};


