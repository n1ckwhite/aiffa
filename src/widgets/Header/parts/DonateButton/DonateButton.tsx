import React from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import type { DonateButtonProps } from './types';
import { useMobileMenuColors } from './colors/useDonateButtonColors';

const DonateButton: React.FC<DonateButtonProps> = ({ onClick, size = 'md' }) => {
  const { bg, hoverBg } = useMobileMenuColors();
  const buttonBoxSize = size === 'md' ? '40px' : '32px';
  return (
    <IconButton
      aria-label="Поддержать проект"
      icon={
        <Box as="svg" w="20" h="20px" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </Box>
      }
      variant="ghost"
      bg={bg}
      color="white"
      onClick={onClick}
      _hover={{ 
        bg: hoverBg, 
        transform: "translateY(-1px)"
      }}
      _active={{
        transform: "translateY(0px)"
      }}
      borderRadius="full"
      boxSize={buttonBoxSize}
      minW={buttonBoxSize}
      p={0}
      transition="all 0.2s ease-in-out"
      _focusVisible={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.35)" }}
    />
  );
};

export default DonateButton;



