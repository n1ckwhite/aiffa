"use client";

import React from "react";
import { Avatar, Button, Heading, HStack, Icon, IconButton, Link, Text, Tooltip, VStack } from "@chakra-ui/react";
import { AppButtonLink } from "@/shared/ui/AppLink";
import PillBadge from "@/shared/ui/PillBadge";
import { formatCount } from "@/shared/functions/formatCount";
import { FiBookmark, FiCalendar, FiCheck, FiClock, FiCopy, FiMessageCircle, FiStar } from "react-icons/fi";
import { getTagIcon } from "../../helpers/getTagIcon";
import { BlogArticleHeaderProps } from "./types";

export const BlogArticleHeader: React.FC<BlogArticleHeaderProps> = ({
  article,
  formattedDate,
  theme,
  colors,
  interactions,
  commentsCount,
}) => {
  const {
    metaRowColor,
    calendarMetaColor,
    clockMetaColor,
    commentsMetaColor,
    actionIconColor,
    copiedIconColor,
    ghostHoverBg,
    ghostActiveBg,
    ghostFocusShadow,
    starIconActiveColor,
    savedIconActiveColor,
  } = colors;

  return (
    <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
      <HStack justify="space-between" align="center" flexWrap="wrap" gap={3}>
        <AppButtonLink
          to="/blog"
          size="sm"
          variant="ghost"
          aria-label="Вернуться в блог"
          _hover={{ bg: ghostHoverBg }}
          _active={{ bg: ghostActiveBg }}
          _focusVisible={{ boxShadow: ghostFocusShadow }}
        >
          ← В блог
        </AppButtonLink>
      </HStack>

      <VStack align="stretch" spacing={2}>
        <HStack spacing={3} flexWrap="wrap" align="center" color={metaRowColor}>
          {Array.isArray(article.tags) && article.tags.length > 0 && (
            <HStack as="span" spacing={2} flexWrap="wrap" align="center">
              {article.tags.slice(0, 4).map((t, idx) => {
                const scheme = idx === 0 ? "blue" : idx === 1 ? "purple" : "gray";
                const TagIcon = getTagIcon(t);
                return (
                  <PillBadge key={t} colorScheme={scheme as any} variant="outline" uppercase={false} icon={TagIcon}>
                    {t}
                  </PillBadge>
                );
              })}
            </HStack>
          )}

          <HStack spacing={3} fontSize="sm" color={metaRowColor}>
            <HStack spacing={1.5}>
              <Icon as={FiCalendar} color={calendarMetaColor} aria-hidden />
              <Text>{formattedDate}</Text>
            </HStack>
            <HStack spacing={1.5}>
              <Icon as={FiClock} color={clockMetaColor} aria-hidden />
              <Text>{article.readingTime ?? "—"}</Text>
            </HStack>
            {typeof commentsCount === "number" && (
              <HStack spacing={1.5}>
                <Icon as={FiMessageCircle} color={commentsMetaColor} aria-hidden />
                <Text>{formatCount(commentsCount)}</Text>
              </HStack>
            )}
          </HStack>
        </HStack>

        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "4xl" }}
          lineHeight={1.12}
          color={theme.titleColor}
          whiteSpace="pre-wrap"
        >
          {article.title}
        </Heading>

        <VStack align="stretch" spacing={0.5}>
          <Text color={theme.descColor} lineHeight={1.65} noOfLines={2}>
            {article.description}
          </Text>
        </VStack>

        <HStack spacing={2} flexWrap="wrap" align="center" pt={1} color={metaRowColor} fontSize="sm">
          <HStack spacing={1.5}>
            {article.author?.github ? (
              <Link
                href={`https://github.com/${article.author.github}`}
                isExternal
                aria-label={`Профиль автора ${article.author.name} на GitHub`}
                _hover={{ textDecoration: "none", opacity: 0.9 }}
                _focusVisible={{ boxShadow: ghostFocusShadow }}
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
                _focusVisible={{ boxShadow: ghostFocusShadow }}
              >
                {article.author.github}
              </Link>
            ) : (
              <Text fontWeight={700} color={theme.titleColor}>
                {article.author?.name ?? "AIFFA"}
              </Text>
            )}
          </HStack>

          <Tooltip
            label={interactions.isStarred ? "Убрать оценку" : "Поставить оценку"}
            hasArrow
            placement="top"
            openDelay={250}
          >
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
                  stroke: interactions.isStarred ? starIconActiveColor : actionIconColor,
                  fill: "none",
                },
              }}
              _hover={{ bg: ghostHoverBg }}
              _active={{ bg: ghostActiveBg }}
              _focusVisible={{ boxShadow: ghostFocusShadow }}
            >
              <HStack spacing={1.5} align="center">
                <Icon as={FiStar} boxSize={4} aria-hidden />
                <Text as="span" fontWeight={600}>
                  {interactions.displayStars}
                </Text>
              </HStack>
            </Button>
          </Tooltip>

          <Tooltip
            label={interactions.isSaved ? "Убрать из сохранённых" : "Сохранить"}
            hasArrow
            placement="top"
            openDelay={250}
          >
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
                  stroke: interactions.isSaved ? savedIconActiveColor : actionIconColor,
                  fill: "none",
                },
              }}
              _hover={{ bg: ghostHoverBg }}
              _active={{ bg: ghostActiveBg }}
              _focusVisible={{ boxShadow: ghostFocusShadow }}
            />
          </Tooltip>

          <Tooltip
            label={interactions.isShareCopied ? "Скопировано!" : "Скопировать ссылку"}
            hasArrow
            placement="top"
            openDelay={250}
          >
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
                  stroke: interactions.isShareCopied ? copiedIconColor : actionIconColor,
                  fill: "none",
                },
              }}
              _hover={{ bg: ghostHoverBg }}
              _active={{ bg: ghostActiveBg }}
              _focusVisible={{ boxShadow: ghostFocusShadow }}
            />
          </Tooltip>
        </HStack>
      </VStack>
    </VStack>
  );
};


