import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useLessonsPillColors } from '../colors/useLessonsPillColors';
import { LessonsPillProps } from '../types/LessonsPill.types';

export const LessonsPill: React.FC<LessonsPillProps> = ({ lessonsCount, accentColor, isActive, completedLessonsCount }) => {
  const { gradientStart, gradientEnd, borderGradient, lessonsTextColor } = useLessonsPillColors();
  const safeCompleted =
    typeof completedLessonsCount === 'number' && Number.isFinite(completedLessonsCount) && completedLessonsCount >= 0
      ? completedLessonsCount
      : 0;
  const clampedCompleted = Math.min(safeCompleted, lessonsCount);
  return (
    <Box
      bg={`linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`}
      borderRadius="full"
      px={4}
      py={2}
      border="1px"
      borderColor={borderGradient}
      position="relative"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{ transform: 'scale(1.05)', boxShadow: `0 8px 20px ${borderGradient}40` }}
      _before={{
        content: '""',
        position: 'absolute',
        inset: 0,
        bg: `linear-gradient(135deg, ${accentColor}20, transparent)`,
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: 'full',
      }}
    >
      <Text fontSize="sm" color={lessonsTextColor} fontWeight="800" letterSpacing="0.03em" position="relative" zIndex={1}>
        {`${clampedCompleted}/${lessonsCount} материалов`}
      </Text>
    </Box>
  );
};


