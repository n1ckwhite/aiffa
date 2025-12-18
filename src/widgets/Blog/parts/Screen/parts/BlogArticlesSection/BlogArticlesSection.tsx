import React from "react";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { useAppColors } from "@/shared/theme/colors";
import { QuestioningLottieIcon } from "@/shared/icons/components-icon";
import { Pagination } from "shared/ui/Pagination";
import type { PaginationColors } from "shared/ui/Pagination";
import type { BlogArticle } from "../../../../types";
import { BlogArticleCard } from "../BlogArticleCard/BlogArticleCard";
import { BlogArticlesSkeletonGrid } from "../BlogArticlesSkeletonGrid";

export type BlogArticlesSectionProps = {
  theme: ReturnType<typeof useAppColors>;

  isLoading: boolean;
  isEmptyResults: boolean;
  query: string;

  pageSize: number;
  pageArticles: BlogArticle[];

  // card visuals
  categoryColor: string;
  cardRadius: string;
  cardPadding: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardShadow: string;
  cardHoverShadow: string;

  // pagination
  totalPages: number;
  page: number;
  canPrev: boolean;
  canNext: boolean;
  pageItems: Array<number | string>;
  onSetPage: (next: number | ((p: number) => number)) => void;
  paginationColors: PaginationColors;
};

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
        <Box w="full" textAlign="center" mt={0} role="status" aria-live="polite">
          <VStack spacing={2} maxW="560px" mx="auto">
            <Box
              w="full"
              opacity={0.95}
              transform="scale(0.82)"
              transformOrigin="top center"
              mt={{ base: -2, md: -3 }}
              height="150px"
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
            colors={paginationColors}
          />
        </Box>
      )}
    </VStack>
  );
};


