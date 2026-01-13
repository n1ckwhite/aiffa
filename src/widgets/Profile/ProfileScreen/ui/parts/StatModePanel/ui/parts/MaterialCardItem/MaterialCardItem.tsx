"use client";

import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiEye, FiMessageCircle } from "react-icons/fi";
import { AppBoxLink } from "shared/ui/AppLink";
import { formatCount } from "shared/functions/formatCount";
import { StarRatingIcon } from "shared/ui/StarRatingIcon";
import { arrowAnimCss } from "widgets/ModuleLessons/parts/ModuleLessonsView/animations";
import { buildTopBefore } from "widgets/ModuleLessons/parts/ModuleLessonsView/parts/LessonsGrid/parts/ItemCard/helpers";
import { IndexChip } from "widgets/ModuleLessons/parts/LessonCard/parts/IndexChip";
import { TasksBadge } from "widgets/ModuleLessons/parts/LessonCard/parts/Badges/TasksBadge";
import { OpenLinkBadge } from "widgets/ModuleLessons/parts/LessonCard/parts/Badges/OpenLinkBadge";
import { MaterialCardItemProps } from "./types";
import { useMaterialCardItemColors } from "./colors/useMaterialCardItemColors";
import { useMaterialCardItemMeta } from "./hooks/useMaterialCardItemMeta";
import { AuthorBadgeLink } from "./ui/AuthorBadgeLink/AuthorBadgeLink";

export const MaterialCardItem: React.FC<MaterialCardItemProps> = ({ item }) => {
  const { colors, levelAccent, metaColor, accentColor, chipBorder } = useMaterialCardItemColors();

  const done = true;
  const topBefore = buildTopBefore(levelAccent);

  const { dateLabel, cardIndexLabel, isStarred } = useMaterialCardItemMeta({
    to: item.to,
    dateIso: item.dateIso,
  });

  return (
    <Box as="li" listStyleType="none">
      <Box
        borderWidth="2px"
        borderColor={done ? "green.300" : colors.borderColor}
        bg={colors.cardBg}
        transition="all 180ms ease"
        p={5}
        borderRadius="xl"
        display="flex"
        h="100%"
        gap={3}
        alignItems="flex-start"
        position="relative"
        overflow="hidden"
        boxShadow="none"
        sx={{
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              background: colors.cardHoverBg,
              textDecoration: "none",
              transform: "translateY(-4px)",
              borderColor: done ? "green.400" : levelAccent,
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
              "&::before": { transform: "scaleX(1)" },
            },
          },
        }}
        _before={done ? undefined : topBefore}
      >
        {done && (
          <Box position="absolute" inset={0} borderRadius="16px" bg="green.500" opacity={0.06} pointerEvents="none" zIndex={0} />
        )}
        
        <AppBoxLink
          to={item.to}
          prefetch={false}
          aria-label={item.title ? `Открыть материал: ${item.title}` : "Открыть материал"}
          position="absolute"
          inset={0}
          zIndex={1}
          borderRadius="xl"
          _focusVisible={{ outline: "2px solid", outlineColor: "blue.300", outlineOffset: "2px" }}
          style={{ textDecoration: "none" }}
        />

        <IndexChip
          done={done}
          indexBg={colors?.indexBg ?? colors?.blue?.indexBg ?? "blue.50"}
          accentColor={accentColor}
        >
          {cardIndexLabel}
        </IndexChip>

        <Box position="relative" zIndex={2} pointerEvents="none" flex={1} minW={0} display="flex" flexDirection="column" height="100%" justifyContent="space-between">
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={3} minW={0}>
            <Box
              as="div"
              fontWeight="semibold"
              noOfLines={2}
              wordBreak="break-word"
              overflowWrap="anywhere"
              whiteSpace="normal"
              style={{ hyphens: "auto" }}
              flex={1}
              minW={0}
            >
              {item.title}
            </Box>
          </Box>

          <Box mt={1} display="flex" alignItems="center" gap={3} fontSize="xs" color={metaColor}>
            <Box display="inline-flex" alignItems="center" gap={3} rowGap={1} flexWrap="wrap" minW={0}>
              <Box as="span" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Box as="span">{formatCount(item.starsCount)}</Box>
                <StarRatingIcon isActive={isStarred} activeBoxSize={3} inactiveBoxSize={3.5} />
              </Box>
              <Box as="span" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Box as="span">{formatCount(item.viewsCount)}</Box>
                <Icon as={FiEye} boxSize={3.5} flexShrink={0} />
              </Box>
              <Box as="span" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Box as="span">{formatCount(item.commentsCount)}</Box>
                <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} />
              </Box>
            </Box>
          </Box>

          <Box as="div" className="badges-row">
            <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={1} minW={0}>
              <Box as="span" display="inline-flex" alignItems="center" gap={2} flexWrap="wrap" minW={0}>
                <TasksBadge total={item.tasksCount} accentColor={accentColor} chipBorder={chipBorder} />
                <AuthorBadgeLink
                  accentColor={accentColor}
                  chipBorder={chipBorder}
                  authorUsername={item.authorUsername}
                  authorName={item.authorName}
                  to="/creators"
                />
              </Box>

              {dateLabel ? (
                <Box as="span" display="inline-flex" alignItems="center" minW={0}>
                  <OpenLinkBadge accentColor={accentColor} chipBorder={chipBorder} dateLabel={dateLabel} />
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>

        <Box
          as={ChevronRightIcon}
          boxSize={5}
          color={accentColor}
          opacity={0.7}
          ml={2}
          display={{ base: "none", md: "block" }}
          animation={arrowAnimCss}
          aria-hidden="true"
          position="relative"
          zIndex={2}
          pointerEvents="none"
        />
      </Box>
    </Box>
  );
};

