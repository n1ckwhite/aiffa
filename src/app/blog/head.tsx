import React from "react";
import { blogArticles } from "@/shared/articles/manifest";
import { BLOG_CARD_COVER_SIZES, buildUnsplashSrcSet, normalizeUnsplashUrl } from "@/shared/articles/unsplash";

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

const BlogHead = () => {
  const sorted = (blogArticles || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const candidates = sorted
    .map((a) => a.coverImage)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  const unique = Array.from(new Set(candidates)).slice(0, 3);

  return (
    <>
      {unique.map((href) => {
        const unsplashSrcSet = buildUnsplashSrcSet(href);
        const localSrcSet = buildNextImageSrcSet(href);
        const imageSrcSet = unsplashSrcSet ?? localSrcSet;

        const normalizedHref = unsplashSrcSet
          ? normalizeUnsplashUrl(href, { width: 680 })
          : localSrcSet
            ? buildNextImageUrl(href, 640)
            : href;

        return (
          <link
            key={href}
            rel="preload"
            as="image"
            href={normalizedHref}
            imageSrcSet={imageSrcSet}
            imageSizes={imageSrcSet ? BLOG_CARD_COVER_SIZES : undefined}
            fetchPriority="high"
          />
        );
      })}
    </>
  );
};

export default BlogHead;


