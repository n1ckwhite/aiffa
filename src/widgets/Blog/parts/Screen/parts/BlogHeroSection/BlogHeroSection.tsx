import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { BlogHeroHeading } from "./parts/BlogHeroHeading/BlogHeroHeading";
import { BlogHeroSearch } from "./parts/BlogHeroSearch/BlogHeroSearch";
import { BlogHeroFilters } from "./parts/BlogHeroFilters/BlogHeroFilters";
import type { BlogHeroSectionProps } from "./types";

export const BlogHeroSection: React.FC<BlogHeroSectionProps> = ({
  theme,
  isEmptyResults,
  query,
  setQuery,
  tagFilter,
  setTagFilter,
  searchInputRef,
  searchBg,
  searchBorder,
  searchShadow,
  searchHoverShadow,
  searchHoverBorder,
  searchPlaceholder,
  searchIconBg,
  clearButtonHoverBg,
  clearButtonActiveBg,
  filterButtonBg,
  filterButtonBorder,
  filterButtonHoverBg,
  filterMenuBorder,
  filterMenuShadow,
}) => {
  return (
    <Box as="section" aria-labelledby="blog-title">
      <BlogHeroHeading theme={theme} isEmptyResults={isEmptyResults} />

      <BlogHeroSearch
        theme={theme}
        isEmptyResults={isEmptyResults}
        query={query}
        setQuery={setQuery}
        searchInputRef={searchInputRef}
        searchBg={searchBg}
        searchBorder={searchBorder}
        searchShadow={searchShadow}
        searchHoverShadow={searchHoverShadow}
        searchHoverBorder={searchHoverBorder}
        searchPlaceholder={searchPlaceholder}
        searchIconBg={searchIconBg}
        clearButtonHoverBg={clearButtonHoverBg}
        clearButtonActiveBg={clearButtonActiveBg}
      />

      <HStack spacing={3} justify="center" mt={3}>
        <BlogHeroFilters
          theme={theme}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          filterButtonBg={filterButtonBg}
          filterButtonBorder={filterButtonBorder}
          filterButtonHoverBg={filterButtonHoverBg}
          filterMenuBorder={filterMenuBorder}
          filterMenuShadow={filterMenuShadow}
          searchShadow={searchShadow}
          searchHoverShadow={searchHoverShadow}
        />
      </HStack>
    </Box>
  );
};


