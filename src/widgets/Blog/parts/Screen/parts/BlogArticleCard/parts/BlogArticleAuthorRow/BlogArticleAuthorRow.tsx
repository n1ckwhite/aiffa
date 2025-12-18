import React from "react";
import { Avatar, Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { getDateLabel, getGithubAvatarUrl } from "../../../../lib/format";
import { BlogArticleAuthorRowProps } from "./types";



export const BlogArticleAuthorRow: React.FC<BlogArticleAuthorRowProps> = ({
  themeTitleColor,
  themeDescColor,
  accentColor,
  authorName,
  authorGithub,
  authorHref,
  authorBadge,
  dateIso,
}) => {
  const avatarLabel = `Открыть профиль автора в GitHub: ${authorName || authorGithub || "автор"}`;

  return (
    <HStack spacing={3} mt="auto" pt={6} minH="56px" align="center">
      {authorHref ? (
        <Link
          href={authorHref}
          isExternal
          aria-label={avatarLabel}
          position="relative"
          zIndex={3}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize="48px"
          minW="48px"
          borderRadius="full"
          _hover={{ textDecoration: "none" }}
        >
          <Avatar name={authorName || "Автор"} src={getGithubAvatarUrl(authorGithub, 96)} boxSize="38px" />
        </Link>
      ) : (
        <Box display="inline-flex" alignItems="center" justifyContent="center" boxSize="48px" minW="48px">
          <Avatar name={authorName || "Автор"} src={getGithubAvatarUrl(authorGithub, 96)} boxSize="38px" />
        </Box>
      )}

      <VStack spacing={0} align="start" minW={0}>
        {authorHref ? (
          <Link
            href={authorHref}
            isExternal
            fontSize="sm"
            fontWeight="semibold"
            noOfLines={1}
            color={themeTitleColor}
            position="relative"
            zIndex={3}
            _hover={{ textDecoration: "none", color: accentColor }}
            aria-label={avatarLabel}
          >
            {authorName || "—"}
          </Link>
        ) : (
          <Text fontSize="sm" fontWeight="semibold" noOfLines={1} color={themeTitleColor}>
            {authorName || "—"}
          </Text>
        )}

        <Box mt={1}>
          <PillBadge colorScheme={authorBadge.colorScheme as any} variant="outline" uppercase={false}>
            {authorBadge.label}
          </PillBadge>
        </Box>

        <Text fontSize="xs" color={themeDescColor}>
          {getDateLabel(dateIso)}
        </Text>
      </VStack>
    </HStack>
  );
};


