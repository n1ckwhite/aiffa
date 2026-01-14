"use client";

import React from "react";
import { Box, Icon, Text, VisuallyHidden } from "@chakra-ui/react";
import { CheckIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FiEye, FiMessageCircle } from "react-icons/fi";
import { AppBoxLink } from "shared/ui/AppLink";
import { formatCount } from "shared/functions/formatCount";
import { OpenLinkBadge } from "widgets/ModuleLessons/parts/LessonCard/parts/Badges/OpenLinkBadge";
import { StarRatingIcon } from "shared/ui/StarRatingIcon";
import { useLocalStorageFlag } from "shared/hooks/useLocalStorageFlag";
import { formatRuDate } from "shared/functions/formatRuDate";
import { useModuleProjectsColors } from "widgets/ModuleProjects/colors";
import { arrowLoop } from "widgets/ModuleProjects/parts/ModuleProjectsView/parts/ProjectsGrid/animations";
import { ProjectCardItemProps } from "./types";
import { AuthorBadgeLink } from "../MaterialCardItem/ui/AuthorBadgeLink/AuthorBadgeLink";
import { IndexChip } from "widgets/ModuleLessons/parts/LessonCard/parts/IndexChip";

export const ProjectCardItem: React.FC<ProjectCardItemProps> = ({ item }) => {
  const colors = useModuleProjectsColors();
  const dateLabel = formatRuDate(item.dateIso);
  const { value: isStarred } = useLocalStorageFlag(`project-starred:${item.to}`);
  const titleId = React.useId();

  return (
    <Box as="li" listStyleType="none">
      <Box
        borderWidth="2px"
        borderColor={colors.borderColor}
        bg={colors.cardBg}
        transition="all 180ms ease"
        p={5}
        borderRadius="xl"
        display="flex"
        gap={3}
        alignItems="flex-start"
        position="relative"
        overflow="hidden"
        boxShadow="none"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "4px",
          borderTopLeftRadius: "12px",
          borderBottomLeftRadius: "12px",
          background: colors.headerAccent,
          opacity: 0.9,
        }}
        sx={{
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              background: colors.cardHoverBg,
              textDecoration: "none",
              transform: "translateY(-4px)",
              borderColor: colors.heroBorder,
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      >
        <AppBoxLink
          to={item.to}
          prefetch={false}
          aria-label={`Открыть проект: ${item.title}`}
          position="absolute"
          inset={0}
          zIndex={1}
          borderRadius="xl"
          _focusVisible={{ outline: "2px solid", outlineColor: "purple.300", outlineOffset: "2px" }}
          style={{ textDecoration: "none" }}
        />

        <Box position="relative" zIndex={2} pointerEvents="none">
          <IndexChip done indexBg={colors.indexBg} accentColor={colors.accent}>
            <CheckIcon boxSize={3.5} />
          </IndexChip>
        </Box>

        <Box
          as="article"
          aria-labelledby={titleId}
          position="relative"
          zIndex={2}
          pointerEvents="none"
          flex="1"
          minW={0}
          display="flex"
          flexDirection="column"
          h="100%"
        >
          <Text
            as="h3"
            id={titleId}
            fontWeight="semibold"
            noOfLines={2}
            wordBreak="break-word"
            overflowWrap="anywhere"
            style={{ hyphens: "auto" }}
            m={0}
          >
            {item.title}
          </Text>

          <Box mt={1} fontSize="xs" color={colors.descColor} minW={0}>
            <Box
              as="dl"
              m={0}
              display="inline-flex"
              alignItems="center"
              gap={3}
              rowGap={1}
              flexWrap="wrap"
              minW={0}
              aria-label="Статистика проекта"
            >
              <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1">
                  <VisuallyHidden>Звёзды</VisuallyHidden>
                  <Box aria-hidden="true" display="inline-flex" alignItems="center">
                    <StarRatingIcon isActive={Boolean(isStarred)} activeBoxSize={3} inactiveBoxSize={3.5} />
                  </Box>
                </Text>
                <Text as="dd" m={0} fontWeight="semibold" lineHeight="1">
                  {formatCount(item.starsCount)}
                </Text>
              </Box>

              <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1">
                  <Icon as={FiEye} boxSize={3.5} flexShrink={0} aria-hidden="true" />
                  <VisuallyHidden>Просмотры</VisuallyHidden>
                </Text>
                <Text as="dd" m={0} fontWeight="semibold" lineHeight="1">
                  {formatCount(item.viewsCount)}
                </Text>
              </Box>

              <Box as="div" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
                <Text as="dt" m={0} display="inline-flex" alignItems="center" gap={1} lineHeight="1">
                  <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} aria-hidden="true" />
                  <VisuallyHidden>Комментарии</VisuallyHidden>
                </Text>
                <Text as="dd" m={0} fontWeight="semibold" lineHeight="1">
                  {formatCount(item.commentsCount)}
                </Text>
              </Box>
            </Box>
          </Box>

          <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={2} minW={0}>
            <Box as="div" display="inline-flex" alignItems="center" gap={2} flexWrap="wrap" minW={0}>
              <AuthorBadgeLink
                accentColor={colors.accent}
                chipBorder={colors.chipBorder}
                authorUsername={item.authorUsername}
                authorName={item.authorName}
                to="/creators"
              />
            </Box>

            <Box as="span" display="inline-flex" alignItems="center" minW={0}>
              <OpenLinkBadge accentColor={colors.accent} chipBorder={colors.chipBorder} dateLabel={dateLabel} />
              <VisuallyHidden>
                <Box as="time" dateTime={item.dateIso}>
                  {dateLabel}
                </Box>
              </VisuallyHidden>
            </Box>
          </Box>
        </Box>

        <Box
          as={ChevronRightIcon}
          boxSize={5}
          color={colors.accent}
          opacity={0.7}
          ml={2}
          alignSelf="start"
          animation={`${arrowLoop} 1200ms ease-in-out infinite`}
          display={{ base: "none", md: "block" }}
          aria-hidden="true"
          position="relative"
          zIndex={2}
          pointerEvents="none"
        />
      </Box>
    </Box>
  );
};

