import React from "react";
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiArrowUpRight, FiClock, FiEye, FiMessageCircle, FiStar } from "react-icons/fi";
import type { useAppColors } from "@/shared/theme/colors";
import type { BlogArticle } from "../../../types";
import { BlogCoverImage } from "./BlogCoverImage";
import { getAuthorBadge } from "../lib/authorBadge";
import { formatCount, getDateLabel, getGithubAvatarUrl } from "../lib/format";
import { getCategoryMeta } from "../lib/tags";

export type BlogArticleCardProps = {
  article: BlogArticle;
  index: number;
  theme: ReturnType<typeof useAppColors>;
  cardBorder: string;
  cardHoverBorder: string;
  cardRadius: string;
  cardPadding: string;
  cardShadow: string;
  cardHoverShadow: string;
  categoryColor: string;
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80";

export const BlogArticleCard: React.FC<BlogArticleCardProps> = ({
  article,
  index,
  theme,
  cardBorder,
  cardHoverBorder,
  cardRadius,
  cardPadding,
  cardShadow,
  cardHoverShadow,
  categoryColor,
}) => {
  const category = (article.tags || [])[0] ?? "Insights";
  const categoryMeta = getCategoryMeta(category);
  const authorBadge = getAuthorBadge(article);
  const authorGithub = article.author?.github;
  const authorHref = authorGithub ? `https://github.com/${authorGithub}` : undefined;

  return (
    <Box key={article.slug} as="li" listStyleType="none">
      <LinkBox
        cursor="pointer"
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
          zIndex={2}
        />

        <Box p={cardPadding} display="flex" flexDirection="column" h="full" minW={0} position="relative" zIndex={1}>
          <AspectRatio ratio={16 / 9} w="full" overflow="hidden" borderRadius="lg" mb={5}>
            <BlogCoverImage src={article.coverImage || FALLBACK_COVER} alt={article.title} priority={index < 3} />
          </AspectRatio>

          <Badge
            w="fit-content"
            borderRadius="full"
            px={2.5}
            py={1}
            fontSize="11px"
            letterSpacing="0.02em"
            variant="subtle"
            colorScheme="blue"
          >
            <HStack spacing={1.5} align="center">
              <Icon as={categoryMeta.icon} aria-hidden="true" boxSize={4} color={categoryColor} />
              <Text as="span" color={categoryColor} fontWeight="semibold" noOfLines={1}>
                {categoryMeta.label}
              </Text>
            </HStack>
          </Badge>

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
            <Box aria-hidden="true" color={categoryColor} mt={1} flexShrink={0}>
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
            <HStack spacing={1.5}>
              <Icon as={FiClock} aria-hidden="true" color="purple.400" />
              <Text as="span">{article.readingTime ?? "—"}</Text>
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
                <Avatar name={article.author?.name || "Автор"} src={getGithubAvatarUrl(article.author?.github, 96)} boxSize="38px" />
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
};


