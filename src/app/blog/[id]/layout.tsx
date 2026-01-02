import React from "react";
import { loadBlogArticles } from "shared/articles/api";

/**
 * No-JS friendly: неизвестный id не должен доходить до page.tsx с notFound(),
 * иначе в dev можно получить __next_error__ shell без видимой разметки.
 */
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const list = await loadBlogArticles();
  return (list || []).map((a) => ({ id: String(a.id) }));
};

const BlogArticleLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BlogArticleLayout;


