import React from 'react';
import { Box } from '@chakra-ui/react';
import StageBreadcrumb from 'shared/ui/StageBreadcrumb';
import type { BreadcrumbHeaderProps } from './types';

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ moduleId, moduleTitle, lessonId, lessonTitle }) => {
  return (
    <Box>
      <StageBreadcrumb moduleId={moduleId} moduleTitle={moduleTitle} lessonId={lessonId} lessonTitle={lessonTitle} current="lesson" />
    </Box>
  );
};


