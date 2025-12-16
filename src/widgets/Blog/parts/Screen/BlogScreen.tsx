import React from "react";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiSearch, FiBookOpen, FiTag } from "react-icons/fi";
import { useAppColors } from "@/shared/theme/colors";
import { usePagination } from "widgets/ModuleProjects/hooks/usePagination";
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

const BlogScreen: React.FC = () => {
  const theme = useAppColors();
  const { items, isLoading } = useBlogArticles();
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);

  const tags = React.useMemo(() => {
    const set = new Set<string>();
    items.forEach((a) => (a.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
  }, [items]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = items
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    return base.filter((a) => {
      if (activeTag && !(a.tags || []).includes(activeTag)) return false;
      if (!q) return true;
      const hay = `${a.title} ${a.description} ${(a.tags || []).join(" ")} ${a.author?.name || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query, activeTag]);

  const pageSize = 6;
  const { page, setPage, totalPages, start, end, canPrev, canNext, pageItems } = usePagination(filtered.length, pageSize);
  const pageItemsList = filtered.slice(start, end);

  return (
    <Box as="section" position="relative" pb="32px" aria-labelledby="blog-title">
      <Box w="100%" maxW="1200px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <VStack as="header" spacing={3} align="flex-start" textAlign="left" pb={{ base: 6, md: 8 }}>
          <Text fontSize="sm" color={theme.blue.accent} fontWeight="semibold" letterSpacing="0.06em" textTransform="uppercase">
            Blog
          </Text>
          <Heading
            id="blog-title"
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            color={theme.titleColor}
            letterSpacing="-0.03em"
            lineHeight={1.05}
          >
            Latest Insights
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color={theme.descColor} maxW={{ base: "100%", md: "720px" }}>
            Stay updated with the latest insights from the community: practical experience, guides and stories that help you grow.
          </Text>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Box
            bg={theme.cardBg}
            borderWidth="1px"
            borderColor={theme.borderColor}
            borderRadius="2xl"
            p={{ base: 4, md: 5 }}
          >
            <VStack spacing={3} align="stretch">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color={theme.linkMuted} aria-hidden="true" />
                </InputLeftElement>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по статьям, тегам и авторам"
                  borderRadius="xl"
                  bg="transparent"
                  borderColor={theme.borderColor}
                  _focus={{ boxShadow: "none", borderColor: theme.blue.chipBorder }}
                  aria-label="Поиск по статьям"
                />
              </InputGroup>

              {tags.length > 0 && (
                <HStack spacing={2} align="center" flexWrap="wrap">
                  <HStack spacing={2} color={theme.linkMuted}>
                    <Icon as={FiTag} aria-hidden="true" />
                    <Text fontSize="sm">Теги:</Text>
                  </HStack>
                  <Wrap spacing={2}>
                    <WrapItem>
                      <Button
                        size="sm"
                        borderRadius="full"
                        variant={activeTag ? "outline" : "solid"}
                        colorScheme="blue"
                        onClick={() => {
                          setActiveTag(null);
                          setPage(1);
                        }}
                      >
                        Все
                      </Button>
                    </WrapItem>
                    {tags.map((t) => {
                      const isActive = activeTag === t;
                      return (
                        <WrapItem key={t}>
                          <Button
                            size="sm"
                            borderRadius="full"
                            variant={isActive ? "solid" : "outline"}
                            colorScheme="blue"
                            onClick={() => {
                              setActiveTag(isActive ? null : t);
                              setPage(1);
                            }}
                          >
                            {t}
                          </Button>
                        </WrapItem>
                      );
                    })}
                  </Wrap>
                </HStack>
              )}
            </VStack>
          </Box>

          {isLoading ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Box key={i} borderWidth="1px" borderColor={theme.borderColor} borderRadius="2xl" bg={theme.cardBg} overflow="hidden">
                  <Box p={{ base: 4, md: 5 }}>
                    <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden">
                      <Skeleton />
                    </AspectRatio>
                    <Skeleton mt={4} h="14px" w="120px" borderRadius="md" />
                    <Skeleton mt={2} h="20px" w="86%" borderRadius="md" />
                    <SkeletonText mt="3" noOfLines={2} spacing="2" skeletonHeight="12px" />
                    <HStack spacing={3} mt={5}>
                      <Skeleton boxSize="36px" borderRadius="full" />
                      <VStack spacing={1} align="start" flex={1}>
                        <Skeleton h="12px" w="120px" borderRadius="md" />
                        <Skeleton h="12px" w="160px" borderRadius="md" />
                      </VStack>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <>
              {pageItemsList.length === 0 ? (
                <Box borderWidth="1px" borderColor={theme.borderColor} borderRadius="2xl" p={{ base: 5, md: 6 }} bg={theme.cardBg}>
                  <VStack spacing={2} textAlign="center">
                    <Icon as={FiBookOpen} boxSize={6} color={theme.linkMuted} aria-hidden="true" />
                    <Text fontWeight="semibold" color={theme.titleColor}>
                      Ничего не нашли
                    </Text>
                    <Text fontSize="sm" color={theme.descColor}>
                      Попробуйте изменить запрос или выбрать другой тег.
                    </Text>
                  </VStack>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }}>
                  {pageItemsList.map((article: BlogArticle) => (
                    <Box
                      key={article.slug}
                      as={RouterLink as any}
                      to={`/blog/${article.slug}`}
                      borderWidth="1px"
                      borderColor={theme.borderColor}
                      borderRadius="2xl"
                      bg={theme.cardBg}
                      _hover={{ textDecoration: "none", borderColor: theme.blue.chipBorder, transform: "translateY(-2px)" }}
                      transition="all 0.2s ease"
                      display="block"
                      overflow="hidden"
                    >
                      <Box p={{ base: 4, md: 5 }}>
                        <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden">
                          <Image
                            src={article.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80"}
                            alt={article.title}
                            loading="lazy"
                            decoding="async"
                            objectFit="cover"
                          />
                        </AspectRatio>

                        <VStack align="stretch" spacing={2} pt={4}>
                          <Text fontSize="sm" color={theme.blue.accent} fontWeight="semibold">
                            {(article.tags || [])[0] ?? "Insights"}
                          </Text>
                          <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color={theme.titleColor} letterSpacing="-0.02em" lineHeight={1.2}>
                            {article.title}
                          </Heading>
                          <Text fontSize="sm" color={theme.descColor} noOfLines={2}>
                            {article.description}
                          </Text>

                          <HStack spacing={2} flexWrap="wrap" pt={1}>
                            {(article.tags || []).slice(0, 2).map((t) => (
                              <Badge
                                key={t}
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
                            ))}
                          </HStack>

                          <HStack spacing={3} pt={4} align="center">
                            <Avatar
                              name={article.author?.name || "Автор"}
                              src={getGithubAvatarUrl(article.author?.github, 96)}
                              boxSize="38px"
                            />
                            <VStack spacing={0} align="start" minW={0}>
                              <Text fontSize="sm" fontWeight="semibold" color={theme.titleColor} noOfLines={1}>
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
                  ))}
                </SimpleGrid>
              )}

              {totalPages > 1 && (
                <HStack justify="center" spacing={2} pt={{ base: 6, md: 8 }}>
                  <Button size="sm" variant="outline" borderRadius="full" isDisabled={!canPrev} onClick={() => setPage(page - 1)} aria-label="Предыдущая страница">
                    Назад
                  </Button>
                  <HStack spacing={1}>
                    {pageItems.map((p, idx) =>
                      typeof p === "string" ? (
                        <Box key={`${p}-${idx}`} px={2} color={theme.linkMuted}>
                          {p}
                        </Box>
                      ) : (
                        <Button
                          key={p}
                          size="sm"
                          borderRadius="lg"
                          variant={p === page ? "solid" : "ghost"}
                          colorScheme="blue"
                          onClick={() => setPage(p)}
                          aria-label={`Страница ${p}`}
                        >
                          {p}
                        </Button>
                      )
                    )}
                  </HStack>
                  <Button size="sm" variant="outline" borderRadius="full" isDisabled={!canNext} onClick={() => setPage(page + 1)} aria-label="Следующая страница">
                    Вперёд
                  </Button>
                </HStack>
              )}
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default BlogScreen;


