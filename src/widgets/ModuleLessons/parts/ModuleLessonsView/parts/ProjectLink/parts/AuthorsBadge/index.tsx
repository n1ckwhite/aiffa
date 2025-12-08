import React from 'react';
import { Box, Avatar, AvatarGroup, useColorModeValue } from '@chakra-ui/react';
import type { AuthorsBadgeProps } from './types';
import { getAuthorsTitle } from '../../data';

export const AuthorsBadge: React.FC<AuthorsBadgeProps> = ({ authors, colors }) => {
  if (!Array.isArray(authors) || authors.length === 0) return null;
  const title = getAuthorsTitle(authors.length);
  const stop = (e: React.SyntheticEvent) => { e.stopPropagation(); };

  const extraBg = useColorModeValue('gray.50', 'gray.700');
  const extraColor = useColorModeValue(colors.blue.accent, colors.blue.accent);

  return (
    <Box fontSize="xs" color={colors.blue.accent} bg="transparent" px={2.5} py={1} borderRadius="full" borderWidth="1px" borderStyle="dashed" borderColor={colors.blue.chipBorder} display="inline-flex" alignItems="center" gap={2}>
      <AvatarGroup
        size="sm"
        max={3}
        spacing="-8px"
        sx={{
          ".chakra-avatar__excess": {
            w: "28px",
            h: "28px",
            fontSize: "xs",
            lineHeight: "1",
            bg: extraBg,
            color: extraColor,
            fontWeight: "600",
            borderWidth: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 4,
          },
        }}
      >
        {authors.map((a, index) => (
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
            zIndex={index + 1}
            aria-label={`GitHub ${a.name || a.username}`}
          />
        ))}
      </AvatarGroup>
      {title}
    </Box>
  );
};


