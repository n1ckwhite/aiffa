import React from 'react';
import { Box, HStack, Link, Text, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import HackathonsLink from '../../../HackathonsLink';
import DonateButton from '../../../DonateButton';
import ThemeToggleButton from '../../../ThemeToggleButton';
import type { DesktopActionsProps } from './types';

export const DesktopActions: React.FC<DesktopActionsProps> = ({
  hoverBg,
  scrollTop,
  onDonate,
  setIsMobileMenuOpen,
}) => {
  return (
    <HStack gap={{ base: 1, md: 1, xl: 2 }}>
      <Tooltip label="Материалы" openDelay={250} hasArrow>
        <Link
          as={RouterLink as any}
          to="/learn"
          aria-label="Материалы"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Box as="svg" w={4} h={4} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </Box>
          <Text ml={2} display={{ base: 'none', '2xl': 'inline' }} fontSize="sm" fontWeight="semibold">Материалы</Text>
        </Link>
      </Tooltip>
      <Tooltip label="Задачи" openDelay={250} hasArrow>
        <Link
          as={RouterLink as any}
          to="/weekly"
          aria-label="Задачи"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
          <Box as="svg" w={4} h={4} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5m8 2V5M5 9h14M7 12h5m-5 4h10M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
          </Box>
          <Text ml={2} display={{ base: 'none', '2xl': 'inline' }} fontSize="sm" fontWeight="semibold">Задачи</Text>
        </Link>
      </Tooltip>
      <Tooltip label="Профиль" openDelay={250} hasArrow>
        <Link
          as={RouterLink as any}
          to="/profile"
          aria-label="Профиль"
          onClick={() => { setIsMobileMenuOpen(false); }}
          _hover={{ bg: hoverBg }}
          px={2}
          py={1.5}
          borderRadius="md"
          display="inline-flex"
          alignItems="center"
        >
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
          <Text ml={2} display={{ base: 'none', '2xl': 'inline' }} fontSize="sm" fontWeight="semibold">Профиль</Text>
        </Link>
      </Tooltip>
      
      <HackathonsLink hoverBg={hoverBg} />
      
      <DonateButton onClick={onDonate} />

      <ThemeToggleButton />
    </HStack>
  );
};



