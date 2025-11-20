import React from 'react';
import { Box } from '@chakra-ui/react';
import type { Ring } from '../../types';

export const BackgroundDeco: React.FC<{ ring: Ring }> = ({ ring }) => {
  return (
    <Box aria-hidden position="absolute" inset={0} _before={{ content: '""', position: 'absolute', inset: 0, backgroundImage: `radial-gradient(420px 160px at 0% 0%, ${ring.from}1A, transparent 60%), radial-gradient(420px 160px at 100% 100%, ${ring.to}1A, transparent 60%)`, pointerEvents: 'none' }} />
  );
};


