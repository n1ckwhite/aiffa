import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useEditorColors = () => {
  const theme = useAppColors();
  return {
    border: theme.borderColor,
    titleBarBg: useColorModeValue('gray.50','whiteAlpha.100'),
    editorBg: useColorModeValue('#0B1220', 'rgba(2,6,23,0.92)'),
    overlayBg: 'blackAlpha.600' as const,
    startBg: useColorModeValue('blue.600','blue.400'),
    startHoverBg: useColorModeValue('blue.700','blue.500'),
    startActiveBg: useColorModeValue('blue.800','blue.600'),
    strongBorder: useColorModeValue('gray.300', 'whiteAlpha.300'),
  };
};


