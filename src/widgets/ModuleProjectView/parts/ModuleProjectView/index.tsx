import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { ProjectBreadcrumbHeader } from './parts/BreadcrumbHeader';
import { ProjectHeaderCard } from './parts/ProjectHeaderCard';
import { ProjectMarkdown } from './parts/ProjectMarkdown';
import { ProjectSupport } from './parts/ProjectSupport';
import type { ModuleProjectViewProps } from './types';
import { useModuleProjectViewColors } from './colors/useModuleProjectViewColors';
import { AuthorCard } from 'shared/ui/AuthorCard';
import { useProjectAuthorSupport } from './features/useProjectAuthorSupport';
import { useModuleProjectViewData } from './data/useModuleProjectViewData';

export const ModuleProjectView: React.FC<ModuleProjectViewProps> = ({ mod, project, md }) => {
  const { borderColor, cardBg, descColor, linkColor } = useModuleProjectViewColors();
  const { moduleId, moduleTitle, projectId, projectTitle, author } = useModuleProjectViewData(
    mod,
    project,
  );

  const { starsCount, viewsCount, commentsCount, isStarred, handleToggleStar } =
    useProjectAuthorSupport(project);

  return (
    <Box w="100%" maxW={{ base: '100%', md: '1100px' }} mx="auto" px={0} py={0}>
      <ProjectBreadcrumbHeader
        moduleId={moduleId}
        moduleTitle={moduleTitle}
        projectId={projectId}
        projectTitle={projectTitle}
      />
      <VStack align="stretch" gap={4} maxW="840px" mx="auto">
        <AuthorCard
          author={author}
          borderColor={borderColor}
          descColor={descColor}
          linkColor={linkColor}
          context="project"
          starsCount={starsCount}
          viewsCount={viewsCount}
          commentsCount={commentsCount}
          isStarred={isStarred}
          onToggleStar={handleToggleStar}
        />
        <ProjectHeaderCard
          project={{ id: projectId, title: projectTitle }}
          borderColor={borderColor}
          cardBg={cardBg}
          descColor={descColor}
          backToListUrl={`/learn/${moduleId}/projects`}
        />
        {md ? <ProjectMarkdown md={md} /> : null}
        <ProjectSupport borderColor={borderColor} cardBg={cardBg} />
      </VStack>
    </Box>
  );
};


