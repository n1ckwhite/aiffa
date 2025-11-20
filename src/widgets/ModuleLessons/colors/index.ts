import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useModuleLessonsColors = (): any => {
  const theme = useAppColors();
  const controlsBg = useColorModeValue('white', 'gray.800');
  const controlsBorder = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const controlsHoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200');
  const controlsIcon = useColorModeValue('gray.700', 'gray.200');
  const headerCardBg = useColorModeValue('white', 'gray.800');
  const headerAccent = useColorModeValue('blue.500', 'blue.300');
  const headerGlow = useColorModeValue('#60a5fa33', '#60a5fa33');
  const titleColor = useColorModeValue('gray.900', 'white');
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  const iconGradientEnd = useColorModeValue('blue.100', 'blue.800');
  const beginnerBorder = useColorModeValue('#34d399', '#34d399');
  const intermediateBorder = useColorModeValue('#f59e0b', '#f59e0b');
  const advancedBorder = useColorModeValue('#f43f5e', '#f43f5e');
  const headerBoxShadow = useColorModeValue('blue.100', 'blue.700');

  return {
    ...theme,
    controlsBg,
    controlsBorder,
    controlsHoverBg,
    controlsIcon,
    headerCardBg,
    headerAccent,
    headerGlow,
    titleColor,
    iconBg,
    iconGradientEnd,
    beginnerBorder,
    intermediateBorder,
    advancedBorder,
    headerBoxShadow,
  };
};


