import { useColorModeValue } from '@chakra-ui/react';

export const useTaskMetaColors = () => {
  const textColor = useColorModeValue('gray.600','gray.400');
  return { textColor };
};


