"use client";

import { useCallback, useMemo } from "react";
import { useUserProfile } from "entities/user";
import { useModuleLessonsLoad } from "widgets/ModuleLessons/hooks/useModuleLessonsLoad";
import { UseModuleLessonsPageClientParams, UseModuleLessonsPageClientResult } from "./types";

export const useModuleLessonsPageClient = ({
  moduleId,
  initialMod,
  initialPage,
}: UseModuleLessonsPageClientParams): UseModuleLessonsPageClientResult => {
  const { profile } = useUserProfile();

  const shouldLoadOnClient = !initialMod;
  const { mod: loadedMod, loading } = useModuleLessonsLoad(moduleId, shouldLoadOnClient);
  const mod = initialMod ?? loadedMod;

  const solvedMap = useMemo(() => (profile as any)?.solvedTaskIds || {}, [profile]);

  const currentPage = useMemo(() => {
    const n = Number(initialPage ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [initialPage]);

  const getPageHref = useCallback(
    (page: number) => `/learn/${(mod?.id ?? moduleId)}?page=${page}`,
    [mod?.id, moduleId],
  );

  const isLoading = (shouldLoadOnClient && loading) || !mod;

  return {
    mod,
    isLoading,
    solvedMap,
    currentPage,
    getPageHref,
  };
};

