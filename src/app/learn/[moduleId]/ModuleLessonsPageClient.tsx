"use client";

import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useUserProfile } from "entities/user";
import { ModuleLessonsView } from "widgets/ModuleLessons";
import { useModuleLessonsLoad } from "widgets/ModuleLessons/hooks/useModuleLessonsLoad";
import { useScrollTopOnChange } from "widgets/ModuleLessons/hooks/useScrollTopOnChange";

type ModuleLessonsPageClientProps = {
  moduleId: string;
};

const ModuleLessonsPageClient = ({ moduleId }: ModuleLessonsPageClientProps) => {
  const { profile } = useUserProfile();
  const { mod, loading } = useModuleLessonsLoad(moduleId);
  useScrollTopOnChange([mod?.id]);

  const solvedMap = useMemo(
    () => (profile as any)?.solvedTaskIds || {},
    [profile]
  );

  if (loading || !mod) {
    return <Box pb="32px" />;
  }

  return <ModuleLessonsView mod={mod} profileSolvedTaskIds={solvedMap} />;
};

export default ModuleLessonsPageClient;


