export const getBlogPageFromPathname = (pathname: string) => {
  const safePathname = pathname || "";
  const match = safePathname.match(/\/blog\/page\/(\d+)(?:\/)?$/);
  if (!match) return 1;
  const n = Number(match[1]);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
};

export const buildBlogPageHref = (targetPage: number, search: string) => {
  const basePath = targetPage <= 1 ? "/blog" : `/blog/page/${targetPage}`;
  const params = new URLSearchParams(search);
  // We use path-based pagination for the blog. Keep query/tag, but drop any legacy `page` param.
  params.delete("page");
  const nextSearch = params.toString();
  return nextSearch ? `${basePath}?${nextSearch}` : basePath;
};


