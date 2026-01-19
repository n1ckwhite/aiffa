"use client";

import React from "react";
import { Box, Icon, Text, VisuallyHidden } from "@chakra-ui/react";
import { FiEye, FiMessageCircle } from "react-icons/fi";
import { formatCount } from "shared/functions/formatCount";
import { StarRatingIcon } from "shared/ui/StarRatingIcon";
import { MaterialCardStatsProps } from "./types";

export const MaterialCardStats: React.FC<MaterialCardStatsProps> = ({
  starsCount,
  viewsCount,
  commentsCount,
  isStarred,
  metaColor,
}) => {
  return (
    <Box mt={1} fontSize="xs" color={metaColor}>
      <Box
        as="dl"
        m={0}
        display="inline-flex"
        alignItems="center"
        gap={3}
        rowGap={1}
        flexWrap="wrap"
        minW={0}
        aria-label="Статистика материала"
      >
        <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
          <Text as="dt" m={0} display="inline-flex" alignItems="center" lineHeight="1" order={1}>
            <VisuallyHidden>Звёзды</VisuallyHidden>
            <Box aria-hidden="true" display="inline-flex" alignItems="center">
              <StarRatingIcon isActive={isStarred} activeBoxSize={3} inactiveBoxSize={3.5} />
            </Box>
          </Text>
          <Text as="dd" m={0} fontWeight="semibold" lineHeight="1" order={0}>
            {formatCount(starsCount)}
          </Text>
        </Box>

        <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
          <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1" order={1}>
            <Icon as={FiEye} boxSize={3.5} flexShrink={0} aria-hidden="true" />
            <VisuallyHidden>Просмотры</VisuallyHidden>
          </Text>
          <Text as="dd" m={0} fontWeight="semibold" lineHeight="1" order={0}>
            {formatCount(viewsCount)}
          </Text>
        </Box>

        <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
          <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1" order={1}>
            <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} aria-hidden="true" />
            <VisuallyHidden>Комментарии</VisuallyHidden>
          </Text>
          <Text as="dd" m={0} fontWeight="semibold" lineHeight="1" order={0}>
            {formatCount(commentsCount)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
