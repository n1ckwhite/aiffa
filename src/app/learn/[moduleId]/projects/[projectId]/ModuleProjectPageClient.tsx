"use client";

import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import ModuleProjectSkeleton from "pages/ModuleProjectPage/Skeleton";
import { useModuleProjectLoad, useProjectMarkdown } from "widgets/ModuleProjectView";
import { ProjectBreadcrumbHeader } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/BreadcrumbHeader";
import { ProjectHeaderCard } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectHeaderCard";
import { ProjectMarkdown } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectMarkdown";
import { ProjectSupport } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectSupport";
import { AuthorCard } from "widgets/LessonPageView/ui/LessonPageView/parts/AuthorCard";
import LessonFeedback from "widgets/Lessons/LessonFeedback";
import { useModuleProjectPageClientColors } from "./colors/useModuleProjectPageClientColors";
import { useProjectAuthorSupport } from "./features/useProjectAuthorSupport";
import type { ModuleProjectPageClientProps } from "./types";

const ModuleProjectPageClient = ({ moduleId, projectId }: ModuleProjectPageClientProps) => {
  const { mod, project, loading } = useModuleProjectLoad(moduleId, projectId);
  const { borderColor, cardBg, descColor, linkColor } = useModuleProjectPageClientColors();
  const author = project?.authors?.[0];

  const { starsCount, viewsCount, commentsCount, isStarred, handleToggleStar } =
    useProjectAuthorSupport(project as any);

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
    <Box w="100%" maxW={{ base: "100%", md: "1100px" }} mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <ProjectBreadcrumbHeader
        moduleId={mod?.id || moduleId}
        moduleTitle={mod?.title || ""}
        projectId={project?.id || projectId}
        projectTitle={project?.title || ""}
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


