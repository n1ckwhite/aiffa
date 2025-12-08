import React from 'react';
import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { ChevronRightIcon, StarIcon, ViewIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import type { ProjectLinkProps } from './types';
import { IndexChip } from '../../../LessonCard/parts/IndexChip';
import { AuthorsBadge } from './parts/AuthorsBadge';
import { OpenProjectsBadge } from './parts/OpenProjectsBadge';
import { buildTopBarBefore } from './animations';
import { PROJECT_LINK_TEXTS } from './data';

export const ProjectLink: React.FC<ProjectLinkProps> = ({ mod, colors, levelAccent, arrowAnimationCss }) => {
  if (!mod?.project) return null;
  const indexBg = (colors as any).indexBg ?? (colors as any).blue?.indexBg ?? 'blue.50';
  const accentColor = (colors as any).blue?.accent ?? colors.accent ?? 'blue.600';
  const starsCount = Number((mod.project as any)?.ratingCount ?? 0);
  const views = Number((mod.project as any)?.views ?? 0);
  const metaColor = (colors as any).descColor ?? 'gray.500';

  const formatCount = (value: number): string => {
    if (value >= 1_000_000) {
      const millions = value / 1_000_000;
      return millions >= 10 ? `${Math.round(millions)}M` : `${millions.toFixed(1)}M`;
    }
    if (value >= 1_000) {
      const thousands = value / 1_000;
      return thousands >= 10 ? `${Math.round(thousands)}k` : `${thousands.toFixed(1)}k`;
    }
    return String(value);
  };
  return (
    <Box as={RouterLink} to={`/learn/${mod.id}/projects`} borderWidth="2px" borderColor={colors.borderColor} bg={colors.cardBg} transition="all 180ms ease" p={5} borderRadius="xl" display="flex" gap={3} alignItems="flex-start" position="relative" overflow="hidden" boxShadow={'none'} mt={1} sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { background: colors.cardHoverBg, textDecoration: 'none', transform: 'translateY(-4px)', borderColor: levelAccent, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)', '&::before': { transform: 'scaleX(1)' } } } }} _before={buildTopBarBefore(levelAccent)}>
      <IndexChip done={false} indexBg={indexBg} accentColor={accentColor}>P</IndexChip>
      <VStack align="start" spacing={1} flex={1} minW={0}>
        <Text fontWeight="semibold" noOfLines={2} wordBreak="break-word" overflowWrap="anywhere" style={{ hyphens: 'auto' }}>{PROJECT_LINK_TEXTS.title}</Text>
        <HStack spacing={3} fontSize="xs" color={metaColor}>
          <HStack spacing={1}>
            <StarIcon boxSize={3} color="yellow.400" />
            <Box as="span">{formatCount(starsCount)}</Box>
          </HStack>
          <HStack spacing={1}>
            <ViewIcon boxSize={3} />
            <Box as="span">{formatCount(views)}</Box>
          </HStack>
        </HStack>
        <HStack spacing={2} flexWrap="wrap">
          <AuthorsBadge authors={(mod.project as any)?.authors} colors={colors} />
          <OpenProjectsBadge colors={colors} arrowAnimationCss={arrowAnimationCss} />
        </HStack>
      </VStack>
      <Box as={ChevronRightIcon} boxSize={5} color={colors.blue.accent} opacity={0.7} ml={2} display={{ base: 'none', md: 'block' }} animation={arrowAnimationCss} />
    </Box>
  );
};


