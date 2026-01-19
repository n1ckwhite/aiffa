import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { AppBoxLink } from "@/shared/ui/AppLink";
import { useAppColors } from "shared/theme/colors";
import { useLocalStorageFlag } from "shared/hooks/useLocalStorageFlag";
import { getAuthorBadge } from "@/widgets/Blog/parts/Screen/lib/authorBadge/authorBadge";
import { formatCount } from "@/widgets/Blog/parts/Screen/lib/format";
import { getCategoryMeta } from "@/widgets/Blog/parts/Screen/lib/tags/tags";
import { getAuthorHref } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/lib/getAuthorLink";
import { BlogArticleCategoryBadge } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/parts/BlogArticleCategoryBadge/BlogArticleCategoryBadge";
import { BlogArticleCover } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/parts/BlogArticleCover/BlogArticleCover";
import { BlogArticleTitleRow } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/parts/BlogArticleTitleRow/BlogArticleTitleRow";
import { BlogArticleStatsRow } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/parts/BlogArticleStatsRow/BlogArticleStatsRow";
import { BlogArticleAuthorRow } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/parts/BlogArticleAuthorRow/BlogArticleAuthorRow";
import { getBlogArticleCardInteractiveStyles } from "@/widgets/Blog/parts/Screen/parts/BlogArticleCard/parts/BlogArticleCard/animations/getBlogArticleCardInteractiveStyles";
import { useBlogScreenColors } from "@/widgets/Blog/parts/Screen/colors/useBlogScreenColors/useBlogScreenColors";
import type { ArticleStatModePanelItem } from "../../../model";
import type { RenderStatModePanelItemProps } from "../../renderers/types";

type ArticleCardItemProps = RenderStatModePanelItemProps & {
  item: ArticleStatModePanelItem;
};

export const ArticleCardItem: React.FC<ArticleCardItemProps> = ({ item, listIndex }) => {
  const theme = useAppColors();
  const colors = useBlogScreenColors(theme);
  const article = item.article;
  const category = (article.tags || [])[0] ?? "Insights";
  const categoryMeta = getCategoryMeta(category);
  const authorBadge = getAuthorBadge(article);
  const authorGithub = article.author?.github;
  const authorHref = getAuthorHref(article);
  const articleHref = `/blog/${article.id}`;
  const { value: isStarred } = useLocalStorageFlag(`blog-starred:${String(article.id)}`);
  const displayStars = (typeof article.starsCount === "number" ? article.starsCount : 0) + (isStarred ? 1 : 0);
  const interactive = getBlogArticleCardInteractiveStyles({
    accentColor: theme.blue.accent,
    cardHoverBorder: colors.cardHoverBorder,
    cardHoverShadow: colors.cardHoverShadow,
  });
  const showStatusBadge = item.status === "pending";

  return (
    <Box as="li" listStyleType="none">
      <AppBoxLink
        to={articleHref}
        aria-label={`Открыть статью: ${article.title}`}
        cursor="pointer"
        borderWidth="1px"
        borderColor={colors.cardBorder}
        borderRadius={colors.cardRadius}
        bg={theme.cardBg}
        overflow="hidden"
        display="block"
        position="relative"
        boxShadow={colors.cardShadow}
        transition="transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease"
        _hover={interactive._hover}
        _active={interactive._active}
        _focusVisible={interactive._focusVisible}
        _before={interactive._before}
        _after={interactive._after}
      >
        <Box p={colors.cardPadding} display="flex" flexDirection="column" h="full" minW={0} position="relative" zIndex={1}>
          <BlogArticleCover title={article.title} coverImage={article.coverImage} priority={listIndex < 3} />

          <BlogArticleCategoryBadge icon={categoryMeta.icon} label={categoryMeta.label} categoryColor={colors.categoryColor} />

          <BlogArticleTitleRow title={article.title} titleColor={theme.titleColor} accentColor={colors.categoryColor} />

          <Text fontSize="sm" color={theme.descColor} lineHeight={1.7} mt={3} noOfLines={3} minH="5.1em">
            {article.description}
          </Text>

          <BlogArticleStatsRow
            descColor={theme.descColor}
            accentBlue={theme.blue.accent}
            views={article.viewsCount}
            stars={displayStars}
            isStarred={isStarred}
            comments={article.commentsCount}
            readingTime={article.readingTime}
            formatCount={formatCount}
          />

          {showStatusBadge ? (
            <Box
              as="span"
              fontSize="xs"
              fontWeight="semibold"
              color="yellow.700"
              bg="yellow.100"
              borderWidth="1px"
              borderColor="yellow.300"
              px={2.5}
              py={1}
              borderRadius="full"
              w="fit-content"
              mt={3}
            >
              В обработке
            </Box>
          ) : null}

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
