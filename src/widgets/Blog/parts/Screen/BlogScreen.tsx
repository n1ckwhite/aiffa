import React from "react";
import { Box } from "@chakra-ui/react";
import { useBlogScreenController } from "./hooks/useBlogScreenController/useBlogScreenController";
import { BlogHeroSection } from "./parts/BlogHeroSection";
import { BlogArticlesSection } from "./parts/BlogArticlesSection";
import { BlogWriteCtaSection } from "./parts/BlogWriteCtaSection";
import { BlogFaqSupportSection } from "./parts/BlogFaqSupportSection";

const BlogScreen: React.FC = () => {
  const c = useBlogScreenController();

  return (
    <Box position="relative">
      <Box w="100%" maxW="1240px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        <BlogHeroSection
          theme={c.theme}
          isEmptyResults={c.isEmptyResults}
          query={c.query}
          setQuery={c.setQuery}
          tagFilter={c.tagFilter}
          setTagFilter={c.setTagFilter}
          searchInputRef={c.searchInputRef}
          searchBg={c.colors.searchBg}
          searchBorder={c.colors.searchBorder}
          searchShadow={c.colors.searchShadow}
          searchHoverShadow={c.colors.searchHoverShadow}
          searchHoverBorder={c.colors.searchHoverBorder}
          searchPlaceholder={c.colors.searchPlaceholder}
          searchIconBg={c.colors.searchIconBg}
          clearButtonHoverBg={c.colors.clearButtonHoverBg}
          clearButtonActiveBg={c.colors.clearButtonActiveBg}
          filterButtonBg={c.colors.filterButtonBg}
          filterButtonBorder={c.colors.filterButtonBorder}
          filterButtonHoverBg={c.colors.filterButtonHoverBg}
          filterMenuBorder={c.colors.filterMenuBorder}
          filterMenuShadow={c.colors.filterMenuShadow}
        />

        <BlogArticlesSection
          theme={c.theme}
          isLoading={c.isLoading}
          isEmptyResults={c.isEmptyResults}
          query={c.query}
          pageSize={c.pageSize}
          pageArticles={c.pageArticles}
          categoryColor={c.colors.categoryColor}
          cardRadius={c.colors.cardRadius}
          cardPadding={c.colors.cardPadding}
          cardBorder={c.colors.cardBorder}
          cardHoverBorder={c.colors.cardHoverBorder}
          cardShadow={c.colors.cardShadow}
          cardHoverShadow={c.colors.cardHoverShadow}
          totalPages={c.totalPages}
          page={c.page}
          canPrev={c.canPrev}
          canNext={c.canNext}
          pageItems={c.pageItems}
          onSetPage={c.handleSetPage}
          paginationColors={c.colors.paginationColors}
        />

        <BlogWriteCtaSection
          theme={c.theme}
          cardRadius={c.colors.cardRadius}
          writeCtaBorderColor={c.colors.writeCtaBorderColor}
          writeCtaBoxShadow={c.colors.writeCtaBoxShadow}
          writeCtaBgGradient={c.colors.writeCtaBgGradient}
          writeCtaIconBg={c.colors.writeCtaIconBg}
          writeCtaIconBorderColor={c.colors.writeCtaIconBorderColor}
        />

        <BlogFaqSupportSection />
      </Box>
    </Box>
  );
};

export default BlogScreen;


