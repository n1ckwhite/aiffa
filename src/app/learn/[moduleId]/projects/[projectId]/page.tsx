import React from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { notFound } from "next/navigation";
import { loadManifest } from "shared/lessons/api";
import type { Module, ModuleProject } from "shared/lessons/manifest";
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
  const project = modAny?.project?.id === projectId ? modAny.project : undefined;

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

  const readPublicMarkdownOrNull = async (mdPath: string | undefined) => {
    if (!mdPath) return null;
    const relative = mdPath.startsWith("/") ? mdPath.slice(1) : mdPath;
    if (!relative) return null;
    const filePath = path.join(process.cwd(), "public", relative);
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch {
      return null;
    }
  };

  const manifest = await loadManifest();
  const mod = (manifest.modules.find((m) => m.id === moduleId) ?? null) as Module | null;
  if (!mod) return notFound();

  const project = (mod.project?.id === projectId ? mod.project : null) as ModuleProject | null;
  if (!project) return notFound();

  const initialMarkdown = await readPublicMarkdownOrNull(project.mdPath);
  if (!initialMarkdown) return notFound();

  return (
    <ModuleProjectPageClient
      moduleId={moduleId}
      projectId={projectId}
      initialMod={mod}
      initialProject={project}
      initialMarkdown={initialMarkdown}
    />
  );
};

export default ModuleProjectRoutePage;


