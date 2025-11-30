import React from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { getWeeklyInfoById } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";
import WeeklyTaskDetailPageClient from "./WeeklyTaskDetailPageClient";

type WeeklyTaskRouteParams = {
  params: {
    taskId: string;
  };
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({ params }: WeeklyTaskRouteParams): Promise<Metadata> => {
  const info = getWeeklyInfoById(params.taskId);
  let title = "Задача недели";
  let description: string | undefined;
  const url = `${SITE_URL}/weekly/${params.taskId}`;

  if (info?.mdPath) {
    try {
      const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
      const filePath = path.join(process.cwd(), "public", relative);
      const md = await fs.readFile(filePath, "utf-8");
      const parsed = parseWeeklyTaskMd(md);
      if (parsed.title) title = parsed.title;
      if (parsed.description) description = parsed.description;
    } catch {
      // игнорируем ошибки чтения md, используем fallback
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

const WeeklyTaskDetailRoutePage = ({ params }: WeeklyTaskRouteParams) => {
  // Пока сам TaskDetailScreen использует useParams из shim, поэтому просто монтируем client-компонент
  const url = `${SITE_URL}/weekly/${params.taskId}`;

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
      <WeeklyTaskDetailPageClient taskId={params.taskId} />
    </>
  );
};

export default WeeklyTaskDetailRoutePage;


