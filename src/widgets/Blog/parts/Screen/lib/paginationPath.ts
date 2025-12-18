export const getBlogPageFromPathname = (pathname: string) => {
  const safePathname = pathname || "";
  const match = safePathname.match(/\/blog\/(?:page\/)?(\d+)(?:\/)?$/);
  if (!match) return 1;
  const n = Number(match[1]);
  if (!Number.isFinite(n) || n < 1) return 1;
  return n;
};

export const buildBlogPageHref = (targetPage: number, search: string) => {
  const safePage = Number.isFinite(targetPage) && targetPage > 0 ? targetPage : 1;
  const basePath = `/blog/${safePage}`;
  const params = new URLSearchParams(search);
  params.delete("page");
  const nextSearch = params.toString();
  return nextSearch ? `${basePath}?${nextSearch}` : basePath;
};


