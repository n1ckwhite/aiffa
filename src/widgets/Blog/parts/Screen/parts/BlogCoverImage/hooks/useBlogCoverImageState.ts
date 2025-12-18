import React from "react";
import { buildUnsplashSrcSet, normalizeUnsplashUrl } from "@/shared/articles/unsplash";
import { UseBlogCoverImageStateResult } from "./types";



const buildNextImageUrl = (src: string, width: number, quality = 70) => {
  const safeSrc = (src || "").trim();
  const safeWidth = Number.isFinite(width) && width > 0 ? width : 640;
  const safeQuality = Number.isFinite(quality) && quality > 0 ? quality : 70;
  return `/_next/image?url=${encodeURIComponent(safeSrc)}&w=${safeWidth}&q=${safeQuality}`;
};

const buildNextImageSrcSet = (
  src: string,
  widths: number[] = [320, 360, 414, 440, 500, 640, 768, 1024, 1280],
  quality = 70
) => {
  const safeSrc = (src || "").trim();
  if (!safeSrc.startsWith("/") || safeSrc.startsWith("/_next/image")) return undefined;
  return widths.map((w) => `${buildNextImageUrl(safeSrc, w, quality)} ${w}w`).join(", ");
};

export const useBlogCoverImageState = (src: string): UseBlogCoverImageStateResult => {
  const [loadState, setLoadState] = React.useState<"loading" | "loaded" | "error">("loading");
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const unsplashSrcSet = React.useMemo(() => buildUnsplashSrcSet(src), [src]);
  const localSrcSet = React.useMemo(() => buildNextImageSrcSet(src), [src]);
  const srcSet = unsplashSrcSet ?? localSrcSet;

  const normalizedSrc = React.useMemo(() => {
    if (unsplashSrcSet) return normalizeUnsplashUrl(src, { width: 680 });
    if (localSrcSet) return buildNextImageUrl(src, 640);
    return src;
  }, [src, unsplashSrcSet, localSrcSet]);

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


