"use client";

import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import type { Module, ModuleProject } from "shared/lessons/manifest";
import { ProjectBreadcrumbHeader } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/BreadcrumbHeader";
import { ProjectHeaderCard } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectHeaderCard";
import { ProjectMarkdown } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectMarkdown";
import { ProjectSupport } from "widgets/ModuleProjectView/parts/ModuleProjectView/parts/ProjectSupport";
import { AuthorCard } from "shared/ui/AuthorCard";
import LessonFeedback from "@/widgets/Lessons/LessonFeedback";
import { useModuleProjectPageClientColors } from "./colors/useModuleProjectPageClientColors";
import { useProjectAuthorSupport } from "widgets/ModuleProjectView/parts/ModuleProjectView/features/useProjectAuthorSupport";

export type ModuleProjectPageClientProps = {
  moduleId: string;
  projectId: string;
  initialMod?: Module | null;
  initialProject?: ModuleProject | null;
  initialMarkdown?: string;
};

const ModuleProjectPageClient = ({
  moduleId,
  projectId,
  initialMod,
  initialProject,
  initialMarkdown,
}: ModuleProjectPageClientProps) => {
  const mod = initialMod ?? null;
  const project = initialProject ?? null;
  const { borderColor, cardBg, descColor, linkColor } = useModuleProjectPageClientColors();
  const author = project?.authors?.[0];

  const { starsCount, viewsCount, commentsCount, isStarred, handleToggleStar } =
    useProjectAuthorSupport(project as any);

  if (!mod || !project || !initialMarkdown) return null;

  return (
    <Box w="100%" maxW={{ base: "100%", md: "1100px" }} mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <ProjectBreadcrumbHeader
        moduleId={mod.id || moduleId}
        moduleTitle={mod.title || ""}
        projectId={project.id || projectId}
        projectTitle={project.title || ""}
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
          project={{ id: project.id, title: project.title }}
          borderColor={borderColor}
          cardBg={cardBg}
          descColor={descColor}
          backToListUrl={`/learn/${mod.id}/projects`}
        />
        <ProjectMarkdown md={initialMarkdown} />
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


