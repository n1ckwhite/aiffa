import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useStartCTAColors = () => {
  const theme = useAppColors();
  const bg = 'transparent';
  const cardBg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100');
  const textColor = theme.descColor;
  const titleColor = theme.titleColor;

  const startBtnBg = theme.blue.chipBg;
  const startBtnHoverBg = useColorModeValue('blue.100', 'whiteAlpha.200');
  const startBtnBorder = theme.blue.chipBorder;
  const startBtnText = useColorModeValue('blue.700', 'blue.200');

  const communityBtnBg = theme.purple.chipBg;
  const communityBtnHoverBg = useColorModeValue('purple.100', 'whiteAlpha.200');
  const communityBtnBorder = theme.purple.chipBorder;
  const communityBtnText = useColorModeValue('purple.700', 'purple.200');

  const donateBtnBg = useColorModeValue('red.50', 'whiteAlpha.100');
  const donateBtnHoverBg = useColorModeValue('red.100', 'whiteAlpha.200');
  const donateBtnBorder = useColorModeValue('red.200', 'whiteAlpha.300');
  const donateBtnText = useColorModeValue('red.700', 'red.300');
  const heartIconColor = useColorModeValue('red.500', 'red.300');

  const card1Gradient = useColorModeValue(
    'linear(to-br, rgba(59,130,246,0.08), rgba(99,102,241,0.08))',
    'linear(to-br, rgba(59,130,246,0.08), rgba(99,102,241,0.08))'
  );
  const card2Gradient = useColorModeValue(
    'linear(to-br, rgba(168,85,247,0.08), rgba(59,130,246,0.05))',
    'linear(to-br, rgba(168,85,247,0.08), rgba(59,130,246,0.05))'
  );
  const card3Gradient = useColorModeValue(
    'linear(to-br, rgba(16,185,129,0.08), rgba(59,130,246,0.05))',
    'linear(to-br, rgba(16,185,129,0.08), rgba(59,130,246,0.05))'
  );

  const card1LinkBg = useColorModeValue('blue.800', 'blue.400');
  const card2LinkBg = useColorModeValue('purple.500', 'purple.400');
  const card3LinkBg = useColorModeValue('green.500', 'green.400');

  return {
    bg,
    cardBg,
    textColor,
    titleColor,
    startBtnBg,
    startBtnHoverBg,
    startBtnBorder,
    startBtnText,
    communityBtnBg,
    communityBtnHoverBg,
    communityBtnBorder,
    communityBtnText,
    donateBtnBg,
    donateBtnHoverBg,
    donateBtnBorder,
    donateBtnText,
    heartIconColor,
    card1Gradient,
    card2Gradient,
    card3Gradient,
    card1LinkBg,
    card2LinkBg,
    card3LinkBg,
  };
};

export type StartCTAColors = ReturnType<typeof useStartCTAColors>;


