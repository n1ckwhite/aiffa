import React from 'react';
import { Box, Avatar, AvatarGroup } from '@chakra-ui/react';
import type { AuthorsBadgeProps } from './types';
import { getAuthorsTitle } from '../../data';

export const AuthorsBadge: React.FC<AuthorsBadgeProps> = ({ authors, colors }) => {
  if (!Array.isArray(authors) || authors.length === 0) return null;
  const title = getAuthorsTitle(authors.length);
  const stop = (e: React.SyntheticEvent) => { e.stopPropagation(); };
  return (
    <Box fontSize="xs" color={colors.blue.accent} bg="transparent" px={2.5} py={1} borderRadius="full" borderWidth="1px" borderStyle="dashed" borderColor={colors.blue.chipBorder} display="inline-flex" alignItems="center" gap={2}>
      <AvatarGroup size="sm" max={3} spacing="-8px">
        {authors.map((a) => (
          <Avatar
            key={`proj-${a.username}`}
            as="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { stop(e); try { window.open(`https://github.com/${a.username}`, '_blank', 'noopener,noreferrer'); } catch {} }}
            onMouseDown={stop}
            onTouchStart={stop}
            name={a.name}
            src={`https://avatars.githubusercontent.com/${a.username}?s=40`}
            boxSize="24px"
            border="0"
            aria-label={`GitHub ${a.name || a.username}`}
          />
        ))}
      </AvatarGroup>
      {title}
    </Box>
  );
};


