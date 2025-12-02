import { useColorModeValue } from '@chakra-ui/react';

export type ColorToken = { light: string; dark: string };

export const colors = {
  cardBg: { light: 'white', dark: 'gray.800' },
  cardBgFAQ: { light: 'transparent', dark: 'gray.800' },
  cardHoverBg: { light: 'gray.50', dark: 'gray.750' },
  borderColor: { light: 'blackAlpha.200', dark: 'whiteAlpha.200' },
  titleColor: { light: 'gray.900', dark: 'white' },
  descColor: { light: 'gray.600', dark: 'gray.300' },
  controlsBg: { light: 'blackAlpha.100', dark: 'whiteAlpha.200' },
  controlsHoverBg: { light: 'blackAlpha.200', dark: 'whiteAlpha.300' },
  controlsIcon: { light: 'gray.600', dark: 'gray.300' },
  linkMuted: { light: 'gray.500', dark: 'whiteAlpha.700' },
  chipBgBlue: { light: 'blue.50', dark: 'whiteAlpha.200' },
  chipBorderBlue: { light: 'blue.100', dark: 'whiteAlpha.300' },
  accentBlue: { light: 'blue.600', dark: 'blue.300' },
  indexBgBlue: { light: 'blue.50', dark: 'whiteAlpha.200' },
  controlsBgBlue: { light: 'gray.100', dark: 'gray.700' },
  controlsHoverBgBlue: { light: 'gray.50', dark: 'gray.600' },
  controlsIconBlue: { light: 'gray.500', dark: 'whiteAlpha.800' },
  linkMutedBlue: { light: 'gray.500', dark: 'whiteAlpha.700' },
  chipBgPurple: { light: 'purple.50', dark: 'whiteAlpha.200' },
  chipBorderPurple: { light: 'purple.100', dark: 'whiteAlpha.300' },
  accentPurple: { light: 'purple.700', dark: 'purple.300' },
  indexBgPurple: { light: 'purple.50', dark: 'purple.900' },
  controlsHoverBgPurple: { light: 'purple.50', dark: 'whiteAlpha.200' },
};

export const useAppColors = () => {
  const usePick = (pair: ColorToken) => useColorModeValue(pair.light, pair.dark);
  return {
    cardBgFAQ: usePick(colors.cardBgFAQ),
    cardBg: usePick(colors.cardBg),
    cardHoverBg: usePick(colors.cardHoverBg),
    borderColor: usePick(colors.borderColor),
    titleColor: usePick(colors.titleColor),
    descColor: usePick(colors.descColor),
    controlsBg: usePick(colors.controlsBg),
    controlsHoverBg: usePick(colors.controlsHoverBg),
    controlsIcon: usePick(colors.controlsIcon),
    linkMuted: usePick(colors.linkMuted),
    blue: {
      chipBg: usePick(colors.chipBgBlue),
      chipBorder: usePick(colors.chipBorderBlue),
      accent: usePick(colors.accentBlue),
      indexBg: usePick(colors.indexBgBlue),
      controlsBg: usePick(colors.controlsBgBlue),
      controlsHoverBg: usePick(colors.controlsHoverBgBlue),
      controlsIcon: usePick(colors.controlsIconBlue),
      linkMuted: usePick(colors.linkMutedBlue),
    },
    purple: {
      chipBg: usePick(colors.chipBgPurple),
      chipBorder: usePick(colors.chipBorderPurple),
      accent: usePick(colors.accentPurple),
      indexBg: usePick(colors.indexBgPurple),
      controlsHoverBg: usePick(colors.controlsHoverBgPurple),
    },
  };
};


