import { useAppColors } from '@/shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useSearchBarColors = () => {
  const { titleColor } = useAppColors();
  const paletteTopBg = useColorModeValue(
    'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.75))',
    'linear-gradient(180deg, rgba(26,32,44,0.95), rgba(26,32,44,0.75))'
  );

  const resultActiveBg = useColorModeValue('rgba(59,130,246,0.12)', 'rgba(59,130,246,0.18)');
  const resultHoverBg = useColorModeValue('rgba(59,130,246,0.08)', 'rgba(59,130,246,0.14)');
  const resultHoverShadow = useColorModeValue(
    '0 8px 18px rgba(59,130,246,0.18)',
    '0 10px 22px rgba(59,130,246,0.22)'
  );
  const resultHoverBorder = useColorModeValue('blue.100', 'whiteAlpha.300');

  return {
    titleColor,
    paletteTopBg,
    resultActiveBg,
    resultHoverBg,
    resultHoverShadow,
    resultHoverBorder,
  };
};


