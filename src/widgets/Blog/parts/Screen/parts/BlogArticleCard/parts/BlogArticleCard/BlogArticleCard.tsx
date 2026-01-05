import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { AppBoxLink } from "@/shared/ui/AppLink";
import { getAuthorBadge } from "../../../../lib/authorBadge/authorBadge";
import { formatCount } from "../../../../lib/format";
import { getCategoryMeta } from "../../../../lib/tags/tags";
import { getAuthorHref } from "../../lib/getAuthorLink";
import type { BlogArticleCardProps } from "../../types";
import { BlogArticleCategoryBadge } from "../BlogArticleCategoryBadge/BlogArticleCategoryBadge";
import { BlogArticleCover } from "../BlogArticleCover/BlogArticleCover";
import { BlogArticleTitleRow } from "../BlogArticleTitleRow/BlogArticleTitleRow";
import { BlogArticleStatsRow } from "../BlogArticleStatsRow/BlogArticleStatsRow";
import { BlogArticleAuthorRow } from "../BlogArticleAuthorRow/BlogArticleAuthorRow";
import { getBlogArticleCardInteractiveStyles } from "./animations";

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
  const articleHref = `/blog/${article.id}`;
  const interactive = getBlogArticleCardInteractiveStyles({
    accentColor: theme.blue.accent,
    cardHoverBorder,
    cardHoverShadow,
  });

  return (
    <Box key={article.slug} as="li" listStyleType="none">
      <AppBoxLink
        to={articleHref}
        aria-label={`Открыть статью: ${article.title}`}
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
        _hover={interactive._hover}
        _active={interactive._active}
        _focusVisible={interactive._focusVisible}
        _before={interactive._before}
        _after={interactive._after}
      >
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
            disableLinks
          />
        </Box>
      </AppBoxLink>
    </Box>
  );
};


