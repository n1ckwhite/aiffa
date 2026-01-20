"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { AppBoxLink } from "shared/ui/AppLink";
import { arrowAnimCss } from "widgets/ModuleLessons/parts/ModuleLessonsView/animations";
import { IndexChip } from "widgets/ModuleLessons/parts/LessonCard/parts/IndexChip";
import { MaterialCardItemProps } from "./types";
import { useMaterialCardItemColors } from "./colors/useMaterialCardItemColors";
import { useMaterialCardItemMeta } from "./hooks/useMaterialCardItemMeta/useMaterialCardItemMeta";
import { useMaterialCardItemLevel } from "./hooks/useMaterialCardItemLevel/useMaterialCardItemLevel";
import { useMaterialCardItemStatus } from "./hooks/useMaterialCardItemStatus/useMaterialCardItemStatus";
import { useMaterialCardItemIndex } from "./hooks/useMaterialCardItemIndex/useMaterialCardItemIndex";
import { MaterialCardHeader } from "./ui/MaterialCardHeader/MaterialCardHeader";
import { MaterialCardStats } from "./ui/MaterialCardStats/MaterialCardStats";
import { MaterialCardBadges } from "./ui/MaterialCardBadges/MaterialCardBadges";

export const MaterialCardItem: React.FC<MaterialCardItemProps> = ({ item, listIndex }) => {
  const { colors, metaColor, accentColor, chipBorder, getLevelAccent, getLevelScheme, statusBadgeColors } =
    useMaterialCardItemColors();

  const titleId = React.useId();
  const { levelLabel, levelScheme, levelAccent } = useMaterialCardItemLevel({
    level: item.level,
    getLevelAccent,
    getLevelScheme,
  });
  const {
    isCompletedMaterial,
    isSuccess,
    showStatusBadge,
    statusLabel,
    statusBg,
    statusBorderColor,
    statusTextColor,
    statusBorder,
    statusBorderHover,
    topBefore,
  } = useMaterialCardItemStatus({
    status: item.status,
    colors,
    levelAccent,
    statusBadgeColors,
  });
  const { showIndexChip, showIndexNumber, indexLabel } = useMaterialCardItemIndex({
    listIndex,
    isCompletedMaterial,
  });

  const { dateLabel, cardIndexLabel, isStarred } = useMaterialCardItemMeta({
    to: item.to,
    dateIso: item.dateIso,
  });

  return (
    <Box as="li" listStyleType="none">
      <AppBoxLink
        to={item.to}
        prefetch={false}
        aria-label={item.title ? `Открыть материал: ${item.title}` : "Открыть материал"}
        w="full"
        minW={0}
        borderWidth="2px"
        borderColor={statusBorder}
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
        _focusVisible={{ outline: "2px solid", outlineColor: "blue.300", outlineOffset: "2px" }}
        sx={{
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              background: colors.cardHoverBg,
              textDecoration: "none",
              transform: "translateY(-4px)",
              borderColor: statusBorderHover,
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
              "&::before": { transform: "scaleX(1)" },
            },
          },
        }}
        _before={topBefore}
      >
        {isCompletedMaterial && (
          <Box
            position="absolute"
            inset={0}
            borderRadius="16px"
            bg="green.500"
            opacity={0.06}
            pointerEvents="none"
            zIndex={0}
          />
        )}

        <Box display="flex" alignItems="center" gap={2}>
          {showIndexChip ? (
            <IndexChip
              done={isCompletedMaterial || isSuccess}
              indexBg={colors?.indexBg ?? colors?.blue?.indexBg ?? "blue.50"}
              accentColor={accentColor}
            >
              {cardIndexLabel}
            </IndexChip>
          ) : null}
          {showIndexNumber ? (
            <IndexChip
              done={false}
              indexBg={colors?.indexBg ?? colors?.blue?.indexBg ?? "blue.50"}
              accentColor={accentColor}
            >
              {indexLabel}
            </IndexChip>
          ) : null}
        </Box>

        <Box
          as="article"
          aria-labelledby={titleId}
          flex={1}
          minW={0}
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
        >
          <MaterialCardHeader title={item.title} titleId={titleId} />
          <MaterialCardStats
            starsCount={item.starsCount}
            viewsCount={item.viewsCount}
            commentsCount={item.commentsCount}
            isStarred={isStarred}
            metaColor={metaColor}
          />
          <MaterialCardBadges
            tasksCount={item.tasksCount}
            accentColor={accentColor}
            chipBorder={chipBorder}
            levelLabel={item.level ? levelLabel : undefined}
            levelScheme={item.level ? levelScheme : undefined}
            showStatusBadge={showStatusBadge}
            statusLabel={statusLabel}
            statusBg={statusBg}
            statusBorderColor={statusBorderColor}
            statusTextColor={statusTextColor}
            authorUsername={item.authorUsername}
            authorName={item.authorName}
            dateLabel={dateLabel}
            dateIso={item.dateIso}
          />
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
        />
      </AppBoxLink>
    </Box>
  );
};

