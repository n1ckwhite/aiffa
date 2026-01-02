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
  Tooltip,
} from "@chakra-ui/react";
import type { BlogArticleMeta } from "@/shared/articles/manifest/types";
import { useAppColors } from "@/shared/theme/colors";
import { AppButtonLink } from "@/shared/ui/AppLink";
import { MarkdownRenderer } from "@/shared/ui/MarkdownRenderer";
import PillBadge from "@/shared/ui/PillBadge";
import { formatCount } from "@/shared/functions/formatCount";
import {
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCode,
  FiCopy,
  FiHash,
  FiLayers,
  FiMessageCircle,
  FiSearch,
  FiStar,
  FiTag,
} from "react-icons/fi";

type BlogArticlePageClientProps = {
  article: BlogArticleMeta;
  markdown: string;
  formattedDate: string;
};

export const BlogArticlePageClient: React.FC<BlogArticlePageClientProps> = ({
  article,
  markdown,
  formattedDate,
}) => {
  const theme = useAppColors();
  const getTagIcon = (tag: string) => {
    const t = (tag || "").toLowerCase();
    if (t === "react") return FiCode;
    if (t === "typescript") return FiHash;
    if (t === "next.js" || t === "nextjs") return FiLayers;
    if (t === "seo") return FiSearch;
    return FiTag;
  };
  const metaRowColor = useColorModeValue("gray.600", "gray.300");
  const metaChipBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const metaChipBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const metaChipText = useColorModeValue("gray.700", "whiteAlpha.900");
  const calendarMetaColor = useColorModeValue("blue.600", "blue.300");
  const clockMetaColor = useColorModeValue("purple.600", "purple.300");
  const commentsMetaColor = useColorModeValue("green.600", "green.300");
  const actionIconColor = useColorModeValue("gray.600", "whiteAlpha.800");
  const copiedIconColor = useColorModeValue("green.600", "green.300");
  const ghostHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const ghostActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.200");
  const ghostFocusShadow = useColorModeValue("0 0 0 3px rgba(59,130,246,0.35)", "0 0 0 3px rgba(96,165,250,0.35)");
  const starIconActiveColor = useColorModeValue("yellow.500", "yellow.300");
  const savedIconActiveColor = useColorModeValue("blue.600", "blue.300");
  const mdTopBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");

  const [isStarred, setIsStarred] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [isShareCopied, setIsShareCopied] = React.useState(false);
  const shareCopyTimeoutRef = React.useRef<number | null>(null);

  const baseStars = typeof article.starsCount === "number" ? article.starsCount : 0;
  const displayStars = baseStars + (isStarred ? 1 : 0);
  const commentsCount = typeof article.commentsCount === "number" ? article.commentsCount : null;

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
      setIsShareCopied(true);
      if (shareCopyTimeoutRef.current != null) window.clearTimeout(shareCopyTimeoutRef.current);
      shareCopyTimeoutRef.current = window.setTimeout(() => setIsShareCopied(false), 1500);
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
      setIsShareCopied(true);
      if (shareCopyTimeoutRef.current != null) window.clearTimeout(shareCopyTimeoutRef.current);
      shareCopyTimeoutRef.current = window.setTimeout(() => setIsShareCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  React.useEffect(() => {
    return () => {
      if (shareCopyTimeoutRef.current != null) {
        window.clearTimeout(shareCopyTimeoutRef.current);
      }
    };
  }, []);

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
        <Box
          w="full"
          maxW="100%"
          mx="0"
          sx={{
            ".md-content": {
              maxWidth: "100% !important",
              marginLeft: "0 !important",
              marginRight: "0 !important",
            },
          }}
        >
          <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
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

            <VStack align="stretch" spacing={2}>
              <HStack spacing={3} flexWrap="wrap" align="center" color={metaRowColor}>
                {Array.isArray(article.tags) && article.tags.length > 0 && (
                  <HStack as="span" spacing={2} flexWrap="wrap" align="center">
                    {article.tags.slice(0, 4).map((t, idx) => {
                      const scheme = idx === 0 ? "blue" : idx === 1 ? "purple" : "gray";
                      const TagIcon = getTagIcon(t);
                      return (
                        <PillBadge
                          key={t}
                          colorScheme={scheme as any}
                          variant="outline"
                          uppercase={false}
                          icon={TagIcon}
                        >
                          {t}
                        </PillBadge>
                      );
                    })}
                  </HStack>
                )}

                <HStack spacing={3} fontSize="sm" color={metaRowColor}>
                  <HStack spacing={1.5}>
                    <Icon as={FiCalendar} color={calendarMetaColor} aria-hidden />
                    <Text>{formattedDate}</Text>
                  </HStack>
                  <HStack spacing={1.5}>
                    <Icon as={FiClock} color={clockMetaColor} aria-hidden />
                    <Text>{article.readingTime ?? "—"}</Text>
                  </HStack>
                  {typeof commentsCount === "number" && (
                    <HStack spacing={1.5}>
                      <Icon as={FiMessageCircle} color={commentsMetaColor} aria-hidden />
                      <Text>{formatCount(commentsCount)}</Text>
                    </HStack>
                  )}
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

              <VStack align="stretch" spacing={0.5}>
                <Text color={theme.descColor} lineHeight={1.65} noOfLines={2}>
                  {article.description}
                </Text>
              </VStack>

              <HStack
                spacing={2}
                flexWrap="wrap"
                align="center"
                pt={1}
                color={metaRowColor}
                fontSize="sm"
              >
                <HStack spacing={1.5}>
                  {article.author?.github ? (
                    <Link
                      href={`https://github.com/${article.author.github}`}
                      isExternal
                      aria-label={`Профиль автора ${article.author.name} на GitHub`}
                      _hover={{ textDecoration: "none", opacity: 0.9 }}
                    >
                      <Avatar
                        name={article.author.name}
                        src={`https://avatars.githubusercontent.com/${article.author.github}?s=64`}
                        boxSize="20px"
                      />
                    </Link>
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

                <Tooltip
                  label={isStarred ? "Убрать оценку" : "Поставить оценку"}
                  hasArrow
                  placement="top"
                  openDelay={250}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleToggleStar}
                    aria-label={isStarred ? "Убрать оценку" : "Поставить оценку"}
                    aria-pressed={isStarred}
                    h="32px"
                    px={2}
                    minW="auto"
                    sx={{
                      "& svg, & svg *": {
                        stroke: isStarred ? starIconActiveColor : actionIconColor,
                        fill: "none",
                      },
                    }}
                    _hover={{ bg: ghostHoverBg }}
                    _active={{ bg: ghostActiveBg }}
                    _focusVisible={{ boxShadow: ghostFocusShadow }}
                  >
                    <HStack spacing={1.5} align="center">
                      <Icon as={FiStar} boxSize={4} aria-hidden />
                      <Text as="span" fontWeight={600}>
                        {displayStars}
                      </Text>
                    </HStack>
                  </Button>
                </Tooltip>

                <Tooltip
                  label={isSaved ? "Убрать из сохранённых" : "Сохранить"}
                  hasArrow
                  placement="top"
                  openDelay={250}
                >
                  <IconButton
                    size="sm"
                    variant="ghost"
                    onClick={handleToggleSaved}
                    aria-label={isSaved ? "Убрать из сохранённых" : "Сохранить статью"}
                    aria-pressed={isSaved}
                    w="32px"
                    h="32px"
                    icon={<Icon as={FiBookmark} />}
                    sx={{
                      "& svg, & svg *": {
                        stroke: isSaved ? savedIconActiveColor : actionIconColor,
                        fill: "none",
                      },
                    }}
                    _hover={{ bg: ghostHoverBg }}
                    _active={{ bg: ghostActiveBg }}
                    _focusVisible={{ boxShadow: ghostFocusShadow }}
                  />
                </Tooltip>

                <Tooltip label={isShareCopied ? "Скопировано!" : "Скопировать ссылку"} hasArrow placement="top" openDelay={250}>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyShareLink}
                    aria-label={isShareCopied ? "Скопировано" : "Скопировать ссылку на статью"}
                    w="32px"
                    h="32px"
                    icon={<Icon as={isShareCopied ? FiCheck : FiCopy} />}
                    sx={{
                      "& svg, & svg *": {
                        stroke: isShareCopied ? copiedIconColor : actionIconColor,
                        fill: "none",
                      },
                    }}
                    _hover={{ bg: ghostHoverBg }}
                    _active={{ bg: ghostActiveBg }}
                    _focusVisible={{ boxShadow: ghostFocusShadow }}
                  />
                </Tooltip>
              </HStack>
            </VStack>

            <Box
              borderTopWidth="1px"
              borderTopColor={mdTopBorderColor}
            >
              <MarkdownRenderer content={normalizedMarkdown} />
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogArticlePageClient;


