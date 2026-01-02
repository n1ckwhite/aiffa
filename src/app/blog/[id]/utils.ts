import path from "node:path";
import { promises as fs } from "node:fs";
import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import { getBlogArticleById } from "@/shared/articles/manifest";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const getBlogArticleOrNull = (id: string): BlogArticleMeta | null => {
  const safeId = (id || "").trim();
  if (!safeId) return null;
  return getBlogArticleById(safeId) ?? null;
};

export const readPublicMarkdownOrNull = async (mdPath: string): Promise<string | null> => {
  const relative = (mdPath || "").trim().replace(/^\/+/, "");
  if (!relative) return null;
  const filePath = path.join(process.cwd(), "public", relative);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
};

export const formatRuDate = (iso: string) => {
  const safeIso = (iso || "").trim();
  if (!safeIso) return "";
  const d = new Date(safeIso);
  if (Number.isNaN(d.getTime())) return safeIso;
  return new Intl.DateTimeFormat("ru-RU", { year: "numeric", month: "long", day: "numeric" }).format(d);
};


