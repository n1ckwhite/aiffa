import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadManifest } from "shared/lessons/api";
import ModuleLessonsPageClient from "./ModuleLessonsPageClient";
import { stat } from "node:fs/promises";
import path from "node:path";

type ModuleLessonsRouteParams = {
  params: { moduleId: string } | Promise<{ moduleId: string }>;
  searchParams?: { page?: string } | Promise<{ page?: string }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: ModuleLessonsRouteParams): Promise<Metadata> => {
  const { moduleId } = await Promise.resolve(params);
  const manifest = await loadManifest();
  const moduleAny = manifest.modules.find((m) => m.id === moduleId) as any;

  const baseTitle = moduleAny?.title ?? "Материал";
  const title = moduleAny ? `${moduleAny.title} — уроки` : "Материал";
  const description =
    moduleAny?.description ??
    `Уроки материала «${baseTitle}» на платформе AIFFA: практические задания и материалы для разработчиков.`;

  const url = `${SITE_URL}/learn/${moduleId}`;

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

const ModuleLessonsRoutePage = async ({ params, searchParams }: ModuleLessonsRouteParams) => {
  // SSR: отдаём контент даже без JS (иначе client-hook загрузки не сработает).
  // Для навигации внутри SPA Next всё равно подтянет эти props через RSC payload.
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
    lessons: await Promise.all((initialMod.lessons || []).map((lesson) => addDatesFromMarkdown(lesson))),
    project: initialMod.project ? await addDatesFromMarkdown(initialMod.project) : undefined,
  };

  return (
    <ModuleLessonsPageClient
      moduleId={moduleId}
      initialMod={initialModWithDates}
      initialPage={initialPage}
    />
  );
};

export default ModuleLessonsRoutePage;


