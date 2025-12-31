import { useAppColors } from 'shared/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

export const useXpColors = () => {
  const theme = useAppColors();
  const xpFillColor = theme.blue.accent;
  const ctaBg = useColorModeValue("blue.700", "blue.600");
  const ctaHoverBg = useColorModeValue("blue.800", "blue.700");
  const ctaActiveBg = useColorModeValue("blue.900", "blue.800");
  const titleColor =  useColorModeValue('gray.800','gray.100');
  const xpTrack = useColorModeValue('rgba(59,130,246,0.14)', 'rgba(96,165,250,0.18)');

  return {
    xpFillColor,
    ctaBg,
    ctaHoverBg,
    ctaActiveBg,
    titleColor,
    xpTrack
  };
};


