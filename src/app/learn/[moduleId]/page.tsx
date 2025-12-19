import React from "react";
import type { Metadata } from "next";
import { loadManifest } from "shared/lessons/api";
import ModuleLessonsPageClient from "./ModuleLessonsPageClient";

type ModuleLessonsRouteParams = {
  params: {
    moduleId: string;
  };
  searchParams?: {
    page?: string;
  };
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({
  params,
}: ModuleLessonsRouteParams): Promise<Metadata> => {
  const manifest = await loadManifest();
  const moduleAny = manifest.modules.find((m) => m.id === params.moduleId) as any;

  const baseTitle = moduleAny?.title ?? "Материал";
  const title = moduleAny ? `${moduleAny.title} — уроки` : "Материал";
  const description =
    moduleAny?.description ??
    `Уроки материала «${baseTitle}» на платформе AIFFA: практические задания и материалы для разработчиков.`;

  const url = `${SITE_URL}/learn/${params.moduleId}`;

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
  const moduleId = params.moduleId;
  const pageFromQuery = Number(searchParams?.page ?? "1");
  const initialPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? pageFromQuery : 1;
  const manifest = await loadManifest();
  const initialMod =
    manifest.modules.find((m) => m.id === moduleId) ?? manifest.modules[0] ?? null;
  return (
    <ModuleLessonsPageClient
      moduleId={moduleId}
      // Важно: если модуль не найден — берём первый, чтобы не показывать вечный скелетон.
      initialMod={initialMod}
      initialPage={initialPage}
    />
  );
};

export default ModuleLessonsRoutePage;


