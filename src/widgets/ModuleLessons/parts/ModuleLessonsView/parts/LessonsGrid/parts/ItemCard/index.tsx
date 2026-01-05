import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { ChevronRightIcon, CheckIcon, StarIcon } from '@chakra-ui/icons';
import { FiEye, FiMessageCircle } from 'react-icons/fi';
import type { ItemCardProps } from './types';
import { IndexChip } from '../../../../../LessonCard/parts/IndexChip';
import { TasksBadge } from '../../../../../LessonCard/parts/Badges/TasksBadge';
import { OpenLinkBadge } from '../../../../../LessonCard/parts/Badges/OpenLinkBadge';
import { AuthorsBadge } from '../../../ProjectLink/parts/AuthorsBadge';
import { getItemCardMeta } from './data';
import { formatCount } from 'shared/functions/formatCount';
import { buildTopBefore, getLessonDateLabel } from './helpers';

export const ItemCard: React.FC<ItemCardProps> = ({ lesson, href, idx, start, colors, levelAccent, arrowAnimationCss, done }) => {
  const topBefore = buildTopBefore(levelAccent);
  const { totalTasks, authors, starsCount, views, commentsCount, metaColor, accentColor, chipBorder } =
    getItemCardMeta(lesson, colors);
  const dateLabel = getLessonDateLabel(lesson);
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

        <Box
          mt={1}
          display="flex"
          alignItems="center"
          gap={3}
          fontSize="xs"
          color={metaColor}
        >
          <Box display="inline-flex" alignItems="center" gap={3} rowGap={1} flexWrap="wrap" minW={0}>
            <Box as="span" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
              <Box as="span">{formatCount(starsCount)}</Box>
              <StarIcon boxSize={3} color="yellow.400" />
            </Box>
            <Box as="span" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
              <Box as="span">{formatCount(views)}</Box>
              <Icon as={FiEye} boxSize={3.5} flexShrink={0} />
            </Box>
            <Box as="span" display="inline-flex" alignItems="center" gap={1} flexShrink={0}>
              <Box as="span">{formatCount(commentsCount)}</Box>
              <Icon as={FiMessageCircle} boxSize={3.5} flexShrink={0} />
            </Box>
          </Box>
        </Box>

        <Box as="div" className="badges-row">
          <Box mt="auto" pt={1} display="flex" flexDirection="column" gap={1} minW={0}>
            <Box as="span" display="inline-flex" alignItems="center" gap={2} flexWrap="wrap" minW={0}>
              <TasksBadge total={totalTasks} accentColor={accentColor} chipBorder={chipBorder} />
              {authors.length > 0 ? <AuthorsBadge authors={authors} colors={colors} /> : null}
            </Box>
            {dateLabel ? (
              <Box as="span" display="inline-flex" alignItems="center" minW={0}>
                <OpenLinkBadge accentColor={accentColor} chipBorder={chipBorder} dateLabel={dateLabel} />
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Box as={ChevronRightIcon} boxSize={5} color={accentColor} opacity={0.7} ml={2} display={{ base: 'none', md: 'block' }} animation={arrowAnimationCss} />
    </Box>
  );
};


