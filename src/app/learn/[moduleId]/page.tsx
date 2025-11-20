import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModuleLessonsPageClient from "./ModuleLessonsPageClient";

type ModuleLessonsRouteParams = {
  params: {
    moduleId: string;
  };
};

export const generateMetadata = async ({ params }: ModuleLessonsRouteParams): Promise<Metadata> => {
  const manifest = await loadManifest();
  const moduleAny = manifest.modules.find((m) => m.id === params.moduleId) as any;

  return {
    title: moduleAny ? `${moduleAny.title} — уроки` : "Модуль",
    description: moduleAny?.description ?? undefined
  };
};

const ModuleLessonsRoutePage = ({ params }: ModuleLessonsRouteParams) => {
  return <ModuleLessonsPageClient moduleId={params.moduleId} />;
};

export default ModuleLessonsRoutePage;


