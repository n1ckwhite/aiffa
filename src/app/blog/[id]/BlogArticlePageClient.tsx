"use client";

import React from "react";
import { Box, Heading, HStack, Link, Tag, Text, VStack } from "@chakra-ui/react";
import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import { useAppColors } from "@/shared/theme/colors";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { MarkdownRenderer } from "@/shared/ui/MarkdownRenderer";
import { AuthorCard } from "@/shared/ui/AuthorCard";

type BlogArticlePageClientProps = {
  article: BlogArticleMeta;
  markdown: string;
  formattedDate: string;
  prevArticle: Pick<BlogArticleMeta, "id" | "title"> | null;
  nextArticle: Pick<BlogArticleMeta, "id" | "title"> | null;
};

export const BlogArticlePageClient: React.FC<BlogArticlePageClientProps> = ({
  article,
  markdown,
  formattedDate,
  prevArticle,
  nextArticle,
}) => {
  const theme = useAppColors();
  const [isAuthorStarred, setIsAuthorStarred] = React.useState(false);

  React.useEffect(() => {
    const key = `blog-author-starred:${article.id}`;
    try {
      const raw = window.localStorage.getItem(key);
      setIsAuthorStarred(raw === "1");
    } catch {
      setIsAuthorStarred(false);
    }
  }, [article.id]);

  const handleToggleAuthorStar = () => {
    const next = !isAuthorStarred;
    setIsAuthorStarred(next);
    const key = `blog-author-starred:${article.id}`;
    try {
      window.localStorage.setItem(key, next ? "1" : "0");
    } catch {
      // ignore
    }
  };

  const normalizedMarkdown = React.useMemo(() => {
    const raw = (markdown || "").replace(/\r\n/g, "\n");
    if (!raw.trim()) return raw;

    const lines = raw.split("\n");

    const first = (lines[0] || "").trim();
    const second = (lines[1] || "").trim();

    // Убираем дублирующий заголовок/строку автора в markdown, т.к. они уже есть в шапке страницы.
    if (first === `# ${article.title}`) {
      lines.shift();
      if ((lines[0] || "").trim() === "") lines.shift();
    }
    if (second.toLowerCase().startsWith("автор:") || (lines[0] || "").trim().toLowerCase().startsWith("автор:")) {
      if ((lines[0] || "").trim().toLowerCase().startsWith("автор:")) lines.shift();
      if ((lines[0] || "").trim() === "") lines.shift();
    }

    return lines.join("\n").trimStart();
  }, [article.title, markdown]);

  return (
    <Box as="main" id="main-content" w="full" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <Box w="full" maxW="1120px" mx="auto">
        <Box w="full" maxW="840px" mx="0">
          <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
            <HStack justify="space-between" align="center" flexWrap="wrap" gap={3}>
              <AppButtonLink to="/blog" size="sm" variant="ghost" aria-label="Вернуться в блог">
                ← В блог
              </AppButtonLink>
            </HStack>

            <VStack align="stretch" spacing={3}>
              <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} lineHeight={1.15} color={theme.titleColor}>
                {article.title}
              </Heading>

              <HStack spacing={3} flexWrap="wrap" color={theme.descColor}>
                <Text fontSize="sm">{formattedDate}</Text>
                {article.readingTime ? (
                  <>
                    <Text fontSize="sm">•</Text>
                    <Text fontSize="sm">{article.readingTime}</Text>
                  </>
                ) : null}
              </HStack>

              {Array.isArray(article.tags) && article.tags.length > 0 && (
                <HStack spacing={2} flexWrap="wrap">
                  {article.tags.map((t) => (
                    <Tag
                      key={t}
                      size="sm"
                      bg="whiteAlpha.100"
                      borderWidth="1px"
                      borderColor="whiteAlpha.200"
                      color={theme.descColor}
                    >
                      {t}
                    </Tag>
                  ))}
                </HStack>
              )}

              <Text color={theme.descColor} lineHeight={1.7} w="full">
                {article.description}
              </Text>

              <AuthorCard
                author={
                  article.author?.github
                    ? { username: article.author.github, name: article.author.name }
                    : undefined
                }
                borderColor={theme.borderColor}
                descColor={theme.descColor}
                linkColor={theme.blue.accent}
                starsCount={typeof article.starsCount === "number" ? article.starsCount : undefined}
                viewsCount={typeof article.viewsCount === "number" ? article.viewsCount : undefined}
                commentsCount={typeof article.commentsCount === "number" ? article.commentsCount : undefined}
                isStarred={isAuthorStarred}
                onToggleStar={handleToggleAuthorStar}
                context="lesson"
              />
            </VStack>

            <Box minW={0}>
              <MarkdownRenderer content={normalizedMarkdown} />

              <HStack mt={{ base: 8, md: 10 }} justify="space-between" flexWrap="wrap" gap={3}>
                {prevArticle ? (
                  <AppButtonLink
                    to={`/blog/${prevArticle.id}`}
                    variant="outline"
                    aria-label={`Предыдущая статья: ${prevArticle.title}`}
                  >
                    ← {prevArticle.title}
                  </AppButtonLink>
                ) : (
                  <Box />
                )}

                {nextArticle ? (
                  <AppButtonLink
                    to={`/blog/${nextArticle.id}`}
                    variant="outline"
                    aria-label={`Следующая статья: ${nextArticle.title}`}
                  >
                    {nextArticle.title} →
                  </AppButtonLink>
                ) : (
                  <Box />
                )}
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogArticlePageClient;


