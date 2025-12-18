export const getBlogPageFromPathname = (pathname: string) => {
  const safePathname = pathname || "";
  const match =
    // preferred: /blog/page/2
    safePathname.match(/\/blog\/page\/(\d+)(?:\/)?$/) ??
    // legacy: /blog/page2
    safePathname.match(/\/blog\/page(\d+)(?:\/)?$/) ??
    safePathname.match(/\/blog\/(\d+)(?:\/)?$/);

  if (!match) return 1;
  const n = Number(match[1]);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
};

/**
 * Canonical blog page href.
 * - page 1 => /blog
 * - page N => /blog/pageN
 */
export const buildBlogCanonicalHref = (targetPage: number, search: string) => {
  const safePage = Number.isFinite(targetPage) && targetPage > 0 ? targetPage : 1;
  const basePath = safePage <= 1 ? `/blog` : `/blog/page/${safePage}`;
  const params = new URLSearchParams(search);
  params.delete("page");
  const nextSearch = params.toString();
  return nextSearch ? `${basePath}?${nextSearch}` : basePath;
};

/**
 * Pagination link href.
 * Always includes page number in path (including page1), because it's used for pagination clicks.
 */
export const buildBlogPaginationHref = (targetPage: number, search: string) => {
  const safePage = Number.isFinite(targetPage) && targetPage > 0 ? targetPage : 1;
  const basePath = `/blog/page/${safePage}`;
  const params = new URLSearchParams(search);
  params.delete("page");
  const nextSearch = params.toString();
  return nextSearch ? `${basePath}?${nextSearch}` : basePath;
};


