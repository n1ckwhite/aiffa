import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadManifest } from "shared/lessons/api";
import ModuleProjectsPageClient from "./ModuleProjectsPageClient";
import { stat } from "node:fs/promises";
import path from "node:path";

type ModuleProjectsRouteParams = {
  params: { moduleId: string } | Promise<{ moduleId: string }>;
  searchParams?: { page?: string } | Promise<{ page?: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: ModuleProjectsRouteParams): Promise<Metadata> => {
  const { moduleId } = await Promise.resolve(params);
  const manifest = await loadManifest();
  const moduleAny = manifest.modules.find((m) => m.id === moduleId) as any;

  const baseTitle = moduleAny?.title ?? "Материал";
  const title = moduleAny ? `${moduleAny.title} — проекты` : "Проекты материла";
  const description =
    moduleAny?.description ??
    `Проекты материла «${baseTitle}» на платформе AIFFA: практические мини‑проекты для закрепления материала.`;

  const url = `${SITE_URL}/learn/${moduleId}/projects`;

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

const ModuleProjectsRoutePage = async ({ params, searchParams }: ModuleProjectsRouteParams) => {
  const { moduleId } = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const pageFromQuery = Number(resolvedSearchParams?.page ?? "1");
  const initialPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? pageFromQuery : 1;
  const manifest = await loadManifest();
  const initialMod = manifest.modules.find((m) => m.id === moduleId) ?? null;
  if (!initialMod) return notFound();

  const addDatesFromMarkdown = async <T extends { mdPath?: string }>(item: T): Promise<T> => {
    const mdPath = typeof item?.mdPath === "string" ? item.mdPath.trim() : "";
    if (!mdPath || !mdPath.startsWith("/")) return item;

    try {
      const abs = path.join(process.cwd(), "public", mdPath.replace(/^\/+/, ""));
      const info = await stat(abs);
      const updatedAt = new Date(info.mtimeMs).toISOString();
      const createdAt = new Date(info.birthtimeMs).toISOString();
      return { ...item, updatedAt, createdAt };
    } catch {
      return item;
    }
  };

  const initialModWithDates = {
    ...initialMod,
    projects: Array.isArray((initialMod as any).projects)
      ? await Promise.all(((initialMod as any).projects as any[]).map((p) => addDatesFromMarkdown(p)))
      : (initialMod as any).projects,
    project: (initialMod as any).project ? await addDatesFromMarkdown((initialMod as any).project) : undefined,
  };

  return <ModuleProjectsPageClient moduleId={moduleId} initialMod={initialModWithDates} initialPage={initialPage} />;
};

export default ModuleProjectsRoutePage;


