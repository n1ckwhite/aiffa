import { blogArticles } from "@/shared/articles/manifest";
import { BLOG_CARD_COVER_SIZES, buildUnsplashSrcSet, normalizeUnsplashUrl } from "@/shared/articles/unsplash";

const isLocalPublicImage = (src: string) => {
  const safeSrc = (src || "").trim();
  return (
    safeSrc.startsWith("/") &&
    !safeSrc.startsWith("/_next/") &&
    !safeSrc.startsWith("//")
  );
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
        const imageSrcSet = unsplashSrcSet ?? undefined;

        const normalizedHref = unsplashSrcSet
          ? normalizeUnsplashUrl(href, { width: 680 })
          : isLocalPublicImage(href)
            ? href
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


