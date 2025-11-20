import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModuleProjectPageClient from "./ModuleProjectPageClient";

type ModuleProjectRouteParams = {
  params: {
    moduleId: string;
    projectId: string;
  };
};

export const generateMetadata = async ({ params }: ModuleProjectRouteParams): Promise<Metadata> => {
  const manifest = await loadManifest();
  const modAny = manifest.modules.find((m) => m.id === params.moduleId) as any;
  const project = modAny?.projects?.find((p: any) => p.id === params.projectId);

  return {
    title: project ? `${project.title} — проект` : "Проект",
    description: (project as any)?.description ?? undefined
  };
};

const ModuleProjectRoutePage = ({ params }: ModuleProjectRouteParams) => {
  const { moduleId, projectId } = params;
  return <ModuleProjectPageClient moduleId={moduleId} projectId={projectId} />;
};

export default ModuleProjectRoutePage;


