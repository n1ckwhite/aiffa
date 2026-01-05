import React from "react";
import type { Metadata } from "next";
import WeeklyTasksPageClient from "./WeeklyTasksPageClient";
import path from "node:path";
import { promises as fs } from "node:fs";
import { weeklyManifest } from "shared/weekly/manifest";
import { parseWeeklyTaskMd } from "shared/weekly/md";
import type { WeeklyTaskInitialMeta } from "shared/weekly/types/initial";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Задачи недели — AIFFA",
  description: "Еженедельные практические задачи для прокачки навыков разработки",
  alternates: {
    canonical: `${SITE_URL}/weekly`,
  },
};

const inferTag = (lang: string | undefined) => {
  if (!lang) return undefined;
  if (lang === "html") return "HTML";
  if (lang === "go") return "GO";
  if (lang === "javascript") return "JS";
  if (lang === "css") return "CSS";
  if (lang === "typescript") return "TS";
  if (lang === "tsx" || lang === "jsx") return "REACT";
  return undefined;
};

const loadWeeklyTaskInitialMeta = async (task: any): Promise<WeeklyTaskInitialMeta> => {
  const fallback: WeeklyTaskInitialMeta = {
    id: String(task?.id || ""),
    mdPath: String(task?.mdPath || ""),
    editorLanguage: String(task?.editorLanguage || "shell"),
    title: String(task?.id || "Задача недели"),
    description: "",
    tag: typeof task?.tag === "string" ? String(task.tag) : inferTag(task?.editorLanguage),
  };

  if (!fallback.id || !fallback.mdPath) return fallback;

  try {
    const relative = fallback.mdPath.startsWith("/") ? fallback.mdPath.slice(1) : fallback.mdPath;
    const filePath = path.join(process.cwd(), "public", relative);
    const md = await fs.readFile(filePath, "utf-8");
    const stat = await fs.stat(filePath);
    const parsed = parseWeeklyTaskMd(md);

    const authorUrl =
      parsed.author?.url ||
      (parsed.author?.github ? `https://github.com/${parsed.author.github}` : undefined);

    const tag = parsed.tag || fallback.tag || inferTag(parsed.editorLanguage || fallback.editorLanguage);

    return {
      ...fallback,
      parsedId: parsed.id || undefined,
      title: parsed.title || fallback.title,
      description: parsed.description || fallback.description,
      authorName: parsed.author?.name || undefined,
      authorUrl,
      tag,
      level: parsed.level,
      starsCount: parsed.stars,
      commentsCount: parsed.comments,
      solvedCount: parsed.solvedCount,
      updatedAt: new Date(stat.mtimeMs).toISOString(),
      createdAt: new Date(stat.birthtimeMs).toISOString(),
    };
  } catch {
    return fallback;
  }
};

const WeeklyTasksRoute = async () => {
  const initialTasks = await Promise.all(weeklyManifest.map((t) => loadWeeklyTaskInitialMeta(t)));
  return <WeeklyTasksPageClient initialTasks={initialTasks} />;
};

export default WeeklyTasksRoute;



