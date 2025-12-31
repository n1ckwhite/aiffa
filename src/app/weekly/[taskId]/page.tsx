import React from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { getWeeklyInfoById } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";
import WeeklyTaskDetailPageClient from "./WeeklyTaskDetailPageClient";

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
  let description: string | undefined;
  const url = `${SITE_URL}/weekly/${taskId}`;

  if (info?.mdPath) {
    try {
      const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
      const filePath = path.join(process.cwd(), "public", relative);
      const md = await fs.readFile(filePath, "utf-8");
      const parsed = parseWeeklyTaskMd(md);
      if (parsed.title) title = parsed.title;
      if (parsed.description) description = parsed.description;
    } catch(error) {
      console.error(error);
    }
  }

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

const WeeklyTaskDetailRoutePage = async ({ params }: WeeklyTaskRouteParams) => {
  // Пока сам TaskDetailScreen использует useParams из shim, поэтому просто монтируем client-компонент
  const resolvedParams = await Promise.resolve(params);
  const taskId = normalizeWeeklyTaskId(resolvedParams.taskId);
  const url = `${SITE_URL}/weekly/${taskId}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Задача недели",
            description:
              "Практическая задача недели для прокачки навыков фронтенда и JavaScript.",
            url,
            inLanguage: "ru-RU",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Задачи недели",
                item: `${SITE_URL}/weekly`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Задача недели",
                item: url,
              },
            ],
          }),
        }}
      />
      <WeeklyTaskDetailPageClient taskId={taskId} />
    </>
  );
};

export default WeeklyTaskDetailRoutePage;


