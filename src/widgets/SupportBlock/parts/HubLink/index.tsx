import React from 'react';
import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import type { HubLinkProps } from './types';

export const HubLink: React.FC<HubLinkProps> = ({ colors }) => {
  return (
    <Link
      href="https://t.me/nickwhite_web"
      isExternal
      px={{ base: 4, md: 5 }}
      py={{ base: 2.5, md: 3 }}
      borderRadius="full"
      borderWidth="1px"
      borderColor={colors.hub.border}
      bg={colors.hub.bg}
      _hover={{ textDecoration: 'none', bg: colors.hub.hover }}
      color={colors.hub.text}
      fontWeight="semibold"
      fontSize={{ base: 'sm', md: 'md' }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      w={{ base: '100%', sm: 'auto' }}
      aria-label="JS HUB — обсудить идею (откроется в новой вкладке)"
    >
      <ExternalLinkIcon />
      JS HUB — обсудить идею
    </Link>
  );
};


