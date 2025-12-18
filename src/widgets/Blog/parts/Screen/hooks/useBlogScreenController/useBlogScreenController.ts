import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppColors } from "@/shared/theme/colors";
import { useScrollToTop } from "shared/hooks/useScrollToTop";
import { useBlogArticles } from "../../../../hooks/useBlogArticles";
import { useBlogScreenColors } from "../../colors/useBlogScreenColors/useBlogScreenColors";
import { buildBlogCanonicalHref, buildBlogPaginationHref, getBlogPageFromPathname } from "../../lib/paginationPath";
import { BLOG_TAG_FILTERS, matchesTagFilter, normalizeTag } from "../../lib/tags/tags";
import type { BlogTagFilter } from "../../lib/tags/types";
import { useDebouncedSetter } from "../useDebouncedSetter";
import { useBlogHotkeys } from "../useBlogHotkeys/useBlogHotkeys";
import { BlogScreenController } from "./types";

const clampPage = (value: number, totalPages: number) => {
  const safe = Number.isFinite(value) ? value : 1;
  const safeTotal = Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;
  return Math.min(Math.max(safe, 1), safeTotal);
};

const makePageItems = (total: number, current: number, radius = 2, fullLimit = 7) => {
  if (total <= fullLimit) return Array.from({ length: total }, (_, i) => i + 1) as (number | string)[];
  const items: (number | string)[] = [];
  items.push(1);
  const left = Math.max(2, current - radius);
  const right = Math.min(total - 1, current + radius);
  if (left > 2) items.push("…");
  for (let i = left; i <= right; i++) items.push(i);
  if (right < total - 1) items.push("…");
  items.push(total);
  return items;
};

export const useBlogScreenController = (): BlogScreenController => {
  const theme = useAppColors();
  const colors = useBlogScreenColors(theme);
  const location = useLocation();
  const navigate = useNavigate();

  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const pageFromPathname = React.useMemo(() => {
    return getBlogPageFromPathname(location.pathname || "");
  }, [location.pathname]);

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
  const totalPages = React.useMemo(
    () => Math.max(1, Math.ceil(filteredArticles.length / pageSize)),
    [filteredArticles.length],
  );
  const page = React.useMemo(() => clampPage(pageFromPathname, totalPages), [pageFromPathname, totalPages]);
  const start = React.useMemo(() => (page - 1) * pageSize, [page, pageSize]);
  const end = React.useMemo(() => start + pageSize, [start, pageSize]);
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pageItems = React.useMemo<(number | string)[]>(() => makePageItems(totalPages, page, 2, 7), [totalPages, page]);
  const pageArticles = React.useMemo(() => filteredArticles.slice(start, end), [filteredArticles, start, end]);

  const scrollTop = useScrollToTop({ immediate: false });

  React.useEffect(() => {
    const raw = Math.max(pageFromPathname, 1);
    if (isLoading) return;
    if (raw <= totalPages) return;
    navigate(buildBlogCanonicalHref(totalPages, location.search), { replace: true, scroll: false });
  }, [pageFromPathname, totalPages, isLoading, location.search, navigate]);

  useDebouncedSetter(query, setDebouncedQuery, 220);

  React.useEffect(() => {
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
  }, [location.search]);

  React.useEffect(() => {
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
    const currentHref = `${location.pathname}${location.search}`;
    const shouldResetToFirstPage = searchWithPrefix !== location.search && page !== 1;
    const desiredHref = shouldResetToFirstPage
      ? buildBlogCanonicalHref(1, searchWithPrefix)
      : `${location.pathname}${searchWithPrefix}`;
    if (desiredHref !== currentHref) {
      navigate(desiredHref, { replace: true, scroll: false });
    }
  }, [query, tagFilter, page, location.pathname, location.search, navigate]);

  useBlogHotkeys({ query, setQuery, searchInputRef });

  const handleSetPage = (next: number | ((p: number) => number)) => {
    const computed = typeof next === "function" ? next(page) : next;
    const safeNext = clampPage(computed, totalPages);
    if (safeNext === page) return;
    scrollTop();
    navigate(buildBlogPaginationHref(safeNext, location.search), { replace: false, scroll: false });
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


