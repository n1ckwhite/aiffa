import React from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Pagination } from "shared/ui/Pagination";
import type { BlogArticle } from "@/widgets/Blog/types";
import { buildBlogPaginationHref } from "../../lib/paginationPath";
import { BlogArticleCard } from "../BlogArticleCard/BlogArticleCard";
import { BlogArticlesSkeletonGrid } from "../BlogArticlesSkeletonGrid/BlogArticlesSkeletonGrid";
import { BlogArticlesEmptyState } from "./parts/BlogArticlesEmptyState/BlogArticlesEmptyState";
import type { BlogArticlesSectionProps } from "./types";

export const BlogArticlesSection: React.FC<BlogArticlesSectionProps> = ({
  theme,
  isLoading,
  isEmptyResults,
  query,
  pageSize,
  pageArticles,
  categoryColor,
  cardRadius,
  cardPadding,
  cardBorder,
  cardHoverBorder,
  cardShadow,
  cardHoverShadow,
  totalPages,
  page,
  canPrev,
  canNext,
  pageItems,
  onSetPage,
  paginationColors,
}) => {
  const location = useLocation();
  const getPageHref = React.useCallback(
    (p: number) => buildBlogPaginationHref(p, location.search),
    [location.search]
  );

  if (isLoading) {
    return (
      <BlogArticlesSkeletonGrid
        pageSize={pageSize}
        cardBorder={cardBorder}
        cardRadius={cardRadius}
        cardShadow={cardShadow}
        cardPadding={cardPadding}
        cardBg={theme.cardBg}
      />
    );
  }

  return (
    <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
      {isEmptyResults && (
        <BlogArticlesEmptyState theme={theme} query={query} />
      )}

      <SimpleGrid as="ul" columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 6, md: 7 }} listStyleType="none" m={0} p={0}>
        {pageArticles.map((article: BlogArticle, idx: number) => (
          <BlogArticleCard
            key={article.slug}
            article={article}
            index={idx}
            theme={theme}
            cardBorder={cardBorder}
            cardHoverBorder={cardHoverBorder}
            cardRadius={cardRadius}
            cardPadding={cardPadding}
            cardShadow={cardShadow}
            cardHoverShadow={cardHoverShadow}
            categoryColor={categoryColor}
          />
        ))}
      </SimpleGrid>

      {totalPages > 1 && (
        <Box as="nav" aria-label="Пагинация статей" w="full" maxW="100%" mt={{ base: 2, md: 3 }}>
          <Pagination
            pageItems={pageItems}
            page={page}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={() => onSetPage((p) => Math.max(1, p - 1))}
            onNext={() => onSetPage((p) => Math.min(totalPages, p + 1))}
            onSelect={(p) => onSetPage(p)}
            getPageHref={getPageHref}
            colors={paginationColors}
          />
        </Box>
      )}
    </VStack>
  );
};


