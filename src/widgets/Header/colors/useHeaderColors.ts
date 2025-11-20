import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from '../../../shared/theme/colors';

export const useHeaderColors = () => {
  const theme = useAppColors();
  const dropdownShadow = useColorModeValue('0 16px 40px rgba(0,0,0,0.12)', '0 16px 40px rgba(0,0,0,0.45)');
  const overlayBg = useColorModeValue('rgba(15,23,42,0.42)', 'rgba(0,0,0,0.6)');
  const ringShadow = useColorModeValue('0 0 0 3px rgba(66,153,225,0.55)', '0 0 0 3px rgba(99,179,237,0.5)');
  const scrollThumb = useColorModeValue('rgba(37, 99, 235, 0.38)', 'rgba(96, 165, 250, 0.5)');
  const scrollThumbHover = useColorModeValue('rgba(37, 99, 235, 0.55)', 'rgba(147, 197, 253, 0.65)');
  const markBg = useColorModeValue('yellow.100', 'whiteAlpha.300');

  return {
    bg: theme.cardBg,
    borderColor: theme.borderColor,
    hoverBg: theme.cardHoverBg,
    searchBg: theme.blue.controlsBg,
    searchHoverBg: theme.blue.controlsHoverBg,
    searchFocusBg: theme.cardBg,
    searchPlaceholder: theme.blue.linkMuted,
    searchIcon: theme.blue.controlsIcon,
    searchIconHover: theme.blue.accent,
    searchIconHoverBg: theme.blue.controlsHoverBg,
    dropdownBg: theme.cardBg,
    dropdownBorder: theme.borderColor,
    dropdownShadow,
    overlayBg,
    ringShadow,
    scrollThumb,
    scrollThumbHover,
    markBg,
    emptyStateColor: theme.descColor,
    chevronColor: theme.descColor,
    chevronHoverColor: theme.blue.accent,
    moduleChipOpacityLight: 0.65,
    moduleChipOpacityDark: 0.6,
  };
};



