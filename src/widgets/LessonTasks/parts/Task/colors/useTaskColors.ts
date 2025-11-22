import { useColorModeValue } from '@chakra-ui/react';

export const useTaskColors = () => {
  const terminalBg = useColorModeValue('#0f172a', 'gray.800');
  const terminalPlaceholder = 'whiteAlpha.700';
  const border = useColorModeValue('gray.200', 'blue.100')

  return {
    terminalBg,
    terminalPlaceholder,
    border
  };
};


