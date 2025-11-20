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

export const generateMetadata = async ({ params }: WeeklyTaskRouteParams): Promise<Metadata> => {
  const info = getWeeklyInfoById(params.taskId);
  let title = "Задача недели";
  let description: string | undefined;

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
    description
  };
};

const WeeklyTaskDetailRoutePage = ({ params }: WeeklyTaskRouteParams) => {
  // Пока сам TaskDetailScreen использует useParams из shim, поэтому просто монтируем client-компонент
  return <WeeklyTaskDetailPageClient taskId={params.taskId} />;
};

export default WeeklyTaskDetailRoutePage;


