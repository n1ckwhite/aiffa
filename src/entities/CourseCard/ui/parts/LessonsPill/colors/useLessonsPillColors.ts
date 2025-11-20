import { useColorModeValue } from '@chakra-ui/react';

export const useLessonsPillColors = () => {
  const gradientStart = useColorModeValue('blue.50', 'blue.900');
  const gradientEnd = useColorModeValue('blue.100', 'blue.800');
  const borderGradient = useColorModeValue('blue.200', 'blue.700');
  const lessonsTextColor = useColorModeValue('blue.800', 'white');
  return { gradientStart, gradientEnd, borderGradient, lessonsTextColor };
};


