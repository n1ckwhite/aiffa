import React from 'react';
import { Box } from '@chakra-ui/react';
import type { AuthorsBadgeProps } from './types';

export const AuthorsBadge: React.FC<AuthorsBadgeProps> = ({ authors, accentColor, chipBorder }) => {
  if (!Array.isArray(authors) || authors.length === 0) return null;
  const title = authors.length === 1 ? 'Автор' : 'Авторы';
  const stop = (e: React.SyntheticEvent) => { e.stopPropagation(); };
  return (
    <Box
      fontSize="xs"
      color={accentColor}
      bg="transparent"
      px={2.5}
      py={1}
      borderRadius="full"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor={chipBorder}
      display="inline-flex"
      alignItems="center"
      gap={2}
      onClick={stop}
      onMouseDown={stop}
      onTouchStart={stop}
    >
      {title}
    </Box>
  );
};


