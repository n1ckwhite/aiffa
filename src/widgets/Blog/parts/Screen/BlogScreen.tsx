import React from "react";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiEdit3, FiEye, FiMessageCircle, FiSearch, FiStar, FiX } from "react-icons/fi";
import { useAppColors } from "@/shared/theme/colors";
import { QuestioningLottieIcon } from "@/shared/icons/components-icon";
import { usePagination } from "widgets/ModuleLessons/hooks/usePagination";
import { Pagination } from "shared/ui/Pagination";
import { useScrollToTop } from "shared/hooks/useScrollToTop";
import { ModulesFAQ } from "widgets/Modules";
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

type AuthorBadge = {
  label: string;
  colorScheme: "blue" | "purple" | "yellow" | "green" | "gray";
};

const getAuthorBadge = (article: BlogArticle): AuthorBadge => {
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

const BlogScreen: React.FC = () => {
  const theme = useAppColors();
  const location = useLocation();
  const navigate = useNavigate();
  const initialQueryFromUrl = React.useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      return params.get("q") ?? "";
    } catch {
      return "";
    }
  }, [location.search]);
  const { items, isLoading } = useBlogArticles();
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = React.useState<string>(initialQueryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>(initialQueryFromUrl);
  const articles = React.useMemo(() => items.slice().sort((a, b) => (a.date < b.date ? 1 : -1)), [items]);
  const normalizedQuery = React.useMemo(() => debouncedQuery.trim().toLowerCase(), [debouncedQuery]);
  const filteredArticles = React.useMemo(() => {
    if (!normalizedQuery) return articles;
    return articles.filter((a) => {
      const haystack = [
        a.title,
        a.description,
        (a.tags || []).join(" "),
        a.author?.name,
        a.author?.github,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [articles, normalizedQuery]);
  const isEmptyResults = !isLoading && filteredArticles.length === 0;
  const pageSize = 6;
  const { page, setPage, totalPages, start, end, canPrev, canNext, pageItems } = usePagination(filteredArticles.length, pageSize, "blog");
  const pageArticles = React.useMemo(() => filteredArticles.slice(start, end), [filteredArticles, start, end]);
  const scrollTop = useScrollToTop({ immediate: false });
  const categoryColor = theme.blue.accent;
  const cardRadius = "2xl";
  const cardPadding = "20px";
  const controlsBg = useColorModeValue("white", "gray.800");
  const controlsBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const controlsHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const controlsIcon = useColorModeValue("gray.700", "gray.200");
  const cardBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const cardHoverBorder = useColorModeValue(theme.blue.chipBorder, "blue.400");
  const cardShadow = useColorModeValue("0 10px 28px rgba(15, 23, 42, 0.08)", "0 12px 30px rgba(0, 0, 0, 0.35)");
  const cardHoverShadow = useColorModeValue("0 18px 44px rgba(15, 23, 42, 0.14)", "0 18px 44px rgba(0, 0, 0, 0.45)");
  const searchBg = useColorModeValue("white", "gray.800");
  const searchBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const searchShadow = useColorModeValue("0 10px 26px rgba(15, 23, 42, 0.08)", "0 14px 28px rgba(0, 0, 0, 0.35)");
  const searchHoverShadow = useColorModeValue("0 14px 34px rgba(15, 23, 42, 0.12)", "0 16px 34px rgba(0, 0, 0, 0.45)");
  const searchHoverBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");
  const searchPlaceholder = useColorModeValue("gray.500", "whiteAlpha.700");
  const searchIconBg = useColorModeValue("blue.50", "whiteAlpha.200");
  const clearButtonHoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const clearButtonActiveBg = useColorModeValue("blackAlpha.100", "whiteAlpha.300");
  const writeCtaBorderColor = useColorModeValue("blue.200", "blue.500");
  const writeCtaBoxShadow = useColorModeValue("0 18px 46px rgba(59,130,246,0.14)", "0 18px 46px rgba(0, 0, 0, 0.45)");
  const writeCtaBgGradient = useColorModeValue(
    "linear(to-r, rgba(59,130,246,0.10), rgba(255,255,255,0.70))",
    "linear(to-r, rgba(59,130,246,0.14), rgba(255,255,255,0.06))",
  );
  const writeCtaIconBg = useColorModeValue("white", "blackAlpha.200");
  const writeCtaIconBorderColor = useColorModeValue("blackAlpha.200", "whiteAlpha.200");
  const paginationColors = React.useMemo(
    () => ({
      controlsBg,
      controlsBorder,
      controlsHoverBg,
      controlsIcon,
      descColor: theme.descColor,
    }),
    [controlsBg, controlsBorder, controlsHoverBg, controlsIcon, theme.descColor],
  );

  React.useEffect(() => {
    // Reset to first page on search changes (prevents "empty page" after filtering)
    setPage(1);
  }, [normalizedQuery, setPage]);

  React.useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query), 220);
    return () => window.clearTimeout(t);
  }, [query]);

  React.useEffect(() => {
    // Init from URL (?q=) + keep in sync on back/forward.
    const params = new URLSearchParams(location.search);
    const q = params.get("q") ?? "";
    if (q !== query) {
      setQuery(q);
      setDebouncedQuery(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  React.useEffect(() => {
    // Sync query -> URL without creating history entries.
    const params = new URLSearchParams(location.search);
    const next = query.trim();
    if (next) {
      params.set("q", next);
    } else {
      params.delete("q");
    }
    const nextSearch = params.toString();
    const searchWithPrefix = nextSearch ? `?${nextSearch}` : "";
    if (searchWithPrefix !== location.search) {
      navigate(`${location.pathname}${searchWithPrefix}`, { replace: true, scroll: false });
    }
  }, [query, location.pathname, location.search, navigate]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isK = (e.key || "").toLowerCase() === "k";
      if (isK && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        return;
      }
      if (e.key === "Escape" && document.activeElement === searchInputRef.current && query.trim()) {
        e.preventDefault();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [query]);

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
    <Box position="relative">
      <Box w="100%" maxW="1240px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <Box as="section" aria-labelledby="blog-title">
        <VStack
          as="header"
          spacing={3}
          align="center"
          textAlign="center"
          pb={isEmptyResults ? { base: 3, md: 5 } : { base: 6, md: 8 }}
        >
          <Heading
            id="blog-title"
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color={theme.titleColor}
          >
            Блог AIFFA
          </Heading>
          <Text
            fontSize={{ base: "sm", md: "lg" }}
            color={theme.descColor}
            maxW={{ base: "100%", md: "820px" }}
          >
            Статьи участников экосистемы: опыт, разборы, практические советы и истории — всё, что помогает расти быстрее и делать вклад.
          </Text>

          <Box w="full" maxW={{ base: "100%", sm: "440px" }} pt={isEmptyResults ? 1 : 2}>
            <InputGroup
              size="lg"
              h="56px"
              bg={searchBg}
              borderWidth="1px"
              borderColor={searchBorder}
              borderRadius="full"
              boxShadow={searchShadow}
              transition="box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease"
              _hover={{ boxShadow: searchHoverShadow, borderColor: searchHoverBorder }}
            >
              <InputLeftElement pointerEvents="none" h="56px" w="56px">
                <Box
                  boxSize="40px"
                  borderRadius="full"
                  bg={searchIconBg}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={theme.blue.accent}
                >
                  <Icon as={FiSearch} aria-hidden="true" boxSize={5} />
                </Box>
              </InputLeftElement>

              <Input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по статьям"
                aria-label="Поиск по статьям"
                id="blog-search"
                name="blog-search"
                autoComplete="off"
                h="56px"
                border="none"
                bg="transparent"
                pl="60px"
                pr={query ? "56px" : 6}
                fontWeight="semibold"
                color={theme.titleColor}
                _placeholder={{ color: searchPlaceholder, fontWeight: "medium" }}
                _focusVisible={{ boxShadow: "none" }}
              />

              {query.trim() && (
                <InputRightElement h="56px" w="56px">
                  <IconButton
                    aria-label="Очистить поиск"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setQuery("");
                      window.setTimeout(() => searchInputRef.current?.focus(), 0);
                    }}
                    icon={<Icon as={FiX} aria-hidden="true" boxSize={5} />}
                    boxSize="40px"
                    p={0}
                    borderRadius="full"
                    color={theme.descColor}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{ bg: clearButtonHoverBg }}
                    _active={{ bg: clearButtonActiveBg }}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
        </VStack>

        {isLoading ? (
          <SimpleGrid as="ul" columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 6, md: 7 }} listStyleType="none" m={0} p={0}>
            {Array.from({ length: pageSize }).map((_, i) => (
              <Box
                key={i}
                as="li"
                listStyleType="none"
                borderWidth="1px"
                borderColor={cardBorder}
                borderRadius={cardRadius}
                bg={theme.cardBg}
                overflow="hidden"
                boxShadow={cardShadow}
              >
                <Box p={cardPadding} display="flex" flexDirection="column" h="full">
                  <AspectRatio ratio={16 / 9} w="full" overflow="hidden" borderRadius="xl" mb={6}>
                    <Skeleton />
                  </AspectRatio>
                  <Skeleton h="12px" w="110px" mb={3} />
                  <Skeleton h="22px" w="95%" mb={3} />
                  <Skeleton h="14px" w="100%" mb={2} />
                  <Skeleton h="14px" w="85%" mb={6} />
                  <Skeleton h="12px" w="180px" mb={5} />
                  <HStack spacing={3} mt="auto" pt={2}>
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
            {isEmptyResults && (
              <Box w="full" textAlign="center" mt={0}>
                <VStack spacing={2} maxW="560px" mx="auto">
                  <Box
                    w="full"
                    opacity={0.95}
                    transform="scale(0.82)"
                    transformOrigin="top center"
                    mt={{ base: -2, md: -3 }}
                  >
                    <QuestioningLottieIcon />
                  </Box>
                  <Text fontWeight="semibold" color={theme.titleColor} fontSize={{ base: "lg", md: "xl" }}>
                    Ничего не нашли
                  </Text>
                  <Text color={theme.descColor}>
                    По запросу:{" "}
                    <Text as="span" fontWeight="semibold" color={theme.blue.accent}>
                      {query.trim() || "—"}
                    </Text>
                  </Text>
                  <Text color={theme.descColor} fontSize="sm">
                    Попробуйте изменить запрос или очистить поиск — мы покажем все статьи.
                  </Text>
                </VStack>
              </Box>
            )}
            <SimpleGrid as="ul" columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 6, md: 7 }} listStyleType="none" m={0} p={0}>
              {pageArticles.map((article: BlogArticle) => {
                const category = (article.tags || [])[0] ?? "Insights";
                const authorBadge = getAuthorBadge(article);
                const authorGithub = article.author?.github;
                const authorHref = authorGithub ? `https://github.com/${authorGithub}` : undefined;
                return (
                  <Box
                    key={article.slug}
                    as="li"
                    listStyleType="none"
                  >
                    <LinkBox
                      borderWidth="1px"
                      borderColor={cardBorder}
                      borderRadius={cardRadius}
                      bg={theme.cardBg}
                      overflow="hidden"
                      display="block"
                      position="relative"
                      boxShadow={cardShadow}
                      transition="transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease"
                      _hover={{
                        textDecoration: "none",
                        transform: "translateY(-3px)",
                        borderColor: cardHoverBorder,
                        boxShadow: cardHoverShadow,
                        _after: { opacity: 1 },
                      }}
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        bg: `linear-gradient(90deg, ${theme.blue.accent}, rgba(59,130,246,0))`,
                        opacity: 0.65,
                        pointerEvents: "none",
                      }}
                      _after={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        bg: `radial-gradient(600px 220px at 20% 0%, ${theme.blue.accent}14, transparent 55%)`,
                        opacity: 0,
                        transition: "opacity 180ms ease",
                        pointerEvents: "none",
                      }}
                    >
                      <LinkOverlay
                        as={RouterLink as any}
                        to={`/blog/${article.slug}`}
                        aria-label={`Открыть статью: ${article.title}`}
                        position="absolute"
                        inset={0}
                        zIndex={1}
                      />

                      <Box p={cardPadding} display="flex" flexDirection="column" h="full" minW={0} position="relative" zIndex={2}>
                        <AspectRatio ratio={16 / 9} w="full" overflow="hidden" borderRadius="xl" mb={5}>
                          <Image
                            src={article.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80"}
                            alt={article.title}
                            loading="lazy"
                            decoding="async"
                            objectFit="cover"
                            w="100%"
                            h="100%"
                            borderRadius="0"
                          />
                        </AspectRatio>

                        <Text fontSize="sm" color={categoryColor} fontWeight="semibold">
                          {category}
                        </Text>

                        <HStack align="start" justify="space-between" spacing={3} mt={2}>
                          <Heading
                            as="h2"
                            fontSize={{ base: "xl", md: "2xl" }}
                            letterSpacing="-0.02em"
                            lineHeight={1.2}
                            color={theme.titleColor}
                            noOfLines={2}
                            flex="1"
                            minW={0}
                            minH="2.4em"
                          >
                            {article.title}
                          </Heading>
                          <Box
                            aria-hidden="true"
                            color={categoryColor}
                            mt={1}
                            flexShrink={0}
                          >
                            <FiArrowUpRight size={18} />
                          </Box>
                        </HStack>

                        <Text fontSize="sm" color={theme.descColor} lineHeight={1.7} mt={3} noOfLines={3} minH="5.1em">
                          {article.description}
                        </Text>

                        <HStack spacing={4} color={theme.descColor} fontSize="sm" mt={4}>
                          <HStack spacing={1.5}>
                            <Icon as={FiEye} aria-hidden="true" color={theme.blue.accent} />
                            <Text as="span">{formatCount(article.viewsCount)}</Text>
                          </HStack>
                          <HStack spacing={1.5}>
                            <Icon as={FiStar} aria-hidden="true" color="yellow.400" />
                            <Text as="span">{formatCount(article.starsCount)}</Text>
                          </HStack>
                          <HStack spacing={1.5}>
                            <Icon as={FiMessageCircle} aria-hidden="true" color="green.400" />
                            <Text as="span">{formatCount(article.commentsCount)}</Text>
                          </HStack>
                        </HStack>

                        <HStack spacing={3} mt="auto" pt={6} minH="56px" align="center">
                          {authorHref ? (
                            <Link
                              href={authorHref}
                              isExternal
                              aria-label={`Открыть профиль автора в GitHub: ${article.author?.name || authorGithub || "автор"}`}
                              position="relative"
                              zIndex={3}
                              display="inline-flex"
                              _hover={{ textDecoration: "none" }}
                            >
                              <Avatar
                                name={article.author?.name || "Автор"}
                                src={getGithubAvatarUrl(article.author?.github, 96)}
                                boxSize="38px"
                              />
                            </Link>
                          ) : (
                            <Avatar name={article.author?.name || "Автор"} src={getGithubAvatarUrl(article.author?.github, 96)} boxSize="38px" />
                          )}
                          <VStack spacing={0} align="start" minW={0}>
                            {authorHref ? (
                              <Link
                                href={authorHref}
                                isExternal
                                fontSize="sm"
                                fontWeight="semibold"
                                noOfLines={1}
                                color={theme.titleColor}
                                position="relative"
                                zIndex={3}
                                _hover={{ textDecoration: "none", color: theme.blue.accent }}
                                aria-label={`Открыть профиль автора в GitHub: ${article.author?.name || authorGithub || "автор"}`}
                              >
                                {article.author?.name || "—"}
                              </Link>
                            ) : (
                              <Text fontSize="sm" fontWeight="semibold" noOfLines={1} color={theme.titleColor}>
                                {article.author?.name || "—"}
                              </Text>
                            )}
                            <Badge
                              mt={1}
                              w="fit-content"
                              colorScheme={authorBadge.colorScheme}
                              variant="subtle"
                              borderRadius="full"
                              px={2}
                              py={0.5}
                              fontSize="10px"
                              letterSpacing="0.02em"
                            >
                              {authorBadge.label}
                            </Badge>
                            <Text fontSize="xs" color={theme.descColor}>
                              {getDateLabel(article.date)}
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    </LinkBox>
                  </Box>
                );
              })}
            </SimpleGrid>

            {totalPages > 1 && (
              <Box alignSelf="center" w="fit-content" maxW="100%" mt={{ base: 2, md: 3 }}>
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
              </Box>
            )}
          </VStack>
        )}
        </Box>

        <Box
          as="section"
          aria-labelledby="blog-write-cta-title"
          mt={{ base: 8, md: 10 }}
          w="full"
          maxW={{ base: "100%", md: "900px" }}
          mx="auto"
          borderWidth="1px"
          borderColor={writeCtaBorderColor}
          borderRadius={cardRadius}
          boxShadow={writeCtaBoxShadow}
          p={{ base: 5, md: 6 }}
          position="relative"
          overflow="hidden"
          bgGradient={writeCtaBgGradient}
          _before={{
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            bg: theme.blue.accent,
            opacity: 0.9,
            pointerEvents: "none",
          }}
          _after={{
            content: '""',
            position: "absolute",
            inset: 0,
            bg: `radial-gradient(800px 320px at 10% 0%, ${theme.blue.accent}18, transparent 55%)`,
            pointerEvents: "none",
          }}
        >
          <HStack align={{ base: "start", md: "center" }} spacing={4} position="relative">
            <Box
              boxSize={{ base: "46px", md: "52px" }}
              borderRadius="full"
              bg={writeCtaIconBg}
              borderWidth="1px"
              borderColor={writeCtaIconBorderColor}
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={theme.blue.accent}
              flexShrink={0}
              mt={{ base: 0.5, md: 0 }}
            >
              <Icon as={FiEdit3} aria-hidden="true" boxSize={6} />
            </Box>

            <VStack align="start" spacing={1} textAlign="left" minW={0}>
              <Text
                id="blog-write-cta-title"
                fontWeight="bold"
                color={theme.titleColor}
                fontSize={{ base: "lg", md: "xl" }}
                letterSpacing="-0.01em"
              >
                Хочешь стать автором в AIFFA?
              </Text>
              <Text color={theme.descColor} fontSize={{ base: "sm", md: "md" }}>
                Поделись практикой: кейс, ошибка, разбор решения или полезная находка. Черновик или план отправь через блок «Поддержка и сообщество» ниже — поможем оформить и опубликовать.
              </Text>
            </VStack>
          </HStack>
        </Box>

        <Box mt={{ base: 10, md: 14 }}>
          <ModulesFAQ variant="blog" showSupportBlock />
        </Box>
      </Box>
    </Box>
  );
};

export default BlogScreen;


