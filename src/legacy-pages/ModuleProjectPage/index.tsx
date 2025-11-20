import { FC } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useParams, Navigate } from 'react-router-dom';
import ModuleProjectSkeleton from './Skeleton';
import { useAppColors } from 'shared/theme/colors';
import { useModuleProjectLoad } from 'widgets/ModuleProjectView';
import { useProjectMarkdown } from 'widgets/ModuleProjectView';
import { ProjectBreadcrumbHeader } from 'widgets/ModuleProjectView/parts/ModuleProjectView/parts/BreadcrumbHeader';
import { ProjectAuthorCard } from 'widgets/ModuleProjectView/parts/ModuleProjectView/parts/AuthorCard';
import { ProjectHeaderCard } from 'widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectHeaderCard';
import { ProjectMarkdown } from 'widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectMarkdown';
import { ProjectSupport } from 'widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectSupport';
import LessonFeedback from 'widgets/Lessons/LessonFeedback';

const ModuleProjectPage: FC = () => {
  const params = useParams();
  const { mod, project, loading } = useModuleProjectLoad(params.moduleId, params.projectId);
  const theme = useAppColors();
  const borderColor = theme.borderColor;
  const cardBg = theme.cardBg;
  const descColor = theme.descColor;
  const linkColor = theme.blue.accent;
  const author = project?.authors?.[0];

  const md = useProjectMarkdown(project?.mdPath);

  if (!loading && (!mod || !project)) {
    return <Navigate to={`/learn/${params.moduleId || ''}/projects`} replace />;
  }

  if (!md) {
    return <ModuleProjectSkeleton />;
  }

  return (
    <Box w="100%" maxW={{ base: '100%', md: '1100px' }} mx="auto" px={0} py={0}>
      <ProjectBreadcrumbHeader
        moduleId={mod?.id || (params.moduleId || '')}
        moduleTitle={mod?.title || ''}
        projectId={project?.id || (params.projectId || '')}
        projectTitle={project?.title || ''}
      />
      <VStack align="stretch" gap={4} maxW="840px" mx="auto">
        <ProjectAuthorCard author={author} borderColor={borderColor} descColor={descColor} linkColor={linkColor} />
        {project && mod && (
          <ProjectHeaderCard
            project={{ id: project.id, title: project.title }}
            borderColor={borderColor}
            cardBg={cardBg}
            descColor={descColor}
            backToListUrl={`/learn/${mod.id}/projects`}
          />
        )}
        <ProjectMarkdown md={md} />
        <ProjectSupport borderColor={borderColor} cardBg={cardBg} />
      </VStack>
      <LessonFeedback lessonKey={`project/${project?.id || params.projectId || ''}`} questionText="Этот проект был полезен?" />
    </Box>
  );
};

export default ModuleProjectPage;


