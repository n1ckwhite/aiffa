"use client";

import React from "react";
import BlogArticleScreen from "@/widgets/Blog/parts/ArticleScreen/BlogArticleScreen";
import { loadBlogArticleBySlug } from "@/shared/articles/api";
import type { BlogArticle } from "@/widgets/Blog/types";
import { parseBlogArticleMd, splitBlogArticleMarkdown } from "@/shared/articles/md";

type BlogArticlePageClientProps = {
  slug: string;
  initialMarkdown: string;
};

const BlogArticlePageClient = ({ slug, initialMarkdown }: BlogArticlePageClientProps) => {
  const [article, setArticle] = React.useState<BlogArticle | null>(null);
  const markdown = React.useMemo(() => splitBlogArticleMarkdown(initialMarkdown).body, [initialMarkdown]);

  React.useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const meta = await loadBlogArticleBySlug(slug);
      if (cancelled) return;

      if (meta) {
        setArticle(meta as BlogArticle);
        return;
      }

      // fallback: derive minimal meta from markdown frontmatter/body
      const parsed = parseBlogArticleMd(initialMarkdown);
      setArticle({
        slug,
        title: parsed.title || "Статья",
        description: parsed.description || "",
        date: parsed.date || new Date().toISOString().slice(0, 10),
        tags: parsed.tags || [],
        author: { name: parsed.author?.name || "AIFFA" },
        readingTime: parsed.readingTime,
        coverImage: parsed.coverImage,
        mdPath: `/articles/${slug}.md`,
      });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [slug, initialMarkdown]);

  if (!article) {
    return null;
  }

  return <BlogArticleScreen article={article} markdown={markdown} />;
};

export default BlogArticlePageClient;


