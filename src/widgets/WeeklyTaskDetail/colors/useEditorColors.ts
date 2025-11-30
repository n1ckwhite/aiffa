import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useEditorColors = () => {
  const theme = useAppColors();
  return {
    border: useColorModeValue(theme.borderColor, 'transparent'),
    titleBarBg: useColorModeValue('gray.50','whiteAlpha.100'),
    editorBg: useColorModeValue('gray.50', 'whiteAlpha.100'),
    overlayBg: 'blackAlpha.600' as const,
    startBg: useColorModeValue('blue.600','blue.400'),
    startHoverBg: useColorModeValue('blue.700','blue.500'),
    startActiveBg: useColorModeValue('blue.800','blue.600'),
    strongBorder: useColorModeValue('gray.300', 'whiteAlpha.300'),
    resizeHandleBg: useColorModeValue('gray.200', 'whiteAlpha.300'),
    resizeHandleHoverBg: useColorModeValue('gray.300', 'whiteAlpha.500'),
  };
};


