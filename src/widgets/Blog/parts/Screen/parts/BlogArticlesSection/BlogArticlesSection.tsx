import React from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { Pagination } from "shared/ui/Pagination";
import type { BlogArticle } from "@/widgets/Blog/types";
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
        <BlogArticlesEmptyState theme={theme} query={query} />
      )}

      <SimpleGrid
        as="ul"
        minChildWidth={{ base: "100%", sm: "320px" }}
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


