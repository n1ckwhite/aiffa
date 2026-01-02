"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { MarkdownRenderer } from "@/shared/ui/MarkdownRenderer";
import { BlogArticleContentProps } from "./types";

export const BlogArticleContent: React.FC<BlogArticleContentProps> = ({ content, borderTopColor }) => {
  return (
    <Box as="section" aria-label="Содержание статьи" borderTopWidth="1px" borderTopColor={borderTopColor}>
      <MarkdownRenderer content={content} />
    </Box>
  );
};


