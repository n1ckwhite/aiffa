import { createAsyncCache } from "utils/cache";
import type { BlogArticleMeta } from "./manifest";

const blogManifestCache = createAsyncCache<string, BlogArticleMeta[]>();

export const loadBlogArticles = async (): Promise<BlogArticleMeta[]> => {
  return blogManifestCache.get("blog-articles", async () => {
    const mod = await import("./manifest");
    return (mod.blogArticles || []) as BlogArticleMeta[];
  });
};

export const loadBlogArticleBySlug = async (slug: string): Promise<BlogArticleMeta | null> => {
  const list = await loadBlogArticles();
  return list.find((a) => a.slug === slug) ?? null;
};


