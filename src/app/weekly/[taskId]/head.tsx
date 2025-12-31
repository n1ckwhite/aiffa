import React from "react";
import path from "node:path";
import { promises as fs } from "node:fs";
import { getWeeklyInfoById } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";

type WeeklyTaskHeadProps = {
  params: { taskId: string };
};

const normalizeWeeklyTaskId = (rawTaskId: string) => {
  const trimmed = (rawTaskId || "").trim();
  if (!trimmed) return "";
  // Backward compatibility: allow `/weekly/1` -> `/weekly/weekly-1`
  if (/^\d+$/.test(trimmed)) return `weekly-${trimmed}`;
  return trimmed;
};

const FALLBACK_DESCRIPTION =
  "Еженедельная практическая задача для развития навыков программирования и инженерной культуры.";

export default async function Head({ params }: WeeklyTaskHeadProps) {
  const taskId = normalizeWeeklyTaskId(params.taskId);
  const info = getWeeklyInfoById(taskId);

  let title = "Задача недели — AIFFA";
  let description = FALLBACK_DESCRIPTION;

  if (info?.mdPath) {
    try {
      const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
      const filePath = path.join(process.cwd(), "public", relative);
      const md = await fs.readFile(filePath, "utf-8");
      const parsed = parseWeeklyTaskMd(md);
      if (parsed.title) title = parsed.title.includes("AIFFA") ? parsed.title : `${parsed.title} — AIFFA`;
      if (parsed.description) description = parsed.description;
    } catch {
      // ignore
    }
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}


