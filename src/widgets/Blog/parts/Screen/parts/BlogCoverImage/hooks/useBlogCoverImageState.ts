import React from "react";
import { buildUnsplashSrcSet, normalizeUnsplashUrl } from "@/shared/articles/unsplash";
import { UseBlogCoverImageStateResult } from "./types";



export const useBlogCoverImageState = (src: string): UseBlogCoverImageStateResult => {
  const [loadState, setLoadState] = React.useState<"loading" | "loaded" | "error">("loading");
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const srcSet = React.useMemo(() => buildUnsplashSrcSet(src), [src]);
  const normalizedSrc = React.useMemo(() => (srcSet ? normalizeUnsplashUrl(src, { width: 680 }) : src), [src, srcSet]);

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


