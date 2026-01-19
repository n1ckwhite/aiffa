"use client";

import React from "react";
import { Avatar, Box } from "@chakra-ui/react";
import { AppLink } from "shared/ui/AppLink";
import type { AuthorBadgeLinkProps } from "./types";

const stop = (e: React.SyntheticEvent) => {
  e.stopPropagation();
};

export const AuthorBadgeLink: React.FC<AuthorBadgeLinkProps> = ({
  accentColor,
  chipBorder,
  authorUsername,
  authorName,
  to = "/creators",
  isLink = true,
}) => {
  const label = authorName ?? authorUsername;

  const content = (
    <>
      <Avatar
        name={authorName}
        src={`https://avatars.githubusercontent.com/${authorUsername}?s=40`}
        boxSize="24px"
        aria-hidden="true"
      />
      Автор
    </>
  );

  if (!isLink) {
    return (
      <Box
        as="span"
        display="inline-flex"
        alignItems="center"
        gap={2}
        fontSize="xs"
        color={accentColor}
        bg="transparent"
        px={2.5}
        py={1}
        borderRadius="full"
        borderWidth="1px"
        borderStyle="dashed"
        borderColor={chipBorder}
      >
        {content}
      </Box>
    );
  }

  return (
    <AppLink
      to={to}
      prefetch={false}
      display="inline-flex"
      alignItems="center"
      gap={2}
      fontSize="xs"
      color={accentColor}
      bg="transparent"
      px={2.5}
      py={1}
      borderRadius="full"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor={chipBorder}
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      aria-label={`Открыть автора: ${label}`}
      position="relative"
      zIndex={3}
      pointerEvents="auto"
      onClick={stop}
      onMouseDown={stop}
      onTouchStart={stop}
    >
      {content}
    </AppLink>
  );
};

