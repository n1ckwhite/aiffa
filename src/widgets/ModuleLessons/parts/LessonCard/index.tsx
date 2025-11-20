import React from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CheckIcon } from '@chakra-ui/icons';
import type { LessonCardProps } from './types';
import { IndexChip } from './parts/IndexChip';
import { TasksBadge } from './parts/Badges/TasksBadge';
import { AuthorsBadge } from './parts/Badges/AuthorsBadge';
import { OpenLinkBadge } from './parts/Badges/OpenLinkBadge';

export const LessonCard: React.FC<LessonCardProps> = ({
  moduleId,
  lesson,
  indexLabel,
  done,
  colors,
  accentColor,
  arrowAnimation,
  topBarBefore,
}) => {
  const totalTasks = Array.isArray(lesson?.tasks) ? lesson.tasks.length : 0;
  const authors = Array.isArray(lesson?.authors) ? lesson.authors : [];

  return (
    <Box
      as={RouterLink}
      to={`/learn/${moduleId}/${lesson.id}`}
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
            textDecoration: 'none',
            borderColor: done ? 'green.400' : accentColor,
            '&::before': { transform: 'scaleX(1)' },
          },
        },
      }}
      _before={done ? undefined : topBarBefore}
    >
      {done && (<Box position="absolute" inset={0} borderRadius="16px" bg="green.500" opacity={0.06} pointerEvents="none" zIndex={0} />)}
      <IndexChip done={done} indexBg={colors.indexBg} accentColor={accentColor}>
        {done ? <CheckIcon boxSize={3.5} /> : indexLabel}
      </IndexChip>
      <VStack align="start" spacing={1} flex={1} minW={0} h="100%">
        <Text fontWeight="semibold" noOfLines={2} wordBreak="break-word" overflowWrap="anywhere" style={{ hyphens: 'auto' }}>
          {lesson.title}
        </Text>
        <HStack spacing={2} flexWrap="wrap" mt="auto" pt={1}>
          <TasksBadge total={totalTasks} accentColor={accentColor} chipBorder={colors.chipBorder} />
          <AuthorsBadge authors={authors} accentColor={accentColor} chipBorder={colors.chipBorder} />
          <OpenLinkBadge accentColor={accentColor} chipBorder={colors.chipBorder} arrowAnimation={arrowAnimation} />
        </HStack>
      </VStack>
    </Box>
  );
};

