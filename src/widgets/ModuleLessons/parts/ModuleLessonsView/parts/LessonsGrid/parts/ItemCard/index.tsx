import React from 'react';
import { Box } from '@chakra-ui/react';
import { ChevronRightIcon, CheckIcon, StarIcon, ViewIcon, ChatIcon } from '@chakra-ui/icons';
import type { ItemCardProps } from './types';
import { IndexChip } from '../../../../../LessonCard/parts/IndexChip';
import { TasksBadge } from '../../../../../LessonCard/parts/Badges/TasksBadge';
import { OpenLinkBadge } from '../../../../../LessonCard/parts/Badges/OpenLinkBadge';
import { AuthorsBadge } from '../../../ProjectLink/parts/AuthorsBadge';
import { getItemCardMeta } from './data';
import { formatCount } from 'shared/functions/formatCount';

export const ItemCard: React.FC<ItemCardProps> = ({ lesson, href, idx, start, colors, levelAccent, arrowAnimationCss, done }) => {
  const topBefore = {
    content: '""',
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    bg: levelAccent,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease-in-out',
  };

  const {
    totalTasks,
    authors,
    starsCount,
    views,
    commentsCount,
    metaColor,
    accentColor,
    chipBorder,
  } = getItemCardMeta(lesson, colors);

  return (
    <Box
      as="a"
      href={href}
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
      {done && (<Box position="absolute" inset={0} borderRadius="16px" bg="green.500" opacity={0.06} pointerEvents="none" zIndex={0} />)}
      <IndexChip
        done={done}
        indexBg={(colors as any).indexBg ?? (colors as any).blue?.indexBg ?? 'blue.50'}
        accentColor={accentColor}
      >
        {done ? <CheckIcon boxSize={3.5} /> : (start + idx + 1)}
      </IndexChip> 
      <Box flex={1} minW={0} display="flex" flexDirection="column" height="100%" justifyContent="space-between">
        <Box fontWeight="semibold" noOfLines={2} wordBreak="break-word" overflowWrap="anywhere" style={{ hyphens: 'auto' }}>
          {lesson.title}
        </Box>

        <Box
          mt={1}
          display="flex"
          alignItems="center"
          gap={3}
          fontSize="xs"
          color={metaColor}
        >
          <Box as="span" display="inline-flex" alignItems="center" gap={1}>
            <Box as="span">
              {formatCount(starsCount)}
            </Box>
            <StarIcon boxSize={3} color="yellow.400" />
          </Box>
          <Box as="span" display="inline-flex" alignItems="center" gap={1}>
            <Box as="span">
              {formatCount(views)}
            </Box>
            <ViewIcon boxSize={3} />
          </Box>
          <Box as="span" display="inline-flex" alignItems="center" gap={1}>
            <Box as="span">
              {formatCount(commentsCount)}
            </Box>
            <ChatIcon boxSize={3} />
          </Box>
        </Box>

        <Box as="div" className="badges-row">
          <Box as="span" display="inline-flex" alignItems="center" gap={2} flexWrap="wrap" mt="auto" pt={1}>
            <TasksBadge total={totalTasks} accentColor={accentColor} chipBorder={chipBorder} />
            {Array.isArray(authors) && authors.length > 0 && (
              <AuthorsBadge authors={authors} colors={colors} />
            )}
            <OpenLinkBadge accentColor={accentColor} chipBorder={chipBorder} arrowAnimation={arrowAnimationCss} />
          </Box>
        </Box>
      </Box>
      <Box as={ChevronRightIcon} boxSize={5} color={accentColor} opacity={0.7} ml={2} display={{ base: 'none', md: 'block' }} animation={arrowAnimationCss} />
    </Box>
  );
};


