"use client";

import React from "react";
import { Avatar, Button, HStack, Icon, IconButton, Link, Text, Tooltip } from "@chakra-ui/react";
import { FiBookmark, FiCheck, FiCopy, FiStar } from "react-icons/fi";
import type { AuthorActionsRowProps } from "./types";

export const AuthorActionsRow: React.FC<AuthorActionsRowProps> = ({ article, theme, colors, interactions }) => {
  return (
    <HStack spacing={2} flexWrap="wrap" align="center" pt={1} color={colors.metaRowColor} fontSize="sm">
      <HStack spacing={1.5}>
        {article.author?.github ? (
          <Link
            href={`https://github.com/${article.author.github}`}
            isExternal
            aria-label={`Профиль автора ${article.author.name} на GitHub`}
            _hover={{ textDecoration: "none", opacity: 0.9 }}
            _focusVisible={{ boxShadow: colors.ghostFocusShadow }}
          >
            <Avatar
              name={article.author.name}
              src={`https://avatars.githubusercontent.com/${article.author.github}?s=64`}
              boxSize="20px"
            />
          </Link>
        ) : null}

        {article.author?.github ? (
          <Link
            href={`https://github.com/${article.author.github}`}
            isExternal
            color={theme.blue.accent}
            fontWeight={700}
            aria-label={`Профиль автора ${article.author.name} на GitHub`}
            _hover={{ textDecoration: "none", color: theme.blue.accent }}
            _focusVisible={{ boxShadow: colors.ghostFocusShadow }}
          >
            {article.author.github}
          </Link>
        ) : (
          <Text fontWeight={700} color={theme.titleColor}>
            {article.author?.name ?? "AIFFA"}
          </Text>
        )}
      </HStack>

      <Tooltip label={interactions.isStarred ? "Убрать оценку" : "Поставить оценку"} hasArrow placement="top" openDelay={250}>
        <Button
          size="sm"
          variant="ghost"
          onClick={interactions.handleToggleStar}
          aria-label={interactions.isStarred ? "Убрать оценку" : "Поставить оценку"}
          aria-pressed={interactions.isStarred}
          h="32px"
          px={2}
          minW="auto"
          sx={{
            "& svg, & svg *": {
              stroke: interactions.isStarred ? colors.starIconActiveColor : colors.actionIconColor,
              fill: "none",
            },
          }}
          _hover={{ bg: colors.ghostHoverBg }}
          _active={{ bg: colors.ghostActiveBg }}
          _focusVisible={{ boxShadow: colors.ghostFocusShadow }}
        >
          <HStack spacing={1.5} align="center">
            <Icon as={FiStar} boxSize={4} aria-hidden />
            <Text as="span" fontWeight={600}>
              {interactions.displayStars}
            </Text>
          </HStack>
        </Button>
      </Tooltip>

      <Tooltip label={interactions.isSaved ? "Убрать из сохранённых" : "Сохранить"} hasArrow placement="top" openDelay={250}>
        <IconButton
          size="sm"
          variant="ghost"
          onClick={interactions.handleToggleSaved}
          aria-label={interactions.isSaved ? "Убрать из сохранённых" : "Сохранить статью"}
          aria-pressed={interactions.isSaved}
          w="32px"
          h="32px"
          icon={<Icon as={FiBookmark} />}
          sx={{
            "& svg, & svg *": {
              stroke: interactions.isSaved ? colors.savedIconActiveColor : colors.actionIconColor,
              fill: "none",
            },
          }}
          _hover={{ bg: colors.ghostHoverBg }}
          _active={{ bg: colors.ghostActiveBg }}
          _focusVisible={{ boxShadow: colors.ghostFocusShadow }}
        />
      </Tooltip>

      <Tooltip label={interactions.isShareCopied ? "Скопировано!" : "Скопировать ссылку"} hasArrow placement="top" openDelay={250}>
        <IconButton
          size="sm"
          variant="ghost"
          onClick={interactions.handleCopyShareLink}
          aria-label={interactions.isShareCopied ? "Скопировано" : "Скопировать ссылку на статью"}
          w="32px"
          h="32px"
          icon={<Icon as={interactions.isShareCopied ? FiCheck : FiCopy} />}
          sx={{
            "& svg, & svg *": {
              stroke: interactions.isShareCopied ? colors.copiedIconColor : colors.actionIconColor,
              fill: "none",
            },
          }}
          _hover={{ bg: colors.ghostHoverBg }}
          _active={{ bg: colors.ghostActiveBg }}
          _focusVisible={{ boxShadow: colors.ghostFocusShadow }}
        />
      </Tooltip>
    </HStack>
  );
};


