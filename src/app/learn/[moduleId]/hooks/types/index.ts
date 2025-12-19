import type { Module } from "shared/lessons/manifest";

export type UseModuleLessonsPageClientParams = {
    moduleId: string;
    initialMod?: Module | null;
    initialPage?: number;
  };
  
  export type UseModuleLessonsPageClientResult = {
    mod: Module | null;
    isLoading: boolean;
    solvedMap: Record<string, true>;
    currentPage: number;
    getPageHref: (page: number) => string;
  };