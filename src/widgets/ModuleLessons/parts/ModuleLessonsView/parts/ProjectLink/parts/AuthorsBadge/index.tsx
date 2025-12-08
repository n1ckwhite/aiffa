import React from 'react';
import { Box, Avatar } from '@chakra-ui/react';
import type { AuthorsBadgeProps } from './types';
import { getAuthorsTitle } from '../../data';

export const AuthorsBadge: React.FC<AuthorsBadgeProps> = ({ authors, colors }) => {
  if (!Array.isArray(authors) || authors.length === 0) return null;

  const primaryAuthor = authors[0];
  const title = getAuthorsTitle(1);
  const stop = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <Box
      fontSize="xs"
      color={colors.blue.accent}
      bg="transparent"
      px={2.5}
      py={1}
      borderRadius="full"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor={colors.blue.chipBorder}
      display="inline-flex"
      alignItems="center"
      gap={2}
      onClick={stop}
      onMouseDown={stop}
      onTouchStart={stop}
    >
      <Avatar
        as="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          stop(e);
          try {
            window.open(
              `https://github.com/${primaryAuthor.username}`,
              '_blank',
              'noopener,noreferrer',
            );
          } catch {}
        }}
        name={primaryAuthor.name}
        src={`https://avatars.githubusercontent.com/${primaryAuthor.username}?s=40`}
        boxSize="24px"
        border="0"
        aria-label={`GitHub ${primaryAuthor.name || primaryAuthor.username}`}
      />
      {title}
    </Box>
  );
};


