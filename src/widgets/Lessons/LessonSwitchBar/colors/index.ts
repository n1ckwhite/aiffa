import { useColorModeValue } from '@chakra-ui/react';

export const useLessonSwitchBarColors = () => {
  const accent = useColorModeValue('blue.500', 'blue.400');
  const countColor = useColorModeValue('blue.700', 'blue.200');
  const itemHover = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
  const trackBg = useColorModeValue('blackAlpha.100','whiteAlpha.200');
  const pillBg = useColorModeValue('blue.50','whiteAlpha.200');
  return { accent, countColor, itemHover, trackBg, pillBg };
};


