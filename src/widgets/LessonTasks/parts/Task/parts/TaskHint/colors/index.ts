import { useColorModeValue } from '@chakra-ui/react';

export const useTaskHintColors = () => {
  const borderCol = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const textCol = useColorModeValue('gray.700', 'gray.300');
  const chipBg = useColorModeValue('blue.50', 'whiteAlpha.100');
  const chipBorder = useColorModeValue('blue.100', 'whiteAlpha.300');
  const chipText = useColorModeValue('blue.700', 'blue.200');
  const chipHoverBg = useColorModeValue('blue.100', 'whiteAlpha.200');
  const panelBg = useColorModeValue('white','gray.800');
  const panelShadow = useColorModeValue('0 1px 2px rgba(16,24,40,0.06)','inset 0 1px 0 rgba(255,255,255,0.06)');
  const infoColor = useColorModeValue('blue.600','blue.200');
  return { borderCol, textCol, chipBg, chipBorder, chipText, chipHoverBg, panelBg, panelShadow, infoColor };
};


