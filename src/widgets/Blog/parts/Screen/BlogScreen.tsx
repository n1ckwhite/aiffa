import React from "react";
import {
  AspectRatio,
  Avatar,
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiClock, FiEye, FiStar } from "react-icons/fi";
import { useAppColors } from "@/shared/theme/colors";
import { usePagination } from "widgets/ModuleLessons/hooks/usePagination";
import { Pagination } from "widgets/ModuleLessons/parts/Pagination";
import { useScrollToTop } from "shared/hooks/useScrollToTop";
import { useBlogArticles } from "../../hooks/useBlogArticles";
import type { BlogArticle } from "../../types";

const getGithubAvatarUrl = (username?: string, size: number = 96) => {
  if (!username) return undefined;
  return `https://github.com/${username}.png?size=${size}`;
};

const getDateLabel = (iso: string) => {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
};

const formatCount = (value?: number) => {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  if (value < 1000) return String(value);
  const k = value / 1000;
  return `${k.toFixed(k >= 10 ? 0 : 1)}k`;
};

const BlogScreen: React.FC = () => {
  const theme = useAppColors();
  const { items, isLoading } = useBlogArticles();
  const articles = React.useMemo(() => items.slice().sort((a, b) => (a.date < b.date ? 1 : -1)), [items]);
  const pageSize = 6;
  const { page, setPage, totalPages, start, end, canPrev, canNext, pageItems } = usePagination(articles.length, pageSize, "blog");
  const pageArticles = React.useMemo(() => articles.slice(start, end), [articles, start, end]);
  const scrollTop = useScrollToTop({ immediate: false });
  const paginationColors = React.useMemo(
    () => ({
      controlsBg: theme.controlsBg,
      controlsBorder: theme.borderColor,
      controlsHoverBg: theme.controlsHoverBg,
      controlsIcon: theme.controlsIcon,
      descColor: theme.descColor,
    }),
    [theme],
  );

  const handleSetPage = (next: number | ((p: number) => number)) => {
    setPage((prev) => {
      const computed = typeof next === "function" ? next(prev) : next;
      if (computed !== prev) {
        scrollTop();
      }
      return computed;
    });
  };

  return (
    <Box
      as="section"
      position="relative"
      aria-labelledby="blog-title"
      pb="32px"
    >
      <Box w="100%" maxW="1320px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <VStack as="header" spacing={3} align="center" textAlign="center" pb={{ base: 8, md: 10 }}>
          <Heading
            id="blog-title"
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color={theme.titleColor}
            letterSpacing="-0.02em"
          >
            Блог AIFFA
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color={theme.descColor}
            maxW={{ base: "100%", md: "820px" }}
            lineHeight={1.8}
          >
            Статьи участников экосистемы: опыт, разборы, практические советы и истории — всё, что помогает расти быстрее и делать вклад.
          </Text>
        </VStack>

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
            {Array.from({ length: pageSize }).map((_, i) => (
              <Box key={i} borderWidth="1px" borderColor={theme.borderColor} borderRadius="xl" bg={theme.cardBg} overflow="hidden">
                <AspectRatio ratio={16 / 9} w="full">
                  <Skeleton />
                </AspectRatio>
                <Box p={{ base: 5, md: 6 }}>
                  <Skeleton h="12px" w="120px" mb={3} />
                  <Skeleton h="22px" w="90%" mb={3} />
                  <Skeleton h="14px" w="100%" mb={2} />
                  <Skeleton h="14px" w="85%" mb={6} />
                  <HStack spacing={3}>
                    <Skeleton boxSize="36px" borderRadius="full" />
                    <VStack align="start" spacing={1}>
                      <Skeleton h="12px" w="120px" />
                      <Skeleton h="12px" w="110px" />
                    </VStack>
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
              {pageArticles.map((article: BlogArticle) => {
                const category = (article.tags || [])[0] ?? "Insights";
                return (
                  <Box
                    key={article.slug}
                    as={RouterLink as any}
                    to={`/blog/${article.slug}`}
                    borderWidth="1px"
                    borderColor={theme.borderColor}
                    borderRadius="xl"
                    bg={theme.cardBg}
                    overflow="hidden"
                    display="block"
                    transition="transform 150ms ease, border-color 150ms ease"
                    _hover={{ textDecoration: "none", transform: "translateY(-2px)", borderColor: theme.blue.chipBorder }}
                  >
                    <AspectRatio ratio={16 / 9} w="full">
                      <Image
                        src={article.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80"}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        objectFit="cover"
                      />
                    </AspectRatio>

                    <Box p={{ base: 5, md: 6 }}>
                      <VStack align="stretch" spacing={3}>
                        <Text fontSize="sm" color={theme.blue.accent} fontWeight="semibold">
                          {category}
                        </Text>
                        <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} letterSpacing="-0.02em" lineHeight={1.2} color={theme.titleColor}>
                          {article.title}
                        </Heading>
                        <Text fontSize="sm" color={theme.descColor} lineHeight={1.7}>
                          {article.description}
                        </Text>

                        <HStack spacing={4} pt={1} color={theme.descColor} fontSize="sm" flexWrap="wrap">
                          <HStack spacing={1.5}>
                            <Icon as={FiEye} aria-hidden="true" color={theme.blue.accent} />
                            <Text as="span">{formatCount(article.viewsCount)}</Text>
                          </HStack>
                          <HStack spacing={1.5}>
                            <Icon as={FiStar} aria-hidden="true" color="yellow.400" />
                            <Text as="span">{formatCount(article.starsCount)}</Text>
                          </HStack>
                          <HStack spacing={1.5}>
                            <Icon as={FiClock} aria-hidden="true" color="purple.400" />
                            <Text as="span">{article.readingTime ?? "—"}</Text>
                          </HStack>
                        </HStack>

                        <HStack spacing={3} pt={4}>
                          <Avatar
                            name={article.author?.name || "Автор"}
                            src={getGithubAvatarUrl(article.author?.github, 96)}
                            boxSize="38px"
                          />
                          <VStack spacing={0} align="start" minW={0}>
                            <Text fontSize="sm" fontWeight="semibold" noOfLines={1} color={theme.titleColor}>
                              {article.author?.name || "—"}
                            </Text>
                            <Text fontSize="xs" color={theme.descColor}>
                              {getDateLabel(article.date)}
                            </Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>

            {totalPages > 1 && (
              <Pagination
                pageItems={pageItems}
                page={page}
                canPrev={canPrev}
                canNext={canNext}
                onPrev={() => handleSetPage((p) => Math.max(1, p - 1))}
                onNext={() => handleSetPage((p) => Math.min(totalPages, p + 1))}
                onSelect={(p) => handleSetPage(p)}
                colors={paginationColors}
              />
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default BlogScreen;


