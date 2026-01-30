"use client";

import { ModuleLessonsView } from "widgets/ModuleLessons";
import type { Module } from "shared/lessons/manifest";
import { useModuleLessonsPageClient } from "./hooks/useModuleLessonsPageClient";

type ModuleLessonsPageClientProps = {
  moduleId: string;
  initialMod?: Module | null;
  initialPage?: number;
};

const ModuleLessonsPageClient = ({ moduleId, initialMod, initialPage }: ModuleLessonsPageClientProps) => {
  const { mod, isLoading, solvedMap, currentPage, getPageHref } = useModuleLessonsPageClient({
    moduleId,
    initialMod,
    initialPage,
  });

  if (!mod) {
    return null;
  }

  return (
    <ModuleLessonsView
      mod={mod}
      profileSolvedTaskIds={solvedMap}
      currentPage={currentPage}
      getPageHref={getPageHref}
    />
  );
};

export default ModuleLessonsPageClient;


