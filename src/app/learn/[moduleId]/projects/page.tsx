import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModuleProjectsPageClient from "./ModuleProjectsPageClient";

type ModuleProjectsRouteParams = {
  params: {
    moduleId: string;
  };
};

export const generateMetadata = async ({ params }: ModuleProjectsRouteParams): Promise<Metadata> => {
  const manifest = await loadManifest();
  const moduleAny = manifest.modules.find((m) => m.id === params.moduleId) as any;

  return {
    title: moduleAny ? `${moduleAny.title} — проекты` : "Проекты модуля",
    description: moduleAny?.description ?? undefined
  };
};

const ModuleProjectsRoutePage = ({ params }: ModuleProjectsRouteParams) => {
  return <ModuleProjectsPageClient moduleId={params.moduleId} />;
};

export default ModuleProjectsRoutePage;


