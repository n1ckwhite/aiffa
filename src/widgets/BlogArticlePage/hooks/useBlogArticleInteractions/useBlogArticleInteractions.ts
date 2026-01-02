"use client";

import React from "react";
import { copyTextToClipboard } from "@/utils/clipboard";
import { useLocalStorageFlag } from "../useLocalStorageFlag/useLocalStorageFlag";
import { BlogArticleInteractions, UseBlogArticleInteractionsParams } from "./types";

export const useBlogArticleInteractions = ({
  articleId,
  baseStars,
}: UseBlogArticleInteractionsParams): BlogArticleInteractions => {
  const id = String(articleId);
  const { value: isStarred, toggle: handleToggleStar } = useLocalStorageFlag(`blog-starred:${id}`);
  const { value: isSaved, toggle: handleToggleSaved } = useLocalStorageFlag(`blog-saved:${id}`);

  const [isShareCopied, setIsShareCopied] = React.useState(false);
  const shareCopyTimeoutRef = React.useRef<number | null>(null);

  const displayStars = baseStars + (isStarred ? 1 : 0);

  const handleCopyShareLink = React.useCallback(async () => {
    const url = `${window.location.origin}/blog/${id}`;
    const ok = await copyTextToClipboard(url);
    if (!ok) return;

    setIsShareCopied(true);
    if (shareCopyTimeoutRef.current != null) window.clearTimeout(shareCopyTimeoutRef.current);
    shareCopyTimeoutRef.current = window.setTimeout(() => setIsShareCopied(false), 1500);
  }, [id]);

  React.useEffect(() => {
    return () => {
      if (shareCopyTimeoutRef.current != null) window.clearTimeout(shareCopyTimeoutRef.current);
    };
  }, []);

  return {
    isStarred,
    isSaved,
    isShareCopied,
    displayStars,
    handleToggleStar,
    handleToggleSaved,
    handleCopyShareLink,
  };
};


