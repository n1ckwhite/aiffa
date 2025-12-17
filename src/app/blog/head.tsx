import React from "react";
import { blogArticles } from "@/shared/articles/manifest";

const buildUnsplashSrcSet = (src: string) => {
  try {
    const url = new URL(src);
    if (!url.hostname.includes("images.unsplash.com")) return undefined;
    const widths = [480, 768, 1024, 1400];
    return widths
      .map((w) => {
        const u = new URL(url.toString());
        u.searchParams.set("w", String(w));
        return `${u.toString()} ${w}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
};

const HEAD_SIZES = "(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 377px";

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
        return (
          <link
            key={href}
            rel="preload"
            as="image"
            href={href}
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


