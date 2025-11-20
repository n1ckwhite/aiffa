import React from 'react';
import { Box } from '@chakra-ui/react';
import StageBreadcrumb from 'shared/ui/StageBreadcrumb';
import type { ProjectBreadcrumbHeaderProps } from './types';

export const ProjectBreadcrumbHeader: React.FC<ProjectBreadcrumbHeaderProps> = ({
  moduleId, moduleTitle, projectId, projectTitle,
}) => {
  return (
    <Box maxW="840px" mx="auto">
      <StageBreadcrumb
        moduleId={moduleId}
        moduleTitle={moduleTitle}
        lessonId={projectId}
        lessonTitle={projectTitle}
        current="lesson"
        middleCrumb={{ label: 'Проекты', to: `/learn/${moduleId}/projects` }}
      />
    </Box>
  );
};


