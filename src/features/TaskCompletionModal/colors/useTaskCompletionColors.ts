import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useTaskCompletionColors = () => {
  const theme = useAppColors();
  const overlayBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.900');
  const cardBg = theme.cardBg;
  const descColor = theme.descColor;
  const checkIcon = 'green.400';
  return { overlayBg, cardBg, descColor, checkIcon };
};

export type TaskCompletionColors = ReturnType<typeof useTaskCompletionColors>;


