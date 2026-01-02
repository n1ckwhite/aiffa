import React from "react";
import { buildUnsplashSrcSet, normalizeUnsplashUrl } from "@/shared/articles/unsplash";
import { buildLocalBlogCoverCandidates } from "@/shared/articles/localPublicImages";
import { UseBlogCoverImageStateResult } from "./types";

export const useBlogCoverImageState = (src: string): UseBlogCoverImageStateResult => {
  const [loadState, setLoadState] = React.useState<"loading" | "loaded" | "error">("loading");
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const unsplashSrcSet = React.useMemo(() => buildUnsplashSrcSet(src), [src]);
  const localCoverCandidates = React.useMemo(() => buildLocalBlogCoverCandidates(src), [src]);
  const srcSet = unsplashSrcSet ?? localCoverCandidates?.srcSet ?? undefined;

  const normalizedSrc = React.useMemo(() => {
    if (unsplashSrcSet) return normalizeUnsplashUrl(src, { width: 680 });
    if (localCoverCandidates) return localCoverCandidates.src;
    return src;
  }, [src, unsplashSrcSet, localCoverCandidates]);

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Если картинка уже в кеше до монтирования, complete будет true.
    if (img.complete && img.naturalWidth > 0) {
      setLoadState("loaded");
    }
  }, [normalizedSrc]);

  const markLoaded = () => setLoadState("loaded");
  const markError = () => setLoadState("error");

  return {
    imgRef,
    loadState,
    normalizedSrc,
    srcSet,
    markLoaded,
    markError,
  };
};


