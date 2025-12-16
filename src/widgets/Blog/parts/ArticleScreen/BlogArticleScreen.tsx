import React from "react";
import { AspectRatio, Avatar, Badge, Box, Button, HStack, Heading, Icon, Image, Link, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiArrowLeft, FiShare2 } from "react-icons/fi";
import MarkdownRenderer from "@/shared/ui/MarkdownRenderer";
import { useAppColors } from "@/shared/theme/colors";
import type { BlogArticle } from "../../types";

type BlogArticleScreenProps = {
  article: BlogArticle;
  markdown: string;
};

const getDateLabel = (iso: string) => {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
};

const getGithubAvatarUrl = (username?: string, size: number = 96) => {
  if (!username) return undefined;
  return `https://github.com/${username}.png?size=${size}`;
};

const BlogArticleScreen: React.FC<BlogArticleScreenProps> = ({ article, markdown }) => {
  const theme = useAppColors();

  const handleShareClick = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.description, url });
        return;
      }
    } catch {
      // ignore share errors
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <Box as="section" position="relative" pb="32px" aria-labelledby="blog-article-title">
      <Box w="100%" maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <VStack align="stretch" spacing={{ base: 5, md: 6 }}>
          <HStack justify="space-between" align="center" flexWrap="wrap" gap={2}>
            <Button
              as={RouterLink as any}
              to="/blog"
              leftIcon={<Icon as={FiArrowLeft} />}
              variant="outline"
              borderRadius="full"
            >
              К статьям
            </Button>
            <Button
              onClick={handleShareClick}
              leftIcon={<Icon as={FiShare2} />}
              variant="ghost"
              borderRadius="full"
              aria-label="Поделиться статьёй"
            >
              Поделиться
            </Button>
          </HStack>

          <Box
            bg={theme.cardBg}
            borderWidth="1px"
            borderColor={theme.borderColor}
            borderRadius="2xl"
            p={{ base: 5, md: 7 }}
          >
            <VStack align="stretch" spacing={3}>
              {article.coverImage ? (
                <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden">
                  <Image src={article.coverImage} alt={article.title} objectFit="cover" loading="lazy" decoding="async" />
                </AspectRatio>
              ) : null}

              <HStack spacing={3} pt={article.coverImage ? 2 : 0} align="center" flexWrap="wrap">
                <Avatar
                  name={article.author?.name || "Автор"}
                  src={getGithubAvatarUrl(article.author?.github, 96)}
                  boxSize="38px"
                />
                <VStack spacing={0} align="start" minW={0}>
                  {article.author?.github ? (
                    <Link
                      href={`https://github.com/${article.author.github}`}
                      isExternal
                      color={theme.titleColor}
                      fontWeight="semibold"
                      noOfLines={1}
                    >
                      {article.author.name}
                    </Link>
                  ) : (
                    <Text fontWeight="semibold" color={theme.titleColor} noOfLines={1}>
                      {article.author?.name || "—"}
                    </Text>
                  )}
                  <Text fontSize="xs" color={theme.descColor}>
                    {getDateLabel(article.date)} • {article.readingTime ?? "—"}
                  </Text>
                </VStack>
              </HStack>

              <Heading id="blog-article-title" as="h1" fontSize={{ base: "2xl", md: "3xl" }} letterSpacing="-0.02em" color={theme.titleColor}>
                {article.title}
              </Heading>
              <Text color={theme.descColor} fontSize={{ base: "sm", md: "md" }}>
                {article.description}
              </Text>

              {(article.tags || []).length > 0 && (
                <Wrap spacing={2} pt={1}>
                  {(article.tags || []).map((t) => (
                    <WrapItem key={t}>
                      <Badge
                        borderRadius="full"
                        px={2.5}
                        py={0.5}
                        bg={theme.blue.chipBg}
                        borderWidth="1px"
                        borderColor={theme.blue.chipBorder}
                        color={theme.blue.accent}
                      >
                        {t}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </VStack>
          </Box>

          <MarkdownRenderer content={markdown} />
        </VStack>
      </Box>
    </Box>
  );
};

export default BlogArticleScreen;


