import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import type { DonateButtonProps } from './types';
import { useMobileMenuColors } from './colors/useDonateButtonColors';

const DonateButton: React.FC<DonateButtonProps> = ({ onClick, size = 'sm' }) => {
  const {bg, hoverBg} = useMobileMenuColors()
  return (
    <Button
      aria-label="Поддержать проект"
      variant="ghost"
      size={size}
      bg={bg}
      color="white"
      onClick={onClick}
      _hover={{ 
        bg: hoverBg, 
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
      }}
      _active={{
        transform: "translateY(0px)",
        boxShadow: "0 2px 6px rgba(59, 130, 246, 0.3)"
      }}
      borderRadius="full"
      px={{ md: 3, lg: 4 }}
      transition="all 0.2s ease-in-out"
    >
      <Box as="svg" w="16px" h="16px" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </Box>
      <Text ml={2} fontWeight="semibold" color="white" display={{ base: 'none', '2xl': 'inline' }}>Поддержать</Text>
    </Button>
  );
};

export default DonateButton;



