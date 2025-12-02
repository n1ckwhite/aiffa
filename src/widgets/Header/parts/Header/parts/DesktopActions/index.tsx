import React from 'react';
import { Box, HStack, Link, Text, Tooltip, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaBookOpen, FaClipboardList, FaUserCircle } from 'react-icons/fa';
import HackathonsLink from '../../../HackathonsLink';
import DonateButton from '../../../DonateButton';
import ThemeToggleButton from '../../../ThemeToggleButton';
import type { DesktopActionsProps } from './types';

export const DesktopActions: React.FC<DesktopActionsProps> = ({
  hoverBg,
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
          <Icon as={FaBookOpen} boxSize={4} aria-hidden="true" />
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
          <Icon as={FaClipboardList} boxSize={4} aria-hidden="true" />
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
          <Icon as={FaUserCircle} boxSize={4} aria-hidden="true" />
          <Text ml={2} display={{ base: 'none', '2xl': 'inline' }} fontSize="sm" fontWeight="semibold">Профиль</Text>
        </Link>
      </Tooltip>
      
      <Tooltip label="Хакатоны" openDelay={250} hasArrow>
        <Box>
          <HackathonsLink hoverBg={hoverBg} />
        </Box>
      </Tooltip>
      
      <DonateButton onClick={onDonate} />

      <ThemeToggleButton />
    </HStack>
  );
};



