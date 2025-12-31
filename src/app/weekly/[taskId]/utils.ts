import path from "node:path";
import { promises as fs } from "node:fs";
import { getWeeklyInfoById } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";

export type WeeklyMeta = {
  title: string;
  description: string;
  authorName?: string;
};

const FALLBACK_TITLE = "Задача недели";
const FALLBACK_DESCRIPTION =
  "Задача недели на AIFFA: короткая практическая задача с примером, подсказкой и проверкой решения.";

export const normalizeWeeklyTaskId = (rawTaskId: string) => {
  const trimmed = (rawTaskId || "").trim();
  if (!trimmed) return "";
  // Backward compatibility: allow `/weekly/1` -> `/weekly/weekly-1`
  if (/^\d+$/.test(trimmed)) return `weekly-${trimmed}`;
  return trimmed;
};

export const loadWeeklyMeta = async (taskId: string): Promise<WeeklyMeta> => {
  const info = getWeeklyInfoById(taskId);
  if (!info?.mdPath) {
    return { title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION };
  }

  try {
    const relative = info.mdPath.startsWith("/") ? info.mdPath.slice(1) : info.mdPath;
    const filePath = path.join(process.cwd(), "public", relative);
    const md = await fs.readFile(filePath, "utf-8");
    const parsed = parseWeeklyTaskMd(md);

    const title = parsed.title || FALLBACK_TITLE;
    const description = parsed.description || FALLBACK_DESCRIPTION;
    const authorName = parsed.author?.name ? parsed.author.name : undefined;

    return { title, description, authorName };
  } catch {
    return { title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION };
  }
};


