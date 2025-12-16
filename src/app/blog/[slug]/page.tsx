import React from "react";
import type { Metadata } from "next";
import path from "node:path";
import { promises as fs } from "node:fs";
import { getBlogArticleBySlug } from "@/shared/articles/manifest";
import { parseBlogArticleMd } from "@/shared/articles/md";
import BlogArticlePageClient from "./BlogArticlePageClient";

type BlogArticleRouteParams = {
  params: {
    slug: string;
  };
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "http://localhost:3000";

export const generateMetadata = async ({ params }: BlogArticleRouteParams): Promise<Metadata> => {
  const fallback = getBlogArticleBySlug(params.slug);
  const url = `${SITE_URL}/blog/${params.slug}`;

  let title = fallback?.title ?? "Статья — AIFFA";
  let description = fallback?.description;

  const mdPath = fallback?.mdPath ?? `/articles/${params.slug}.md`;
  try {
    const relative = mdPath.startsWith("/") ? mdPath.slice(1) : mdPath;
    const filePath = path.join(process.cwd(), "public", relative);
    const md = await fs.readFile(filePath, "utf-8");
    const parsed = parseBlogArticleMd(md);
    if (parsed.title) title = parsed.title;
    if (parsed.description) description = parsed.description;
  } catch {
    // ignore
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

const BlogArticleRoutePage = async ({ params }: BlogArticleRouteParams) => {
  const meta = getBlogArticleBySlug(params.slug);
  if (!meta) {
    // fallback: still try to render md by convention
  }

  const mdPath = meta?.mdPath ?? `/articles/${params.slug}.md`;
  let initialMarkdown = "";
  try {
    const relative = mdPath.startsWith("/") ? mdPath.slice(1) : mdPath;
    const filePath = path.join(process.cwd(), "public", relative);
    initialMarkdown = await fs.readFile(filePath, "utf-8");
  } catch {
    initialMarkdown = `# Статья не найдена\n\nПохоже, ссылка устарела или статья ещё не опубликована.`;
  }

  return (
    <BlogArticlePageClient slug={params.slug} initialMarkdown={initialMarkdown} />
  );
};

export default BlogArticleRoutePage;


