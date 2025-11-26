import React from 'react';
import { Box, IconButton, HStack, useColorModeValue } from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import type { MobileControlsProps } from './types';

export const MobileControls: React.FC<MobileControlsProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setSearchQuery,
  setSearchOpen,
  setResults,
  toggleColorMode,
}) => {
  return (
    <HStack gap={2} display={{ base: 'flex', md: 'none' }}>
      <IconButton
        aria-label="Поиск"
        variant="ghost"
        onClick={() => {
          setSearchQuery('');
          setSearchOpen(false);
          setResults([]);
          try {
            document.querySelectorAll('.search-input').forEach((node) => {
              (node as HTMLInputElement).value = '';
            });
          } catch {}
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}
        bg={useColorModeValue('blue.50', 'whiteAlpha.200')}
        color={useColorModeValue('gray.700', 'blue.300')}
        borderRadius="full"
        _hover={{ 
          bg: useColorModeValue('blue.100', 'whiteAlpha.300'),
          transform: "scale(1.05)"
        }}
        transition="all 0.2s ease-in-out"
        data-menu-trigger="true"
      >
        <Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </Box>
      </IconButton>
      <IconButton
        aria-label="Чат поддержки"
        variant="ghost"
        onClick={() => {
          window.dispatchEvent(new Event('feedback:open'));
        }}
        bg={useColorModeValue('blue.50', 'whiteAlpha.200')}
        color={useColorModeValue('gray.700', 'blue.300')}
        borderRadius="full"
        icon={<ChatIcon />}
        _hover={{ 
          bg: useColorModeValue('blue.100', 'whiteAlpha.300'),
          transform: "scale(1.05)"
        }}
        transition="all 0.2s ease-in-out"
      />
      <IconButton
        aria-label="Переключить тему"
        onClick={toggleColorMode}
        variant="ghost"
        bg={useColorModeValue('blue.50', 'whiteAlpha.200')}
        color={useColorModeValue('gray.700', 'blue.300')}
        borderRadius="full"
        _hover={{ 
          bg: useColorModeValue('blue.100', 'whiteAlpha.300'),
          transform: "scale(1.05)"
        }}
        _active={{
          transform: "scale(0.95)"
        }}
        transition="all 0.2s ease-in-out"
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
      <IconButton
        aria-label={isMobileMenuOpen ? "Закрыть меню" : "Меню"}
        variant="ghost"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        bg={useColorModeValue('blue.50', 'whiteAlpha.200')}
        color={useColorModeValue('gray.700', 'blue.300')}
        borderRadius="full"
        _hover={{ 
          bg: useColorModeValue('blue.100', 'whiteAlpha.300'),
          transform: "scale(1.05)"
        }}
        transition="all 0.2s ease-in-out"
        data-menu-trigger="true"
      >
        <Box position="relative" w="20px" h="20px">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={isMobileMenuOpen ? 0 : 1}
            transform={isMobileMenuOpen ? 'scale(0.8) rotate(90deg)' : 'scale(1) rotate(0deg)'}
            transition="opacity 0.2s ease, transform 0.2s ease"
          >
            <Box as="svg" w="20px" h="20px" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </Box>
          </Box>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={isMobileMenuOpen ? 1 : 0}
            transform={isMobileMenuOpen ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-90deg)'}
            transition="opacity 0.2s ease, transform 0.2s ease"
          >
            <CloseIcon boxSize={3.5} />
          </Box>
        </Box>
      </IconButton>
    </HStack>
  );
};



