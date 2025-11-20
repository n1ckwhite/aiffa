import { useColorModeValue } from '@chakra-ui/react';

export const useHeaderIconColors = () => {
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  const iconGradientEnd = useColorModeValue('blue.100', 'blue.800');
  const iconHoverShadow = useColorModeValue('blue.200', 'blue.600');
  const iconShadow = useColorModeValue('blue.100', 'blue.700');
  return { iconBg, iconGradientEnd, iconHoverShadow, iconShadow };
};


