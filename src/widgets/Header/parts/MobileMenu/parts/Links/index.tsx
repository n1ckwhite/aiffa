import React from 'react';
import { Box, Button, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { MenuLinksProps } from './types';
import { FaCode } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa6';

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
        <Link as={RouterLink as any} to="/hackathons" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaCode} boxSize={4} aria-hidden="true" />
            <Text>Хакатоны</Text>
          </HStack>
        </Link>
      </Button>

      <Button variant="ghost" justifyContent="flex-start" _hover={{ bg: hoverBg }} px={1} py={2}>
        <Link as={RouterLink as any} to="/partners" onClick={onClose} display="block" w="100%" px={1} py={2} borderRadius="md" _hover={{ bg: hoverBg, textDecoration: 'none' }}>
          <HStack spacing={3} align="center">
            <Icon as={FaHandshake} boxSize={4} aria-hidden="true" />
            <Text>Партнёрство</Text>
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



