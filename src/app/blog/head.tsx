import React from "react";
import { blogArticles } from "@/shared/articles/manifest";

const normalizeUnsplashUrl = (src: string, width?: number) => {
  try {
    const url = new URL(src);
    if (!url.hostname.includes("images.unsplash.com")) return src;

    url.searchParams.set("auto", url.searchParams.get("auto") || "format");
    url.searchParams.set("fit", url.searchParams.get("fit") || "crop");
    url.searchParams.set("q", "70");
    if (width) url.searchParams.set("w", String(width));

    return url.toString();
  } catch {
    return src;
  }
};

const buildUnsplashSrcSet = (src: string) => {
  try {
    const url = new URL(src);
    if (!url.hostname.includes("images.unsplash.com")) return undefined;
    // Match card/grid rendering; include 680 for 2x DPR at ~337px.
    const widths = [320, 480, 680, 960, 1400];
    return widths
      .map((w) => {
        const u = normalizeUnsplashUrl(url.toString(), w);
        return `${u} ${w}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
};

const HEAD_SIZES = "(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) calc(50vw - 48px), 337px";

const BlogHead = () => {
  const sorted = (blogArticles || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
  const candidates = sorted
    .map((a) => a.coverImage)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  const unique = Array.from(new Set(candidates)).slice(0, 3);

  return (
    <>
      {unique.map((href) => {
        const imageSrcSet = buildUnsplashSrcSet(href);
        const normalizedHref = imageSrcSet ? normalizeUnsplashUrl(href, 680) : href;
        return (
          <link
            key={href}
            rel="preload"
            as="image"
            href={normalizedHref}
            imageSrcSet={imageSrcSet}
            imageSizes={imageSrcSet ? HEAD_SIZES : undefined}
            fetchPriority="high"
            crossOrigin="anonymous"
          />
        );
      })}
    </>
  );
};

export default BlogHead;


