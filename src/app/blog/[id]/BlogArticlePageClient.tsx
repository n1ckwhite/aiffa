"use client";

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import { useAppColors } from "@/shared/theme/colors";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { MarkdownRenderer } from "@/shared/ui/MarkdownRenderer";
import PillBadge from "@/shared/ui/PillBadge";
import { FiBookmark, FiCalendar, FiClock, FiCopy, FiStar } from "react-icons/fi";

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
  const metaRowColor = useColorModeValue("gray.600", "gray.300");
  const metaChipBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const metaChipBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const metaChipText = useColorModeValue("gray.700", "whiteAlpha.900");
  const calendarIconColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const clockIconColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const actionIconColor = useColorModeValue("gray.600", "whiteAlpha.800");
  const ghostHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const ghostActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const ghostFocusShadow = useColorModeValue("0 0 0 3px rgba(59,130,246,0.35)", "0 0 0 3px rgba(96,165,250,0.35)");
  const starIconActiveColor = useColorModeValue("yellow.500", "yellow.300");
  const savedIconActiveColor = useColorModeValue("blue.600", "blue.300");

  const [isStarred, setIsStarred] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const baseStars = typeof article.starsCount === "number" ? article.starsCount : 0;
  const displayStars = baseStars + (isStarred ? 1 : 0);

  React.useEffect(() => {
    try {
      setIsStarred(window.localStorage.getItem(`blog-starred:${article.id}`) === "1");
      setIsSaved(window.localStorage.getItem(`blog-saved:${article.id}`) === "1");
    } catch {
      setIsStarred(false);
      setIsSaved(false);
    }
  }, [article.id]);

  const handleToggleStar = () => {
    const next = !isStarred;
    setIsStarred(next);
    try {
      window.localStorage.setItem(`blog-starred:${article.id}`, next ? "1" : "0");
    } catch {
      // ignore
    }
  };

  const handleToggleSaved = () => {
    const next = !isSaved;
    setIsSaved(next);
    try {
      window.localStorage.setItem(`blog-saved:${article.id}`, next ? "1" : "0");
    } catch {
      // ignore
    }
  };

  const handleCopyShareLink = async () => {
    const url = `${window.location.origin}/blog/${article.id}`;
    try {
      await navigator.clipboard.writeText(url);
      return;
    } catch {
      // fallback
    }
    try {
      const el = document.createElement("textarea");
      el.value = url;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
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
              <AppButtonLink
                to="/blog"
                size="sm"
                variant="ghost"
                aria-label="Вернуться в блог"
                _hover={{ bg: ghostHoverBg }}
                _active={{ bg: ghostActiveBg }}
                _focusVisible={{ boxShadow: ghostFocusShadow }}
              >
                ← В блог
              </AppButtonLink>
            </HStack>

            <VStack align="stretch" spacing={3}>
              <HStack spacing={3} flexWrap="wrap" align="center" color={metaRowColor}>
                {Array.isArray(article.tags) &&
                  article.tags.slice(0, 4).map((t, idx) => {
                    const scheme = idx === 0 ? "blue" : idx === 1 ? "purple" : "gray";
                    return (
                      <PillBadge
                        key={t}
                        colorScheme={scheme as any}
                        variant="outline"
                        uppercase={false}
                      >
                        {t}
                      </PillBadge>
                    );
                  })}

                <HStack spacing={3} fontSize="sm" color={metaRowColor}>
                  <HStack spacing={1.5}>
                    <Icon as={FiCalendar} color={calendarIconColor} aria-hidden />
                    <Text>{formattedDate}</Text>
                  </HStack>
                  <HStack spacing={1.5}>
                    <Icon as={FiClock} color={clockIconColor} aria-hidden />
                    <Text>{article.readingTime ?? "—"}</Text>
                  </HStack>
                </HStack>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: "2xl", md: "4xl" }}
                lineHeight={1.12}
                color={theme.titleColor}
                whiteSpace="pre-wrap"
              >
                {article.title}
              </Heading>

              <VStack align="stretch" spacing={1}>
                <Text color={theme.descColor} lineHeight={1.65} noOfLines={2}>
                  {article.description}
                </Text>
              </VStack>

              <HStack
                spacing={4}
                flexWrap="wrap"
                align="center"
                pt={1}
                color={metaRowColor}
                fontSize="sm"
              >
                <HStack spacing={2}>
                  {article.author?.github ? (
                    <Avatar
                      name={article.author.name}
                      src={`https://avatars.githubusercontent.com/${article.author.github}?s=64`}
                      boxSize="20px"
                    />
                  ) : null}
                  {article.author?.github ? (
                    <Link
                      href={`https://github.com/${article.author.github}`}
                      isExternal
                      color={theme.blue.accent}
                      fontWeight={700}
                      aria-label={`Профиль автора ${article.author.name} на GitHub`}
                    >
                      {article.author.github}
                    </Link>
                  ) : (
                    <Text fontWeight={700} color={theme.titleColor}>
                      {article.author?.name ?? "AIFFA"}
                    </Text>
                  )}
                </HStack>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleToggleStar}
                  aria-label={isStarred ? "Убрать оценку" : "Поставить оценку"}
                  aria-pressed={isStarred}
                  leftIcon={<Icon as={FiStar} />}
                  sx={{
                    "& .chakra-button__icon svg, & .chakra-button__icon svg *": {
                      stroke: isStarred ? starIconActiveColor : actionIconColor,
                      fill: "none",
                    },
                  }}
                  _hover={{ bg: ghostHoverBg }}
                  _active={{ bg: ghostActiveBg }}
                  _focusVisible={{ boxShadow: ghostFocusShadow }}
                >
                  {displayStars}
                </Button>

                <IconButton
                  size="sm"
                  variant="ghost"
                  onClick={handleToggleSaved}
                  aria-label={isSaved ? "Убрать из сохранённых" : "Сохранить статью"}
                  aria-pressed={isSaved}
                  icon={<Icon as={FiBookmark} />}
                  sx={{
                    "& .chakra-button__icon svg, & .chakra-button__icon svg *": {
                      stroke: isSaved ? savedIconActiveColor : actionIconColor,
                      fill: "none",
                    },
                  }}
                  _hover={{ bg: ghostHoverBg }}
                  _active={{ bg: ghostActiveBg }}
                  _focusVisible={{ boxShadow: ghostFocusShadow }}
                />

                <IconButton
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyShareLink}
                  aria-label="Скопировать ссылку на статью"
                  icon={<Icon as={FiCopy} />}
                  sx={{
                    "& .chakra-button__icon svg, & .chakra-button__icon svg *": {
                      stroke: actionIconColor,
                      fill: "none",
                    },
                  }}
                  _hover={{ bg: ghostHoverBg }}
                  _active={{ bg: ghostActiveBg }}
                  _focusVisible={{ boxShadow: ghostFocusShadow }}
                />
              </HStack>
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


