import React from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { Pagination } from "shared/ui/Pagination";
import { ResultsEmptyState } from "shared/ui/ResultsEmptyState";
import type { BlogArticle } from "@/widgets/Blog/types";
import { BlogArticleCard } from "../BlogArticleCard/parts/BlogArticleCard/BlogArticleCard";
import { BlogArticlesSkeletonGrid } from "../BlogArticlesSkeletonGrid/BlogArticlesSkeletonGrid";
import type { BlogArticlesSectionProps } from "./types";

export const BlogArticlesSection: React.FC<BlogArticlesSectionProps> = ({
  theme,
  isLoading,
  isEmptyResults,
  emptyStateVariant,
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
  getPageHref,
  paginationColors,
}) => {
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
        <ResultsEmptyState colors={theme} query={query} variant={emptyStateVariant} allItemsLabel="статьи" />
      )}

      <SimpleGrid
        as="ul"
        minChildWidth={{ base: "100%", sm: "360px" }}
        spacing={{ base: 6, md: 7 }}
        listStyleType="none"
        m={0}
        p={0}
      >
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
            onPrev={() => {}}
            onNext={() => {}}
            onSelect={() => {}}
            getPageHref={getPageHref}
            colors={paginationColors}
          />
        </Box>
      )}
    </VStack>
  );
};


