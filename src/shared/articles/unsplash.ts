/**
 * Unsplash helpers for consistent, Lighthouse-friendly responsive images.
 * We keep this centralized so blog cards, article pages and <head> preloads are aligned.
 */

export const BLOG_CARD_COVER_SIZES =
  "(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) calc(50vw - 48px), 337px";

export const BLOG_ARTICLE_COVER_SIZES = "(min-width: 768px) 960px, 100vw";

type NormalizeUnsplashOptions = {
  width?: number;
  quality?: number;
};

/**
 * Normalizes Unsplash URLs to consistent parameters (format/crop/quality).
 * If `src` is not an Unsplash image URL, returns `src` unchanged.
 */
export const normalizeUnsplashUrl = (src: string, options: NormalizeUnsplashOptions = {}) => {
  try {
    const url = new URL(src);
    if (!url.hostname.includes("images.unsplash.com")) return src;

    url.searchParams.set("auto", url.searchParams.get("auto") || "format");
    url.searchParams.set("fit", url.searchParams.get("fit") || "crop");
    url.searchParams.set("q", String(options.quality ?? 70));

    if (options.width) url.searchParams.set("w", String(options.width));
    return url.toString();
  } catch {
    return src;
  }
};

/**
 * Builds a srcSet for Unsplash images.
 * Returns `undefined` if `src` is not an Unsplash image URL.
 */
export const buildUnsplashSrcSet = (src: string, widths: number[] = [320, 480, 680, 960, 1400]) => {
  try {
    const url = new URL(src);
    if (!url.hostname.includes("images.unsplash.com")) return undefined;

    return widths.map((w) => `${normalizeUnsplashUrl(url.toString(), { width: w })} ${w}w`).join(", ");
  } catch {
    return undefined;
  }
};


