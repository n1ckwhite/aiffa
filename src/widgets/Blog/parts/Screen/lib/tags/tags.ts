import { BlogArticle } from "@/widgets/Blog/types";
import type { ElementType } from "react";
import {
  FiCloud,
  FiCode,
  FiEye,
  FiGrid,
  FiHash,
  FiLayers,
  FiMonitor,
  FiServer,
  FiSmartphone,
  FiTag,
} from "react-icons/fi";
import type { BlogTagFilter } from "./types";



export const BLOG_TAG_FILTERS: BlogTagFilter[] = [
  "Все",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "React",
  "TypeScript",
  "Accessibility",
  "Архитектура",
];

export const normalizeTag = (value: string) => value.trim().toLowerCase();

export const TAG_ICONS: Record<BlogTagFilter, ElementType> = {
  Все: FiGrid,
  Frontend: FiMonitor,
  Backend: FiServer,
  Mobile: FiSmartphone,
  DevOps: FiCloud,
  React: FiCode,
  TypeScript: FiHash,
  Accessibility: FiEye,
  Архитектура: FiLayers,
};

export const getCategoryMeta = (rawCategory: string): { label: string; icon: ElementType } => {
  const label = rawCategory || "Insights";
  const t = normalizeTag(label);
  if (t === "react") return { label, icon: FiCode };
  if (t === "typescript" || t === "ts") return { label, icon: FiHash };
  if (t === "frontend" || t === "ui" || t === "css" || t === "html") return { label, icon: FiMonitor };
  if (t === "mobile" || t === "react-native" || t === "reactnative" || t === "ios" || t === "android") return { label, icon: FiSmartphone };
  if (t === "devops" || t === "docker" || t === "ci" || t === "cd" || t === "kubernetes" || t === "k8s") return { label, icon: FiCloud };
  if (t === "backend" || t === "back-end" || t === "бэкенд" || t === "бекенд" || t === "node" || t === "node.js") return { label, icon: FiServer };
  if (t === "accessibility" || t === "a11y" || t === "доступность") return { label, icon: FiEye };
  if (t === "архитектура" || t === "architecture" || t === "арх") return { label, icon: FiLayers };
  if (t === "next.js" || t === "nextjs") return { label, icon: FiLayers };
  return { label, icon: FiTag };
};

export const matchesTagFilter = (article: BlogArticle, filter: BlogTagFilter) => {
  if (filter === "Все") return true;
  const tags = (article.tags || []).map((t: string) => normalizeTag(t));
  if (!tags.length) return false;

  if (filter === "Frontend") {
    return tags.some((t: string) =>
      t === "frontend" ||
      t === "ui" ||
      t === "css" ||
      t === "html" ||
      t === "react" ||
      t === "typescript" ||
      t === "ts" ||
      t === "next.js" ||
      t === "nextjs" ||
      t === "chakra ui" ||
      t === "chakra-ui" ||
      t === "a11y" ||
      t === "accessibility"
    );
  }
  if (filter === "Backend") {
    return tags.some((t: string) => t === "backend" || t === "back-end" || t === "бэкенд" || t === "бекенд" || t === "сервер");
  }
  if (filter === "Mobile") {
    return tags.some((t: string) => t === "mobile" || t === "react-native" || t === "reactnative" || t === "ios" || t === "android");
  }
  if (filter === "DevOps") {
    return tags.some((t: string) => t === "devops" || t === "docker" || t === "ci" || t === "cd" || t === "github actions" || t === "kubernetes" || t === "k8s");
  }
  if (filter === "Архитектура") {
    return tags.some((t: string) => t === "архитектура" || t === "architecture" || t === "арх");
  }
  return tags.includes(normalizeTag(filter));
};


