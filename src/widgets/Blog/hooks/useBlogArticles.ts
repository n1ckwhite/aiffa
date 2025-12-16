"use client";

import React from "react";
import type { BlogArticle } from "../types";
import { loadBlogArticles } from "@/shared/articles/api";

type UseBlogArticlesState = {
  items: BlogArticle[];
  isLoading: boolean;
};

export const useBlogArticles = () => {
  const [state, setState] = React.useState<UseBlogArticlesState>({
    items: [],
    isLoading: true,
  });

  React.useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const items = (await loadBlogArticles()) as BlogArticle[];
        if (cancelled) return;
        setState({ items, isLoading: false });
      } catch {
        if (cancelled) return;
        setState({ items: [], isLoading: false });
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};


