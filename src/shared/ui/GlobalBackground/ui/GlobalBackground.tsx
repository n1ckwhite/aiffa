import React from 'react';
import { Box } from '@chakra-ui/react';
import { useGlobalBackgroundColors } from '../colors/useGlobalBackgroundColors';
import { driftA, driftB, driftC } from '../animations/drifts';

const GlobalBackground: React.FC = () => {
  const {
    glowFrom,
    glowTo,
    amberFrom,
    amberTo,
    limeFrom,
    limeTo,
    bottomGlowFrom,
    bottomGlowTo,
  } = useGlobalBackgroundColors();

  return (
    <Box position="absolute" inset={0} zIndex={0} pointerEvents="none" overflow="hidden">
      <Box aria-hidden="true" position="absolute" top={{ base: -120, md: -160 }} left={{ base: -120, md: -160 }} w={{ base: '280px', md: '420px' }} h={{ base: '280px', md: '420px' }} borderRadius="full" filter="blur(100px)" opacity={0.26} bgGradient={`linear(to-br, ${glowFrom}, ${glowTo})`} animation={`${driftA} 20s ease-in-out infinite`} />
      <Box aria-hidden="true" position="absolute" top={{ base: 180, md: 220 }} left={{ base: -60, md: -80 }} w={{ base: '200px', md: '300px' }} h={{ base: '200px', md: '300px' }} borderRadius="full" filter="blur(90px)" opacity={0.2} bgGradient={`linear(to-br, ${amberFrom}, ${amberTo})`} animation={`${driftB} 24s ease-in-out infinite`} />
      <Box aria-hidden="true" position="absolute" bottom={{ base: -120, md: -160 }} right={{ base: -80, md: -120 }} w={{ base: '300px', md: '460px' }} h={{ base: '300px', md: '460px' }} borderRadius="full" filter="blur(110px)" opacity={0.22} bgGradient={`linear(to-br, ${limeFrom}, ${limeTo})`} animation={`${driftC} 26s ease-in-out infinite`} />
      <Box aria-hidden="true" position="absolute" bottom={{ base: 80, md: 120 }} left={{ base: '30%', md: '35%' }} w={{ base: '220px', md: '320px' }} h={{ base: '220px', md: '320px' }} borderRadius="full" filter="blur(100px)" opacity={0.16} bgGradient={`linear(to-br, ${glowTo}, ${amberFrom})`} animation={`${driftB} 28s ease-in-out infinite`} />
      <Box aria-hidden="true" position="absolute" top={{ base: 60, md: 100 }} right={{ base: '20%', md: '25%' }} w={{ base: '180px', md: '260px' }} h={{ base: '180px', md: '260px' }} borderRadius="full" filter="blur(80px)" opacity={0.2} bgGradient={`linear(to-br, ${amberTo}, ${glowFrom})`} animation={`${driftA} 22s ease-in-out infinite`} />
      <Box aria-hidden="true" position="absolute" bottom={{ base: -240, md: -300 }} left={{ base: -200, md: -280 }} right={{ base: -200, md: -280 }} h={{ base: '560px', md: '700px' }} filter="blur(130px)" opacity={0.22} bgGradient={`linear(to-t, ${bottomGlowFrom}, ${bottomGlowTo})`} />
    </Box>
  );
};

export default GlobalBackground;



