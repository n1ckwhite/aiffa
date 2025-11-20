import React from 'react';
import { Box, Button, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { MenuLinksProps } from './types';

export const MenuLinks: React.FC<MenuLinksProps> = ({ hoverBg, onClose, donateBg, donateHoverBg, onDonate }) => {
  return (
    <VStack gap={2} align="stretch">
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/learn" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Box as="svg" w={4} h={4} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </Box>
            <Text>Материалы</Text>
          </HStack>
        </Link>
      </Button>
      
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/weekly" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Box as="svg" w={4} h={4} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5m8 2V5M5 9h14M7 12h5m-5 4h10M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
            </Box>
            <Text>Задачи</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/profile" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Box
              as="svg"
              boxSize={4}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              style={{ verticalAlign: 'middle' }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </Box>
            <Text>Профиль</Text>
          </HStack>
        </Link>
      </Button>
      
      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link href="https://github.com/n1ckwhite/JavaScript-Universe" target="_blank" rel="noopener noreferrer" display="block" w="100%" px={1} py={2} borderRadius="md" onClick={onClose} _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Box as="svg" w={4} h={4} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </Box>
            <Text>GitHub</Text>
          </HStack>
        </Link>
      </Button>
      
      <Button variant="ghost" justifyContent="center" bg={donateBg} color="white" onClick={async () => { await onDonate(); onClose(); }} _hover={{ bg: donateHoverBg, transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)" }} _active={{ transform: "translateY(0px)", boxShadow: "0 2px 6px rgba(59, 130, 246, 0.3)" }} borderRadius="full" px={4} transition="all 0.2s ease-in-out">
        <Box as="svg" w="16px" h="16px" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </Box>
        <Text ml={2} fontWeight="semibold">Поддержать</Text>
      </Button>
    </VStack>
  );
};



