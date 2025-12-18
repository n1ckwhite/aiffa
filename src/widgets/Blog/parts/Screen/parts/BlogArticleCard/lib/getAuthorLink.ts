import type { BlogArticle } from "@/widgets/Blog/types";

export const getAuthorHref = (article: BlogArticle) => {
  const authorGithub = article.author?.github;
  if (!authorGithub) return undefined;
  return `https://github.com/${authorGithub}`;
};


