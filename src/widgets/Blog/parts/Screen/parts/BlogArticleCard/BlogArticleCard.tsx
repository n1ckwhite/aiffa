import React from "react";
import { Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { getAuthorBadge } from "../../lib/authorBadge/authorBadge";
import { formatCount } from "../../lib/format";
import { getCategoryMeta } from "../../lib/tags/tags";
import { getAuthorHref } from "./lib/getAuthorLink";
import type { BlogArticleCardProps } from "./types";
import { BlogArticleCategoryBadge } from "./parts/BlogArticleCategoryBadge/BlogArticleCategoryBadge";
import { BlogArticleCover } from "./parts/BlogArticleCover/BlogArticleCover";
import { BlogArticleTitleRow } from "./parts/BlogArticleTitleRow/BlogArticleTitleRow";
import { BlogArticleStatsRow } from "./parts/BlogArticleStatsRow/BlogArticleStatsRow";
import { BlogArticleAuthorRow } from "./parts/BlogArticleAuthorRow/BlogArticleAuthorRow";

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
  const authorHref = getAuthorHref(article);

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
          <BlogArticleCover title={article.title} coverImage={article.coverImage} priority={index < 3} />

          <BlogArticleCategoryBadge icon={categoryMeta.icon} label={categoryMeta.label} categoryColor={categoryColor} />

          <BlogArticleTitleRow title={article.title} titleColor={theme.titleColor} accentColor={categoryColor} />

          <Text fontSize="sm" color={theme.descColor} lineHeight={1.7} mt={3} noOfLines={3} minH="5.1em">
            {article.description}
          </Text>

          <BlogArticleStatsRow
            descColor={theme.descColor}
            accentBlue={theme.blue.accent}
            views={article.viewsCount}
            stars={article.starsCount}
            comments={article.commentsCount}
            readingTime={article.readingTime}
            formatCount={formatCount}
          />

          <BlogArticleAuthorRow
            themeTitleColor={theme.titleColor}
            themeDescColor={theme.descColor}
            accentColor={theme.blue.accent}
            authorName={article.author?.name}
            authorGithub={authorGithub}
            authorHref={authorHref}
            authorBadge={authorBadge}
            dateIso={article.date}
          />
        </Box>
      </LinkBox>
    </Box>
  );
};


