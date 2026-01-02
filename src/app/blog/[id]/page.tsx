import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles } from "@/shared/articles/manifest";
import BlogArticlePageClient from "./BlogArticlePageClient";
import SeoStructuredData from "./SeoStructuredData";
import { formatRuDate, getBlogArticleOrNull, readPublicMarkdownOrNull, SITE_URL } from "./utils";

type BlogArticleRouteParams = {
  params: { id: string } | Promise<{ id: string }>;
};

const getNeighbors = (id: string) => {
  const sorted = (blogArticles || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex((a) => String(a.id) === String(id));
  if (idx < 0) return { prev: null, next: null };
  const next = idx > 0 ? sorted[idx - 1] : null;
  const prev = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  return { prev, next };
};

export const generateMetadata = async ({ params }: BlogArticleRouteParams): Promise<Metadata> => {
  const resolvedParams = await Promise.resolve(params);
  const id = (resolvedParams?.id ?? "").toString();
  const article = getBlogArticleOrNull(id);
  if (!article) return {};

  const url = `${SITE_URL}/blog/${article.id}`;
  const ogImage = article.coverImage
    ? article.coverImage.startsWith("http")
      ? article.coverImage
      : `${SITE_URL}${article.coverImage}`
    : undefined;

  return {
    title: article.title,
    description: article.description || "Статья в блоге AIFFA",
    alternates: { canonical: url },
    openGraph: {
      url,
      title: article.title,
      description: article.description || "Статья в блоге AIFFA",
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: article.title,
      description: article.description || "Статья в блоге AIFFA",
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
};

const BlogArticleRoutePage = async ({ params }: BlogArticleRouteParams) => {
  const resolvedParams = await Promise.resolve(params);
  const id = (resolvedParams?.id ?? "").toString();
  const article = getBlogArticleOrNull(id);
  if (!article) return notFound();

  const md = await readPublicMarkdownOrNull(article.mdPath);
  if (!md) return notFound();

  const formattedDate = formatRuDate(article.date);

  return (
    <>
      <SeoStructuredData article={article} />
      <BlogArticlePageClient
        article={article}
        markdown={md}
        formattedDate={formattedDate}
      />
    </>
  );
};

export default BlogArticleRoutePage;


