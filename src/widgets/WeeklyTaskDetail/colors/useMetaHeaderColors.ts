import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useMetaHeaderColors = () => {
  const theme = useAppColors();
  const doneColor =  useColorModeValue('green.700', 'green.300');
  return {
    doneColor: doneColor,
    titleMuted: 'text.muted',
    border: theme.borderColor,
  };
};


