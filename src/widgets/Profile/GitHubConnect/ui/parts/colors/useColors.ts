import { useColorModeValue } from '@chakra-ui/react';

export const useColors = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return { borderColor };
};


