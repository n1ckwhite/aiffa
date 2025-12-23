import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModuleProjectPageClient from "./ModuleProjectPageClient";

type ModuleProjectRouteParams = {
  params:
    | { moduleId: string; projectId: string }
    | Promise<{ moduleId: string; projectId: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: ModuleProjectRouteParams): Promise<Metadata> => {
  const { moduleId, projectId } = await Promise.resolve(params);
  const manifest = await loadManifest();
  const modAny = manifest.modules.find((m) => m.id === moduleId) as any;
  const project = modAny?.projects?.find((p: any) => p.id === projectId) as any;

  const moduleTitle = modAny?.title ?? "Материал";
  const projectTitle = project?.title ?? "Проект";
  const title = project ? `${projectTitle} — проект` : "Проект";
  const description =
    project?.description ??
    `Практический проект «${projectTitle}» из материала «${moduleTitle}» на платформе AIFFA.`;

  const url = `${SITE_URL}/learn/${moduleId}/projects/${projectId}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title,
      description,
      type: "article",
    },
  };
};

const ModuleProjectRoutePage = async ({ params }: ModuleProjectRouteParams) => {
  const { moduleId, projectId } = await Promise.resolve(params);
  return <ModuleProjectPageClient moduleId={moduleId} projectId={projectId} />;
};

export default ModuleProjectRoutePage;


