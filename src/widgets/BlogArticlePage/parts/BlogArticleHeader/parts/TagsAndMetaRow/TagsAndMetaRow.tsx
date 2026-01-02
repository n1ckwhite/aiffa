"use client";

import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import PillBadge from "@/shared/ui/PillBadge";
import { formatCount } from "@/shared/functions/formatCount";
import { FiCalendar, FiClock, FiMessageCircle } from "react-icons/fi";
import { getTagIcon } from "@/widgets/BlogArticlePage/helpers/getTagIcon";
import type { TagsAndMetaRowProps } from "./types";

export const TagsAndMetaRow: React.FC<TagsAndMetaRowProps> = ({ article, formattedDate, commentsCount, colors }) => {
  return (
    <HStack spacing={3} flexWrap="wrap" align="center" color={colors.metaRowColor}>
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

      <HStack spacing={3} fontSize="sm" color={colors.metaRowColor}>
        <HStack spacing={1.5}>
          <Icon as={FiCalendar} color={colors.calendarMetaColor} aria-hidden />
          <Text>{formattedDate}</Text>
        </HStack>
        <HStack spacing={1.5}>
          <Icon as={FiClock} color={colors.clockMetaColor} aria-hidden />
          <Text>{article.readingTime ?? "—"}</Text>
        </HStack>
        {typeof commentsCount === "number" && (
          <HStack spacing={1.5}>
            <Icon as={FiMessageCircle} color={colors.commentsMetaColor} aria-hidden />
            <Text>{formatCount(commentsCount)}</Text>
          </HStack>
        )}
      </HStack>
    </HStack>
  );
};


