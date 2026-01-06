import { useColorModeValue } from '@chakra-ui/react';

export const useMobileMenuColors = () => {
  const resultActiveBg = useColorModeValue('rgba(59,130,246,0.12)', 'rgba(59,130,246,0.18)');
  const resultHoverBg = useColorModeValue('rgba(59,130,246,0.08)', 'rgba(59,130,246,0.14)');
  const donateBg = useColorModeValue('blue.900', 'blue.600');
  const donateHoverBg = useColorModeValue('blue.800', 'blue.500');
  const scrollThumb = useColorModeValue('rgba(148,163,184,0.7)', 'rgba(148,163,184,0.7)');
  const scrollThumbHover = useColorModeValue('rgba(148,163,184,0.95)', 'rgba(148,163,184,1)');
  const mobileMenuShadow = useColorModeValue(
    '0 14px 28px rgba(15, 23, 42, 0.20)',
    '0 18px 44px rgba(0, 0, 0, 0.45)',
  );

  const scrollbarStyles = {
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `${scrollThumb} transparent`,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: scrollThumb,
      borderRadius: '999px',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      background: scrollThumbHover,
    },
  };

  return { resultActiveBg, resultHoverBg, donateBg, donateHoverBg, scrollbarStyles, mobileMenuShadow };
};



