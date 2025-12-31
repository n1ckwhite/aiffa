import { useAppColors } from 'shared/theme/colors';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

export const useSupportBlockColors = () => {
  const theme = useAppColors();
  const donateBg = useColorModeValue('pink.600', 'pink.600');
  const donateHoverBg = useColorModeValue('pink.700', 'pink.700');
  const { colorMode } = useColorMode();
  const defaultHeaderBg = colorMode === 'light'
    ? 'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.75))'
    : 'linear-gradient(180deg, rgba(26,32,44,0.85), rgba(26,32,44,0.7))';
  const boxShadow = colorMode === 'light'
    ? '0 8px 24px rgba(59,130,246,0.08)'
    : '0 8px 24px rgba(0,0,0,0.35)';

  return {
    donateBg: donateBg,
    donateHoverBg: donateHoverBg,
    defaultHeaderBg,
    defaultBorder: theme.borderColor,
    titleColor: theme.titleColor,
    descColor: theme.descColor,
    boxShadow,
    tg: {
      bg: theme.blue.chipBg,
      border: theme.blue.chipBorder,
      text: theme.blue.accent,
      hover: theme.blue.controlsHoverBg,
    },
    hub: {
      bg: theme.purple.chipBg,
      border: theme.purple.chipBorder,
      text: theme.purple.accent,
      hover: theme.purple.controlsHoverBg,
    },
  };
};


