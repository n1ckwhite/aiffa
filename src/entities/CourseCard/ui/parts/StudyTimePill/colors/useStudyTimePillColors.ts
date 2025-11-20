import { useColorModeValue } from '@chakra-ui/react';

export const useStudyTimePillColors = () => {
  const border = useColorModeValue('orange.200', 'orange.600');
  const iconColor = useColorModeValue('orange.500', 'orange.300');
  const textColor = useColorModeValue('orange.700', 'orange.200');
  const bg = useColorModeValue('orange.50', 'orange.900');
  return { border, iconColor, textColor, bg };
};


