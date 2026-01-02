/**
 * Helpers for responsive local images served from `public/`.
 * We use this for blog covers because Chakra <Image> renders a plain <img>,
 * so we need to provide srcSet/sizes ourselves.
 */

export const isLocalPublicImage = (src: string) => {
  const safeSrc = (src || "").trim();
  return (
    safeSrc.startsWith("/") &&
    !safeSrc.startsWith("/_next/") &&
    !safeSrc.startsWith("//")
  );
};

type LocalImageCandidates = {
  /** Fallback `src` (should be a reasonably small default) */
  src: string;
  /** Responsive srcSet for the image */
  srcSet: string;
};

/**
 * Builds src/srcSet for blog cover images under `/public/images/blog/*.webp`.
 *
 * Expected generated variants:
 * - `/images/blog/<name>-320.webp`
 * - `/images/blog/<name>-640.webp`
 * - `/images/blog/<name>-960.webp`
 */
export const buildLocalBlogCoverCandidates = (rawSrc: string): LocalImageCandidates | null => {
  const src = (rawSrc || "").trim();
  if (!isLocalPublicImage(src)) return null;

  const match = src.match(/^\/images\/blog\/(.+)\.webp$/i);
  if (!match) return null;

  const base = `/images/blog/${match[1]}`;
  const srcSet = `${base}-320.webp 320w, ${base}-640.webp 640w, ${base}-960.webp 960w`;

  // Use a sensible fallback (good for most card sizes, including DPR 2).
  return { src: `${base}-640.webp`, srcSet };
};


