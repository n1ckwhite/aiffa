import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { ProjectBreadcrumbHeader } from './parts/BreadcrumbHeader';
import { ProjectAuthorCard } from './parts/AuthorCard';
import { ProjectHeaderCard } from './parts/ProjectHeaderCard';
import { ProjectMarkdown } from './parts/ProjectMarkdown';
import { ProjectSupport } from './parts/ProjectSupport';
import type { ModuleProjectViewProps } from './types';
import { useModuleProjectViewColors } from './colors/useModuleProjectViewColors';

export const ModuleProjectView: React.FC<ModuleProjectViewProps> = ({ mod, project, md }) => {
  const { borderColor, cardBg, descColor, linkColor } = useModuleProjectViewColors();
  const author = project?.authors?.[0];

  return (
    <Box w="100%" maxW={{ base: '100%', md: '1100px' }} mx="auto" px={0} py={0}>
      <ProjectBreadcrumbHeader
        moduleId={mod.id}
        moduleTitle={mod.title}
        projectId={project.id}
        projectTitle={project.title}
      />
      <VStack align="stretch" gap={4} maxW="840px" mx="auto">
        <ProjectAuthorCard author={author} borderColor={borderColor} descColor={descColor} linkColor={linkColor} />
        <ProjectHeaderCard
          project={{ id: project.id, title: project.title }}
          borderColor={borderColor}
          cardBg={cardBg}
          descColor={descColor}
          backToListUrl={`/learn/${mod.id}/projects`}
        />
        {md ? <ProjectMarkdown md={md} /> : null}
        <ProjectSupport borderColor={borderColor} cardBg={cardBg} />
      </VStack>
    </Box>
  );
};


