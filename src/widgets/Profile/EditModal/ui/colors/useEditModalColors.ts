import { useAppColors } from '@/shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useEditModalColors = () => {
  const { titleColor } = useAppColors();
  const borderColor = useColorModeValue('gray.400', 'gray.500');

  return { titleColor, borderColor };
};


