import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { ClockIcon } from '../../../../../CourseCard/icons';
import { useStudyTimePillColors } from '../colors/useStudyTimePillColors';
import type { StudyTimePillProps } from '../types/StudyTimePill.types';

export const StudyTimePill: React.FC<StudyTimePillProps> = ({ studyTime }) => {
  const { border, iconColor, textColor, bg } = useStudyTimePillColors();
  return (
    <Box bg={bg} borderRadius="full" px={4} py={2} border="1px" borderColor={border} transition="all 0.3s ease" _hover={{ transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(237, 137, 54, 0.3)' }}>
      <HStack spacing={2}>
        <ClockIcon color={iconColor} />
        <Text fontSize="sm" color={textColor} fontWeight="800" letterSpacing="0.03em">
          {studyTime}
        </Text>
      </HStack>
    </Box>
  );
};


