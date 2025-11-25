import { useColorModeValue } from '@chakra-ui/react';

export const useTaskDetailColors = () => {
  const errorBg = useColorModeValue('yellow.50', 'rgba(250, 204, 21, 0.08)');
  const errorBorder = useColorModeValue('yellow.300', 'yellow.500');
  const errorTitleColor = useColorModeValue('yellow.800', 'whiteAlpha.900');
  const errorTextColor = useColorModeValue('yellow.800', 'yellow.100');
  const errorIconColor = useColorModeValue('yellow.500', 'yellow.400');

  return {
    errorBg,
    errorBorder,
    errorTitleColor,
    errorTextColor,
    errorIconColor,
  };
};



