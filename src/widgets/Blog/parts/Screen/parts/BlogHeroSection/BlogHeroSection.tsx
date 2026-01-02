import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { BlogHeroHeading } from "./parts/BlogHeroHeading/BlogHeroHeading";
import { BlogHeroSearch } from "./parts/BlogHeroSearch/BlogHeroSearch";
import { BlogHeroFilters } from "./parts/BlogHeroFilters/BlogHeroFilters";
import { BlogHeroFavoritesToggle } from "./parts/BlogHeroFavoritesToggle/BlogHeroFavoritesToggle";
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
  favoritesOnly,
  setFavoritesOnly,
}) => {
  return (
    <Box
      as="section"
      aria-labelledby="blog-title"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      mb={6}
    >
      <BlogHeroHeading theme={theme} isEmptyResults={isEmptyResults} />

      <HStack
       aria-label="Поиск и фильтры статей"
       aria-labelledby="blog-search-label"
       spacing={{ base: 3, md: 6 }}
       width="full"
       role="group"
       align="center"
       flexDirection="column"
       justify="center"
       mt={{ base: 3, md: 6 }}>

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

      <BlogHeroFilters
        theme={theme}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        rightAddon={
          <BlogHeroFavoritesToggle
            theme={theme}
            isActive={favoritesOnly}
            onToggle={() => setFavoritesOnly(!favoritesOnly)}
            filterButtonBg={filterButtonBg}
            filterButtonBorder={filterButtonBorder}
            filterButtonHoverBg={filterButtonHoverBg}
            searchShadow={searchShadow}
            searchHoverShadow={searchHoverShadow}
          />
        }
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


