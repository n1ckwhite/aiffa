import React from 'react';
import { IconButton, Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import type { ThemeToggleButtonProps } from './types';

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Переключить тему"
      onClick={toggleColorMode}
      variant="ghost"
      bg={useColorModeValue('blue.50', 'whiteAlpha.200')}
      color={useColorModeValue('gray.700', 'blue.300')}
      borderRadius="full"
      size="md"
      _hover={{ 
        bg: useColorModeValue('blue.100', 'whiteAlpha.300'),
        transform: "scale(1.05)",
        boxShadow: useColorModeValue("0 4px 12px rgba(0, 0, 0, 0.1)", "0 4px 12px rgba(59, 130, 246, 0.3)")
      }}
      _active={{
        transform: "scale(0.95)"
      }}
      transition="all 0.2s ease-in-out"
      {...props}
    >
      <Box position="relative" w="20px" h="20px">
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={useColorModeValue(1, 0)}
          transform={useColorModeValue('scale(1) rotate(0deg)', 'scale(0.8) rotate(90deg)')}
          transition="opacity 0.2s ease, transform 0.2s ease"
        >
          <Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </Box>
        </Box>
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={useColorModeValue(0, 1)}
          transform={useColorModeValue('scale(0.8) rotate(-90deg)', 'scale(1) rotate(0deg)')}
          transition="opacity 0.2s ease, transform 0.2s ease"
        >
          <Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </Box>
        </Box>
      </Box>
    </IconButton>
  );
};

export default ThemeToggleButton;



