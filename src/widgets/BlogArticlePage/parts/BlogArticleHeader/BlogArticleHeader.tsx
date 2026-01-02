"use client";

import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { BlogArticleHeaderProps } from "./types";
import { AuthorActionsRow, BackToBlogLink, TagsAndMetaRow, TitleAndDescription } from "./parts";

export const BlogArticleHeader: React.FC<BlogArticleHeaderProps> = ({
  article,
  formattedDate,
  theme,
  colors,
  interactions,
  commentsCount,
}) => {
  return (
    <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
      <HStack justify="space-between" align="center" flexWrap="wrap" gap={3}>
        <BackToBlogLink />
      </HStack>

      <VStack align="stretch" spacing={2}>
        <TagsAndMetaRow
          article={article}
          formattedDate={formattedDate}
          commentsCount={commentsCount}
          colors={{
            metaRowColor: colors.metaRowColor,
            calendarMetaColor: colors.calendarMetaColor,
            clockMetaColor: colors.clockMetaColor,
            commentsMetaColor: colors.commentsMetaColor,
          }}
        />

        <TitleAndDescription title={article.title} description={article.description} theme={theme} />

        <AuthorActionsRow
          article={article}
          theme={theme}
          colors={{
            metaRowColor: colors.metaRowColor,
            actionIconColor: colors.actionIconColor,
            copiedIconColor: colors.copiedIconColor,
            ghostHoverBg: colors.ghostHoverBg,
            ghostActiveBg: colors.ghostActiveBg,
            ghostFocusShadow: colors.ghostFocusShadow,
            starIconActiveColor: colors.starIconActiveColor,
            savedIconActiveColor: colors.savedIconActiveColor,
          }}
          interactions={interactions}
        />
      </VStack>
    </VStack>
  );
};


