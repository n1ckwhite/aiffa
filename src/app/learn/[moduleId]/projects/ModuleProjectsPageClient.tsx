"use client";

import React from "react";
import { ModuleProjectsView } from "widgets/ModuleProjects";
import { useModuleProjectsLoad } from "widgets/ModuleProjects/hooks/useModuleProjectsLoad";
import ModuleProjectsSkeleton from "pages/ModuleProjectsPage/Skeleton";
import type { Module } from "shared/lessons/manifest";

type ModuleProjectsPageClientProps = {
  moduleId: string;
  initialMod?: Module | null;
};

const ModuleProjectsPageClient = ({ moduleId, initialMod }: ModuleProjectsPageClientProps) => {
  const shouldLoadOnClient = !initialMod;
  const { mod: loadedMod, loading } = useModuleProjectsLoad(moduleId, shouldLoadOnClient);
  const mod = initialMod ?? loadedMod;

  if ((shouldLoadOnClient && loading) || !mod) {
    return <ModuleProjectsSkeleton />;
  }

  return <ModuleProjectsView mod={mod} />;
};

export default ModuleProjectsPageClient;


