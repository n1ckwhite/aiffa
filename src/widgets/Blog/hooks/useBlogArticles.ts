"use client";

import React from "react";
import type { BlogArticle } from "../types";
import { blogArticles } from "@/shared/articles/manifest";

type UseBlogArticlesState = {
  items: BlogArticle[];
  isLoading: boolean;
};

export const useBlogArticles = () => {
  return React.useMemo<UseBlogArticlesState>(() => {
    return { items: (blogArticles as unknown as BlogArticle[]) ?? [], isLoading: false };
  }, []);
};


