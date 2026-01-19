"use client";

import React from "react";
import { Box, Icon, Text, VisuallyHidden } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiEye, FiMessageCircle } from "react-icons/fi";
import { AppBoxLink } from "shared/ui/AppLink";
import PillBadge from "shared/ui/PillBadge";
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

export const MaterialCardItem: React.FC<MaterialCardItemProps> = ({ item, listIndex }) => {
  const { colors, metaColor, accentColor, chipBorder } = useMaterialCardItemColors();

  const status = item.status ?? "success";
  const level = item.level ?? "beginner";
  const levelLabel = level === "beginner" ? "Начальный" : level === "middle" ? "Средний" : "Продвинутый";
  const levelScheme = level === "beginner" ? "green" : level === "middle" ? "yellow" : "red";
  const levelAccent =
    level === "beginner"
      ? colors?.beginnerBorder ?? "green.400"
      : level === "middle"
        ? colors?.intermediateBorder ?? "yellow.400"
        : colors?.advancedBorder ?? "red.400";
  const showIndexChip = item.status === undefined;
  const showIndexNumber = item.status !== undefined && typeof listIndex === "number";
  const indexLabel = typeof listIndex === "number" ? listIndex + 1 : null;
  const showStatusBadge = item.status === "pending";
  const statusLabel = "В обработке";
  const statusBg = "yellow.100";
  const statusBorderColor = "yellow.300";
  const statusTextColor = "yellow.700";
  const statusBorder = colors.borderColor;
  const statusBorderHover = levelAccent;
  const topBefore = buildTopBefore(levelAccent);
  const titleId = React.useId();

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

        <Box display="flex" alignItems="center" gap={2}>
          {showIndexChip ? (
            <IndexChip
              done={status === "success"}
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
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={3} minW={0}>
            <Text
              as="h3"
              id={titleId}
              fontWeight="semibold"
              noOfLines={2}
              wordBreak="break-word"
              overflowWrap="anywhere"
              whiteSpace="normal"
              style={{ hyphens: "auto" }}
              flex={1}
              minW={0}
              m={0}
            >
              {item.title}
            </Text>
          </Box>

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
                  {formatCount(item.starsCount)}
                </Text>
              </Box>

              <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1" order={1}>
                  <Icon as={FiEye} boxSize={3.5} flexShrink={0} aria-hidden="true" />
                  <VisuallyHidden>Просмотры</VisuallyHidden>
                </Text>
                <Text as="dd" m={0} fontWeight="semibold" lineHeight="1" order={0}>
                  {formatCount(item.viewsCount)}
                </Text>
              </Box>

              <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1" order={1}>
                  <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} aria-hidden="true" />
                  <VisuallyHidden>Комментарии</VisuallyHidden>
                </Text>
                <Text as="dd" m={0} fontWeight="semibold" lineHeight="1" order={0}>
                  {formatCount(item.commentsCount)}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box as="div" className="badges-row">
            <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={1} minW={0}>
              <Box as="span" display="inline-flex" alignItems="center" gap={2} flexWrap="wrap" minW={0}>
                <TasksBadge total={item.tasksCount} accentColor={accentColor} chipBorder={chipBorder} />
                {item.level ? (
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
                  authorUsername={item.authorUsername}
                  authorName={item.authorName}
                  to="/creators"
                  isLink={false}
                />
              </Box>

              {dateLabel ? (
                <Box as="span" display="inline-flex" alignItems="center" minW={0}>
                  <OpenLinkBadge accentColor={accentColor} chipBorder={chipBorder} dateLabel={dateLabel} />
                  <VisuallyHidden>
                    <Box as="time" dateTime={item.dateIso}>
                      {dateLabel}
                    </Box>
                  </VisuallyHidden>
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
        />
      </AppBoxLink>
    </Box>
  );
};

