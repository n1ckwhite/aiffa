import React from "react";
import { blogArticles } from "@/shared/articles/manifest";

/**
 * No-JS friendly: неизвестный id не должен доходить до page.tsx с notFound(),
 * иначе в dev можно получить __next_error__ shell без видимой разметки.
 */
export const dynamicParams = false;

export const generateStaticParams = async () => {
  return (blogArticles || []).map((a) => ({ id: String(a.id) }));
};

const BlogArticleLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BlogArticleLayout;


