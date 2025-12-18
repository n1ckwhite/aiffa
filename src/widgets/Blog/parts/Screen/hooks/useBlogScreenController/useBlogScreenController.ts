import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppColors } from "@/shared/theme/colors";
import { usePagination } from "widgets/ModuleLessons/hooks/usePagination";
import { useScrollToTop } from "shared/hooks/useScrollToTop";
import { useBlogArticles } from "../../../../hooks/useBlogArticles";
import { useBlogScreenColors } from "../../colors/useBlogScreenColors/useBlogScreenColors";
import { buildBlogPageHref, getBlogPageFromPathname } from "../../lib/paginationPath";
import { BLOG_TAG_FILTERS, matchesTagFilter, normalizeTag } from "../../lib/tags/tags";
import type { BlogTagFilter } from "../../lib/tags/types";
import { useDebouncedSetter } from "../useDebouncedSetter";
import { useBlogHotkeys } from "../useBlogHotkeys/useBlogHotkeys";
import { BlogScreenController } from "./types";

export const useBlogScreenController = (): BlogScreenController => {
  const theme = useAppColors();
  const colors = useBlogScreenColors(theme);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingPageNavRef = React.useRef<{ replace: boolean } | null>(null);
  const didMountResetRef = React.useRef(false);

  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const pageFromPathname = React.useMemo(() => {
    return getBlogPageFromPathname(location.pathname || "");
  }, [location.pathname]);

  const buildBlogPageHrefForState = React.useCallback(
    (targetPage: number) => buildBlogPageHref(targetPage, location.search),
    [location.search],
  );

  const initialQueryFromUrl = React.useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      return params.get("q") ?? "";
    } catch {
      return "";
    }
  }, [location.search]);

  const initialTagFromUrl = React.useMemo<BlogTagFilter>(() => {
    try {
      const params = new URLSearchParams(location.search);
      const tag = (params.get("tag") ?? "").trim();
      const found = BLOG_TAG_FILTERS.find((t) => t !== "Все" && normalizeTag(t) === normalizeTag(tag));
      return found ?? "Все";
    } catch {
      return "Все";
    }
  }, [location.search]);

  const { items, isLoading } = useBlogArticles();
  const [query, setQuery] = React.useState<string>(initialQueryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>(initialQueryFromUrl);
  const [tagFilter, setTagFilter] = React.useState<BlogTagFilter>(initialTagFromUrl);

  const articles = React.useMemo(() => items.slice().sort((a, b) => (a.date < b.date ? 1 : -1)), [items]);
  const normalizedQuery = React.useMemo(() => debouncedQuery.trim().toLowerCase(), [debouncedQuery]);

  const filteredArticles = React.useMemo(() => {
    const base = normalizedQuery
      ? articles.filter((a) => {
          const haystack = [
            a.title,
            a.description,
            (a.tags || []).join(" "),
            a.author?.name,
            a.author?.github,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : articles;

    if (tagFilter === "Все") return base;
    return base.filter((a) => matchesTagFilter(a, tagFilter));
  }, [articles, normalizedQuery, tagFilter]);

  const isEmptyResults = !isLoading && filteredArticles.length === 0;

  const pageSize = 6;
  const { page, setPage, totalPages, start, end, canPrev, canNext, pageItems } = usePagination(
    filteredArticles.length,
    pageSize,
    "blog",
  );
  const pageArticles = React.useMemo(() => filteredArticles.slice(start, end), [filteredArticles, start, end]);

  const scrollTop = useScrollToTop({ immediate: false });

  React.useEffect(() => {
    // Reset to first page on search/filter changes (prevents "empty page" after filtering)
    // Skip initial mount: initial page can be driven by URL (/blog/page/:n).
    if (!didMountResetRef.current) {
      didMountResetRef.current = true;
      return;
    }
    pendingPageNavRef.current = { replace: true };
    setPage(1);
  }, [normalizedQuery, tagFilter, setPage]);

  React.useEffect(() => {
    // Keep pagination state in sync with URL (/blog/page/:n).
    const desired = Math.min(Math.max(pageFromPathname, 1), totalPages);
    if (desired !== page) {
      setPage(desired);
    }
  }, [pageFromPathname, totalPages, page, setPage]);

  useDebouncedSetter(query, setDebouncedQuery, 220);

  React.useEffect(() => {
    // Init from URL (?q=) + keep in sync on back/forward.
    const params = new URLSearchParams(location.search);
    const q = params.get("q") ?? "";
    if (q !== query) {
      setQuery(q);
      setDebouncedQuery(q);
    }

    const tag = (params.get("tag") ?? "").trim();
    const nextTag =
      (BLOG_TAG_FILTERS.find((t) => t !== "Все" && normalizeTag(t) === normalizeTag(tag)) ?? "Все") as BlogTagFilter;
    if (nextTag !== tagFilter) {
      setTagFilter(nextTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  React.useEffect(() => {
    // Sync query/tag -> URL without creating history entries.
    const params = new URLSearchParams(location.search);
    const next = query.trim();
    if (next) {
      params.set("q", next);
    } else {
      params.delete("q");
    }

    if (tagFilter !== "Все") {
      params.set("tag", tagFilter);
    } else {
      params.delete("tag");
    }

    const nextSearch = params.toString();
    const searchWithPrefix = nextSearch ? `?${nextSearch}` : "";
    if (searchWithPrefix !== location.search) {
      navigate(`${location.pathname}${searchWithPrefix}`, { replace: true, scroll: false });
    }
  }, [query, tagFilter, location.pathname, location.search, navigate]);

  React.useEffect(() => {
    // Sync page -> URL (push on user pagination actions, replace on programmatic resets).
    const desiredHref = buildBlogPageHrefForState(page);
    const currentHref = `${location.pathname}${location.search}`;
    if (desiredHref === currentHref) {
      pendingPageNavRef.current = null;
      return;
    }
    const replace = pendingPageNavRef.current?.replace ?? false;
    pendingPageNavRef.current = null;
    navigate(desiredHref, { replace, scroll: false });
  }, [page, buildBlogPageHrefForState, location.pathname, location.search, navigate]);

  useBlogHotkeys({ query, setQuery, searchInputRef });

  const handleSetPage = (next: number | ((p: number) => number)) => {
    pendingPageNavRef.current = { replace: false };
    setPage((prev) => {
      const computed = typeof next === "function" ? next(prev) : next;
      if (computed !== prev) {
        scrollTop();
      }
      return computed;
    });
  };

  return {
    theme,
    colors,
    query,
    setQuery,
    debouncedQuery,
    tagFilter,
    setTagFilter,
    searchInputRef,
    isLoading,
    isEmptyResults,
    pageArticles,
    pageSize,
    page,
    totalPages,
    canPrev,
    canNext,
    pageItems,
    handleSetPage,
  };
};


