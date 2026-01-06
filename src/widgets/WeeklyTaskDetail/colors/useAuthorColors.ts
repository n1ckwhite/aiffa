import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useAuthorColors = () => {
  const theme = useAppColors();
  return {
    text: theme.descColor,
    link: theme.blue.accent,
    noteBg: useColorModeValue('transparent','whiteAlpha.100'),
    noteBorder: theme.borderColor,
    noteColor: useColorModeValue('gray.800','gray.100'),
    starInactive: useColorModeValue('gray.500', 'gray.500'),
    starActive: useColorModeValue('yellow.500', 'yellow.300'),
  };
};


