import React from 'react';
import { Box } from '@chakra-ui/react';
import LessonSwitchBar from 'widgets/Lessons/LessonSwitchBar';
import type { LessonNavBarProps } from './types';

export const LessonNavBar: React.FC<LessonNavBarProps> = ({ moduleId, lessonId }) => {
  return (
    <Box px={{ base: 3, md: 8, lg: 12 }} mt={0} mb={0}>
      <LessonSwitchBar moduleId={moduleId} lessonId={lessonId} inline />
    </Box>
  );
};


