import React from 'react';
import { Link } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import type { TelegramLinkProps } from './types';

export const TelegramLink: React.FC<TelegramLinkProps> = ({
  colors,
  href = 'https://t.me/iamceob1tch',
  label = 'Поддержка в Telegram',
  ariaLabel = 'Поддержка в Telegram (откроется в новой вкладке)',
}) => {
  return (
    <Link
      href={href}
      isExternal
      px={{ base: 4, md: 5 }}
      py={{ base: 2.5, md: 3 }}
      borderRadius="full"
      borderWidth="1px"
      borderColor={colors.tg.border}
      bg={colors.tg.bg}
      _hover={{ textDecoration: 'none', bg: colors.tg.hover }}
      color={colors.tg.text}
      fontWeight="semibold"
      fontSize={{ base: 'sm', md: 'md' }}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      w={{ base: '100%', sm: 'auto' }}
      aria-label={ariaLabel}
    >
      <ChatIcon />
      {label}
    </Link>
  );
};


