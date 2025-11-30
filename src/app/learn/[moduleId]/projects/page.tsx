import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModuleProjectsPageClient from "./ModuleProjectsPageClient";

type ModuleProjectsRouteParams = {
  params: {
    moduleId: string;
  };
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: ModuleProjectsRouteParams): Promise<Metadata> => {
  const manifest = await loadManifest();
  const moduleAny = manifest.modules.find((m) => m.id === params.moduleId) as any;

  const baseTitle = moduleAny?.title ?? "Материал";
  const title = moduleAny ? `${moduleAny.title} — проекты` : "Проекты материла";
  const description =
    moduleAny?.description ??
    `Проекты материла «${baseTitle}» на платформе AIFFA: практические мини‑проекты для закрепления материала.`;

  const url = `${SITE_URL}/learn/${params.moduleId}/projects`;

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
      type: "website",
    },
  };
};

const ModuleProjectsRoutePage = ({ params }: ModuleProjectsRouteParams) => {
  return <ModuleProjectsPageClient moduleId={params.moduleId} />;
};

export default ModuleProjectsRoutePage;


