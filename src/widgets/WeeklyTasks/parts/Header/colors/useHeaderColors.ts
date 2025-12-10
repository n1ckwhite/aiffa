import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useHeaderColors = () => {
  const theme = useAppColors();
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  return {
    iconColor: theme.blue.accent,
    mutedTextColor: mutedTextColor
  };
};


