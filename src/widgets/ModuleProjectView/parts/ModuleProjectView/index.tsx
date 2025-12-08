import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { ProjectBreadcrumbHeader } from './parts/BreadcrumbHeader';
import { ProjectHeaderCard } from './parts/ProjectHeaderCard';
import { ProjectMarkdown } from './parts/ProjectMarkdown';
import { ProjectSupport } from './parts/ProjectSupport';
import type { ModuleProjectViewProps } from './types';
import { useModuleProjectViewColors } from './colors/useModuleProjectViewColors';
import { AuthorCard } from 'widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard';

export const ModuleProjectView: React.FC<ModuleProjectViewProps> = ({ mod, project, md }) => {
  const { borderColor, cardBg, descColor, linkColor } = useModuleProjectViewColors();
  const author = project?.authors?.[0];

  const initialStarsCount = Number((project as any)?.ratingCount ?? 0);
  const initialViewsCount = Number((project as any)?.views ?? 0);
  const initialCommentsCount = Number((project as any)?.commentsCount ?? 0);

  const [starsCount, setStarsCount] = React.useState<number>(initialStarsCount);
  const [isStarred, setIsStarred] = React.useState<boolean>(false);

  const applyStarChange = (nextStarred: boolean) => {
    setIsStarred(nextStarred);
    setStarsCount((prev) => {
      if (!nextStarred && prev > 0) {
        return prev - 1;
      }
      if (nextStarred) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleToggleStar = () => {
    applyStarChange(!isStarred);
  };

  return (
    <Box w="100%" maxW={{ base: '100%', md: '1100px' }} mx="auto" px={0} py={0}>
      <ProjectBreadcrumbHeader
        moduleId={mod.id}
        moduleTitle={mod.title}
        projectId={project.id}
        projectTitle={project.title}
      />
      <VStack align="stretch" gap={4} maxW="840px" mx="auto">
        <AuthorCard
          author={author}
          borderColor={borderColor}
          descColor={descColor}
          linkColor={linkColor}
          context="project"
          starsCount={starsCount}
          viewsCount={initialViewsCount}
          commentsCount={initialCommentsCount}
          isStarred={isStarred}
          onToggleStar={handleToggleStar}
        />
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


