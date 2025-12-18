import React from "react";
import { Avatar, Badge, HStack, Link, Text, VStack } from "@chakra-ui/react";
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
  return (
    <HStack spacing={3} mt="auto" pt={6} minH="56px" align="center">
      {authorHref ? (
        <Link
          href={authorHref}
          isExternal
          aria-label={`Открыть профиль автора в GitHub: ${authorName || authorGithub || "автор"}`}
          position="relative"
          zIndex={3}
          display="inline-flex"
          _hover={{ textDecoration: "none" }}
        >
          <Avatar name={authorName || "Автор"} src={getGithubAvatarUrl(authorGithub, 96)} boxSize="38px" />
        </Link>
      ) : (
        <Avatar name={authorName || "Автор"} src={getGithubAvatarUrl(authorGithub, 96)} boxSize="38px" />
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
            aria-label={`Открыть профиль автора в GitHub: ${authorName || authorGithub || "автор"}`}
          >
            {authorName || "—"}
          </Link>
        ) : (
          <Text fontSize="sm" fontWeight="semibold" noOfLines={1} color={themeTitleColor}>
            {authorName || "—"}
          </Text>
        )}

        <Badge
          mt={1}
          w="fit-content"
          colorScheme={authorBadge.colorScheme}
          variant="subtle"
          borderRadius="full"
          px={2}
          py={0.5}
          fontSize="10px"
          letterSpacing="0.02em"
        >
          {authorBadge.label}
        </Badge>

        <Text fontSize="xs" color={themeDescColor}>
          {getDateLabel(dateIso)}
        </Text>
      </VStack>
    </HStack>
  );
};


