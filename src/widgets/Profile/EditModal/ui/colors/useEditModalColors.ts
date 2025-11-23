import { useColorModeValue } from '@chakra-ui/react';

export const useEditModalColors = () => {
  const borderColor = useColorModeValue('gray.400', 'gray.500');

  return { borderColor };
};


