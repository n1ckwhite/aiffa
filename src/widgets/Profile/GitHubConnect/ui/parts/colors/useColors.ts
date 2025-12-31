import { useColorModeValue } from '@chakra-ui/react';

export const useColors = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const githubColor = useColorModeValue('blue.700', 'blue.300');
  const importBg = useColorModeValue("blue.700", "blue.600");
  const importHoverBg = useColorModeValue("blue.800", "blue.700");
  const importActiveBg = useColorModeValue("blue.900", "blue.800");

  return { borderColor, githubColor, importBg, importHoverBg, importActiveBg };
};


