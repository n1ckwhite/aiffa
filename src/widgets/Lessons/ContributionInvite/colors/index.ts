import { useColorModeValue } from '@chakra-ui/react';
import { useAppColors } from 'shared/theme/colors';

export const useContributionInviteColors = () => {
  const theme = useAppColors();
  const containerBorder = useColorModeValue('blue.200', 'blue.500');
  const containerBg = useColorModeValue(
    'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.75))',
    'linear-gradient(180deg, rgba(26,32,44,0.85), rgba(26,32,44,0.7))'
  );
  const boxShadow = useColorModeValue('0 8px 24px rgba(59,130,246,0.08)', '0 8px 24px rgba(0,0,0,0.35)');

  const badgeBg = theme.blue.chipBg;
  const badgeText = theme.blue.accent;
  const badgeBorder = theme.blue.chipBorder;

  const titleColor = theme.titleColor;
  const descColor = theme.descColor;

  const linkBorder = useColorModeValue('blue.200', 'blue.600');
  const linkBg = theme.blue.chipBg;
  const linkBgHover = useColorModeValue('blue.100', 'whiteAlpha.200');
  const linkText = useColorModeValue('blue.700', 'blue.100');

  const link2Border = useColorModeValue('purple.200', 'purple.600');
  const link2Bg = theme.purple.chipBg;
  const link2BgHover = useColorModeValue('purple.100', 'whiteAlpha.200');
  const link2Text = useColorModeValue('purple.700', 'purple.100');

  return {
    containerBorder,
    containerBg,
    boxShadow,
    badgeBg,
    badgeText,
    badgeBorder,
    titleColor,
    descColor,
    linkBorder,
    linkBg,
    linkBgHover,
    linkText,
    link2Border,
    link2Bg,
    link2BgHover,
    link2Text,
  };
};


