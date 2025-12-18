import { BlogArticle } from "@/widgets/Blog/types";
import { AuthorBadge } from "./types";



export const getAuthorBadge = (article: BlogArticle): AuthorBadge => {
  const hasGithub = Boolean(article.author?.github);
  const date = new Date(article.date);
  const isRecent = Number.isFinite(date.getTime()) && Date.now() - date.getTime() <= 1000 * 60 * 60 * 24 * 31;
  const isTop =
    (typeof article.starsCount === "number" && article.starsCount >= 50) ||
    (typeof article.viewsCount === "number" && article.viewsCount >= 1500);

  if (isRecent && isTop) return { label: "Топ месяца", colorScheme: "yellow" };
  if (hasGithub) return { label: "Контрибьютор", colorScheme: "purple" };
  return { label: "Автор AIFFA", colorScheme: "blue" };
};


