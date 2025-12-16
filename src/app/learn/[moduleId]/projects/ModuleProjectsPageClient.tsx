"use client";

import React from "react";
import { ModuleProjectsView } from "widgets/ModuleProjects";
import { useModuleProjectsLoad } from "widgets/ModuleProjects/hooks/useModuleProjectsLoad";
import ModuleProjectsSkeleton from "pages/ModuleProjectsPage/Skeleton";

type ModuleProjectsPageClientProps = {
  moduleId: string;
};

const ModuleProjectsPageClient = ({ moduleId }: ModuleProjectsPageClientProps) => {
  const { mod, loading } = useModuleProjectsLoad(moduleId);

  if (loading || !mod) {
    return <ModuleProjectsSkeleton />;
  }

  return <ModuleProjectsView mod={mod} />;
};

export default ModuleProjectsPageClient;


