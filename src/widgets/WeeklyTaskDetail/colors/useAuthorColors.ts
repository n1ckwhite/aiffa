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
    starInactive: useColorModeValue('gray.400', 'gray.500'),
    starActive: 'yellow.400',
  };
};


