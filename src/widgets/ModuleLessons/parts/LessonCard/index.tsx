import React from 'react';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { CheckIcon, ChevronRightIcon } from '@chakra-ui/icons';
import type { LessonCardProps } from './types';
import { IndexChip } from './parts/IndexChip';
import { TasksBadge } from './parts/Badges/TasksBadge';
import { AuthorsBadge } from './parts/Badges/AuthorsBadge';
import { OpenLinkBadge } from './parts/Badges/OpenLinkBadge';
import { useOpenLinkBadgeColors } from './parts/Badges/OpenLinkBadge/colors/useOpenLinkBadgeColor';
import { AppBoxLink } from 'shared/ui/AppLink';

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
  const { pillBg } = useOpenLinkBadgeColors();

  const formatRuDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) return '';
    try {
      return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
    } catch {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = String(d.getFullYear());
      return `${dd}.${mm}.${yyyy}`;
    }
  };

  const dateIso = (lesson as any)?.updatedAt || (lesson as any)?.createdAt;
  const dateLabel = formatRuDate(typeof dateIso === 'string' ? dateIso : undefined);

  return (
    <AppBoxLink
      to={`/learn/${moduleId}/${lesson.id}`}
      aria-label={`Открыть материал: ${lesson?.title ?? ""}`.trim()}
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
          {dateLabel ? (
            <OpenLinkBadge accentColor={accentColor} chipBorder={colors.chipBorder} dateLabel={dateLabel} />
          ) : (
            <Box
              as="span"
              fontSize="xs"
              color={accentColor}
              bg={pillBg}
              borderWidth="1px"
              borderColor={colors.chipBorder}
              px={2.5}
              py={1}
              borderRadius="full"
              display="inline-flex"
              alignItems="center"
              gap={1}
              whiteSpace="nowrap"
              aria-hidden="true"
            >
              Открыть материал
              <Box as={ChevronRightIcon} boxSize={3.5} ml={0.5} animation={arrowAnimation} />
            </Box>
          )}
        </HStack>
      </VStack>
    </AppBoxLink>
  );
};

