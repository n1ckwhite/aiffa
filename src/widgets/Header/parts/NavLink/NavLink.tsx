import React from 'react';
import { Link, Text, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { NavLinkProps } from './types';

const NavLinkItem: React.FC<NavLinkProps> = ({ to, label, ariaLabel, hoverBg, iconPath, onClick, showTextFrom = '2xl' }) => {
  return (
    <Link
      as={RouterLink as any}
      to={to}
      aria-label={ariaLabel}
      onClick={onClick}
      _hover={{ bg: hoverBg }}
      px={2}
      py={1.5}
      borderRadius="md"
      display="inline-flex"
      alignItems="center"
    >
      <Box as="svg" w={4} h={4} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </Box>
      <Text ml={2} display={{ base: 'none', [showTextFrom]: 'inline' }} fontSize="sm" fontWeight="semibold">{label}</Text>
    </Link>
  );
};

export default NavLinkItem;



