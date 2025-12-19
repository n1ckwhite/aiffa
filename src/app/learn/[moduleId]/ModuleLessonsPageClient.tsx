"use client";

import React, { useMemo } from "react";
import { useUserProfile } from "entities/user";
import { ModuleLessonsView } from "widgets/ModuleLessons";
import { useModuleLessonsLoad } from "widgets/ModuleLessons/hooks/useModuleLessonsLoad";
import { useScrollTopOnChange } from "widgets/ModuleLessons/hooks/useScrollTopOnChange";
import ModuleLessonsSkeleton from "pages/ModuleLessonsPage/Skeleton";
import type { Module } from "shared/lessons/manifest";

type ModuleLessonsPageClientProps = {
  moduleId: string;
  initialMod?: Module | null;
};

const ModuleLessonsPageClient = ({ moduleId, initialMod }: ModuleLessonsPageClientProps) => {
  const { profile } = useUserProfile();
  const shouldLoadOnClient = !initialMod;
  const { mod: loadedMod, loading } = useModuleLessonsLoad(moduleId, shouldLoadOnClient);
  const mod = initialMod ?? loadedMod;
  useScrollTopOnChange([mod?.id]);

  const solvedMap = useMemo(
    () => (profile as any)?.solvedTaskIds || {},
    [profile]
  );

  if ((shouldLoadOnClient && loading) || !mod) {
    return <ModuleLessonsSkeleton />;
  }

  return <ModuleLessonsView mod={mod} profileSolvedTaskIds={solvedMap} />;
};

export default ModuleLessonsPageClient;


