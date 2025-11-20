import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useMarkdownColors = () => {
  const theme = useAppColors();
  const inlineBg = theme.controlsBg;
  const inlineColor = theme.titleColor;
  const inlineBorderColor = theme.borderColor;
  const linkColor = theme.blue.accent;
  const underlineColor = theme.blue.accent;
  const borderCol = theme.borderColor;
  const textColor = theme.titleColor;
  const listMarker = theme.blue.accent;
  const listMarkerAlt = theme.purple.accent;
  const detailsBg = theme.controlsBg;
  const detailsBorder = theme.borderColor;
  const detailsHover = theme.cardHoverBg;
  const detailsTitle = theme.titleColor;
  const emBg = theme.controlsBg;
  const detailsCardBg = useColorModeValue('blue.50', theme.blue.chipBg);
  const detailsCardBorder = theme.borderColor;
  const detailsBadgeColor = theme.blue.accent;

  const noteBg = useColorModeValue('green.50', 'rgba(56,161,105,0.18)');
  const noteBorder = useColorModeValue('green.200', 'green.500');
  const noteHeadingColor = useColorModeValue('green.700', 'green.300');
  const tipBg = useColorModeValue('teal.50', 'rgba(45,212,191,0.18)');
  const tipBorder = useColorModeValue('teal.200', 'teal.500');
  const tipHeadingColor = useColorModeValue('teal.700', 'teal.300');
  const warnBg = useColorModeValue('orange.50', 'rgba(251,146,60,0.18)');
  const warnBorder = useColorModeValue('orange.200', 'orange.500');
  const warnHeadingColor = useColorModeValue('orange.700', 'orange.300');
  const infoBg = useColorModeValue('purple.50', 'rgba(167,139,250,0.18)');
  const infoBorder = useColorModeValue('purple.200', 'purple.500');
  const infoHeadingColor = useColorModeValue('purple.700', 'purple.300');

  const anchorIdle = theme.descColor;
  const anchorHover = theme.blue.accent;

  return {
    inlineBg,
    inlineColor,
    inlineBorderColor,
    linkColor,
    underlineColor,
    borderCol,
    textColor,
    listMarker,
    listMarkerAlt,
    detailsBg,
    detailsBorder,
    detailsHover,
    detailsTitle,
    emBg,
    detailsCardBg,
    detailsCardBorder,
    detailsBadgeColor,
    noteBg,
    noteBorder,
    noteHeadingColor,
    tipBg,
    tipBorder,
    tipHeadingColor,
    warnBg,
    warnBorder,
    warnHeadingColor,
    infoBg,
    infoBorder,
    infoHeadingColor,
    anchorIdle,
    anchorHover,
  };
};


