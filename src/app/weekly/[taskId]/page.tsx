import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import path from "node:path";
import { promises as fs } from "node:fs";
import { getWeeklyInfoById } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";
import WeeklyTaskDetailPageClient from "./WeeklyTaskDetailPageClient";
import SeoStructuredData from "./SeoStructuredData";

type WeeklyTaskRouteParams = {
  params: Promise<{
    taskId: string;
  }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

const normalizeWeeklyTaskId = (rawTaskId: string) => {
  const trimmed = (rawTaskId || "").trim();
  if (!trimmed) return "";
  // Backward compatibility: allow `/weekly/1` -> `/weekly/weekly-1`
  if (/^\d+$/.test(trimmed)) return `weekly-${trimmed}`;
  return trimmed;
};

export const generateMetadata = async ({ params }: WeeklyTaskRouteParams): Promise<Metadata> => {
  const resolvedParams = await Promise.resolve(params);
  const taskId = normalizeWeeklyTaskId(resolvedParams.taskId);
  const info = getWeeklyInfoById(taskId);
  let title = "Задача недели";
  // Lighthouse требует meta description. Даже если md не прочитался (например, в прод-окружении),
  // отдаём безопасный fallback.
  let description: string =
    "Еженедельная практическая задача для развития навыков программирования и инженерной культуры.";
  const url = `${SITE_URL}/weekly/${taskId}`;

  if (info?.mdPath) {
    try {
      const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
      const filePath = path.join(process.cwd(), "public", relative);
      const md = await fs.readFile(filePath, "utf-8");
      const parsed = parseWeeklyTaskMd(md);
      if (parsed.title) title = parsed.title;
      if (parsed.description) description = parsed.description;
    } catch {
      // ignore
    }
  }

  return {
    // Do not append "— AIFFA" here: the root layout already has `title.template = "%s — AIFFA"`.
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

const WeeklyTaskDetailRoutePage = async ({ params }: WeeklyTaskRouteParams) => {
  // Пока сам TaskDetailScreen использует useParams из shim, поэтому просто монтируем client-компонент
  const resolvedParams = await Promise.resolve(params);
  const taskId = normalizeWeeklyTaskId(resolvedParams.taskId);

  return (
    <>
      <WeeklyTaskDetailPageClient taskId={taskId} />
      <Suspense fallback={null}>
        <SeoStructuredData taskId={taskId} />
      </Suspense>
    </>
  );
};

export default WeeklyTaskDetailRoutePage;


