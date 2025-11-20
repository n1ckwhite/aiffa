import React from 'react';
import { Portal, Box } from '@chakra-ui/react';
import { useTaskCompletionColors } from '../../../colors/useTaskCompletionColors';
import { fade } from '../../../animations/fade';
import type { OverlayProps } from './types/Overlay.types';

const Overlay: React.FC<OverlayProps> = ({ children }) => {
  const { overlayBg } = useTaskCompletionColors();
  return (
    <Portal>
      <Box
        position="fixed"
        inset={0}
        zIndex={300000}
        animation={`${fade} 160ms ease-out`}
        bg={overlayBg}
        backdropFilter="blur(6px)"
        onWheel={(e) => { try { e.preventDefault(); } catch {} }}
        onTouchMove={(e) => { try { e.preventDefault(); } catch {} }}
      >
        {children}
      </Box>
    </Portal>
  );
};

export default Overlay;


