"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { ModuleProjectsView } from "widgets/ModuleProjects";
import { useModuleProjectsLoad } from "widgets/ModuleProjects/hooks/useModuleProjectsLoad";

type ModuleProjectsPageClientProps = {
  moduleId: string;
};

const ModuleProjectsPageClient = ({ moduleId }: ModuleProjectsPageClientProps) => {
  const { mod, loading } = useModuleProjectsLoad(moduleId);

  if (loading || !mod) {
    return <Box pb="32px" />;
  }

  return <ModuleProjectsView mod={mod} />;
};

export default ModuleProjectsPageClient;


