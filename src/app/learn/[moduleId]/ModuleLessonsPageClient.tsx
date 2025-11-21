"use client";

import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useUserProfile } from "entities/user";
import { ModuleLessonsView } from "widgets/ModuleLessons";
import { useModuleLessonsLoad } from "widgets/ModuleLessons/hooks/useModuleLessonsLoad";
import { useScrollTopOnChange } from "widgets/ModuleLessons/hooks/useScrollTopOnChange";
import ModuleLessonsSkeleton from "pages/ModuleLessonsPage/Skeleton";

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
    return <ModuleLessonsSkeleton />;
  }

  return <ModuleLessonsView mod={mod} profileSolvedTaskIds={solvedMap} />;
};

export default ModuleLessonsPageClient;


