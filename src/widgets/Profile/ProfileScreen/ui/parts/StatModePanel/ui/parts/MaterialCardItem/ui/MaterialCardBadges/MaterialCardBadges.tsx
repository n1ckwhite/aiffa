"use client";

import React from "react";
import { Box, VisuallyHidden } from "@chakra-ui/react";
import PillBadge from "shared/ui/PillBadge";
import { TasksBadge } from "widgets/ModuleLessons/parts/LessonCard/parts/Badges/TasksBadge";
import { OpenLinkBadge } from "widgets/ModuleLessons/parts/LessonCard/parts/Badges/OpenLinkBadge";
import { AuthorBadgeLink } from "../AuthorBadgeLink/AuthorBadgeLink";
import { MaterialCardBadgesProps } from "./types";

export const MaterialCardBadges: React.FC<MaterialCardBadgesProps> = ({
  tasksCount,
  accentColor,
  chipBorder,
  levelLabel,
  levelScheme,
  showStatusBadge,
  statusLabel,
  statusBg,
  statusBorderColor,
  statusTextColor,
  authorUsername,
  authorName,
  dateLabel,
  dateIso,
}) => {
  return (
    <Box as="div" className="badges-row">
      <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={1} minW={0}>
        <Box as="span" display="inline-flex" alignItems="center" gap={2} flexWrap="wrap" minW={0}>
          <TasksBadge total={tasksCount} accentColor={accentColor} chipBorder={chipBorder} />
          {levelLabel && levelScheme ? (
            <PillBadge colorScheme={levelScheme as any} variant="outline">
              {levelLabel}
            </PillBadge>
          ) : null}
          {showStatusBadge ? (
            <Box
              as="span"
              fontSize="xs"
              fontWeight="semibold"
              color={statusTextColor}
              bg={statusBg}
              borderWidth="1px"
              borderColor={statusBorderColor}
              px={2.5}
              py={1}
              borderRadius="full"
              whiteSpace="nowrap"
              flexShrink={0}
            >
              {statusLabel}
            </Box>
          ) : null}
          <AuthorBadgeLink
            accentColor={accentColor}
            chipBorder={chipBorder}
            authorUsername={authorUsername}
            authorName={authorName}
            to="/creators"
            isLink={false}
          />
        </Box>

        {dateLabel ? (
          <Box as="span" display="inline-flex" alignItems="center" minW={0}>
            <OpenLinkBadge accentColor={accentColor} chipBorder={chipBorder} dateLabel={dateLabel} />
            <VisuallyHidden>
              <Box as="time" dateTime={dateIso}>
                {dateLabel}
              </Box>
            </VisuallyHidden>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
