"use client";

import React from 'react';
import { Box } from '@chakra-ui/react';
import { ChevronRightIcon, CheckIcon } from '@chakra-ui/icons';
import type { ItemCardProps } from './types';
import { IndexChip } from '../../../../../LessonCard/parts/IndexChip';
import { getItemCardMeta } from './data';
import { buildTopBefore } from './helpers';

export const ItemCard: React.FC<ItemCardProps> = ({ lesson, href, idx, start, colors, levelAccent, arrowAnimationCss, done }) => {
  const topBefore = buildTopBefore(levelAccent);
  const { accentColor } = getItemCardMeta(lesson, colors);
  const cardIndexLabel = done ? <CheckIcon boxSize={3.5} /> : (start + idx + 1);

  return (
    <Box
      as="a"
      href={href}
      aria-label={lesson?.title ? `Открыть материал: ${lesson.title}` : "Открыть материал"}
      w="full"
      minW={0}
      borderWidth="2px"
      borderColor={done ? 'green.300' : colors.borderColor}
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
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            background: colors.cardHoverBg,
            textDecoration: 'none',
            transform: 'translateY(-4px)',
            borderColor: done ? 'green.400' : levelAccent,
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
            '&::before': { transform: 'scaleX(1)' },
          },
        },
      }}
      _before={done ? undefined : topBefore}
    >
      {done && (
        <Box position="absolute" inset={0} borderRadius="16px" bg="green.500" opacity={0.06} pointerEvents="none" zIndex={0} />
      )}
      <IndexChip
        done={done}
        indexBg={colors?.indexBg ?? colors?.blue?.indexBg ?? 'blue.50'}
        accentColor={accentColor}
      >
        {cardIndexLabel}
      </IndexChip> 
      <Box flex={1} minW={0} display="flex" flexDirection="column" height="100%" justifyContent="space-between">
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={3} minW={0}>
          <Box
            as="div"
            fontWeight="semibold"
            noOfLines={2}
            wordBreak="break-word"
            overflowWrap="anywhere"
            whiteSpace="normal"
            style={{ hyphens: 'auto' }}
            flex={1}
            minW={0}
          >
            {lesson?.title ?? ""}
          </Box>
        </Box>
      </Box>
      <Box as={ChevronRightIcon} boxSize={5} color={accentColor} opacity={0.7} ml={2} display={{ base: 'none', md: 'block' }} animation={arrowAnimationCss} />
    </Box>
  );
};


