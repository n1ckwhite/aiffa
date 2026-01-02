"use client";

import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useAppColors } from "@/shared/theme/colors";
import { useBlogArticlePageClientColors } from "../colors";
import { useBlogArticleInteractions } from "../hooks";
import { normalizeArticleMarkdown } from "../helpers";
import { BlogArticleContent, BlogArticleHeader } from "../parts";
import { BlogArticlePageClientProps } from "./types";



export const BlogArticlePageClient: React.FC<BlogArticlePageClientProps> = ({ article, markdown, formattedDate }) => {
  const theme = useAppColors();
  const baseStars = typeof article.starsCount === "number" ? article.starsCount : 0;
  const commentsCount = typeof article.commentsCount === "number" ? article.commentsCount : null;

  const colors = useBlogArticlePageClientColors();
  const interactions = useBlogArticleInteractions({ articleId: article.id, baseStars });

  const normalizedMarkdown = React.useMemo(() => {
    return normalizeArticleMarkdown({ markdown, articleTitle: article.title });
  }, [article.title, markdown]);

  return (
    <Box as="main" id="main-content" w="full" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
      <Box w="full" maxW="1120px" mx="auto">
        <Box
          w="full"
          maxW="100%"
          mx="0">
          <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
            <BlogArticleHeader
              article={article}
              formattedDate={formattedDate}
              theme={theme}
              colors={colors}
              interactions={interactions}
              commentsCount={commentsCount}
            />
            <BlogArticleContent content={normalizedMarkdown} borderTopColor={colors.mdTopBorderColor} />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogArticlePageClient;


