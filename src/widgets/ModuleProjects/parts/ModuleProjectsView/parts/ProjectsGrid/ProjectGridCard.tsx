"use client";

import React from "react";
import { Avatar, Box, HStack, Icon, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiEye, FiMessageCircle } from "react-icons/fi";
import { AppBoxLink } from "shared/ui/AppLink";
import { formatCount } from "shared/functions/formatCount";
import { formatRuDate } from "shared/functions/formatRuDate";
import { useLocalStorageFlag } from "shared/hooks/useLocalStorageFlag";
import { OpenLinkBadge } from "widgets/ModuleLessons/parts/LessonCard/parts/Badges/OpenLinkBadge";
import type { ProjectItem } from "../../../../hooks/useProjects";
import { arrowLoop } from "./animations";
import { ProjectGridCardProps } from "./types";
import { StarRatingIcon } from "shared/ui/StarRatingIcon";

const getProjectDateLabel = (project: ProjectItem): string => {
  const iso = typeof project.updatedAt === "string" && project.updatedAt.trim()
    ? project.updatedAt.trim()
    : typeof project.createdAt === "string" && project.createdAt.trim()
      ? project.createdAt.trim()
      : "";

  return formatRuDate(iso);
};

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({ modId, project, colors }) => {
  const projectId = String(project?.id ?? "");
  const { value: isStarred } = useLocalStorageFlag(`project-starred:${projectId}`);
  const dateLabel = getProjectDateLabel(project);
  const hasAuthor = Array.isArray(project.authors) && project.authors.length > 0 && Boolean(project.authors[0]);
  const firstAuthor = hasAuthor ? project.authors![0] : null;

  const handleOpenAuthor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!firstAuthor?.username) return;

    try {
      window.open(`https://github.com/${firstAuthor.username}`, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBoxLink
      to={`/learn/${modId}/projects/${project.id}`}
      aria-label={`Открыть проект: ${project.title}`}
      w="full"
      minW={0}
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
      _hover={{
        background: colors.cardHoverBg,
        textDecoration: "none",
        transform: "translateY(-4px)",
        borderColor: colors.heroBorder,
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box position="relative" minW="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
        <Box
          borderRadius="full"
          bg={colors.indexBg}
          color={colors.indexTextColor}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
          fontWeight="bold"
          w="28px"
          h="28px"
          borderWidth="2px"
          borderColor={colors.chipBorder}
        >
          P
        </Box>
      </Box>

      <Box flex="1" minW={0} display="flex" flexDirection="column" h="100%">
        <Text
          fontWeight="semibold"
          noOfLines={2}
          wordBreak="break-word"
          overflowWrap="anywhere"
          style={{ hyphens: "auto" }}
        >
          {project.title}
        </Text>

        <HStack spacing={3} rowGap={1} flexWrap="wrap" fontSize="xs" color={colors.descColor} mt={1} minW={0}>
          <HStack spacing={1} flexShrink={0}>
            <Box as="span">{formatCount(Number(project.ratingCount ?? 0))}</Box>
            <StarRatingIcon isActive={isStarred} activeBoxSize={3} inactiveBoxSize={3.5} />
          </HStack>

          <HStack spacing={1} flexShrink={0}>
            <Box as="span">{formatCount(Number(project.views ?? 0))}</Box>
            <Icon as={FiEye} boxSize={3.5} flexShrink={0} />
          </HStack>

          <HStack spacing={1} flexShrink={0}>
            <Box as="span">{formatCount(Number(project.commentsCount ?? 0))}</Box>
            <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} />
          </HStack>
        </HStack>

        <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={2} minW={0}>
          {firstAuthor ? (
            <HStack spacing={2} flexWrap="wrap" minW={0}>
              <Box
                fontSize="xs"
                color={colors.accent}
                bg="transparent"
                px={2.5}
                py={1}
                borderRadius="full"
                borderWidth="1px"
                borderStyle="dashed"
                borderColor={colors.chipBorder}
                display="inline-flex"
                alignItems="center"
                gap={2}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                <Avatar
                  as="button"
                  onClick={handleOpenAuthor}
                  onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                  onTouchStart={(e: React.TouchEvent<HTMLButtonElement>) => e.stopPropagation()}
                  name={firstAuthor.name}
                  src={`https://avatars.githubusercontent.com/${firstAuthor.username}?s=40`}
                  boxSize="24px"
                  border="0"
                  aria-label={`GitHub ${firstAuthor.name}`}
                />
                Автор
              </Box>
            </HStack>
          ) : null}

          {dateLabel ? (
            <Box as="span" display="inline-flex" alignItems="center" minW={0}>
              <OpenLinkBadge accentColor={colors.accent} chipBorder={colors.chipBorder} dateLabel={dateLabel} />
            </Box>
          ) : null}
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
      />
    </AppBoxLink>
  );
};


