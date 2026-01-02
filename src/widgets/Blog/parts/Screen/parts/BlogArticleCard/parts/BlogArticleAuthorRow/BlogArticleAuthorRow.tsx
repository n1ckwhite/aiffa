import React from "react";
import { Avatar, Box, HStack, Link, Text, VStack } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { getDateLabel, getGithubAvatarUrl } from "../../../../lib/format";
import { BlogArticleAuthorRowProps } from "./types";
import { openAuthorProfile } from "./lib/openAuthorProfile";

export const BlogArticleAuthorRow: React.FC<BlogArticleAuthorRowProps> = ({
  themeTitleColor,
  themeDescColor,
  accentColor,
  authorName,
  authorGithub,
  authorHref,
  authorBadge,
  dateIso,
  disableLinks,
}) => {
  const avatarLabel = `Открыть профиль автора в GitHub: ${authorName || authorGithub || "автор"}`;
  const canLink = Boolean(authorHref) && !disableLinks;
  const canOpenProfile = Boolean(authorHref) && !!disableLinks;

  const handleOpenProfile = (e: React.MouseEvent | React.KeyboardEvent) => openAuthorProfile(e, authorHref);

  return (
    <HStack spacing={3} mt="auto" pt={6} minH="56px" align="center">
      {canLink ? (
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
      ) : canOpenProfile ? (
        <Box
          as="button"
          type="button"
          aria-label={avatarLabel}
          onClick={handleOpenProfile}
          position="relative"
          zIndex={3}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxSize="48px"
          minW="48px"
          borderRadius="full"
          cursor="pointer"
          _hover={{ textDecoration: "none", opacity: 0.9 }}
          _focusVisible={{ boxShadow: "0 0 0 3px rgba(66,153,225,0.6)" }}
        >
          <Avatar name={authorName || "Автор"} src={getGithubAvatarUrl(authorGithub, 96)} boxSize="38px" />
        </Box>
      ) : (
        <Box display="inline-flex" alignItems="center" justifyContent="center" boxSize="48px" minW="48px">
          <Avatar name={authorName || "Автор"} src={getGithubAvatarUrl(authorGithub, 96)} boxSize="38px" />
        </Box>
      )}

      <VStack spacing={0} align="start" minW={0} gap={1}>
        {canLink ? (
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
        ) : canOpenProfile ? (
          <Box
            as="button"
            type="button"
            onClick={handleOpenProfile}
          onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key !== "Enter" && e.key !== " ") return;
              handleOpenProfile(e);
            }}
            display="inline-flex"
            alignItems="center"
            cursor="pointer"
            color={themeTitleColor}
            fontSize="sm"
            fontWeight="semibold"
            textAlign="left"
            _hover={{ color: accentColor }}
            _focusVisible={{ boxShadow: "0 0 0 3px rgba(66,153,225,0.6)", borderRadius: "6px" }}
            aria-label={avatarLabel}
          >
            {authorName || "—"}
          </Box>
        ) : (
          <Text fontSize="sm" fontWeight="semibold" noOfLines={1} color={themeTitleColor}>
            {authorName || "—"}
          </Text>
        )}

        <Box>
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


