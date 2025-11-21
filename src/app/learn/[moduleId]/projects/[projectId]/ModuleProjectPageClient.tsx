"use client";

import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import ModuleProjectSkeleton from "pages/ModuleProjectPage/Skeleton";
import { useAppColors } from "shared/theme/colors";
import { useModuleProjectLoad, useProjectMarkdown } from "widgets/ModuleProjectView";
import { ProjectBreadcrumbHeader } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/BreadcrumbHeader";
import { ProjectAuthorCard } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/AuthorCard";
import { ProjectHeaderCard } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectHeaderCard";
import { ProjectMarkdown } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectMarkdown";
import { ProjectSupport } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectSupport";
import LessonFeedback from "widgets/Lessons/LessonFeedback";

type ModuleProjectPageClientProps = {
  moduleId: string;
  projectId: string;
};

const ModuleProjectPageClient = ({ moduleId, projectId }: ModuleProjectPageClientProps) => {
  const { mod, project, loading } = useModuleProjectLoad(moduleId, projectId);
  const theme = useAppColors();
  const borderColor = theme.borderColor;
  const cardBg = theme.cardBg;
  const descColor = theme.descColor;
  const linkColor = theme.blue.accent;
  const author = project?.authors?.[0];

  const md = useProjectMarkdown(project?.mdPath);

  if (!loading && (!mod || !project)) {
    // В Next нет Navigate, редирект лучше делать на сервере,
    // но для совместимости пока просто ничего не рендерим.
    return <ModuleProjectSkeleton />;
  }

  if (!md) {
    return <ModuleProjectSkeleton />;
  }

  return (
    <Box w="100%" maxW={{ base: "100%", md: "1100px" }} mx="auto">
      <ProjectBreadcrumbHeader
        moduleId={mod?.id || moduleId}
        moduleTitle={mod?.title || ""}
        projectId={project?.id || projectId}
        projectTitle={project?.title || ""}
      />
      <VStack align="stretch" gap={4} maxW="840px" mx="auto">
        <ProjectAuthorCard
          author={author}
          borderColor={borderColor}
          descColor={descColor}
          linkColor={linkColor}
        />
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
      <LessonFeedback
        lessonKey={`project/${project?.id || projectId}`}
        questionText="Этот проект был полезен?"
      />
    </Box>
  );
};

export default ModuleProjectPageClient;


