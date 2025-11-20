import { useColorModeValue } from '@chakra-ui/react';

export type GlobalBackgroundColors = {
  glowFrom: string;
  glowTo: string;
  amberFrom: string;
  amberTo: string;
  limeFrom: string;
  limeTo: string;
  bottomGlowFrom: string;
  bottomGlowTo: string;
};

export const useGlobalBackgroundColors = (): GlobalBackgroundColors => {
  const glowFrom = useColorModeValue('#67e8f9', '#22d3ee');
  const glowTo = useColorModeValue('#93c5fd', '#60a5fa');
  const amberFrom = '#fbbf24';
  const amberTo = '#f59e0b';
  const limeFrom = '#a3e635';
  const limeTo = '#84cc16';
  const bottomGlowFrom = useColorModeValue('#d1fae5', '#065f46');
  const bottomGlowTo = useColorModeValue('#bbf7d0', '#064e3b');

  return {
    glowFrom,
    glowTo,
    amberFrom,
    amberTo,
    limeFrom,
    limeTo,
    bottomGlowFrom,
    bottomGlowTo,
  };
};



